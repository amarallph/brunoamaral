import { createFileRoute, Link } from "@tanstack/react-router";
import { RouteErrorOverlay } from "@/components/RouteFallbackOverlay";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Bruno Amaral" },
      {
        name: "description",
        content:
          "Bruno Amaral — designer com foco em branding, direção de arte, fotografia e UX/UI. Baseado no Brasil e disponível para projetos globais.",
      },
      { property: "og:title", content: "Studio — Bruno Amaral" },
      {
        property: "og:description",
        content:
          "Designer com foco em branding, direção de arte, fotografia e UX/UI. Baseado no Brasil e disponível para projetos globais.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: StudioPage,
  errorComponent: RouteErrorOverlay,
});

function StudioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col ec-studio">
      {/* Top bar */}
      <header className="ec-studio-bar">
        <Link to="/" className="hover:underline font-bold">
          Bruno Amaral
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/studio" className="hover:underline font-bold">
            Studio
          </Link>
          <Link to="/lab" className="hover:underline font-bold">
            Lab
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="ec-studio-main">
        <h1 className="ec-studio-hero">STUDIO</h1>

        <p className="ec-studio-lede">
          BRUNO AMARAL, DESIGNER COM FOCO EM BRANDING, DIREÇÃO DE ARTE, E UX/UI.
          COMBINO VISÃO ESTRATÉGICA, SENSIBILIDADE ESTÉTICA E PRECISÃO
          <br />
          PARA CONSTRUIR MARCAS, PRODUTOS DIGITAIS COM IDENTIDADE PRÓPRIA.
        </p>

        <section className="ec-studio-block">
          <span className="ec-studio-label font-bold">Capabilities</span>
          <p className="ec-studio-body">
            ART DIRECTION, BRAND IDENTITY,
            <br />
            WEBSITE DESIGN, WEBSITE DEVELOPMENT
          </p>
        </section>

        <section className="ec-studio-block">
          <span className="ec-studio-label font-bold">Get in touch</span>
          <ul className="ec-studio-links">
            <li>
              <a href="mailto:brunnoamaral1@hotmail.com">LET'S TALK</a>
            </li>
            <li>
              <a
                href="https://www.behance.net/brunoamaral24"
                target="_blank"
                rel="noreferrer"
              >
                BEHANCE
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/bruno-amaral-a0b895174"
                target="_blank"
                rel="noreferrer"
              >
                LINKEDIN
              </a>
            </li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="ec-studio-bar">
        <span className="font-bold">Creative Studio</span>
        <a href="mailto:brunnoamaral1@hotmail.com" className="hover:underline font-bold">
          Email Us
        </a>
      </footer>
    </div>
  );
}
