import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { profile, portfolioProjects, type PortfolioProject } from "@/lib/portfolio-data";

export const Route = createFileRoute("/grid")({
  head: () => ({
    meta: [
      { title: "Grid | Portfólio Bruno Amaral" },
      {
        name: "description",
        content: "Visualização em grid dos projetos de identidade visual, branding e design digital de Bruno Amaral.",
      },
      { property: "og:title", content: "Grid | Portfólio Bruno Amaral" },
      {
        property: "og:description",
        content: "Visualização em grid dos projetos selecionados.",
      },
    ],
  }),
  component: GridPage,
});

function GridPage() {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  return (
    <div className="portfolio-shell">
      <header className="portfolio-header">
        <Link to="/" className="portfolio-brand" aria-label="Início do portfólio">
          {profile.name}
        </Link>

        <nav className="view-switcher" aria-label="Modo de visualização">
          <Link to="/" className="view-switcher-link">List</Link>
          <span aria-hidden="true" className="view-switcher-sep">/</span>
          <Link to="/grid" className="view-switcher-link" data-active="true">Grid</Link>
          <span aria-hidden="true" className="view-switcher-sep">/</span>
          <Link to="/gallery" className="view-switcher-link">Gallery</Link>
        </nav>

        <div className="portfolio-links">
          <a href={profile.behanceUrl} target="_blank" rel="noreferrer">
            Behance
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
            <Linkedin aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </header>

      <main className="grid-page-main">
        <h1 className="sr-only">Projetos em grid</h1>

        <section className="grid-page-grid" aria-label="Projetos">
          {portfolioProjects.map((project) => (
            <article key={project.id} className="grid-cell">
              <button
                type="button"
                className="grid-cell-cover"
                onClick={() => setActiveProject(project)}
                aria-label={`Abrir preview de ${project.title}`}
              >
                <img src={project.cover} alt={project.alt} loading="lazy" />
              </button>
              <p className="grid-cell-meta">
                <span className="grid-cell-title">{project.title}</span>
                <span aria-hidden="true"> / </span>
                <span className="grid-cell-cat">{project.category}</span>
              </p>
            </article>
          ))}
        </section>
      </main>

      <footer className="portfolio-footer">
        <p>{profile.email}</p>
      </footer>

      <Dialog open={Boolean(activeProject)} onOpenChange={(open) => !open && setActiveProject(null)}>
        <DialogContent className="preview-dialog">
          {activeProject && (
            <>
              <DialogHeader>
                <DialogTitle>{activeProject.title}</DialogTitle>
                <DialogDescription>{activeProject.summary}</DialogDescription>
              </DialogHeader>

              <img src={activeProject.cover} alt={activeProject.alt} className="preview-cover" />

              <div className="preview-footer">
                <span>
                  {activeProject.category} · {activeProject.year}
                </span>
                <Button asChild>
                  <a href={activeProject.behanceUrl} target="_blank" rel="noreferrer">
                    Ver no Behance <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
