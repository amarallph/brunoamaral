import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouterState } from "@tanstack/react-router";

import { waitForPageReady } from "@/lib/page-ready";

export function RootTransitionOverlay() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const isRouting = useRouterState({
    select: (state) => state.status === "pending" || state.isLoading || state.isTransitioning,
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    let cancelled = false;

    if (isRouting) {
      setVisible(true);
      return () => {
        cancelled = true;
      };
    }

    waitForPageReady().finally(() => {
      if (!cancelled) setVisible(false);
    });

    return () => {
      cancelled = true;
    };
  }, [isRouting, mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="ec-root-transition-overlay"
      data-visible={visible ? "true" : "false"}
      aria-hidden={!visible}
    >
      <div className="ec-root-transition-overlay-label">Bruno Amaral — Creative Director</div>
    </div>,
    document.body,
  );
}
