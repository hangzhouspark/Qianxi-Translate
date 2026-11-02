import {
  getActiveTab,
  getSettings,
  isTranslatableUrl,
  saveSettings,
  sendBackground,
  sendTab,
  setStatus
} from "./shared.js";

const languages = [
  ["auto", "自动检测"],
  ["zh-CN", "简体中文"],
  ["zh-TW", "繁体中文"],
  ["en", "英语"],
  ["ja", "日语"],
  ["ko", "韩语"],
  ["fr", "法语"],
  ["de", "德语"],
  ["es", "西班牙语"],
  ["ru", "俄语"],
  ["pt", "葡萄牙语"],
  ["it", "意大利语"],
  ["ar", "阿拉伯语"],
  ["tr", "土耳其语"],
  ["vi", "越南语"],
  ["th", "泰语"],
  ["id", "印度尼西亚语"],
  ["nl", "荷兰语"],
  ["pl", "波兰语"],
  ["uk", "乌克兰语"]
];

const allowedProviderTypes = new Set([
  "microsoft-web-translate",
  "google-web-translate",
  "deepseek"
]);

function isAllowedProvider(provider) {
  return (
    allowedProviderTypes.has(provider.type) ||
    (provider.type === "openai-compatible" &&
      (provider.id.startsWith("custom-model-") ||
        provider.id === "ollama-local"))
  );
}
const elements = {
  sourceLang: document.querySelector("#sourceLang"),
  targetLang: document.querySelector("#targetLang"),
  provider: document.querySelector("#provider"),
  togglePage: document.querySelector("#togglePage"),
  pageButtonTitle: document.querySelector("#pageButtonTitle"),
  selectionToggle: document.querySelector("#selectionToggle"),
  imageToggle: document.querySelector("#imageToggle"),
  imageControl: document.querySelector("#imageControl"),
  status: document.querySelector("#status"),
  openOptions: document.querySelector("#openOptions")
};

let settings;
let tab;
let pageTranslated = false;
let busy = false;
let ocrState = "checking";
let ocrPoll;

initialize().catch((error) => {
  setStatus(elements.status, error.message, "error");
  disablePageButton();
});

async function initialize() {
  [settings, tab] = await Promise.all([getSettings(), getActiveTab()]);
  populateLanguages();
  populateProviders();
  renderSettings();
  await refreshPageState();
  bindEvents();
  await refreshOcrState();
}

function populateLanguages() {
  elements.sourceLang.replaceChildren(
    ...languages.map(([value, label]) => new Option(label, value))
  );
  elements.targetLang.replaceChildren(
    ...languages.slice(1).map(([value, label]) => new Option(label, value))
  );
}

function populateProviders() {
  const available = settings.providers.filter(
    (provider) =>
      provider.enabled !== false && isAllowedProvider(provider)
  );
  elements.provider.replaceChildren(
    ...available.map((provider) => new Option(provider.label, provider.id))
  );
}

function renderSettings() {
  const availableProviderIds = new Set(
    [...elements.provider.options].map((option) => option.value)
  );
  elements.sourceLang.value = settings.sourceLang || "auto";
  elements.targetLang.value = settings.targetLang || "zh-CN";
  elements.provider.value = availableProviderIds.has(settings.activeProviderId)
    ? settings.activeProviderId
    : elements.provider.options[0]?.value || "microsoft-web-translate";
  elements.selectionToggle.setAttribute(
    "aria-pressed",
    String(settings.selectionTranslation?.enabled !== false)
  );
  elements.imageToggle.setAttribute(
    "aria-pressed",
    String(settings.imageTranslationEnabled === true)
  );
  renderImageControl();
}

function renderImageControl() {
  const installed = ocrState === "installed";
  const installing = ocrState === "installing";
  const checking = ocrState === "checking";
  elements.imageToggle.dataset.ocrState = ocrState;
  elements.imageToggle.disabled = installing || checking;
  elements.imageControl.className = installed
    ? "tile-switch"
    : `tile-download${installing || checking ? " is-installing" : ""}`;
  if (installed) {
    elements.imageControl.replaceChildren();
    delete elements.imageToggle.dataset.tooltip;
    elements.imageToggle.title = "开启或关闭图片翻译";
    elements.imageToggle.setAttribute("aria-label", "图片翻译开关");
  } else {
    elements.imageControl.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14"/></svg>';
    const tooltip = checking
      ? "正在检查 PaddleOCR PP-OCRv5 Mobile 模型"
      : installing
        ? "正在下载 PaddleOCR PP-OCRv5 Mobile 模型"
        : "需要下载 PaddleOCR PP-OCRv5 Mobile 模型（约 20.5 MB），安装后即可开启图片翻译";
    elements.imageToggle.dataset.tooltip = tooltip;
    elements.imageToggle.removeAttribute("title");
    elements.imageToggle.setAttribute("aria-label", tooltip);
  }
}

async function refreshOcrState() {
  clearTimeout(ocrPoll);
  try {
    const state = await sendBackground({ type: "GET_OCR_STATUS" });
    ocrState = state?.state || "missing";
  } catch {
    ocrState = "missing";
  }
  renderImageControl();
  if (ocrState === "installing") {
    ocrPoll = setTimeout(refreshOcrState, 700);
  }
}

