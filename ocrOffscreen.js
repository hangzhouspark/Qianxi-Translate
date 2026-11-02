import "./compat.js";
import {
  c as OCR_MODEL_BYTES,
  O as OCR_CACHE_NAME
} from "./assets/ocr-models.js";
import {
  c as getInstalledRevision,
  d as downloadModels,
  i as getInstalledOcrRevision,
  r as loadModels
} from "./assets/parsers.js";

let status = {
  state: "missing",
  downloaded: 0,
  total: OCR_MODEL_BYTES
};
let engineFrame;
let engineReady;
let installTask;
let recognizing = false;
let idleTimer;
let requestId = 0;
const pendingRequests = new Map();

window.addEventListener("message", (event) => {
  if (
    event.source !== engineFrame?.contentWindow ||
    event.data?.target !== "qianxi-ocr-result"
  ) {
    return;
  }
  const pending = pendingRequests.get(event.data.id);
  if (!pending) return;
  clearTimeout(pending.timer);
  pendingRequests.delete(event.data.id);
  if (event.data.error) {
    pending.reject(new Error(event.data.error));
  } else {
    pending.resolve(event.data.result);
  }
});

function closeEngine(reason = new Error("OCR 任务已取消。")) {
  clearTimeout(idleTimer);
  engineFrame?.remove();
  engineFrame = undefined;
  engineReady = undefined;
  for (const pending of pendingRequests.values()) {
    clearTimeout(pending.timer);
    pending.reject(reason);
  }
  pendingRequests.clear();
}

function scheduleIdleCleanup() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => closeEngine(), 60_000);
}

function callEngine(action, data, transfer = []) {
  const id = ++requestId;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pendingRequests.delete(id);
      reject(new Error("OCR 处理超时，请重试。"));
      closeEngine();
    }, 120_000);
    pendingRequests.set(id, { resolve, reject, timer });
    engineFrame.contentWindow.postMessage(
      { target: "qianxi-ocr-engine", id, action, data },
      "*",
      transfer
    );
  });
}

async function ensureEngine() {
  clearTimeout(idleTimer);
  if (engineReady) return engineReady;

  engineReady = (async () => {
    engineFrame = document.createElement("iframe");
    engineFrame.sandbox.add("allow-scripts");
    engineFrame.src = chrome.runtime.getURL("ocr-sandbox.html");
    await new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error("OCR 初始化超时。")),
        30_000
      );
      engineFrame.onload = () => {
        clearTimeout(timer);
        resolve();
      };
      document.body.append(engineFrame);
    });
    const models = await loadModels();
    await callEngine(
      "init",
      { models, wasmPath: chrome.runtime.getURL("ocr-runtime/") },
      models
    );
  })();

  try {
    await engineReady;
  } catch (error) {
    closeEngine(error);
    throw error;
  }
}

async function readStatus() {
  if (status.state === "installing" || status.state === "installed") {
    return status;
  }
  const revision = await getInstalledOcrRevision();
  if (revision) {
    status = {
      state: "installed",
      total: OCR_MODEL_BYTES,
      downloaded: OCR_MODEL_BYTES,
      revision
    };
  } else if (status.state !== "error") {
    status = {
      state: "missing",
      total: OCR_MODEL_BYTES,
      downloaded: 0
    };
  }
  return status;
}

async function handleOcrAction(action, dataUrl) {
  if (action === "ping") return { ready: true };
  if (action === "status") return readStatus();

  if (action === "install") {
    if (status.state === "installed" || installTask) return status;
    status = {
      state: "installing",
      total: OCR_MODEL_BYTES,
      downloaded: 0
    };
    installTask = (async () => {
      try {
        await downloadModels((downloaded) => {
          status = { ...status, downloaded };
        });
        await ensureEngine();
        const revision = await getInstalledRevision();
        status = {
          state: "installed",
          total: OCR_MODEL_BYTES,
          downloaded: OCR_MODEL_BYTES,
          revision
        };
      } catch (error) {
        closeEngine();
        await caches.delete(OCR_CACHE_NAME);
        status = {
          state: "error",
          total: OCR_MODEL_BYTES,
          downloaded: 0,
          error: error instanceof Error ? error.message : String(error)
        };
      } finally {
        installTask = undefined;
        scheduleIdleCleanup();
      }
    })();
    return status;
  }

  if (action === "remove") {
    if (installTask) throw new Error("正在安装 OCR 模型，请完成后再删除。");
    if (recognizing) throw new Error("正在识别图片，请完成后再删除 OCR 模型。");
    closeEngine();
    await caches.delete(OCR_CACHE_NAME);
    status = {
      state: "missing",
      total: OCR_MODEL_BYTES,
      downloaded: 0
    };
    return status;
  }

  if (action === "recognize") {
    const revision = await getInstalledOcrRevision();
    if (!revision) {
      throw new Error("请先点击图片翻译旁的下载图标安装 OCR 模型。");
    }
    if (recognizing) throw new Error("已有图片正在识别，请稍后重试。");
    recognizing = true;
    try {
      await ensureEngine();
      return {
        lines: await callEngine("recognize", { dataUrl }),
        revision
      };
    } finally {
      recognizing = false;
      scheduleIdleCleanup();
    }
  }

  throw new Error("未知 OCR 操作。");
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (
    message?.target !== "ocr-offscreen" ||
    sender.id !== chrome.runtime.id ||
    sender.tab
  ) {
    return undefined;
  }
  handleOcrAction(message.action, message.dataUrl).then(
    (data) => sendResponse({ ok: true, data }),
    (error) =>
      sendResponse({
        ok: false,
        error: error instanceof Error ? error.message : String(error)
      })
  );
  return true;
});
