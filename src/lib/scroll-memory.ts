const KEY = "bruno_amaral_home_scroll";

export function saveHomeScroll() {
  try {
    sessionStorage.setItem(KEY, String(window.scrollY));
  } catch {}
}

export function restoreHomeScroll() {
  try {
    const v = sessionStorage.getItem(KEY);
    if (!v) return;
    const n = Number(v);
    if (Number.isFinite(n)) {
      requestAnimationFrame(() => window.scrollTo(0, n));
    }
  } catch {}
}
