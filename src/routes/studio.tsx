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
    <div className="ec-st">
      <header className="ec-st-bar">
        <Link to="/" className="ec-st-bar-link">Bruno Amaral</Link>
        <nav className="ec-st-bar-nav">
          <Link to="/studio" className="ec-st-bar-link">Studio</Link>
          <Link to="/lab" className="ec-st-bar-link">Lab</Link>
        </nav>
      </header>

      <main className="ec-st-main">
        <h1 className="ec-st-title">STUDIO</h1>

        <p className="ec-st-lede">
          BRUNO AMARAL, DESIGNER COM&nbsp;FOCO EM BRANDING, DIREÇÃO DE ARTE E UX/UI.&nbsp;CONSTRUO MARCAS E PRODUTOS DIGITAIS COM ANALISE DE MERCADO.
        </p>

        <section className="ec-st-block">
          <span className="ec-st-label">Capabilities</span>
          <p className="ec-st-body">
            ART DIRECTION, BRAND IDENTITY,
            <br />
            WEBSITE DESIGN, WEBSITE DEVELOPMENT
          </p>
        </section>

        <section className="ec-st-block">
          <span className="ec-st-label">Get in touch</span>
          <ul className="ec-st-links">
            <li><a href="mailto:brunnoamaral1@hotmail.com">LET'S TALK</a></li>
            <li><a href="https://www.behance.net/brunoamaral24" target="_blank" rel="noreferrer">BEHANCE</a></li>
            <li><a href="https://www.linkedin.com/in/bruno-amaral-a0b895174" target="_blank" rel="noreferrer">LINKEDIN</a></li>
          </ul>
        </section>
      </main>

      <footer className="ec-st-bar ec-st-bar-footer">
        <span className="ec-st-bar-link">Creative Studio</span>
        <a href="mailto:brunnoamaral1@hotmail.com" className="ec-st-bar-link">Email Us</a>
      </footer>
    </div>
  );
}