async function installImageModel() {
  if (ocrState === "installing" || ocrState === "checking") return;
  ocrState = "installing";
  renderImageControl();
  try {
    await sendBackground({ type: "INSTALL_OCR" });
    await refreshOcrState();
  } catch (error) {
    ocrState = "missing";
    renderImageControl();
    setStatus(elements.status, error.message, "error");
  }
}

async function refreshPageState() {
  const supported = isTranslatableUrl(tab?.url) && tab?.id;
  if (!supported) {
    disablePageButton();
    setStatus(
      elements.status,
      "当前页面不支持翻译。请切换到普通网页后重试。",
      "error"
    );
    return;
  }
  try {
    const state = await sendTab(tab.id, { type: "GET_TRANSLATION_STATE" });
    pageTranslated = state?.translated === true;
    renderPageButton();
    setStatus(elements.status, "");
  } catch (error) {
    disablePageButton();
    setStatus(elements.status, error.message, "error");
  }
}

function renderPageButton() {
  elements.togglePage.disabled = false;
  elements.togglePage.classList.toggle("is-translated", pageTranslated);
  elements.pageButtonTitle.textContent = pageTranslated
    ? "显示原文"
    : "整页翻译";
}

function disablePageButton() {
  elements.togglePage.disabled = true;
  elements.togglePage.classList.remove("is-translated");
  elements.pageButtonTitle.textContent = "整页翻译";
}

function bindEvents() {
  elements.openOptions.addEventListener("click", () =>
    chrome.runtime.openOptionsPage()
  );
  elements.sourceLang.addEventListener("change", persistLanguage);
  elements.targetLang.addEventListener("change", persistLanguage);
  elements.provider.addEventListener("change", persistProvider);
  elements.togglePage.addEventListener("click", togglePageTranslation);
  elements.selectionToggle.addEventListener("click", () =>
    toggleFeature("selection")
  );
  elements.imageToggle.addEventListener("click", () =>
    toggleFeature("image")
  );
}

async function persistLanguage() {
  try {
    settings.sourceLang = elements.sourceLang.value;
    settings.targetLang = elements.targetLang.value;
    settings = await saveSettings(settings);
    setStatus(elements.status, "翻译语言已更新。", "success");
  } catch (error) {
    setStatus(elements.status, error.message, "error");
  }
}

async function persistProvider() {
  try {
    settings.activeProviderId = elements.provider.value;
    settings = await saveSettings(settings);
    setStatus(elements.status, "翻译服务已切换。", "success");
  } catch (error) {
    setStatus(elements.status, error.message, "error");
  }
}

async function togglePageTranslation() {
  if (busy || elements.togglePage.disabled) return;
  busy = true;
  elements.togglePage.classList.add("is-loading");
  elements.togglePage.setAttribute("aria-busy", "true");
  setStatus(
    elements.status,
    pageTranslated ? "正在恢复原文..." : "正在翻译当前网页..."
  );
  try {
    const type = pageTranslated ? "CLEAR_TRANSLATION" : "TRANSLATE_PAGE";
    const result = await sendTab(tab.id, { type });
    pageTranslated = type === "TRANSLATE_PAGE";
    if (type === "TRANSLATE_PAGE") {
      const failed = Number(result?.failed || 0);
      if (failed > 0) {
        setStatus(
          elements.status,
          `已翻译 ${result?.translated || 0} 段，${failed} 段失败：${result?.error || "请重试"}`,
          "error"
        );
      } else if (result?.pending) {
        setStatus(elements.status, "当前区域已翻译，滚动后会继续处理。", "success");
      } else {
        setStatus(
          elements.status,
          `已翻译 ${result?.translated || 0} 段，完成。`,
          "success"
        );
      }
    } else {
      setStatus(elements.status, "已恢复网页原文。", "success");
    }
    renderPageButton();
  } catch (error) {
    setStatus(elements.status, error.message, "error");
    await refreshPageState().catch(() => {});
  } finally {
    busy = false;
    elements.togglePage.classList.remove("is-loading");
    elements.togglePage.removeAttribute("aria-busy");
  }
}

async function toggleFeature(feature) {
  if (feature === "image") {
    if (ocrState !== "installed") {
      await installImageModel();
      return;
    }
  }

  const enabling =
    feature === "selection"
      ? settings.selectionTranslation?.enabled === false
      : settings.imageTranslationEnabled !== true;

  if (feature === "selection") {
    settings.selectionTranslation = {
      ...(settings.selectionTranslation || {}),
      enabled: enabling
    };
  } else {
    settings.imageTranslationEnabled = enabling;
  }

  try {
    settings = await saveSettings(settings);
    renderSettings();
    setStatus(
      elements.status,
      `${feature === "selection" ? "划词翻译" : "图片翻译"}已${enabling ? "开启" : "关闭"}。`,
      "success"
    );
  } catch (error) {
    renderSettings();
    setStatus(elements.status, error.message, "error");
  }
}
