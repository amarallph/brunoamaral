import agronomyAsset from "@/assets/agronomy.jpg.asset.json";
import brazaAsset from "@/assets/braza-io.png.asset.json";
import coralBethelAsset from "@/assets/coral-bethel.png.asset.json";
import frexcoAsset from "@/assets/frexco.jpg.asset.json";
import inimigosDoPaceAsset from "@/assets/inimigos-do-pace.png.asset.json";
import joanaLiliAsset from "@/assets/joana-lili.png.asset.json";
import neurartAsset from "@/assets/neurart-io.png.asset.json";
import rolimAsset from "@/assets/rolim-advogados.jpg.asset.json";
import sakkarAsset from "@/assets/sakkar.jpg.asset.json";

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  year: string;
  cover: string;
  alt: string;
  summary: string;
  behanceUrl: string;
};

export const profile = {
  name: "Seu Nome",
  role: "Direção de arte, branding e design digital",
  bio: "Portfólio autoral com projetos de identidade visual, campanhas, experiências digitais e sistemas de marca.",
  linkedinUrl: "#",
  behanceUrl: "#",
  email: "contato@seuportfolio.com",
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "rolim-advogados",
    title: "Rolim Advogados",
    category: "Branding",
    year: "2026",
    cover: rolimAsset.url,
    alt: "Capa do projeto Rolim Advogados",
    summary: "Sistema visual institucional com presença sóbria, acabamento premium e linguagem corporativa contemporânea.",
    behanceUrl: "#",
  },
  {
    id: "coral-bethel",
    title: "Coral Bethel",
    category: "Identidade Visual",
    year: "2026",
    cover: coralBethelAsset.url,
    alt: "Capa do projeto Coral Bethel",
    summary: "Direção visual musical com atmosfera cromática intensa, composição elegante e assinatura tipográfica expressiva.",
    behanceUrl: "#",
  },
  {
    id: "frexco",
    title: "Frexco",
    category: "UX/UI",
    year: "2026",
    cover: frexcoAsset.url,
    alt: "Capa do projeto Frexco",
    summary: "Interface mobile para experiência de compra com foco em clareza, fluidez e destaque visual do produto.",
    behanceUrl: "#",
  },
  {
    id: "inimigos-do-pace",
    title: "Inimigos do Pace",
    category: "Campanha",
    year: "2026",
    cover: inimigosDoPaceAsset.url,
    alt: "Capa do projeto Inimigos do Pace",
    summary: "Peça de comunicação com linguagem urbana, energia esportiva e forte construção de pertencimento visual.",
    behanceUrl: "#",
  },
  {
    id: "sakkar",
    title: "Sakkar",
    category: "Marca",
    year: "2026",
    cover: sakkarAsset.url,
    alt: "Capa do projeto Sakkar",
    summary: "Identidade com inspiração histórica, desenho simbólico marcante e paleta terrosa sofisticada.",
    behanceUrl: "#",
  },
  {
    id: "braza-io",
    title: "Braza.io",
    category: "Visual Digital",
    year: "2026",
    cover: brazaAsset.url,
    alt: "Capa do projeto Braza.io",
    summary: "Direção visual para mídia digital com contraste alto, tipografia ampla e impacto de escala expositiva.",
    behanceUrl: "#",
  },
  {
    id: "agronomy",
    title: "Agronomy",
    category: "App Concept",
    year: "2026",
    cover: agronomyAsset.url,
    alt: "Capa do projeto Agronomy",
    summary: "Conceito visual voltado ao agro com apelo tecnológico, contexto de campo e presença mobile central.",
    behanceUrl: "#",
  },
  {
    id: "neurart-io",
    title: "Neurart.io",
    category: "Brand Experience",
    year: "2026",
    cover: neurartAsset.url,
    alt: "Capa do projeto Neurart.io",
    summary: "Exploração visual futurista com profundidade material, atmosfera tech-luxury e linguagem experimental.",
    behanceUrl: "#",
  },
  {
    id: "joana-lili",
    title: "Joana e Lili",
    category: "Beauty Branding",
    year: "2026",
    cover: joanaLiliAsset.url,
    alt: "Capa do projeto Joana e Lili",
    summary: "Identidade refinada para salão de beleza com leitura leve, elegante e sensorial.",
    behanceUrl: "#",
  },
];
