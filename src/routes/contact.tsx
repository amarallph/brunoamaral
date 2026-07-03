import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ScrollReveal } from "@/components/ScrollReveal";
import { BackButton } from "@/components/case/BackButton";
import { profile } from "@/lib/portfolio-data";
import { RouteErrorOverlay } from "@/components/RouteFallbackOverlay";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bruno Amaral" },
      { name: "description", content: "Fale com o estúdio de Bruno Amaral sobre novos projetos." },
      { property: "og:title", content: "Contact — Bruno Amaral" },
      { property: "og:description", content: "Fale com o estúdio sobre novos projetos e colaborações." },
    ],
  }),
  component: ContactPage,
  errorComponent: RouteErrorOverlay,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Novo contato — ${form.name} (${form.company || "sem empresa"})`;
    const body = `Nome: ${form.name}\nEmpresa: ${form.company}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${profile.email}@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="ec-page ec-page-contact">
      <div className="ec-case-topbar">
        <BackButton label="Back to Home" />
        <span className="ec-case-index">Contact</span>
      </div>

      <ScrollReveal as="header" className="ec-contact-hero">
        <p className="ec-case-eyebrow">Contact</p>
        <h1 className="ec-contact-title">
          Vamos conversar <br /> sobre o próximo <br /> projeto.
        </h1>
        <p className="ec-contact-lede">
          Respondo cada mensagem pessoalmente. Conte um pouco sobre o desafio, o momento
          da marca e os prazos envolvidos.
        </p>
      </ScrollReveal>

      <section className="ec-contact-grid">
        <ScrollReveal as="form" className="ec-contact-form">
          <form onSubmit={onSubmit}>
            <label>
              <span>Nome</span>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </label>
            <label>
              <span>Empresa</span>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </label>
            <label>
              <span>Mensagem</span>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
            </label>
            <button type="submit" data-cursor="open">
              Enviar mensagem →
            </button>
          </form>
        </ScrollReveal>

        <ScrollReveal className="ec-contact-side" delay={80}>
          <div>
            <span className="ec-case-info-label">Email</span>
            <a href={`mailto:${profile.email}@gmail.com`}>{profile.email}@gmail.com</a>
          </div>
          <div>
            <span className="ec-case-info-label">Elsewhere</span>
            <a href={profile.behanceUrl} target="_blank" rel="noreferrer">
              Behance
            </a>
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
          <div>
            <span className="ec-case-info-label">Base</span>
            <span>São Paulo, Brasil</span>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
