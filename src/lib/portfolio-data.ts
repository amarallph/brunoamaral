const inimigosDoPaceOficialAsset = { url: "/images/inimigos-do-pace-oficial.png" };
const inimigosDoPaceTshirtAsset = { url: "/images/inimigos-do-pace-tshirt.png" };

const agronomyAsset = { url: "/images/agronomy.jpg" };
const brazaAsset = { url: "/images/braza-io.png" };
const coralBethelAsset = { url: "/images/coral-bethel.png" };
const frexcoAsset = { url: "/images/frexco.png" };
const inimigosDoPaceAsset = { url: "/images/inimigos-do-pace.png" };
const joanaLiliAsset = { url: "/images/joana-lili.png" };
const neurartAsset = { url: "/images/neurart-io.png" };
const rolimAsset = { url: "/images/rolim-advogados.jpg" };
const sakkarAsset = { url: "/images/sakkar.jpg" };

export type GalleryBlock =
  | { type: "full"; src: string; caption?: string }
  | { type: "horizontal"; src: string; caption?: string }
  | { type: "vertical"; src: string; caption?: string }
  | { type: "grid"; items: { src: string; caption?: string }[] }
  | { type: "text"; body: string }
  | { type: "quote"; body: string; author?: string };

export type ProcessStep = { step: string; description: string };

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  cover: string;
  alt: string;
  summary: string;
  behanceUrl: string;
  client: string;
  role: string;
  services: string[];
  overview: string;
  context: string;
  problem: string;
  objectives: string[];
  solution: string;
  results: string[];
  insights: string;
  conclusion: string;
  process: ProcessStep[];
  gallery: GalleryBlock[];
};

export const profile = {
  name: "Bruno Amaral",
  role: "Graphic Designer · UX/UI",
  bio: "Designer Gráfico especializado em direção de arte, fotografia e\u00a0criação de marcas com forte apelo estético e estratégico. Tenho experiência no desenvolvimento de projetos para moda, música e empresas de diferentes segmentos.",
  linkedinUrl: "https://linkedin.com/in/bruno-amaral-a0b895174/",
  behanceUrl: "https://www.behance.net/brunoamaral24",
  email: "brunnoamaral1@hotmail.com",
};

const defaultProcess: ProcessStep[] = [
  { step: "Discovery", description: "Imersão no universo da marca, escuta ativa e mapeamento de referências." },
  { step: "Research", description: "Análise de contexto, público e cenário competitivo." },
  { step: "Strategy", description: "Definição de posicionamento, arquitetura de mensagem e critérios visuais." },
  { step: "Concept", description: "Territórios criativos, provocações visuais e escolha da direção." },
  { step: "Design", description: "Construção do sistema visual, tipografia, cor e aplicações." },
  { step: "Production", description: "Refinamento de peças, mockups e materiais de entrega." },
  { step: "Launch", description: "Guia de marca, handoff e ativação nos canais definidos." },
];

