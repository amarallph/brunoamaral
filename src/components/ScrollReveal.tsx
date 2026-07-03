import { createElement, useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/**
 * Discrete scroll reveal — fade + translateY, IntersectionObserver based.
 * Matches the editorial ease used in the intro loader.
 */
export function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  as: Tag = "div",
  className,
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = `translate3d(0, ${y}px, 0)`;
    el.style.transition = `opacity 900ms cubic-bezier(0.16,1,0.30,1) ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.30,1) ${delay}ms`;
    el.style.willChange = "opacity, transform";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translate3d(0,0,0)";
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, y]);

  return createElement(Tag, { ref, className, style }, children);
}
