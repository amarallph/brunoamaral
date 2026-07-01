export function hideInitialOverlay() {
  if (typeof document === "undefined") return;
  const overlay = document.getElementById("ec-initial-overlay");
  if (!overlay) return;
  overlay.style.opacity = "0";
  overlay.style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
}