const defaults = (title: string, category: string) => ({
  client: title.trim(),
  role: "Direção criativa e design",
  services: ["Brand Identity", "Creative Direction", "Visual Identity"],
  overview: `${title.trim()} nasce da vontade de construir uma presença visual precisa, autoral e coerente com um posicionamento contemporâneo em ${category.toLowerCase()}.`,
  context: "O projeto foi conduzido com foco em uma linguagem editorial, priorizando espaço, tipografia e sistemas visuais que se sustentam em escala.",
  problem: "Traduzir uma proposta de valor complexa em um sistema visual claro, memorável e escalável entre plataformas.",
  objectives: [
    "Consolidar uma identidade visual autoral",
    "Estabelecer um sistema aplicável em múltiplos formatos",
    "Criar uma linguagem consistente entre pontos de contato",
  ],
  solution: "Um sistema construído sobre tipografia editorial, hierarquia rigorosa e uso deliberado do espaço negativo. Cada peça é pensada como parte de uma narrativa contínua.",
  results: [
    "Sistema visual aplicado em múltiplas peças",
    "Coerência entre digital, impresso e ambientes",
    "Reconhecimento imediato do universo da marca",
  ],
  insights: "A repetição controlada de elementos gera reconhecimento sem perder frescor. A restrição é o motor da autoria.",
  conclusion: "O resultado é uma marca que respira, ocupa o silêncio com intenção e comunica com precisão em cada aplicação.",
  process: defaultProcess,
});

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "inimigos-do-pace",
    slug: "inimigos-do-pace",
    title: "INIMIGOS DO PACE X NB",
    category: "Campanha",
    year: "2025",
    cover: inimigosDoPaceAsset.url,
    alt: "Capa do projeto INIMIGOS DO PACE × NEW BALANCE",
    summary: "Peça de comunicação com linguagem urbana, energia esportiva e forte construção de pertencimento visual.",
    behanceUrl: "https://www.behance.net/gallery/235549067/Inimigos-do-Pace-New-Balance",
    ...defaults("Inimigos do Pace × New Balance", "Campanha"),
    services: ["Creative Direction", "Campaign", "Visual Identity", "Photography Direction"],
    gallery: [
      { type: "full", src: inimigosDoPaceOficialAsset.url, caption: "Campanha Inimigos do Pace × New Balance" },
      { type: "text", body: "A colaboração entre Inimigos do Pace e New Balance materializa uma linguagem que pertence à rua, ao ritmo e ao coletivo." },
      { type: "horizontal", src: inimigosDoPaceTshirtAsset.url },
    ],
  },
  {
    id: "braza-io",
    slug: "braza-io",
    title: "Braza.io",
    category: "Identidade Visual",
    year: "2025",
    cover: brazaAsset.url,
    alt: "Capa do projeto Braza.io",
    summary: "Direção visual para mídia digital com contraste alto, tipografia ampla e impacto de escala expositiva.",
    behanceUrl: "https://www.behance.net/gallery/235552427/brandt-identtlly",
    ...defaults("Braza.io", "Identidade Visual"),
    services: ["Brand Identity", "Visual Identity", "Brand Strategy", "UI Design"],
    gallery: [
      { type: "full", src: brazaAsset.url },
      { type: "text", body: "Braza.io opera na fronteira entre finanças e cultura digital. A identidade traduz essa dualidade com contraste, escala e um sistema tipográfico deliberadamente amplo." },
      { type: "horizontal", src: brazaAsset.url },
    ],
  },
  {
    id: "coral-bethel",
    slug: "coral-bethel",
    title: "Coral Bethel",
    category: "Identidade Visual",
    year: "2024",
    cover: coralBethelAsset.url,
    alt: "Capa do projeto Coral Bethel",
    summary: "Direção visual musical com atmosfera cromática intensa, composição elegante e assinatura tipográfica expressiva.",
    behanceUrl: "https://www.behance.net/gallery/204525571/Coral-Bethel-logo-e-identidade-visual",
    ...defaults("Coral Bethel", "Identidade Visual"),
    services: ["Brand Identity", "Logo Design", "Visual Identity", "Art Direction"],
    gallery: [
      { type: "full", src: coralBethelAsset.url },
      { type: "text", body: "Coral Bethel exige uma marca que soe como o próprio coral: presença, harmonia e reverberação." },
      { type: "vertical", src: coralBethelAsset.url },
    ],
  },
  {
    id: "neurart-io",
    slug: "neurart-io",
    title: "Neurart.io",
    category: "Brand Experience",
    year: "2025",
    cover: neurartAsset.url,
    alt: "Capa do projeto Neurart.io",
    summary: "Exploração visual futurista com profundidade material, atmosfera tech-luxury e linguagem experimental.",
    behanceUrl: "https://www.behance.net/gallery/235551731/Neurartio",
    ...defaults("Neurart.io", "Brand Experience"),
    services: ["Brand Identity", "Creative Direction", "Motion", "UI Design"],
    gallery: [
      { type: "full", src: neurartAsset.url },
      { type: "text", body: "Neurart.io investiga a intersecção entre inteligência artificial e criação autoral, construindo um universo material e temporal próprio." },
      { type: "horizontal", src: neurartAsset.url },
    ],
  },
  {
    id: "joana-lili",
    slug: "joana-lili",
    title: "Joana e Lili",
    category: "Identidade Visual",
    year: "2024",
    cover: joanaLiliAsset.url,
    alt: "Capa do projeto Joana e Lili",
    summary: "Identidade refinada para salão de beleza alto padrão com leitura leve, elegante e sensorial.",
    behanceUrl: "https://www.behance.net/gallery/202966571/Identidade-visual-salao-de-beleza-alto-padrao",
    ...defaults("Joana e Lili", "Identidade Visual"),
    services: ["Brand Identity", "Visual Identity", "Packaging", "Art Direction"],
    gallery: [
      { type: "full", src: joanaLiliAsset.url },
      { type: "text", body: "Joana e Lili pede uma identidade que respire cuidado. Cada elemento foi construído a partir de gestos delicados e proporções sensíveis." },
      { type: "vertical", src: joanaLiliAsset.url },
    ],
  },
  {
    id: "sakkar",
    slug: "sakkar",
    title: "Sakkar",
    category: "Identidade Visual",
    year: "2022",
    cover: sakkarAsset.url,
    alt: "Capa do projeto Sakkar",
    summary: "Identidade com inspiração histórica, desenho simbólico marcante e paleta terrosa sofisticada.",
    behanceUrl: "https://www.behance.net/gallery/146643639/Sakkar",
    ...defaults("Sakkar", "Identidade Visual"),
    services: ["Brand Identity", "Logo Design", "Packaging", "Naming"],
    gallery: [
      { type: "full", src: "/images/sakkar-07.png" },
      { type: "text", body: "Sakkar nasce de um mergulho na memória cultural árabe, traduzida em desenho contemporâneo através de uma paleta terrosa e um símbolo autoral." },
      { type: "horizontal", src: "/images/sakkar-02.jpg", caption: "Sistema de embalagens e ponto de venda" },
      { type: "full", src: "/images/sakkar-03.jpg", caption: "Linha de café — variações de pack" },
      { type: "horizontal", src: "/images/sakkar-04.jpg", caption: "Cartão fidelidade — frente e verso" },
      { type: "full", src: "/images/sakkar-05.jpg", caption: "Padrão gráfico autoral" },
    ],
  },
  {
    id: "frexco",
    slug: "frexco",
    title: "Frexco",
    category: "UX/UI",
    year: "2023",
    cover: frexcoAsset.url,
    alt: "Capa do projeto Frexco",
    summary: "Interface mobile para o produtor de hortifrúti, com foco em clareza, fluidez e destaque do produto.",
    behanceUrl: "https://www.behance.net/gallery/156619871/Frexco-aplicativo-para-o-produtor-de-hortifruti",
    ...defaults("Frexco", "UX/UI"),
    services: ["UX Design", "UI Design", "Product Design", "Design System"],
    gallery: [
      { type: "full", src: frexcoAsset.url },
      { type: "text", body: "Frexco conecta produtores de hortifrúti ao mercado com uma interface que privilegia leitura rápida, foco no produto e clareza operacional." },
      { type: "vertical", src: frexcoAsset.url },
    ],
  },
  {
    id: "agronomy",
    slug: "agronomy",
    title: "Agronomy",
    category: "App Concept",
    year: "2022",
    cover: agronomyAsset.url,
    alt: "Capa do projeto Agronomy",
    summary: "Conceito visual voltado ao agro com apelo tecnológico, contexto de campo e presença mobile central.",
    behanceUrl: "https://www.behance.net/gallery/147671703/Agronomy",
    ...defaults("Agronomy", "App Concept"),
    services: ["UX Design", "UI Design", "Concept", "Visual Identity"],
    gallery: [
      { type: "full", src: agronomyAsset.url },
      { type: "text", body: "Agronomy propõe uma nova gramática visual para o agro brasileiro, aproximando tecnologia, campo e interface." },
      { type: "horizontal", src: agronomyAsset.url },
    ],
  },
  {
    id: "rolim-advogados",
    slug: "rolim-advogados",
    title: "Rolim Advogados",
    category: "Branding",
    year: "2025",
    cover: rolimAsset.url,
    alt: "Capa do projeto Rolim Advogados",
    summary: "Sistema visual institucional com presença sóbria, acabamento premium e linguagem corporativa contemporânea.",
    behanceUrl: "https://www.behance.net/gallery/235546869/Branding-Rolim-Advogados",
    ...defaults("Rolim Advogados", "Branding"),
    services: ["Brand Identity", "Visual Identity", "Brand Strategy", "Art Direction"],
    gallery: [
      { type: "full", src: rolimAsset.url },
      { type: "text", body: "Rolim Advogados constrói autoridade a partir de uma identidade sóbria, precisa e contemporânea, sustentada por um sistema tipográfico rigoroso." },
      { type: "horizontal", src: rolimAsset.url },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((p) => p.slug === slug) ?? null;
}

export function getAdjacentProjects(slug: string) {
  const i = portfolioProjects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  const prev = portfolioProjects[(i - 1 + portfolioProjects.length) % portfolioProjects.length];
  const next = portfolioProjects[(i + 1) % portfolioProjects.length];
  return { prev, next };
}
