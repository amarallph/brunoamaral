import type { ReactNode } from "react";

type RouteFallbackOverlayProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
};

const DEFAULT_TITLE = "Bruno Amaral — Creative Director";

function renderTitleWithBoldName(title: string) {
  const idx = title.indexOf("Bruno Amaral");
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <strong>Bruno Amaral</strong>
      {title.slice(idx + "Bruno Amaral".length)}
    </>
  );
}

export function RouteFallbackOverlay({
  title = DEFAULT_TITLE,
  description = "Carregando",
  children,
}: RouteFallbackOverlayProps) {
  return (
    <div className="ec-route-fallback" role="status" aria-live="polite">
      <div className="ec-route-fallback-inner">
        <p className="ec-route-fallback-title">{renderTitleWithBoldName(title)}</p>
        <p className="ec-route-fallback-description">{description}</p>
        {children ? <div className="ec-route-fallback-actions">{children}</div> : null}
      </div>
    </div>
  );
}

export function RoutePendingOverlay() {
  return <RouteFallbackOverlay />;
}

export function RouteErrorOverlay({ reset }: { error?: Error; reset?: () => void }) {
  return (
    <RouteFallbackOverlay description="O conteúdo será recarregado em instantes.">
      <button type="button" onClick={() => reset?.()}>
        Tentar novamente
      </button>
      <a href="/">Voltar para home</a>
    </RouteFallbackOverlay>
  );
}