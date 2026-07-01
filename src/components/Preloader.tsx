import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { portfolioProjects } from "@/lib/portfolio-data";

gsap.registerPlugin(CustomEase);
if (!CustomEase.get("editorial")) {
  CustomEase.create("editorial", "0.16,1,0.30,1");
}

type Props = { onDone: () => void };

async function waitForPageReady() {
  // Fonts loaded
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  } catch {}

  // Images decoded
  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>(".ec-shell-content img"));
  await Promise.all(
    imgs.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      if (typeof img.decode === "function") return img.decode().catch(() => undefined);
      return new Promise<void>((res) => {
        img.addEventListener("load", () => res(), { once: true });
        img.addEventListener("error", () => res(), { once: true });
      });
    }),
  );

  // Layout / hydration flush — two RAFs
  await new Promise<void>((res) => requestAnimationFrame(() => requestAnimationFrame(() => res())));
}

export function Preloader({ onDone }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const overlay = overlayRef.current!;
    const text = textRef.current!;
    const reel = reelRef.current!;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Overlay is fully opaque from the very first frame — no white flash
    gsap.set(overlay, { autoAlpha: 1, force3D: true });
    gsap.set(text, {
      autoAlpha: 0,
      scale: 0.975,
      filter: "blur(10px)",
      y: 18,
      force3D: true,
    });
    gsap.set(reel, {
      autoAlpha: 0,
      scale: 0.975,
      filter: "blur(10px)",
      y: 18,
      force3D: true,
    });

    // fast image cycle in the reel
    const imgs = reel.querySelectorAll<HTMLImageElement>("img");
    let idx = 0;
    imgs.forEach((el, i) => (el.style.opacity = i === 0 ? "1" : "0"));
    const cycle = window.setInterval(() => {
      if (!imgs.length) return;
      imgs[idx].style.opacity = "0";
      idx = (idx + 1) % imgs.length;
      imgs[idx].style.opacity = "1";
    }, 110);

    let cancelled = false;

    const revealPage = async () => {
      const app = document.querySelector<HTMLElement>(".ec-shell-content");
      if (!app) return;

      // Wait for fonts, images, layout before revealing
      await waitForPageReady();
      if (cancelled) return;

      gsap.set(app, {
        autoAlpha: 0,
        scale: 1.04,
        filter: "blur(14px)",
        y: 28,
        force3D: true,
        visibility: "visible",
      });
      app.setAttribute("data-ready", "true");

      gsap.to(app, {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.8,
        ease: "editorial",
      });

      const blocks = app.querySelectorAll<HTMLElement>("[data-reveal]");
      if (blocks.length) {
        gsap.fromTo(
          blocks,
          { autoAlpha: 0, y: 18, scale: 0.975, filter: "blur(10px)" },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "editorial",
            stagger: 0.14,
          },
        );
      }
    };

    // ~6.2s cinematic timeline
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        window.clearInterval(cycle);
        onDone();
      },
    });

    // 0.00–0.35s — freeze / anticipation (overlay already covers)
    tl.to({}, { duration: 0.35 })
      // 0.35–1.25s — intro text emerges
      .to(text, {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.9,
        ease: "editorial",
      })
      .to(
        reel,
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.9,
          ease: "editorial",
        },
        "<",
      )
      // 1.25–2.15s — hold to breathe
      .to({}, { duration: 0.9 })
      // 2.15–2.85s — intro text drifts out
      .to(text, {
        autoAlpha: 0,
        scale: 1.015,
        filter: "blur(8px)",
        y: -6,
        duration: 0.7,
        ease: "editorial",
      })
      .to(
        reel,
        {
          autoAlpha: 0,
          scale: 1.015,
          filter: "blur(8px)",
          y: -6,
          duration: 0.7,
          ease: "editorial",
        },
        "<",
      )
      // 2.85s — begin revealing page underneath the still-opaque overlay
      .add(revealPage)
      // 2.85–3.55s — hold black while page settles underneath
      .to({}, { duration: 0.7 })
      // 3.55–5.35s — overlay fades away slowly, exposing the revealed page
      .to(overlay, {
        autoAlpha: 0,
        duration: 1.8,
        ease: "editorial",
      })
      // 5.35–6.20s — final settle
      .to({}, { duration: 0.85 });

    return () => {
      cancelled = true;
      tl.kill();
      window.clearInterval(cycle);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, onDone]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="ec-preloader-gsap"
      aria-hidden="true"
      style={{ willChange: "transform, opacity, filter", opacity: 1 }}
    >
      <div ref={textRef} className="ec-preloader-gsap-text">
        Bruno Amaral — Creative Director
      </div>
      <div ref={reelRef} className="ec-preloader-gsap-reel">
        {portfolioProjects.map((p) => (
          <img key={p.id} src={p.cover} alt="" />
        ))}
      </div>
    </div>,
    document.body,
  );
}
