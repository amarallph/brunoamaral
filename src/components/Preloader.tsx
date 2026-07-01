import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { portfolioProjects } from "@/lib/portfolio-data";

gsap.registerPlugin(CustomEase);
if (!CustomEase.get("editorial")) {
  CustomEase.create("editorial", "0.16,1,0.30,1");
}

const VISITED_KEY = "ba_intro_played";

async function waitForPageReady() {
  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  } catch {}
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
  await new Promise<void>((res) => requestAnimationFrame(() => requestAnimationFrame(() => res())));
}

export function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [shouldRun, setShouldRun] = useState(false);

  useEffect(() => {
    // Intro plays once per session — never on internal transitions
    let played = false;
    try {
      played = sessionStorage.getItem(VISITED_KEY) === "1";
    } catch {}
    if (!played) {
      setShouldRun(true);
      setMounted(true);
    } else {
      // Ensure content is visible without the intro
      const app = document.querySelector<HTMLElement>(".ec-shell-content");
      if (app) app.setAttribute("data-ready", "true");
    }
  }, []);

  useEffect(() => {
    if (!mounted || !shouldRun) return;
    const overlay = overlayRef.current!;
    const text = textRef.current!;
    const reel = reelRef.current!;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    gsap.set(overlay, { autoAlpha: 1, force3D: true });
    gsap.set([text, reel], {
      autoAlpha: 0,
      scale: 0.975,
      filter: "blur(10px)",
      y: 18,
      force3D: true,
    });

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

    // Kick off page-ready wait in parallel with intro animation so the reveal
    // can start the moment intro drifts out — no idle black frame.
    const readyPromise = waitForPageReady();

    const revealPage = async () => {
      const app = document.querySelector<HTMLElement>(".ec-shell-content");
      if (!app) return;
      await readyPromise;
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
        duration: 1.6,
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
            duration: 1.4,
            ease: "editorial",
            stagger: 0.12,
          },
        );
      }
    };

    // Continuous overlapping timeline — no static full-opacity hold.
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        window.clearInterval(cycle);
        try {
          sessionStorage.setItem(VISITED_KEY, "1");
        } catch {}
      },
    });

    tl.to({}, { duration: 0.25 })
      .to(text, { autoAlpha: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 0.9, ease: "editorial" })
      .to(reel, { autoAlpha: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 0.9, ease: "editorial" }, "<")
      // Intro drift-out begins while overlay still opaque — overlaps ~50% with reveal
      .to(text, { autoAlpha: 0, scale: 1.015, filter: "blur(8px)", y: -6, duration: 0.75, ease: "editorial" }, "+=0.7")
      .to(reel, { autoAlpha: 0, scale: 1.015, filter: "blur(8px)", y: -6, duration: 0.75, ease: "editorial" }, "<")
      // Start revealing the page underneath as intro fades — overlaps
      .add(revealPage, "-=0.55")
      // Overlay fade overlaps the page reveal by ~40% so nothing sits static
      .to(overlay, { autoAlpha: 0, duration: 1.3, ease: "editorial" }, "-=0.35");

    return () => {
      cancelled = true;
      tl.kill();
      window.clearInterval(cycle);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, shouldRun]);

  if (!mounted || !shouldRun) return null;

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
