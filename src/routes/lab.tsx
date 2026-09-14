import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { RouteErrorOverlay } from "@/components/RouteFallbackOverlay";
import offShoreAsset from "@/assets/lab/post_off_shore_01.jpg.asset.json";
import arvoraAsset from "@/assets/lab/Post_Arvora_02.png.asset.json";
import deadMoodboardAsset from "@/assets/lab/moodboard_design_Tshirt_Dead_03.png.asset.json";
import offShorePresentsAsset from "@/assets/lab/T_shirt_Offshore_presents_04.jpg.asset.json";
import lightsAsset from "@/assets/lab/POST_LIGTHS_05.jpg.asset.json";
import organicMetalChairAsset from "@/assets/lab/Design_organic_metaic_cadeira_06.png.asset.json";
import offShoreSeasonAsset from "@/assets/lab/Story_OFF_SHORE_Season_07.jpg.asset.json";
import aquaRomaAsset from "@/assets/lab/Logo_Aqua_roma_08.png.asset.json";
import industrialBenchAsset from "@/assets/lab/Bancada_inox_deisgn_industrial_09.png.asset.json";
import kamarilliaAsset from "@/assets/lab/Logo_banda_Kamarillia_10.png.asset.json";
import growthTrailAsset from "@/assets/lab/Post_Growth_Trail_11.png.asset.json";
import arthezaryAsset from "@/assets/lab/Logo_Arthezary_12.webp.asset.json";
import yapexAsset from "@/assets/lab/Logo_Yapex_13.webp.asset.json";
import br2tAsset from "@/assets/lab/Logo_BR2T_14.png.asset.json";
import paulaMonteiroAsset from "@/assets/lab/Logo_Paula_Monteiro_15.png.asset.json";
import offShorePresentsStoryAsset from "@/assets/lab/story_Off_shore_Presents_16.jpg.asset.json";
import arthezaryBagAsset from "@/assets/lab/Aplicacao_bolsa_Arthezary_16.png.asset.json";

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
  { id: "001", slug: "off-shore", title: "Off Shore", cover: offShoreAsset.url, alt: "Off Shore — coleção experimental em concreto" },
  { id: "002", slug: "arvora", title: "Arvorá", cover: arvoraAsset.url, alt: "Arvorá — direção visual de arquitetura e natureza" },
  { id: "003", slug: "dead-moodboard", title: "Dead Moodboard", cover: deadMoodboardAsset.url, alt: "Moodboard experimental com ilustrações e estudos de camiseta" },
  { id: "004", slug: "off-shore-presents", title: "Off Shore Presents", cover: offShorePresentsAsset.url, alt: "Camiseta Off Shore Presents" },
  { id: "005", slug: "lights", title: "Lights", cover: lightsAsset.url, alt: "Lights — estudo gráfico experimental" },
  { id: "006", slug: "organic-metal-chair", title: "Organic Metal Chair", cover: organicMetalChairAsset.url, alt: "Cadeira metálica de design orgânico" },
  { id: "007", slug: "off-shore-season", title: "Off Shore Season 01", cover: offShoreSeasonAsset.url, alt: "Off Shore Season 01 — campanha experimental" },
  { id: "008", slug: "aqua-roma", title: "Aqua Roma", cover: aquaRomaAsset.url, alt: "Logo Aqua Roma" },
  { id: "009", slug: "industrial-bench", title: "Industrial Stainless Bench", cover: industrialBenchAsset.url, alt: "Bancada de inox com design industrial" },
  { id: "010", slug: "kamarillia", title: "Kamarillia", cover: kamarilliaAsset.url, alt: "Kamarillia — direção visual de banda" },
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
          const size = SIZE_VARIANTS[i % SIZE_VARIANTS.length];
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
