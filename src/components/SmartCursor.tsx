import { useEffect, useRef, useState } from "react";

const LABELS: Record<string, string> = {
  view: "VIEW",
  open: "OPEN",
  next: "NEXT",
  back: "BACK",
  close: "CLOSE",
  scroll: "SCROLL",
};

export function SmartCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (touch) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
      }

      const target = e.target as HTMLElement | null;
      const withData = target?.closest<HTMLElement>("[data-cursor]");
      const key = withData?.dataset.cursor;
      setLabel(key && LABELS[key] ? LABELS[key] : null);
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} className="ec-cursor" aria-hidden="true" data-active={label ? "true" : "false"}>
      <span className="ec-cursor-dot" />
      {label ? <span className="ec-cursor-label">{label}</span> : null}
    </div>
  );
}
