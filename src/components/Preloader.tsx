import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { portfolioProjects } from "@/lib/portfolio-data";
import { hideInitialOverlay } from "@/lib/initial-overlay";
import { waitForPageReady } from "@/lib/page-ready";

type Props = { onDone: () => void };

export function Preloader({ onDone }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const startedRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted) hideInitialOverlay();
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    let disposeTimeline: (() => void) | undefined;

    const finishOnce = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      onDone();
    };

    const runTimeline = async () => {
      const [{ default: gsap }, { CustomEase }] = await Promise.all([
        import("gsap"),
        import("gsap/CustomEase"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(CustomEase);
      if (!CustomEase.get("editorial")) {
        CustomEase.create("editorial", "0.16,1,0.30,1");
      }

      const overlay = overlayRef.current;
      const text = textRef.current;
      const reel = reelRef.current;
      if (!overlay || !text || !reel) {
        finishOnce();
        return;
      }

      // Lock scroll WITHOUT changing viewport width (scrollbar-gutter: stable on <html> holds the gutter).
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // The overlay is rendered via portal at full opacity from frame 1, so the
      // app shell underneath is already covered — no need to touch its inline
      // styles before hydration.
      const app = document.querySelector<HTMLElement>(".ec-shell-content");

      gsap.set(overlay, { autoAlpha: 1, force3D: true });
      gsap.set([text, reel], {
        autoAlpha: 0,
        scale: 0.975,
        filter: "blur(10px)",
        y: 18,
        force3D: true,
      });

      // reel image cycle
      const imgs = reel.querySelectorAll<HTMLImageElement>("img");
      let idx = 0;
      imgs.forEach((el, i) => (el.style.opacity = i === 0 ? "1" : "0"));
      const cycle = window.setInterval(() => {
        if (!imgs.length) return;
        imgs[idx].style.opacity = "0";
        idx = (idx + 1) % imgs.length;
        imgs[idx].style.opacity = "1";
      }, 110);

      // Kick off the readiness check in parallel with the intro so the reveal
      // fires the instant the page is ready — never sits on a static frame.
      const readyPromise = waitForPageReady();

      const armAppForReveal = () => {
        if (!app) return;
        gsap.set(app, {
          autoAlpha: 0,
          scale: 1.04,
          filter: "blur(14px)",
          y: 28,
          force3D: true,
        });
        app.style.visibility = "visible";
        app.setAttribute("data-ready", "true");
      };

      const cleanup = () => {
        document.body.style.overflow = prevOverflow;
        if (app) {
          const revealBlocks = Array.from(app.querySelectorAll<HTMLElement>("[data-reveal]"));
          gsap.set([app, ...revealBlocks], {
            clearProps: "transform,filter,opacity,visibility,willChange",
          });
        }
        window.clearInterval(cycle);
      };

      // ~8s continuously overlapping timeline — never a static frame.
      const tl = gsap.timeline({
        onComplete: () => {
          cleanup();
          finishOnce();
        },
      });

      // Intro text + reel emerge together
      tl.to(
        text,
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.1,
          ease: "editorial",
        },
        0.3,
      )
        .to(
          reel,
          {
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1.1,
            ease: "editorial",
          },
          0.3,
        )
        // Intro text drifts out — overlaps the previous phase
        .to(
          [text, reel],
          {
            autoAlpha: 0,
            scale: 1.015,
            filter: "blur(8px)",
            y: -8,
            duration: 0.9,
            ease: "editorial",
          },
          3.5,
        )
        // Reveal the page underneath, waiting only if it isn't ready yet.
        .add(async () => {
          await readyPromise;
          if (cancelled) return;

          if (!app) {
            gsap.to(overlay, {
              autoAlpha: 0,
              duration: 0.8,
              ease: "editorial",
            });
            return;
          }

          armAppForReveal();
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
                stagger: 0.1,
              },
            );
          }
        }, 5.5)
        // Overlay fades away in parallel with the page reveal — no static black hold.
        .to(
          overlay,
          {
            autoAlpha: 0,
            duration: 1.4,
            ease: "editorial",
          },
          6.0,
        )
        // Short tail so the timeline resolves after the reveal settles.
        .to({}, { duration: 0.6 });

      disposeTimeline = () => {
        tl.kill();
        cleanup();
      };
    };

    runTimeline().catch((error) => {
      console.error(error);
      finishOnce();
    });

    return () => {
      cancelled = true;
      disposeTimeline?.();
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
        Bruno Amaral - Creative Studio
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
