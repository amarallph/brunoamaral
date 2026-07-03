import { createFileRoute } from "@tanstack/react-router";

import { ScrollReveal } from "@/components/ScrollReveal";
import { BackButton } from "@/components/case/BackButton";
import { profile } from "@/lib/portfolio-data";
import { RouteErrorOverlay } from "@/components/RouteFallbackOverlay";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Bruno Amaral" },
      {
        name: "description",
        content: "O estúdio de Bruno Amaral: manifesto, metodologia, serviços e clientes em direção criativa e design.",
      },
      { property: "og:title", content: "Studio — Bruno Amaral" },
      {
        property: "og:description",
        content: "Direção criativa, identidade visual e design digital com abordagem editorial.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: StudioPage,
  errorComponent: RouteErrorOverlay,
});

const services = [
  "Brand Identity",
  "Creative Direction",
  "Visual Identity",
  "Brand Strategy",
  "Art Direction",
  "Naming",
  "Packaging",
  "Motion",
  "UI Design",
  "UX Design",
  "Web Design",
];

const clients = [
  "New Balance",
  "Braza.io",
  "Coral Bethel",
  "Neurart.io",
  "Joana e Lili",
  "Sakkar",
  "Frexco",
  "Rolim Advogados",
];

const method = [
  { step: "01", title: "Escuta", body: "Entender o território antes de propor qualquer forma." },
  { step: "02", title: "Estratégia", body: "Traduzir o posicionamento em critérios visuais claros." },
  { step: "03", title: "Concepção", body: "Explorar territórios criativos com liberdade e método." },
  { step: "04", title: "Sistema", body: "Construir um repertório aplicável, coerente e escalável." },
  { step: "05", title: "Entrega", body: "Refinar, produzir e ativar em todos os pontos de contato." },
];

function StudioPage() {
  return (
    <div className="ec-page ec-page-studio">
      <div className="ec-case-topbar">
        <BackButton label="Back to Home" />
        <span className="ec-case-index">Studio</span>
      </div>

      <ScrollReveal as="header" className="ec-studio-hero">
        <p className="ec-case-eyebrow">Studio</p>
        <h1 className="ec-studio-title">
          Design editorial <br /> para marcas <br /> contemporâneas.
        </h1>
      </ScrollReveal>

      <section className="ec-studio-block">
        <ScrollReveal>
          <h2 className="ec-case-h2">Manifesto</h2>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <p className="ec-studio-lede">
            Acreditamos em marcas construídas com rigor tipográfico, respiração e uma
            narrativa própria. Cada projeto é uma investigação — não uma fórmula.
          </p>
        </ScrollReveal>
      </section>

      <section className="ec-studio-block">
        <ScrollReveal>
          <h2 className="ec-case-h2">Metodologia</h2>
        </ScrollReveal>
        <ol className="ec-case-process-list">
          {method.map((m, i) => (
            <ScrollReveal as="li" key={m.step} delay={i * 40}>
              <span className="ec-case-process-index">{m.step}</span>
              <div>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </ol>
      </section>

      <section className="ec-studio-block ec-studio-two-col">
        <ScrollReveal>
          <h2 className="ec-case-h2">Serviços</h2>
          <ul className="ec-studio-list">
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="ec-case-h2">Clientes</h2>
          <ul className="ec-studio-list">
            {clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      <ScrollReveal as="section" className="ec-studio-cta">
        <h2 className="ec-studio-cta-title">Vamos construir algo memorável.</h2>
        <a href={`mailto:${profile.email}@gmail.com`} data-cursor="open">
          {profile.email}@gmail.com
        </a>
      </ScrollReveal>
    </div>
  );
}
