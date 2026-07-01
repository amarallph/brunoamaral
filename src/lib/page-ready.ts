export async function waitForPageReady(selector = ".ec-shell-content img") {
  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  } catch {}

  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>(selector));
  await Promise.all(
    imgs.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      if (typeof img.decode === "function") return img.decode().catch(() => undefined);
      return new Promise<void>((res) => {
        img.addEventListener("load", () => res(), { once: true });
        img.addEventListener("error", () => res(), { once: true });
      });
    }),
  );

  await new Promise<void>((res) => requestAnimationFrame(() => requestAnimationFrame(() => res())));
}
