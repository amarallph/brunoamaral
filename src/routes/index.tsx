import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { profile, portfolioProjects, type PortfolioProject } from "@/lib/portfolio-data";

type ViewMode = "list" | "grid" | "gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.role}` },
      {
        name: "description",
        content:
          "Portfólio de Bruno Amaral — identidade visual, branding e design digital. Visualize projetos em lista, grid ou galeria.",
      },
      { property: "og:title", content: `${profile.name} — ${profile.role}` },
      {
        property: "og:description",
        content: "Projetos selecionados de identidade visual, branding e design digital.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [mode, setMode] = useState<ViewMode>("list");
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  const openGallery = (index: number) => {
    setMode("gallery");
    setGalleryIndex(index);
  };

  return (
    <div className="ec-shell">
      <div className="ec-shell-content">
        <div data-reveal>
          <Header mode={mode} setMode={setMode} onAnyChange={() => setGalleryIndex(null)} />
        </div>

        <main className="ec-main" data-reveal>
          {mode === "list" && <ListView projects={portfolioProjects} onOpen={openGallery} />}
          {mode === "grid" && <GridView projects={portfolioProjects} onOpen={openGallery} />}
          {mode === "gallery" && (
            <GalleryView
              projects={portfolioProjects}
              index={galleryIndex ?? 0}
              setIndex={setGalleryIndex}
              onClose={() => setMode("list")}
            />
          )}
        </main>

        <div data-reveal>
          <Footer mode={mode} />
        </div>
      </div>
    </div>

  );
}

/* -------------------------------- Header -------------------------------- */

function Header({
  mode,
  setMode,
  onAnyChange,
}: {
  mode: ViewMode;
  setMode: (m: ViewMode) => void;
  onAnyChange: () => void;
}) {
  const select = (m: ViewMode) => {
    onAnyChange();
    setMode(m);
  };
  return (
    <header className="ec-header">
      <a href="/" className="ec-brand">
        {profile.name}
      </a>
      <nav className="ec-nav" aria-label="Modo de visualização">
        <button type="button" onClick={() => select("list")} data-active={mode === "list"}>
          List
        </button>
        <span aria-hidden="true">/</span>
        <button type="button" onClick={() => select("grid")} data-active={mode === "grid"}>
          Grid
        </button>
        <span aria-hidden="true">/</span>
        <button type="button" onClick={() => select("gallery")} data-active={mode === "gallery"}>
          Gallery
        </button>
      </nav>
      <div className="ec-header-right">
        <a href={profile.behanceUrl} target="_blank" rel="noreferrer">
          Studio
        </a>
        <span aria-hidden="true">&nbsp;&nbsp;</span>
        <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
          Lab
        </a>
      </div>
    </header>
  );
}

/* -------------------------------- Footer -------------------------------- */

function Footer({ mode }: { mode: ViewMode }) {
  return (
    <footer className="ec-footer">
      <span>Creative Studio</span>
      <span className="ec-footer-center">
        {mode === "grid" && "All  /  Web  /  Branding"}
      </span>
      <a href={`mailto:${profile.email}@gmail.com`}>Email Us</a>
    </footer>
  );
}

/* -------------------------------- List view ----------------------------- */

function ListView({
  projects,
  onOpen,
}: {
  projects: PortfolioProject[];
  onOpen: (index: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="ec-list-wrap" ref={containerRef}>
      <ul className="ec-list">
        {projects.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              onClick={() => onOpen(i)}
              className="ec-list-item"
              data-small={p.id === "inimigos-do-pace" ? "true" : undefined}
            >
              {p.title.trim()}
            </button>
          </li>
        ))}
      </ul>

      {hovered !== null && (
        <div
          className="ec-floating-thumb"
          style={{ left: pos.x, top: pos.y }}
          aria-hidden="true"
        >
          <img src={projects[hovered].cover} alt="" />
        </div>
      )}
    </div>
  );
}

/* -------------------------------- Grid view ----------------------------- */

function GridView({
  projects,
  onOpen,
}: {
  projects: PortfolioProject[];
  onOpen: (index: number) => void;
}) {
  return (
    <section className="ec-grid" aria-label="Projetos em grid">
      {projects.map((p, i) => (
        <article key={p.id} className="ec-grid-cell">
          <Link
            to="/work/$slug"
            params={{ slug: p.slug }}
            className="ec-grid-cover"
            aria-label={`Abrir ${p.title.trim()}`}
            data-cursor="view"
          >
            <img src={p.cover} alt={p.alt} loading="lazy" />
          </Link>
          <p className="ec-grid-meta">
            <span className="ec-grid-title">{p.title.trim()}</span>
            <span aria-hidden="true">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            <span className="ec-grid-cat">{p.category}</span>
          </p>
        </article>
      ))}
    </section>
  );
}

/* ------------------------------- Gallery view --------------------------- */

function GalleryView({
  projects,
  index,
  setIndex,
  onClose,
}: {
  projects: PortfolioProject[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const prev = () => setIndex((index - 1 + projects.length) % projects.length);
  const next = () => setIndex((index + 1) % projects.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const current = projects[index];

  return (
    <section className="ec-gallery" aria-label="Visualização em galeria">
      <button type="button" className="ec-gallery-add" aria-label="Adicionar (decorativo)">
        +
      </button>

      <a
        href={current.behanceUrl}
        target="_blank"
        rel="noreferrer"
        className="ec-gallery-frame"
        aria-label={`Ver ${current.title.trim()} no Behance`}
      >
        <img src={current.cover} alt={current.alt} />
      </a>

      <div className="ec-gallery-controls">
        <button type="button" onClick={prev}>← Prev image</button>
        <button type="button" onClick={onClose}>Close</button>
        <button type="button" onClick={next}>Next image →</button>
      </div>
    </section>
  );
}
