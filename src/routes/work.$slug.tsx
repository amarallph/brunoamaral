import { createFileRoute, notFound } from "@tanstack/react-router";

import { getProjectBySlug, portfolioProjects } from "@/lib/portfolio-data";
import { CaseStudy } from "@/components/case/CaseStudy";
import { RouteErrorOverlay, RouteFallbackOverlay } from "@/components/RouteFallbackOverlay";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Projeto — Bruno Amaral" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.title.trim()} — ${project.category} · Bruno Amaral`;
    const description = project.summary;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: project.cover },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: project.cover },
      ],
    };
  },
  component: WorkSlug,
  pendingComponent: () => <RouteFallbackOverlay description="Abrindo projeto" />,
  errorComponent: RouteErrorOverlay,
  notFoundComponent: () => (
    <RouteFallbackOverlay title="Projeto não encontrado" description="Volte para a home." />
  ),
});

function WorkSlug() {
  const { project } = Route.useLoaderData();
  return (
    <div className="ec-page ec-page-case">
      <CaseStudy project={project} />
    </div>
  );
}

// Ensure the file is treated as a module even if tree-shaken imports change.
export const __allSlugs = portfolioProjects.map((p) => p.slug);
