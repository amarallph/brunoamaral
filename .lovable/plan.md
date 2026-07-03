# Expansão para Portfólio Completo

Objetivo: transformar o site em ecossistema navegável mantendo 100% da Home atual intocada (identidade visual, loader, tipografia, cores, grid, animações e navbar existentes).

## Regra invariável
- Nenhum arquivo da Home será modificado além de adicionar `<Link>` nas capas dos projetos (mesmo comportamento visual, apenas passa a navegar em vez de abrir modal).
- Reutilizar tokens de `src/styles.css`, tipografia (Archivo Black / Instrument Serif / Manrope) e paleta já definida.
- GSAP já instalado; usaremos para reveals sutis (fade + translateY + mask).

## 1. Modelo de dados estendido
Estender `src/lib/portfolio-data.ts` com estrutura editorial por projeto:
```ts
type CaseStudy = {
  ...campos atuais,
  slug, client, services[], role,
  overview, context, problem, objectives,
  solution, results, insights, conclusion,
  process: { step, description }[],
  gallery: { type: 'full'|'vertical'|'horizontal'|'grid'|'text'|'video', src?, caption?, body? }[],
}
```
Conteúdo inicial preenchido com o material já existente + placeholders editoriais coerentes com cada projeto (categoria, cliente inferido do Behance). Usuário poderá refinar depois.

## 2. Rotas novas (TanStack file-based)
```
src/routes/
  work.$slug.tsx       → página de case individual
  studio.tsx           → página Studio
  lab.tsx              → grid experimental
  contact.tsx          → formulário + contatos
```
Cada rota com `head()` próprio (title, description, og:title/description).

## 3. Componentes reutilizáveis (`src/components/case/`)
- `ProjectHero` — nome, categoria, cliente, ano, serviços
- `ProjectInfo` — bloco lateral com Client / Year / Category / Services
- `ProjectOverview` — texto editorial
- `ProjectProcess` — timeline Discovery→Launch
- `ProjectGallery` — alterna full/vertical/horizontal/grid/text/video
- `ProjectResults` — resultados + insights + conclusion
- `ProjectNavigation` — Previous / Next
- `BackButton` — ← Back (preserva scroll da Home via `sessionStorage`)
- `CloseButton` — fecha e retorna para Home mantendo posição

## 4. Componentes globais (`src/components/`)
- `FullscreenMenu` — overlay preto com HOME / WORK / STUDIO / LAB / CONTACT em Archivo Black grande, redes sociais, email; animação GSAP stagger
- `SiteFooter` — logo, descrição, menu, contato, redes, copyright
- `SmartCursor` — cursor customizado com estados VIEW/OPEN/NEXT/BACK/CLOSE/SCROLL via `data-cursor` attribute
- `ScrollReveal` — wrapper GSAP (fade + translateY, IntersectionObserver)

## 5. Integração na Home
- Envolver cada capa em `<Link to="/work/$slug" params={{slug}}>` (substitui modal atual).
- Salvar `window.scrollY` em `sessionStorage` antes de navegar; restaurar ao voltar.
- Adicionar `<SiteFooter />` no final de `__root.tsx` via Outlet (não altera Home visualmente além de rodapé consistente).
- Adicionar botão de menu fullscreen no header existente (sem redesenhar navbar).

## 6. Página Studio
Hero + Manifesto + Metodologia + Serviços + Clientes + Processo + Ferramentas + CTA — tipografia editorial, muito espaço negativo.

## 7. Página Lab
Grid minimalista de experimentos (usar assets existentes como placeholder), hover elegante, filtros por tipo (Motion / 3D / Concept / Study).

## 8. Página Contact
Título grande, texto institucional, formulário (Nome, Empresa, Email, Mensagem) com `mailto:` inicial (sem backend), redes sociais, email.

## 9. Cases individuais (`/work/$slug`)
Ritmo alternado: hero → info → overview → full image → texto → grid → processo → resultados → galeria vertical/horizontal → conclusão → Previous/Next. Cada bloco com ScrollReveal.

## 10. Cursor & scroll
- Cursor global montado em `__root.tsx`, desativa em touch devices.
- Scroll reveals discretos (duração 0.8s, ease `0.16,1,0.30,1` — mesma do loader).
- Scroll restoration via `sessionStorage['home_scroll']`.

## Detalhes técnicos
- Rotas: `createFileRoute("/work/$slug")` com loader que busca em `portfolioProjects`; throw `notFound()` se não encontrar.
- `errorComponent` e `notFoundComponent` em cada rota nova.
- Sem backend: formulário Contact usa `mailto:` (posso trocar por server function depois se pedir).
- Sem novos pacotes além de GSAP (já instalado).

## Entregáveis nesta fase
1. Modelo de dados + conteúdo editorial dos 9 projetos
2. 4 rotas novas
3. ~13 componentes novos
4. Menu fullscreen + Footer + Cursor + BackButton funcional
5. Links das capas da Home ligados aos cases
6. Scroll preservado ao voltar

## Fora do escopo (confirmar depois se quiser)
- CMS / backend para conteúdo dinâmico
- Envio real de email do formulário (integrar Resend via Lovable Cloud)
- Vídeos reais dos cases (placeholders enquanto não enviar)
- Conteúdo real de Studio / Lab (texto placeholder editorial até você aprovar copy)

Confirma este plano para eu implementar? Se quiser priorizar apenas parte (ex.: só Work cases + menu fullscreen primeiro), me diga.
