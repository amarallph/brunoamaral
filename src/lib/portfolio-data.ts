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
  name: "Bruno Amaral",
  role: "Graphic Designer · UX/UI",
  bio: "Designer gráfico brasileiro de São Paulo, especializado em logotipos e identidade visual para startups e empresas de pequeno e médio porte.",
  linkedinUrl: "https://linkedin.com/in/bruno-amaral-a0b895174/",
  behanceUrl: "https://www.behance.net/brunoamaral24",
  email: "amaralbyportfolio",
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "inimigos-do-pace",
    title: "INIMIGOS DO PACE × NEW BALANCE",
    category: "Campanha",
    year: "2025",
    cover: inimigosDoPaceAsset.url,
    alt: "Capa do projeto INIMIGOS DO PACE × NEW BALANCE",
    summary: "Peça de comunicação com linguagem urbana, energia esportiva e forte construção de pertencimento visual.",
    behanceUrl: "https://www.behance.net/gallery/235549067/Inimigos-do-Pace-New-Balance",
  },
  {
    id: "braza-io",
    title: "Braza.io\n",
    category: "IDENTIDADE VISUAL",
    year: "2025",
    cover: brazaAsset.url,
    alt: "Capa do projeto Braza.io",
    summary: "Direção visual para mídia digital com contraste alto, tipografia ampla e impacto de escala expositiva.",
    behanceUrl: "https://www.behance.net/gallery/235552427/brandt-identtlly",
  },
  {
    id: "coral-bethel",
    title: "Coral Bethel",
    category: "Identidade Visual",
    year: "2024",
    cover: coralBethelAsset.url,
    alt: "Capa do projeto Coral Bethel",
    summary: "Direção visual musical com atmosfera cromática intensa, composição elegante e assinatura tipográfica expressiva.",
    behanceUrl: "https://www.behance.net/gallery/204525571/Coral-Bethel-logo-e-identidade-visual",
  },
  {
    id: "neurart-io",
    title: "Neurart.io",
    category: "Brand Experience",
    year: "2025",
    cover: neurartAsset.url,
    alt: "Capa do projeto Neurart.io",
    summary: "Exploração visual futurista com profundidade material, atmosfera tech-luxury e linguagem experimental.",
    behanceUrl: "https://www.behance.net/gallery/235551731/Neurartio",
  },
  {
    id: "joana-lili",
    title: "Joana e Lili",
    category: "IDENTIDADE VISUAL",
    year: "2024",
    cover: joanaLiliAsset.url,
    alt: "Capa do projeto Joana e Lili",
    summary: "Identidade refinada para salão de beleza alto padrão com leitura leve, elegante e sensorial.",
    behanceUrl: "https://www.behance.net/gallery/202966571/Identidade-visual-salao-de-beleza-alto-padrao",
  },
  {
    id: "sakkar",
    title: "Sakkar",
    category: "IDENTIDADE VISUAL",
    year: "2022",
    cover: sakkarAsset.url,
    alt: "Capa do projeto Sakkar",
    summary: "Identidade com inspiração histórica, desenho simbólico marcante e paleta terrosa sofisticada.",
    behanceUrl: "https://www.behance.net/gallery/146643639/Sakkar",
  },
  {
    id: "frexco",
    title: "Frexco",
    category: "UX/UI",
    year: "2023",
    cover: frexcoAsset.url,
    alt: "Capa do projeto Frexco",
    summary: "Interface mobile para o produtor de hortifrúti, com foco em clareza, fluidez e destaque do produto.",
    behanceUrl: "https://www.behance.net/gallery/156619871/Frexco-aplicativo-para-o-produtor-de-hortifruti",
  },
  {
    id: "agronomy",
    title: "Agronomy",
    category: "App Concept",
    year: "2022",
    cover: agronomyAsset.url,
    alt: "Capa do projeto Agronomy",
    summary: "Conceito visual voltado ao agro com apelo tecnológico, contexto de campo e presença mobile central.",
    behanceUrl: "https://www.behance.net/gallery/147671703/Agronomy",
  },
  {
    id: "rolim-advogados",
    title: "Rolim Advogados",
    category: "Branding",
    year: "2025",
    cover: rolimAsset.url,
    alt: "Capa do projeto Rolim Advogados",
    summary: "Sistema visual institucional com presença sóbria, acabamento premium e linguagem corporativa contemporânea.",
    behanceUrl: "https://www.behance.net/gallery/235546869/Branding-Rolim-Advogados",
  },
];
