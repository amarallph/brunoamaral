import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { portfolioProjects } from "@/lib/portfolio-data";

gsap.registerPlugin(CustomEase);
if (!CustomEase.get("editorial")) {
  CustomEase.create("editorial", "0.22,1,0.36,1");
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

    // lock scroll during transition
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    gsap.set(overlay, { autoAlpha: 1, force3D: true });
    gsap.set(text, {
      autoAlpha: 0,
      scale: 0.96,
      filter: "blur(4px)",
      y: 8,
      force3D: true,
    });
    gsap.set(reel, {
      autoAlpha: 0,
      scale: 0.96,
      filter: "blur(6px)",
      y: 12,
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
        scale: 1.02,
        filter: "blur(8px)",
        y: 24,
        force3D: true,
      });
      gsap.to(app, {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.1,
        ease: "editorial",
      });

      const blocks = app.querySelectorAll<HTMLElement>("[data-reveal]");
      if (blocks.length) {
        gsap.fromTo(
          blocks,
          { autoAlpha: 0, y: 20, scale: 0.985, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "editorial",
            stagger: 0.08,
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

    tl.to(text, {
      autoAlpha: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 0.45,
      ease: "editorial",
    })
      .to(
        reel,
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.55,
          ease: "editorial",
        },
        "<",
      )
      .to({}, { duration: 0.25 })
      .to(text, {
        autoAlpha: 0,
        scale: 1.01,
        filter: "blur(6px)",
        duration: 0.35,
        ease: "editorial",
      })
      .to(
        reel,
        {
          autoAlpha: 0,
          scale: 1.01,
          filter: "blur(6px)",
          duration: 0.35,
          ease: "editorial",
        },
        "<",
      )
      .add(revealPage, "-=0.15")
      .to(
        overlay,
        {
          autoAlpha: 0,
          duration: 1.1,
          ease: "editorial",
        },
        "-=0.9",
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
