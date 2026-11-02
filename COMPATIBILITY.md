# Chromium 兼容性

Qianxi-Translate 使用通用 Manifest V3 能力，面向持续更新的 Chromium 内核浏览器。

## 已验证

- Microsoft Edge 156（Chromium 156）
- 未声明 `chrome.offscreen` 权限时，OCR 后台运行、模型安装和图片识别仍可正常工作
- 整页翻译、划词翻译、图片翻译通过实际运行验证

## 预期支持

- Google Chrome
- Microsoft Edge
- Brave
- Opera
- Vivaldi
- 其他基于现代 Chromium、支持 Manifest V3 与扩展 Service Worker 的浏览器

## 兼容设计

- 同时兼容 `chrome` 与 `browser` 扩展命名空间。
- 不绑定 `minimum_chrome_version`。
- 不依赖 `chrome.offscreen`，OCR 使用最小化扩展后台窗口。
- Ollama 本地模型使用 `declarativeNetRequestWithHostAccess` 处理本地接口的 Origin 限制，其他翻译服务不依赖该能力。
- 公共翻译服务仅使用标准扩展权限、`fetch`、`storage`、内容脚本和标签页消息。

Firefox 和 Safari 使用不同的扩展运行模型，不在当前兼容范围内。
