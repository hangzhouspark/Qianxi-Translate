(() => {
  const hostId = "qianxi-selection-tools";
  const longTextLimit = 220;
  const minStackedPaneHeight = 72;
  const wideLayoutQuery = matchMedia("(min-width: 900px)");
  const watchedRoots = new WeakSet();
  const activeRoots = new Set();

  const updateLayout = (root) => {
    const card = root?.querySelector(".card");
    const source = root?.querySelector(".source-preview");
    if (!card || !source) return;

    const length = Array.from(source.textContent?.trim() ?? "").length;
    const isLong = length >= longTextLimit;
    const changed = card.classList.toggle("selection-long-text", isLong);
    const body = root.querySelector(".body");
    const panes = body ? [source, body] : [source];
    const isWide = wideLayoutQuery.matches && isLong;

    if (isWide) {
      card.classList.remove("selection-stacked-pane-height");
    } else if (!card.hidden) {
      card.classList.remove("selection-stacked-pane-height");
      const computed = getComputedStyle(source);
      const maxHeight = Number.parseFloat(computed.maxHeight);
      const requiredHeight = Math.max(
        ...panes.map((pane) => pane.scrollHeight + pane.offsetHeight - pane.clientHeight),
      );
      const paneHeight = Math.min(
        Number.isFinite(maxHeight) ? maxHeight : requiredHeight,
        Math.max(minStackedPaneHeight, requiredHeight),
      );
      card.style.setProperty("--selection-pane-height", `${paneHeight}px`);
      card.classList.add("selection-stacked-pane-height");
    }

    if (changed && isLong && isWide) {
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const left = Number.parseFloat(card.style.left) || rect.left;
        const top = Number.parseFloat(card.style.top) || rect.top;
        card.style.left = `${Math.max(12, Math.min(window.innerWidth - card.offsetWidth - 12, left))}px`;
        card.style.top = `${Math.max(12, Math.min(window.innerHeight - card.offsetHeight - 12, top))}px`;
      });
    }
  };

  const watch = (host) => {
    const root = host?.shadowRoot;
    if (!root) return;
    updateLayout(root);
    activeRoots.add(root);
    if (watchedRoots.has(root)) return;

    watchedRoots.add(root);
    new MutationObserver(() => updateLayout(root)).observe(root, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  };

  const scan = () => watch(document.getElementById(hostId));

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scan, { once: true });
  } else {
    scan();
  }

  new MutationObserver(scan).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  document.addEventListener("selectionchange", () => requestAnimationFrame(scan), true);
  const refreshHeights = () => {
    activeRoots.forEach(updateLayout);
  };
  wideLayoutQuery.addEventListener("change", refreshHeights);
  window.addEventListener("resize", refreshHeights, { passive: true });
})();
