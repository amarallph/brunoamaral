import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { portfolioProjects } from "@/lib/portfolio-data";
import { RouteErrorOverlay } from "@/components/RouteFallbackOverlay";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Lab — Bruno Amaral" },
      { name: "description", content: "Experimental ideas and unused client's work." },
      { property: "og:title", content: "Lab — Bruno Amaral" },
      { property: "og:description", content: "Experimental ideas and unused client's work." },
    ],
  }),
  component: LabPage,
  errorComponent: RouteErrorOverlay,
});

// Deterministic size + vertical stagger variants to mirror the reference's
// asymmetric scatter (image widths ~156–200px, small per-item Y offsets).
const SIZE_VARIANTS = [170, 156, 156, 186, 190, 166, 156, 200, 158, 190];
const OFFSET_VARIANTS = [0, 14, 6, 20, 2, 24, 8, 0, 18, 10];

function LabPage() {
  const items = portfolioProjects;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, prev, next]);

  const current = openIndex !== null ? items[openIndex] : null;

  return (
    <div className="ec-lab2">
      <SiteHeader />
      <header className="ec-lab2-hero">
        <h1 className="ec-lab2-title">LAB</h1>
        <p className="ec-lab2-subtitle">Experimental ideas and unused client's work</p>
      </header>

      <section className="ec-lab2-grid">
        {items.map((it, i) => {
          const size = SIZE_VARIANTS[i % SIZE_VARIANTS.length];
          const offset = OFFSET_VARIANTS[i % OFFSET_VARIANTS.length];
          return (
            <button
              key={it.id}
              type="button"
              className="ec-lab2-cell"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open ${it.title.trim()}`}
              style={
                {
                  "--cell-size": `${size}px`,
                  "--cell-offset": `${offset}px`,
                } as React.CSSProperties
              }
            >
              <span className="ec-lab2-num">{String(i + 1).padStart(3, "0")}</span>
              <figure>
                <img src={it.cover} alt={it.alt} loading="lazy" />
              </figure>
            </button>
          );
        })}
      </section>

      <SiteFooter />

      {current ? (
        <div className="ec-lab2-lightbox" role="dialog" aria-modal="true">
          <div className="ec-lab2-lightbox-stage">
            <img src={current.cover} alt={current.alt} />
          </div>
          <button type="button" className="ec-lab2-lb-prev" onClick={prev} aria-label="Previous image">
            ← Prev image
          </button>
          <button type="button" className="ec-lab2-lb-close" onClick={close} aria-label="Close">
            Close
          </button>
          <button type="button" className="ec-lab2-lb-next" onClick={next} aria-label="Next image">
            Next image →
          </button>
        </div>
      ) : null}
    </div>
  );
}
