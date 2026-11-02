import "./compat.js";

export async function sendBackground(message) {
  const response = await chrome.runtime.sendMessage(message);
  if (!response) {
    throw new Error("扩展后台没有响应，请重新加载扩展。");
  }
  if (!response.ok) {
    throw new Error(response.error || "操作失败。");
  }
  return response.data;
}

export async function sendTab(tabId, message) {
  const response = await chrome.tabs.sendMessage(tabId, message);
  if (!response) {
    throw new Error("当前页面没有连接到扩展，请刷新网页后重试。");
  }
  if (!response.ok) {
    throw new Error(response.error || "当前页面操作失败。");
  }
  return response.data;
}

export async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

export function isTranslatableUrl(url) {
  if (!url) return false;
  try {
    return ["http:", "https:"].includes(new URL(url).protocol);
  } catch {
    return false;
  }
}

export function normalizeSettings(settings) {
  const next = structuredClone(settings);
  next.floatingBallEnabled = false;
  next.contextMenuTranslationEnabled = false;
  next.videoTranslation = {
    ...(next.videoTranslation || {}),
    enabled: false
  };
  next.autoTranslation = {
    ...(next.autoTranslation || {}),
    enabled: false,
    nonTargetLanguage: false,
    presetSites: [],
    customSites: []
  };
  next.shortcutEnabled = {
    ...(next.shortcutEnabled || {}),
    "toggle-paragraph-mode": false,
    "translate-selection": false,
    "floating-controls": false
  };
  next.shortcuts = {
    ...(next.shortcuts || {}),
    "toggle-paragraph-mode": ""
  };
  next.localShortcuts = {
    ...(next.localShortcuts || {}),
    "paragraph-click": "",
    "floating-activate": "",
    "floating-menu": ""
  };
  const allowedProviders = new Set([
    "microsoft-web-translate",
    "google-web-translate",
    "deepseek"
  ]);
  const compatibleProvider = next.providers?.some(
    (provider) =>
      provider.id === next.activeProviderId &&
      provider.enabled !== false &&
      (allowedProviders.has(provider.type) ||
        (provider.type === "openai-compatible" &&
          (provider.id.startsWith("custom-model-") ||
            provider.id === "ollama-local"))) &&
      !(next.hiddenProviderIds || []).includes(provider.id)
  );
  if (!compatibleProvider) {
    next.activeProviderId = "microsoft-web-translate";
  }
  return next;
}

export async function getSettings() {
  return sendBackground({ type: "GET_SETTINGS" });
}

export async function saveSettings(settings) {
  await sendBackground({
    type: "SAVE_SETTINGS",
    settings: normalizeSettings(settings)
  });
  return getSettings();
}

export function setStatus(element, message, tone = "neutral") {
  if (element.id === "status" && tone !== "error") {
    element.textContent = "";
    element.hidden = true;
    delete element.dataset.tone;
    return;
  }
  element.hidden = false;
  element.textContent = message;
  element.dataset.tone = tone;
  if (element.id === "settingsStatus") {
    clearTimeout(element._statusTimer);
    element._statusTimer = window.setTimeout(() => {
      element.textContent = "";
      element.hidden = true;
      delete element.dataset.tone;
    }, 3000);
  }
}
