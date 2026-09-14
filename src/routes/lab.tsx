import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { RouteErrorOverlay } from "@/components/RouteFallbackOverlay";



export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Lab — Bruno Amaral" },
      { name: "description", content: "Experimental ideas and unused client's work." },
      { property: "og:title", content: "Lab — Bruno Amaral" },
      { property: "og:description", content: "Experimental ideas and unused client's work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LabPage,
  errorComponent: RouteErrorOverlay,
});

// Deterministic size + vertical stagger variants to mirror the reference's
// asymmetric scatter (image widths ~156–200px, small per-item Y offsets).
const SIZE_VARIANTS = [170, 156, 156, 186, 190, 166, 156, 200, 158, 190];
const OFFSET_VARIANTS = [0, 14, 6, 20, 2, 24, 8, 0, 18, 10];

const labItems = [
  { id: "001", slug: "off-shore", title: "Off Shore", cover: "/images/lab/off-shore-01.jpg", alt: "Off Shore — coleção experimental em concreto" },
  { id: "002", slug: "arvora", title: "Arvorá", cover: "/images/lab/arvora-02.png", alt: "Arvorá — direção visual de arquitetura e natureza" },
  { id: "003", slug: "dead-moodboard", title: "Dead Moodboard", cover: "/images/lab/dead-moodboard-03.png", alt: "Moodboard experimental com ilustrações e estudos de camiseta" },
  { id: "004", slug: "off-shore-presents", title: "Off Shore Presents", cover: "/images/lab/off-shore-presents-04.jpg", alt: "Camiseta Off Shore Presents" },
  { id: "005", slug: "lights", title: "Lights", cover: "/images/lab/lights-05.jpg", alt: "Lights — estudo gráfico experimental" },
  { id: "006", slug: "organic-metal-chair", title: "Organic Metal Chair", cover: "/images/lab/organic-metal-chair-06.png", alt: "Cadeira metálica de design orgânico" },
  { id: "007", slug: "off-shore-hoodie", title: "Off Shore Hoodie", cover: "/images/lab/off-shore-hoodie-07.jpg", alt: "Moletom Off Shore — mockup de produto" },
  { id: "008", slug: "off-shore-look", title: "Off Shore Look", cover: "/images/lab/off-shore-look-08.png", alt: "Off Shore — editorial de lookbook em concreto" },
  { id: "009", slug: "dytm-sweater", title: "Don't You Trust Me? Sweater", cover: "/images/lab/dytm-sweater-09.jpg", alt: "Moletom Don't You Trust Me? — mockup de produto" },
  { id: "010", slug: "dytm-look", title: "Don't You Trust Me? Look", cover: "/images/lab/dytm-look-10.png", alt: "Don't You Trust Me? — editorial de lookbook" },
  { id: "011", slug: "off-shore-season", title: "Off Shore Season 01", cover: "/images/lab/off-shore-season-07.jpg", alt: "Off Shore Season 01 — campanha experimental" },
  { id: "012", slug: "aqua-roma", title: "Aqua Roma", cover: "/images/lab/aqua-roma-08.png", alt: "Logo Aqua Roma" },
  { id: "013", slug: "industrial-bench", title: "Industrial Stainless Bench", cover: "/images/lab/industrial-bench-09.png", alt: "Bancada de inox com design industrial" },
  { id: "014", slug: "kamarillia", title: "Kamarillia", cover: "/images/lab/kamarillia-10.png", alt: "Kamarillia — direção visual de banda" },
  { id: "015", slug: "growth-trail", title: "Growth Trail", cover: "/images/lab/growth-trail-11.png", alt: "Growth Trail — estudo gráfico experimental" },
  { id: "016", slug: "arthezary", title: "Arthezary", cover: "/images/lab/arthezary-12.webp", alt: "Arthezary — identidade visual" },
  { id: "017", slug: "yapex", title: "Yapex", cover: "/images/lab/yapex-13.webp", alt: "Yapex — identidade visual" },
  { id: "018", slug: "br2t", title: "BR2T", cover: "/images/lab/br2t-14.png", alt: "BR2T — identidade visual" },
  { id: "019", slug: "paula-monteiro", title: "Paula Monteiro", cover: "/images/lab/paula-monteiro-15.png", alt: "Paula Monteiro — identidade visual" },
  { id: "020", slug: "off-shore-presents-story", title: "Off Shore Presents Story", cover: "/images/lab/off-shore-presents-story-16.jpg", alt: "Off Shore Presents — story experimental" },
  { id: "021", slug: "arthezary-bag", title: "Arthezary Bag", cover: "/images/lab/arthezary-bag-17.png", alt: "Aplicação de bolsa Arthezary" },
];

function LabPage() {
  const items = labItems;
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
        <p className="ec-lab2-subtitle"><strong>Experimental ideas and unused client's work</strong></p>
      </header>

      <section className="ec-lab2-grid">
        {items.map((it, i) => {
          const size = SIZE_VARIANTS[0];
          const offset = OFFSET_VARIANTS[i % OFFSET_VARIANTS.length];
          return (
            <button
              key={it.id}
              type="button"
              className="ec-lab2-cell"
              data-slug={it.slug}
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
                <img className="ec-lab2-thumb" src={it.cover} alt={it.alt} loading="lazy" />
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
