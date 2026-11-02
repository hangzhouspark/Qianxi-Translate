import {
  getSettings,
  saveSettings,
  sendBackground,
  setStatus
} from "./shared.js";

const sourceLanguages = [
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

const targetLanguages = sourceLanguages.slice(1);
const displayModes = [
  ["replace", "译文替换", "隐藏原文，仅显示译文。"],
  ["bilingual-accent", "双色对照", "译文显示在原文下方，并用不同颜色突出显示。"]
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
  providerTrigger: document.querySelector("#providerTrigger"),
  providerTriggerLabel: document.querySelector("#providerTriggerLabel"),
  providerList: document.querySelector("#providerList"),
  addProvider: document.querySelector("#addProvider"),
  displayMode: document.querySelector("#displayMode"),
  displayModeHint: document.querySelector("#displayModeHint"),
  selectionEnabled: document.querySelector("#selectionEnabled"),
  imageEnabled: document.querySelector("#imageEnabled"),
  ocrStatus: document.querySelector("#ocrStatus"),
  ocrProgress: document.querySelector("#ocrProgress"),
  installOcr: document.querySelector("#installOcr"),
  removeOcr: document.querySelector("#removeOcr"),
  providerFields: document.querySelector("#providerFields"),
  providerSummary: document.querySelector("#providerSummary"),
  testProvider: document.querySelector("#testProvider"),
  providerTestStatus: document.querySelector("#providerTestStatus"),
  cacheEnabled: document.querySelector("#cacheEnabled"),
  codeCommentsEnabled: document.querySelector("#codeCommentsEnabled"),
  framesEnabled: document.querySelector("#framesEnabled"),
  chunkSize: document.querySelector("#chunkSize"),
  concurrency: document.querySelector("#concurrency"),
  servicePerformanceTitle: document.querySelector("#servicePerformanceTitle"),
  inheritPerformance: document.querySelector("#inheritPerformance"),
  servicePerformanceFields: document.querySelector("#servicePerformanceFields"),
  serviceChunkSize: document.querySelector("#serviceChunkSize"),
  serviceConcurrency: document.querySelector("#serviceConcurrency"),
  reset: document.querySelector("#resetSettings"),
  settingsStatus: document.querySelector("#settingsStatus")
};

let settings;
let ocrPoll;
let providerMenuOpen = false;
let modelDetectionTimer;
let modelRequestVersion = 0;
let autoSaveTimer;
let autoSaveBusy = false;
let autoSavePending = false;
let navScrollFrame;

initialize().catch((error) => {
  setStatus(elements.settingsStatus, error.message, "error");
});

async function initialize() {
  settings = await getSettings();
  populateStaticControls();
  render(settings);
  bindEvents();
  await refreshOcrStatus();
}

function populateStaticControls() {
  elements.sourceLang.replaceChildren(
    ...sourceLanguages.map(([value, label]) => new Option(label, value))
  );
  elements.targetLang.replaceChildren(
    ...targetLanguages.map(([value, label]) => new Option(label, value))
  );
  elements.displayMode.replaceChildren(
    ...displayModes.map(([value, label]) => new Option(label, value))
  );
  const providers = settings.providers.filter(isAllowedProvider);
  elements.provider.replaceChildren(
    ...providers.map((provider) => new Option(provider.label, provider.id))
  );
}

function render(value) {
  syncProviderSelect();
  elements.sourceLang.value = value.sourceLang || "auto";
  elements.targetLang.value = value.targetLang || "zh-CN";
  const providerExists = [...elements.provider.options].some(
    (option) => option.value === value.activeProviderId
  );
  elements.provider.value = providerExists
    ? value.activeProviderId
    : elements.provider.options[0]?.value || "";
  elements.displayMode.value = value.translationDisplayMode || "replace";
  updateDisplayModeHint();
  elements.selectionEnabled.checked =
    value.selectionTranslation?.enabled !== false;
  elements.imageEnabled.checked = value.imageTranslationEnabled === true;
  elements.cacheEnabled.checked = value.cacheEnabled !== false;
  elements.codeCommentsEnabled.checked = value.translateCodeComments !== false;
  elements.framesEnabled.checked = value.frameTranslation?.enabled !== false;
  elements.chunkSize.value = String(value.chunkSize || 1200);
  elements.concurrency.value = String(value.concurrency || 3);
  renderProviderManager();
  renderProviderFields();
  renderPerformanceSettings();
}

function syncProviderSelect() {
  const providers = settings.providers.filter(isAllowedProvider);
  elements.provider.replaceChildren(
    ...providers.map((provider) => new Option(provider.label, provider.id))
  );
}

function renderProviderManager() {
  const provider = currentProvider();
  elements.providerList.hidden = !providerMenuOpen;
  elements.providerTrigger.setAttribute("aria-expanded", String(providerMenuOpen));
  elements.providerTriggerLabel.textContent = provider?.label || "选择翻译服务";
  elements.providerList.replaceChildren(
    ...settings.providers.filter(isAllowedProvider).map((item) => {
      const row = document.createElement("div");
      row.className = "service-row";
      row.dataset.active = String(item.id === elements.provider.value);
      row.dataset.providerId = item.id;

      const selectButton = document.createElement("button");
      selectButton.type = "button";
      selectButton.className = "service-select";
      selectButton.setAttribute("role", "option");
      selectButton.setAttribute("aria-selected", String(item.id === elements.provider.value));
      selectButton.innerHTML = '<span class="service-name"></span>';
      selectButton.querySelector(".service-name").textContent = item.label;
      selectButton.addEventListener("click", () => {
        elements.provider.value = item.id;
        renderProviderManager();
        renderProviderFields();
      });

      const actions = document.createElement("div");
      actions.className = "service-actions";

      const visibility = document.createElement("label");
      visibility.className = "manager-switch";
      visibility.title = item.enabled === false ? "在插件首页显示" : "从插件首页隐藏";
      const toggle = document.createElement("input");
      toggle.type = "checkbox";
      toggle.checked = item.enabled !== false;
      toggle.setAttribute("aria-label", `${item.label}：在插件首页显示`);
      toggle.addEventListener("change", () => {
        setProviderVisibility(item.id, toggle.checked).catch(handleProviderActionError);
      });
      const switchVisual = document.createElement("span");
      switchVisual.setAttribute("aria-hidden", "true");
      visibility.append(toggle, switchVisual);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "delete-provider";
      remove.title = `删除 ${item.label}`;
      remove.setAttribute("aria-label", `删除 ${item.label}`);
      remove.disabled = settings.providers.filter(isAllowedProvider).length <= 1;
      remove.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg>';
      remove.addEventListener("click", () => {
        deleteProvider(item.id).catch(handleProviderActionError);
      });

      actions.append(visibility, remove);
      row.append(selectButton, actions);
      return row;
    })
  );
}

function currentProvider() {
  return settings.providers.find(
    (provider) => provider.id === elements.provider.value
  );
}

function renderPerformanceSettings() {
  const provider = currentProvider();
  const globalChunkSize = Math.min(
    4000,
    Math.max(200, Number(elements.chunkSize.value) || 1200)
  );
  const globalConcurrency = Math.min(
    8,
    Math.max(1, Number(elements.concurrency.value) || 3)
  );
  elements.servicePerformanceTitle.textContent = provider
    ? `当前服务：${provider.label}`
    : "当前服务";
  elements.serviceConcurrency.max = String(globalConcurrency);
  if (!provider) {
    elements.inheritPerformance.checked = true;
    elements.servicePerformanceFields.hidden = true;
    return;
  }
  const inherits = provider.performanceMode !== "custom";
  elements.inheritPerformance.checked = inherits;
  elements.servicePerformanceFields.hidden = inherits;
  elements.serviceChunkSize.value = String(
    provider.chunkSize || globalChunkSize
  );
  elements.serviceConcurrency.value = String(
    Math.min(globalConcurrency, provider.concurrency || globalConcurrency)
  );
}

function renderProviderFields() {
  const provider = currentProvider();
  elements.providerFields.replaceChildren();
  elements.providerTestStatus.textContent = "";
  delete elements.providerTestStatus.dataset.tone;
  if (!provider) return;

  elements.providerSummary.textContent = `${provider.label} · ${providerTypeLabel(provider.type, provider.id)}`;

  if (["openai-compatible", "deepseek", "zhipu-glm", "anthropic-compatible"].includes(provider.type)) {
    const systemPromptField = createTextareaField(
      "systemPrompt",
      "系统提示词",
      provider.systemPrompt || ""
    );
    systemPromptField.classList.add("provider-system-prompt");
    elements.providerFields.append(
      createField("label", "显示名称", "text", provider.label || "", false),
      createField("baseURL", "Base URL", "url", provider.baseURL || "", false),
      ...(provider.id === "ollama-local"
        ? []
        : [
            createField(
              "apiKey",
              "API Key",
              "password",
              provider.apiKey || "",
              false
            )
          ]),
      createModelField(provider),
      systemPromptField
    );
    if (provider.id === "ollama-local") {
      const note = document.createElement("div");
      note.className = "provider-note";
      note.textContent =
        "请先在本机运行 Ollama。扩展会自动读取本地已安装模型，无需填写 API Key。";
      elements.providerFields.append(note);
    }
    if (
      elements.providerFields.querySelector('[data-provider-field="baseURL"]')
        ?.value
    ) {
      scheduleModelDetection(350);
    }
    return;
  }

  const note = document.createElement("div");
  note.className = "provider-note";
  note.textContent =
    provider.type === "doubao-web"
      ? "该服务使用同一浏览器中的豆包登录状态，无需填写 API Key。若请求受限，请在豆包网页登录后再试。"
      : "该服务使用内置公共翻译接口，无需额外配置。若经常达到频率限制，可切换到 API 类服务。";
  elements.providerFields.append(note);
}

function createField(name, labelText, type, value, wide = true) {
  const label = document.createElement("label");
  if (wide) label.className = "wide-field";
  const caption = document.createElement("span");
  caption.textContent = labelText;
  const input = document.createElement("input");
  input.type = type;
  input.value = value;
  input.dataset.providerField = name;
  input.spellcheck = false;
  label.append(caption, input);
  return label;
}

function createTextareaField(name, labelText, value) {
  const label = document.createElement("label");
  label.className = "wide-field";
  const caption = document.createElement("span");
  caption.textContent = labelText;
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.dataset.providerField = name;
  textarea.spellcheck = false;
  label.append(caption, textarea);
  return label;
}

function createModelField(provider) {
  const label = document.createElement("label");
  label.className = "wide-field model-field";
  const caption = document.createElement("span");
  caption.textContent = "模型";
  const control = document.createElement("div");
  control.className = "model-picker-control";
  const select = document.createElement("select");
  select.dataset.providerField = "model";
  select.setAttribute("aria-label", "翻译模型");
  populateModelOptions(select, provider.customModels, provider.model);
  const actions = document.createElement("div");
  actions.className = "model-picker-actions";
  const refresh = document.createElement("button");
  refresh.type = "button";
  refresh.className = "refresh-models";
  refresh.title = "重新检测可用模型";
  refresh.setAttribute("aria-label", "重新检测可用模型");
  refresh.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6v5h-5M4 18v-5h5"/><path d="M6.1 9a7 7 0 0 1 11.5-2.4L20 9M4 15l2.4 2.4A7 7 0 0 0 17.9 15"/></svg>';
  refresh.addEventListener("click", () => {
    detectModelsForProvider(true).catch((error) => {
      const status = document.querySelector("#modelDetectionStatus");
      if (status) {
        status.textContent = error.message;
        status.dataset.tone = "error";
      }
    });
  });
  actions.append(refresh);
  control.append(select, actions);
  const status = document.createElement("small");
  status.id = "modelDetectionStatus";
  status.className = "model-detection-status";
  status.textContent = "填写 Base URL 和 API Key 后自动检测可用模型";
  label.append(caption, control, status);
  return label;
}

function populateModelOptions(select, customModels, currentModel) {
  const models = [
    ...new Set(
      [...(Array.isArray(customModels) ? customModels : []), currentModel].filter(
        (model) => typeof model === "string" && model.trim()
      )
    )
  ];
  select.replaceChildren(
    ...(models.length
      ? models.map((model) => new Option(model, model))
      : [new Option("自动检测后选择模型", "")])
  );
  if (models.includes(currentModel)) select.value = currentModel;
}

function scheduleModelDetection(delay = 700) {
  clearTimeout(modelDetectionTimer);
  modelDetectionTimer = setTimeout(() => {
    detectModelsForProvider().catch((error) => {
      const status = document.querySelector("#modelDetectionStatus");
      if (status) {
        status.textContent = error.message;
        status.dataset.tone = "error";
      }
    });
  }, delay);
}

function parseModelList(payload, provider) {
  const items = Array.isArray(payload)
    ? payload
    : payload?.data ?? payload?.models ?? payload?.result ?? [];
  const models = [
    ...new Set(
      (Array.isArray(items) ? items : [])
        .map((item) =>
          typeof item === "string" ? item : item?.id ?? item?.name ?? item?.model
        )
        .filter((model) => typeof model === "string" && model.trim())
    )
  ];
  return provider?.id === "ollama-local"
    ? models.filter(
        (model) =>
          !/(?:^|[/:_-])(?:embed|embedding|rerank)(?:$|[/:_-])/iu.test(model)
      )
    : models;
}

async function detectModelsForProvider(force = false) {
  const provider = currentProvider();
  const status = document.querySelector("#modelDetectionStatus");
  const refresh = document.querySelector(".refresh-models");
  if (!provider || !["openai-compatible", "deepseek", "zhipu-glm", "anthropic-compatible"].includes(provider.type)) {
    return;
  }
  const baseURL =
    elements.providerFields.querySelector('[data-provider-field="baseURL"]')
      ?.value.trim() || "";
  const apiKey =
    elements.providerFields.querySelector('[data-provider-field="apiKey"]')
      ?.value.trim() || "";
  if (!baseURL) {
    if (status) status.textContent = "填写 Base URL 后可自动检测模型";
    return;
  }
  if (provider.type === "deepseek" && !apiKey && !force) {
    if (status) status.textContent = "填写 API Key 后自动检测模型";
    return;
  }

  const requestVersion = ++modelRequestVersion;
  if (status) {
    status.textContent = "正在检测可用模型...";
    delete status.dataset.tone;
  }
  refresh?.setAttribute("aria-busy", "true");
  try {
    const payload = await sendBackground({
      type: "DETECT_MODELS",
      provider: {
        id: provider.id,
        type: provider.type,
        baseURL,
        apiKey
      }
    });
    const models = parseModelList(payload, provider);
    if (!models.length) throw new Error("接口未返回可用模型");
    if (requestVersion !== modelRequestVersion) return;

    provider.customModels = models;
    const select = elements.providerFields.querySelector(
      '[data-provider-field="model"]'
    );
    if (select) {
      const current = select.value || provider.model;
      populateModelOptions(select, models, current);
      if (!select.value) select.value = models[0];
      provider.model = select.value;
    }
    if (status) {
      status.textContent = `已自动检测 ${models.length} 个可用模型`;
      status.dataset.tone = "success";
    }
  } catch (error) {
    if (requestVersion !== modelRequestVersion) return;
    if (status) {
      status.textContent =
        error.name === "AbortError" ? "模型检测超时，请重试" : error.message;
      status.dataset.tone = "error";
    }
    throw error;
  } finally {
    if (requestVersion === modelRequestVersion) {
      refresh?.removeAttribute("aria-busy");
    }
  }
}

async function setProviderVisibility(providerId, visible) {
  cancelAutoSave();
  const next = collectSettings();
  const target = next.providers.find((provider) => provider.id === providerId);
  if (!target) return;
  const enabled = next.providers.filter(
    (provider) => isAllowedProvider(provider) && provider.enabled !== false
  );
  if (!visible && enabled.length <= 1) {
    throw new Error("至少保留一个可在插件首页显示的翻译服务。");
  }
  target.enabled = visible;
  if (!visible && next.activeProviderId === providerId) {
    next.activeProviderId =
      enabled.find((provider) => provider.id !== providerId)?.id ||
      next.providers.find((provider) => provider.id !== providerId)?.id;
  }
  settings = await saveSettings(next);
  render(settings);
}

async function deleteProvider(providerId) {
  cancelAutoSave();
  const next = collectSettings();
  const providers = next.providers.filter(isAllowedProvider);
  if (providers.length <= 1) {
    throw new Error("至少保留一个翻译服务，无法继续删除。");
  }
  const target = providers.find((provider) => provider.id === providerId);
  if (!target) return;
  if (!window.confirm(`删除“${target.label}”及其服务配置？`)) return;
  next.providers = next.providers.filter(
    (provider) => provider.id !== providerId
  );
  next.hiddenProviderIds = [
    ...new Set([...(next.hiddenProviderIds || []), providerId])
  ];
  if (next.activeProviderId === providerId) {
    next.activeProviderId =
      next.providers.find(
        (provider) =>
          isAllowedProvider(provider) && provider.enabled !== false
      )?.id || next.providers.find(isAllowedProvider)?.id;
  }
  settings = await saveSettings(next);
  render(settings);
  setStatus(elements.settingsStatus, "服务配置已删除。", "success");
}

async function addCustomProvider() {
  cancelAutoSave();
  const next = collectSettings();
  const count =
    next.providers.filter(
      (provider) =>
        provider.type === "openai-compatible" &&
        provider.id.startsWith("custom-model-")
    ).length + 1;
  const id = `custom-model-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  next.providers.push({
    type: "openai-compatible",
    id,
    label: `自定义 AI ${count}`,
    enabled: true,
    performanceMode: "custom",
    chunkSize: 3200,
    concurrency: 3,
    baseURL: "",
    apiKey: "",
    model: "",
    customModels: [],
    systemPrompt:
      "You are a professional translation engine. Translate each input item into {{targetLang}} using a standard, formal, serious, careful, and faithful style. Preserve the original meaning, facts, tone, numbers, links, code-like tokens, placeholders such as ⟪QIANXI0⟫, and formatting. Do not add, omit, summarize, factually rewrite, exaggerate, or make the wording casual, playful, or conversational. Return only a JSON array of strings in the original order, without explanations or Markdown code fences."
  });
  next.hiddenProviderIds = (next.hiddenProviderIds || []).filter(
    (hiddenId) => hiddenId !== id
  );
  next.activeProviderId = id;
  settings = await saveSettings(next);
  providerMenuOpen = true;
  render(settings);
  elements.providerFields
    .querySelector('[data-provider-field="baseURL"]')
    ?.focus();
  setStatus(elements.settingsStatus, "已添加 AI 服务，请填写 Base URL。", "success");
}

function handleProviderActionError(error) {
  setStatus(elements.settingsStatus, error.message, "error");
  renderProviderManager();
}

function providerTypeLabel(type, id) {
  if (id === "ollama-local") return "本地模型";
  return (
    {
      "microsoft-web-translate": "公共接口",
      "google-web-translate": "公共接口",
      "tencent-transmart": "公共接口",
      "yandex-web-translate": "公共接口",
      "volcengine-web-translate": "公共接口",
      mymemory: "公共接口",
      "doubao-web": "浏览器登录",
      "openai-compatible": "OpenAI 兼容 API",
      deepseek: "DeepSeek API",
      "zhipu-glm": "智谱 API",
      "anthropic-compatible": "Anthropic API"
    }[type] || "翻译服务"
  );
}

function updateDisplayModeHint() {
  elements.displayModeHint.textContent =
    displayModes.find(([value]) => value === elements.displayMode.value)?.[2] || "";
}

function bindEvents() {
  elements.provider.addEventListener("change", () => {
    renderProviderManager();
    renderProviderFields();
    renderPerformanceSettings();
    scheduleAutoSave();
  });
  elements.providerTrigger.addEventListener("click", () => {
    providerMenuOpen = !providerMenuOpen;
    renderProviderManager();
  });
  elements.addProvider.addEventListener("click", () => {
    addCustomProvider().catch(handleProviderActionError);
  });
  elements.providerFields.addEventListener("input", (event) => {
    const field = event.target.closest?.("[data-provider-field]");
    if (field && ["baseURL", "apiKey"].includes(field.dataset.providerField)) {
      scheduleModelDetection();
    }
    scheduleAutoSave();
  });
  elements.providerFields.addEventListener("change", scheduleAutoSave);
  elements.sourceLang.addEventListener("change", scheduleAutoSave);
  elements.targetLang.addEventListener("change", scheduleAutoSave);
  elements.displayMode.addEventListener("change", updateDisplayModeHint);
  elements.displayMode.addEventListener("change", scheduleAutoSave);
  elements.selectionEnabled.addEventListener("change", scheduleAutoSave);
  elements.cacheEnabled.addEventListener("change", scheduleAutoSave);
  elements.codeCommentsEnabled.addEventListener("change", scheduleAutoSave);
  elements.framesEnabled.addEventListener("change", scheduleAutoSave);
  elements.chunkSize.addEventListener("input", scheduleAutoSave);
  elements.concurrency.addEventListener("input", scheduleAutoSave);
  elements.serviceChunkSize.addEventListener("input", scheduleAutoSave);
  elements.serviceConcurrency.addEventListener("input", scheduleAutoSave);
  elements.chunkSize.addEventListener("change", renderPerformanceSettings);
  elements.concurrency.addEventListener("change", renderPerformanceSettings);
  elements.inheritPerformance.addEventListener("change", () => {
    elements.servicePerformanceFields.hidden =
      elements.inheritPerformance.checked;
    scheduleAutoSave();
  });
  elements.reset.addEventListener("click", resetAllSettings);
  elements.installOcr.addEventListener("click", installOcr);
  elements.removeOcr.addEventListener("click", removeOcr);
  elements.testProvider.addEventListener("click", testProvider);
  elements.imageEnabled.addEventListener("change", () => {
    if (elements.imageEnabled.checked) refreshOcrStatus();
    scheduleAutoSave();
  });

  setupNavigationSpy();
}

function setupNavigationSpy() {
  const links = [...document.querySelectorAll(".settings-nav a")];
  const entries = links
    .map((link) => ({
      link,
      section: document.querySelector(link.getAttribute("href"))
    }))
    .filter((entry) => entry.section);
  if (!entries.length) return;

  const activate = (activeLink) => {
    for (const link of links) {
      if (link === activeLink) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }
  };

  const update = () => {
    navScrollFrame = undefined;
    const marker = Math.min(window.innerHeight * 0.3, 220);
    let active = entries[0].link;
    for (const entry of entries) {
      if (entry.section.getBoundingClientRect().top <= marker) {
        active = entry.link;
      } else {
        break;
      }
    }
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2
    ) {
      active = entries.at(-1).link;
    }
    activate(active);
  };

  const schedule = () => {
    if (navScrollFrame !== undefined) return;
    navScrollFrame = window.requestAnimationFrame(update);
  };

  for (const { link } of entries) {
    link.addEventListener("click", () => {
      activate(link);
      window.setTimeout(schedule, 0);
    });
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("hashchange", schedule);
  update();
}

function collectSettings() {
  const provider = currentProvider();
  const next = structuredClone(settings);
  next.sourceLang = elements.sourceLang.value;
  next.targetLang = elements.targetLang.value;
  next.activeProviderId = elements.provider.value;
  next.translationDisplayMode = elements.displayMode.value;
  next.selectionTranslation = {
    ...(next.selectionTranslation || {}),
    enabled: elements.selectionEnabled.checked
  };
  next.imageTranslationEnabled = elements.imageEnabled.checked;
  next.cacheEnabled = elements.cacheEnabled.checked;
  next.translateCodeComments = elements.codeCommentsEnabled.checked;
  next.chunkSize = Math.min(
    4000,
    Math.max(200, Number(elements.chunkSize.value) || 1200)
  );
  next.concurrency = Math.min(
    8,
    Math.max(1, Number(elements.concurrency.value) || 3)
  );
  next.frameTranslation = {
    ...(next.frameTranslation || {}),
    enabled: elements.framesEnabled.checked
  };

  if (provider) {
    const update = {};
    for (const field of elements.providerFields.querySelectorAll(
      "[data-provider-field]"
    )) {
      update[field.dataset.providerField] = field.value.trim();
    }
    const inheritsPerformance = elements.inheritPerformance.checked;
    update.performanceMode = inheritsPerformance ? "inherit" : "custom";
    update.chunkSize = inheritsPerformance
      ? undefined
      : Math.min(
          4000,
          Math.max(200, Number(elements.serviceChunkSize.value) || next.chunkSize)
        );
    update.concurrency = inheritsPerformance
      ? undefined
      : Math.min(
          next.concurrency,
          Math.max(1, Number(elements.serviceConcurrency.value) || next.concurrency)
        );
    next.providers = next.providers.map((item) =>
      item.id === provider.id ? { ...item, ...update } : item
    );
  }
  return next;
}

function scheduleAutoSave(delay = 450) {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    flushAutoSave().catch(() => {});
  }, delay);
}

function cancelAutoSave() {
  clearTimeout(autoSaveTimer);
  autoSavePending = false;
}

async function flushAutoSave() {
  clearTimeout(autoSaveTimer);
  autoSavePending = true;
  if (autoSaveBusy) return;
  autoSaveBusy = true;
  try {
    while (autoSavePending) {
      autoSavePending = false;
      try {
        const saved = await saveSettings(collectSettings());
        settings = saved;
        renderProviderManager();
        const provider = currentProvider();
        if (provider) {
          elements.providerSummary.textContent = `${provider.label} · ${providerTypeLabel(provider.type, provider.id)}`;
        }
        setStatus(elements.settingsStatus, "已自动保存", "success");
      } catch (error) {
        setStatus(elements.settingsStatus, error.message, "error");
      }
    }
  } finally {
    autoSaveBusy = false;
  }
}

async function testProvider() {
  cancelAutoSave();
  setBusy(elements.testProvider, true);
  elements.providerTestStatus.textContent = "测试中...";
  delete elements.providerTestStatus.dataset.tone;
  let timeoutId;
  try {
    await saveSettings(collectSettings());
    const result = await Promise.race([
      sendBackground({
        type: "TEST_PROVIDER",
        providerId: elements.provider.value
      }),
      new Promise((_, reject) => {
        timeoutId = window.setTimeout(
          () => reject(new Error("服务连接测试超时，请检查本地模型或网络。")),
          35_000
        );
      })
    ]);
    elements.providerTestStatus.textContent = "连接成功";
    elements.providerTestStatus.dataset.tone = "success";
    delete elements.providerTestStatus.title;
    setStatus(elements.settingsStatus, "服务连接测试通过。", "success");
  } catch (error) {
    elements.providerTestStatus.textContent = error.message.includes("超时")
      ? "连接超时"
      : "连接失败";
    elements.providerTestStatus.dataset.tone = "error";
    elements.providerTestStatus.title = error.message;
    setStatus(elements.settingsStatus, error.message, "error");
  } finally {
    window.clearTimeout(timeoutId);
    setBusy(elements.testProvider, false);
  }
}

async function refreshOcrStatus() {
  clearTimeout(ocrPoll);
  try {
    const status = await sendBackground({ type: "GET_OCR_STATUS" });
    if (status.state === "installed") {
      elements.ocrStatus.textContent =
        "PaddleOCR PP-OCRv5 Mobile 已安装，图片翻译可以离线识别文字。";
      elements.installOcr.hidden = true;
      elements.removeOcr.hidden = false;
      elements.ocrProgress.hidden = true;
      return;
    }
    if (status.state === "installing") {
      const total = Number(status.total || 1);
      const downloaded = Number(status.downloaded || 0);
      const percent = Math.min(99, Math.round((downloaded / total) * 100));
      elements.ocrStatus.textContent = `正在准备 PaddleOCR PP-OCRv5 Mobile ${percent}%`;
      elements.ocrProgress.hidden = false;
      elements.ocrProgress.value = percent;
      elements.installOcr.hidden = false;
      elements.installOcr.disabled = true;
      elements.removeOcr.hidden = true;
      ocrPoll = setTimeout(refreshOcrStatus, 800);
      return;
    }
    if (status.state === "error") {
      elements.ocrStatus.textContent =
        status.error || "PaddleOCR PP-OCRv5 Mobile 安装失败，请重试。";
      setStatus(elements.settingsStatus, elements.ocrStatus.textContent, "error");
    } else {
      elements.ocrStatus.textContent =
        "首次使用图片翻译需安装 PaddleOCR PP-OCRv5 Mobile 模型。";
    }
    elements.installOcr.hidden = false;
    elements.installOcr.disabled = false;
    elements.removeOcr.hidden = true;
    elements.ocrProgress.hidden = true;
  } catch (error) {
    elements.ocrStatus.textContent = error.message;
  }
}

async function installOcr() {
  elements.installOcr.disabled = true;
  elements.ocrStatus.textContent =
    "正在初始化 PaddleOCR PP-OCRv5 Mobile 安装...";
  try {
    await sendBackground({ type: "INSTALL_OCR" });
    await refreshOcrStatus();
  } catch (error) {
    elements.ocrStatus.textContent = error.message;
    elements.installOcr.disabled = false;
  }
}

async function removeOcr() {
  if (
    !window.confirm(
      "删除 PaddleOCR PP-OCRv5 Mobile 模型后，图片翻译将暂停使用。继续吗？"
    )
  ) {
    return;
  }
  setBusy(elements.removeOcr, true);
  try {
    await sendBackground({ type: "REMOVE_OCR" });
    settings = await getSettings();
    elements.imageEnabled.checked = false;
    await refreshOcrStatus();
    setStatus(
      elements.settingsStatus,
      "PaddleOCR PP-OCRv5 Mobile 已删除。",
      "success"
    );
  } catch (error) {
    setStatus(elements.settingsStatus, error.message, "error");
  } finally {
    setBusy(elements.removeOcr, false);
  }
}

async function resetAllSettings() {
  if (
    !window.confirm(
      "恢复默认设置会清除翻译服务的 API Key、语言和功能开关。继续吗？"
    )
  ) {
    return;
  }
  cancelAutoSave();
  try {
    await chrome.storage.local.remove("qianxi.settings");
    settings = await getSettings();
    render(settings);
    setStatus(elements.settingsStatus, "已恢复默认设置。", "success");
  } catch (error) {
    setStatus(elements.settingsStatus, error.message, "error");
  }
}

function setBusy(button, value) {
  button.disabled = value;
  button.setAttribute("aria-busy", String(value));
}
