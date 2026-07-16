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
      <header className="flex items-center justify-between px-6 md:px-10 py-6 text-sm">
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
      <main className="flex-1 flex flex-col items-center px-6 md:px-10 pt-8 pb-20">
        <h1 className="font-display text-[16vw] md:text-[12vw] leading-[0.9] tracking-tight text-center">
          STUDIO
        </h1>

        <p className="font-display uppercase text-center max-w-6xl mt-12 md:mt-16 text-[6vw] md:text-[3.2vw] leading-[1.05] tracking-tight">
          Sou Bruno Amaral, designer com foco em branding, direção de arte,
          fotografia e UX/UI. Combino visão estratégica, sensibilidade estética
          e precisão na execução para construir marcas, produtos digitais e
          experiências visuais com identidade própria. Meu trabalho é guiado
          pela simplicidade, consistência e atenção aos detalhes, transformando
          conceitos em soluções que permanecem relevantes. Baseado no Brasil e
          disponível para projetos globais.
        </p>

        <div className="mt-24 md:mt-32 flex flex-col items-center">
          <span className="text-sm mb-6">Capabilities</span>
          <p className="font-display uppercase text-center text-[5vw] md:text-[2.4vw] leading-[1.1] tracking-tight">
            Art Direction, Brand Identity,
            <br />
            Website Design, Website Development
          </p>
        </div>

        <div className="mt-24 md:mt-32 flex flex-col items-center">
          <span className="text-sm mb-6">Get in touch</span>
          <ul className="font-display uppercase text-center text-[7vw] md:text-[3.6vw] leading-[1.15] tracking-tight space-y-1">
            <li>
              <a
                href="mailto:brunnoamaral1@hotmail.com"
                className="underline underline-offset-[6px] decoration-[3px] hover:opacity-70"
              >
                Let's Talk
              </a>
            </li>
            <li>
              <a
                href="https://www.behance.net/brunoamaral24"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-[6px] decoration-[3px] hover:opacity-70"
              >
                Behance
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/bruno-amaral-a0b895174"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-[6px] decoration-[3px] hover:opacity-70"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between px-6 md:px-10 py-6 text-sm">
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
