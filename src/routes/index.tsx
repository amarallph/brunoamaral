import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Grid3X3, List, Images, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { profile, portfolioProjects, type PortfolioProject } from "@/lib/portfolio-data";

type ViewMode = "list" | "grid" | "gallery";

const modeLabels: { id: ViewMode; label: string; icon: typeof List }[] = [
  { id: "list", label: "List", icon: List },
  { id: "grid", label: "Grid", icon: Grid3X3 },
  { id: "gallery", label: "Gallery", icon: Images },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfólio | Projetos selecionados" },
      {
        name: "description",
        content: "Portfólio com seleção de projetos de identidade visual, branding e design digital.",
      },
      { property: "og:title", content: "Portfólio | Projetos selecionados" },
      {
        property: "og:description",
        content: "Portfólio com seleção de projetos de identidade visual, branding e design digital.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [mode, setMode] = useState<ViewMode>("list");
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const projects = useMemo(() => portfolioProjects, []);

  return (
    <div className="portfolio-shell">
      <header className="portfolio-header">
        <a href="/" className="portfolio-brand" aria-label="Início do portfólio">
          {profile.name}
        </a>

        <div className="view-switcher" role="tablist" aria-label="Modo de visualização">
          {modeLabels.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={mode === id}
              onClick={() => setMode(id)}
              className="view-switcher-button"
              data-active={mode === id}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="portfolio-links">
          <a href={profile.behanceUrl} target="_blank" rel="noreferrer">
            Behance
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
            <Linkedin aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </header>

      <main className="portfolio-main">
        <h1 className="sr-only">Portfólio de projetos</h1>

        <section className="intro-block" aria-label="Apresentação">
          <p className="intro-kicker">Portfólio</p>
          <h2>{profile.role}</h2>
          <p>{profile.bio}</p>
        </section>

        <section className="projects-block" aria-label="Projetos">
          {mode === "list" && (
            <ul className="projects-list-mode">
              {projects.map((project) => (
                <li key={project.id}>
                  <button type="button" onClick={() => setActiveProject(project)}>
                    {project.title}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {mode !== "list" && (
            <div className={mode === "grid" ? "projects-grid" : "projects-gallery"}>
              {projects.map((project) => (
                <button
                  type="button"
                  key={project.id}
                  className="project-card"
                  onClick={() => setActiveProject(project)}
                >
                  <img src={project.cover} alt={project.alt} loading="lazy" />
                  <div className="project-card-meta">
                    <span>{project.category}</span>
                    <strong>{project.title}</strong>
                  </div>
                </button>
              ))}
            </div>
          )}
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

