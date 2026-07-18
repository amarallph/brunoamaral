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
          <strong>List</strong>
        </button>
        <span aria-hidden="true">/</span>
        <button type="button" onClick={() => select("grid")} data-active={mode === "grid"}>
          <strong>Grid</strong>
        </button>
        <span aria-hidden="true">/</span>
        <button type="button" onClick={() => select("gallery")} data-active={mode === "gallery"}>
          <strong>Gallery</strong>
        </button>
      </nav>
      <div className="ec-header-right">
        <Link to="/studio">
          <strong>Studio</strong>
        </Link>
        <span aria-hidden="true">&nbsp;&nbsp;</span>
        <Link to="/lab">
          <strong>Lab</strong>
        </Link>
      </div>
    </header>
  );
}

/* -------------------------------- Footer -------------------------------- */

function Footer({ mode }: { mode: ViewMode }) {
  return (
    <footer className="ec-footer">
      <span><strong>Creative Studio</strong></span>
      <span className="ec-footer-center">
        {mode === "grid" && "All  /  Web  /  Branding"}
      </span>
      <a href={`mailto:${profile.email}`}><strong>Email Us</strong></a>
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
            <Link
              to="/work/$slug"
              params={{ slug: p.slug }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              className="ec-list-item"
              data-small={p.id === "inimigos-do-pace" ? "true" : undefined}
              data-cursor="open"
            >
              {p.title.trim()}
            </Link>
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
  setIndex,
}: {
  projects: PortfolioProject[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  return (
    <section className="ec-gallery" aria-label="Visualização em galeria">
      <div className="ec-gallery-grid">
        {projects.map((p, i) => (
          <Link
            key={p.id}
            to="/work/$slug"
            params={{ slug: p.slug }}
            className="ec-gallery-cell"
            data-cursor="view"
            onMouseEnter={() => setIndex(i)}
          >
            <div className="ec-gallery-thumb">
              <img src={p.cover} alt={p.alt} loading="lazy" />
            </div>
            <span className="ec-gallery-num">{String(i + 1).padStart(3, "0")}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}


