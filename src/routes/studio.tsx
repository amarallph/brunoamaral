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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 md:px-10 py-6 text-sm font-bold">
        <Link to="/" className="hover:underline">
          Bruno Amaral
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/studio" className="hover:underline">
            Studio
          </Link>
          <Link to="/lab" className="hover:underline">
            Lab
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-6 md:px-10 pt-4 pb-20">
        <h1 className="font-display font-black text-[22vw] md:text-[13vw] leading-[0.95] tracking-[-0.04em] text-center">
          STUDIO
        </h1>

        <p className="font-display font-black uppercase text-center max-w-[1400px] mt-10 md:mt-14 text-[7vw] md:text-[4.2vw] leading-[1.02] tracking-[-0.02em]">
          BRUNO AMARAL, DESIGNER COM FOCO EM BRANDING, DIREÇÃO DE ARTE, E UX/UI.
          COMBINO VISÃO ESTRATÉGICA, SENSIBILIDADE ESTÉTICA E PRECISÃO
          <br />
          PARA CONSTRUIR MARCAS, PRODUTOS DIGITAIS COM IDENTIDADE PRÓPRIA.&nbsp;
        </p>

        <div className="mt-28 md:mt-40 flex flex-col items-center">
          <span className="text-[15px] mb-8 font-bold">Capabilities</span>
          <p className="font-display font-black uppercase text-center text-[6vw] md:text-[3.6vw] leading-[1.05] tracking-[-0.02em]">
            Art Direction, Brand Identity,
            <br />
            Website Design, Website Development
          </p>
        </div>

        <div className="mt-28 md:mt-40 flex flex-col items-center">
          <span className="text-[15px] mb-8 font-bold">Get in touch</span>
          <ul className="font-display font-black uppercase text-center text-[8vw] md:text-[4.2vw] leading-[1.05] tracking-[-0.02em] space-y-0">
            <li>
              <a
                href="mailto:brunnoamaral1@hotmail.com"
                className="underline underline-offset-[8px] decoration-[4px] hover:opacity-70"
              >
                Let's Talk
              </a>
            </li>
            <li>
              <a
                href="https://www.behance.net/brunoamaral24"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-[8px] decoration-[4px] hover:opacity-70"
              >
                Behance
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/bruno-amaral-a0b895174"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-[8px] decoration-[4px] hover:opacity-70"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between px-6 md:px-10 py-6 text-sm font-bold">
        <span>Creative Studio</span>
        <a
          href="mailto:brunnoamaral1@hotmail.com"
          className="hover:underline"
        >
          Email Us
        </a>
      </footer>
    </div>
  );
}
