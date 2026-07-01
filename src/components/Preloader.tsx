import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { portfolioProjects } from "@/lib/portfolio-data";

gsap.registerPlugin(CustomEase);
if (!CustomEase.get("editorial")) {
  CustomEase.create("editorial", "0.16,1,0.30,1");
}

type Props = { onDone: () => void };

export function Preloader({ onDone }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current!;
    const text = textRef.current!;
    const reel = reelRef.current!;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Overlay starts transparent so it can fade in slowly (anticipation)
    gsap.set(overlay, { autoAlpha: 0, force3D: true });
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
      imgs[idx].style.opacity = "0";
      idx = (idx + 1) % imgs.length;
      imgs[idx].style.opacity = "1";
    }, 110);

    const revealPage = () => {
      const app = document.querySelector<HTMLElement>(".ec-shell-content");
      if (!app) return;
      gsap.set(app, {
        autoAlpha: 0,
        scale: 1.04,
        filter: "blur(14px)",
        y: 28,
        force3D: true,
      });
      // Long, slow reveal — the page keeps gaining focus
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

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        window.clearInterval(cycle);
        onDone();
      },
    });

    // 0.00–0.35s — anticipation (nothing changes immediately)
    tl.to({}, { duration: 0.35 })
      // 0.35–1.25s — black overlay slowly covers the screen
      .to(overlay, {
        autoAlpha: 1,
        duration: 0.9,
        ease: "editorial",
      })
      // 1.20–2.00s — intro text emerges (still micro-moving through 1.6s)
      .to(
        text,
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.8,
          ease: "editorial",
        },
        "-=0.05",
      )
      .to(
        reel,
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.8,
          ease: "editorial",
        },
        "<",
      )
      // 2.00–2.90s — hold to breathe
      .to({}, { duration: 0.9 })
      // ~2.90–3.60s — intro text drifts out
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
      // Start the page reveal while the text is still leaving (overlaps)
      .add(revealPage, "-=0.55")
      // Overlay dissolves slowly, ending around 4.2s
      .to(
        overlay,
        {
          autoAlpha: 0,
          duration: 1.4,
          ease: "editorial",
        },
        "-=0.55",
      );

    return () => {
      tl.kill();
      window.clearInterval(cycle);
      document.body.style.overflow = prevOverflow;
    };
  }, [onDone]);

  return (
    <div
      ref={overlayRef}
      className="ec-preloader-gsap"
      aria-hidden="true"
      style={{ willChange: "transform, opacity, filter" }}
    >
      <div ref={textRef} className="ec-preloader-gsap-text">
        Bruno Amaral — Creative Director
      </div>
      <div ref={reelRef} className="ec-preloader-gsap-reel">
        {portfolioProjects.map((p) => (
          <img key={p.id} src={p.cover} alt="" />
        ))}
      </div>
    </div>
  );
}
