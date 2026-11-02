(() => {
  if (typeof globalThis.chrome === "undefined" && globalThis.browser) {
    globalThis.chrome = globalThis.browser;
  }
})();
