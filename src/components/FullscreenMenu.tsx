import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useRouterState } from "@tanstack/react-router";

import { profile } from "@/lib/portfolio-data";

const items = [
  { label: "HOME", to: "/" },
  { label: "WORK", to: "/#work", hash: true },
  { label: "STUDIO", to: "/studio" },
  { label: "LAB", to: "/lab" },
  { label: "CONTACT", to: "/contact" },
] as const;

export function FullscreenMenu({ alwaysShowTrigger = false }: { alwaysShowTrigger?: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const trigger = (
    <button
      type="button"
      className="ec-menu-trigger"
      onClick={() => setOpen(true)}
      aria-label="Abrir menu"
    >
      <span />
      <span />
    </button>
  );

  const overlay = open && mounted
    ? createPortal(
        <div className="ec-menu-overlay" role="dialog" aria-modal="true">
          <button
            type="button"
            className="ec-menu-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            Close
          </button>

          <nav className="ec-menu-nav" aria-label="Menu principal">
            <ul>
              {items.map((it, i) => (
                <li
                  key={it.label}
                  style={{
                    animationDelay: `${120 + i * 80}ms`,
                  }}
                >
                  {"hash" in it && it.hash ? (
                    <a href={it.to} onClick={() => setOpen(false)}>
                      {it.label}
                    </a>
                  ) : (
                    <Link to={it.to} onClick={() => setOpen(false)}>
                      {it.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="ec-menu-footer">
            <div>
              <span className="ec-menu-label">Contact</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div>
              <span className="ec-menu-label">Elsewhere</span>
              <a href={profile.behanceUrl} target="_blank" rel="noreferrer">
                Behance
              </a>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  const showTrigger = alwaysShowTrigger || !isHome;

  return (
    <>
      {showTrigger ? trigger : null}
      {overlay}
    </>
  );

}
