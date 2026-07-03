import { useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { createFileRoute } from "@tanstack/react-router";

import { ScrollReveal } from "@/components/ScrollReveal";
import { BackButton } from "@/components/case/BackButton";
import { portfolioProjects } from "@/lib/portfolio-data";
import { RouteErrorOverlay } from "@/components/RouteFallbackOverlay";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Lab — Bruno Amaral" },
      { name: "description", content: "Experimentos visuais, estudos e explorações criativas." },
      { property: "og:title", content: "Lab — Bruno Amaral" },
      { property: "og:description", content: "Experimentos visuais, motion, 3D e explorações criativas." },
    ],
  }),
  component: LabPage,
  errorComponent: RouteErrorOverlay,
});

const filters = ["All", "Motion", "3D", "Concept", "Study"] as const;

function LabPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const experiments = portfolioProjects.map((p, i) => ({
    ...p,
    labType: filters[(i % (filters.length - 1)) + 1],
  }));
  const list = filter === "All" ? experiments : experiments.filter((e) => e.labType === filter);

  return (
    <div className="ec-page ec-page-lab">
      <div className="ec-case-topbar">
        <BackButton label="Back to Home" />
        <span className="ec-case-index">Lab</span>
      </div>

      <ScrollReveal as="header" className="ec-lab-hero">
        <p className="ec-case-eyebrow">Lab</p>
        <h1 className="ec-lab-title">Experimentos, protótipos e explorações visuais.</h1>
      </ScrollReveal>

      <nav className="ec-lab-filters" aria-label="Filtros do lab">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            data-active={filter === f}
          >
            {f}
          </button>
        ))}
      </nav>

      <section className="ec-lab-grid">
        {list.map((e, i) => (
          <ScrollReveal as="article" key={e.id} className="ec-lab-cell" delay={i * 30}>
            <figure data-cursor="view">
              <img src={e.cover} alt={e.alt} loading="lazy" />
            </figure>
            <p className="ec-lab-meta">
              <span>{e.title.trim()}</span>
              <span aria-hidden>&nbsp;/&nbsp;</span>
              <span className="ec-lab-cat">{e.labType}</span>
            </p>
          </ScrollReveal>
        ))}
      </section>
      <SiteFooter />
    </div>
  );
}
