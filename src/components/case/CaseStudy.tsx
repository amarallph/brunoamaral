import { Link } from "@tanstack/react-router";

import type { PortfolioProject } from "@/lib/portfolio-data";
import { getAdjacentProjects } from "@/lib/portfolio-data";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BackButton } from "./BackButton";

export function CaseStudy({ project }: { project: PortfolioProject }) {
  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <article className="ec-case">
      <div className="ec-case-topbar">
        <BackButton />
        <span className="ec-case-index">
          {project.category} — {project.year}
        </span>
      </div>

      {/* Hero */}
      <header className="ec-case-hero">
        <ScrollReveal as="header">
          <p className="ec-case-eyebrow">{project.category}</p>
          <h1 className="ec-case-title">{project.title.trim()}</h1>
          <p className="ec-case-summary">{project.summary}</p>
        </ScrollReveal>
      </header>

      {/* Info + Overview */}
      <section className="ec-case-info-grid">
        <ScrollReveal as="div" className="ec-case-info">
          <InfoRow label="Client" value={project.client} />
          <InfoRow label="Year" value={project.year} />
          <InfoRow label="Category" value={project.category} />
          <InfoRow label="Role" value={project.role} />
          <div className="ec-case-info-row">
            <span className="ec-case-info-label">Services</span>
            <ul className="ec-case-services">
              {project.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal as="div" className="ec-case-overview" delay={80}>
          <h2 className="ec-case-h2">Overview</h2>
          <p>{project.overview}</p>
          <p>{project.context}</p>
        </ScrollReveal>
      </section>

      {/* Full cover */}
      <ScrollReveal as="figure" className="ec-case-full">
        <img src={project.cover} alt={project.alt} />
      </ScrollReveal>

      {/* Problem & Objectives */}
      <section className="ec-case-two-col">
        <ScrollReveal>
          <h2 className="ec-case-h2">The problem</h2>
          <p>{project.problem}</p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="ec-case-h2">Objectives</h2>
          <ul className="ec-case-list">
            {project.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      {/* Editorial gallery */}
      <section className="ec-case-gallery">
        {project.gallery.map((block, i) => (
          <ScrollReveal key={i} className={`ec-block ec-block-${block.type}`}>
            <GalleryBlock block={block} />
          </ScrollReveal>
        ))}
      </section>

      {/* Solution */}
      <ScrollReveal as="section" className="ec-case-solution">
        <h2 className="ec-case-h2">Solution</h2>
        <p>{project.solution}</p>
      </ScrollReveal>

      {/* Process */}
      <section className="ec-case-process">
        <ScrollReveal>
          <h2 className="ec-case-h2">Process</h2>
        </ScrollReveal>
        <ol className="ec-case-process-list">
          {project.process.map((s, i) => (
            <ScrollReveal as="li" key={s.step} delay={i * 40}>
              <span className="ec-case-process-index">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{s.step}</h3>
                <p>{s.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </ol>
      </section>

      {/* Results & Insights */}
      <section className="ec-case-two-col">
        <ScrollReveal>
          <h2 className="ec-case-h2">Results</h2>
          <ul className="ec-case-list">
            {project.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="ec-case-h2">Insights</h2>
          <p>{project.insights}</p>
        </ScrollReveal>
      </section>

      {/* Conclusion */}
      <ScrollReveal as="section" className="ec-case-conclusion">
        <h2 className="ec-case-h2">Conclusion</h2>
        <p>{project.conclusion}</p>
        <a
          className="ec-case-external"
          href={project.behanceUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor="open"
        >
          Ver o projeto completo no Behance →
        </a>
      </ScrollReveal>

      {/* Prev / Next */}
      <nav className="ec-case-nav" aria-label="Outros projetos">
        {prev ? (
          <Link
            to="/work/$slug"
            params={{ slug: prev.slug }}
            className="ec-case-nav-link ec-case-nav-prev"
            data-cursor="back"
          >
            <span className="ec-case-nav-label">← Previous</span>
            <img src={prev.cover} alt="" />
            <span className="ec-case-nav-title">{prev.title.trim()}</span>
            <span className="ec-case-nav-cat">{prev.category}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="ec-case-nav-link ec-case-nav-next"
            data-cursor="next"
          >
            <span className="ec-case-nav-label">Next →</span>
            <img src={next.cover} alt="" />
            <span className="ec-case-nav-title">{next.title.trim()}</span>
            <span className="ec-case-nav-cat">{next.category}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="ec-case-info-row">
      <span className="ec-case-info-label">{label}</span>
      <span className="ec-case-info-value">{value}</span>
    </div>
  );
}

function GalleryBlock({ block }: { block: PortfolioProject["gallery"][number] }) {
  if (block.type === "text") return <p className="ec-block-text-body">{block.body}</p>;
  if (block.type === "quote")
    return (
      <blockquote>
        <p>“{block.body}”</p>
        {block.author ? <cite>— {block.author}</cite> : null}
      </blockquote>
    );
  if (block.type === "grid")
    return (
      <div className="ec-block-grid">
        {block.items.map((it, i) => (
          <figure key={i}>
            <img src={it.src} alt={it.caption ?? ""} />
            {it.caption ? <figcaption>{it.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    );
  return (
    <figure>
      <img src={block.src} alt={block.caption ?? ""} />
      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
    </figure>
  );
}
