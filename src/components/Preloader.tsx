import { useEffect, useState } from "react";
import { portfolioProjects } from "@/lib/portfolio-data";

type Props = {
  onDone: () => void;
};

export function Preloader({ onDone }: Props) {
  const [thumbIndex, setThumbIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "flash" | "done">("intro");

  // Rapidly cycle through portfolio covers
  useEffect(() => {
    const id = window.setInterval(() => {
      setThumbIndex((i) => (i + 1) % portfolioProjects.length);
    }, 110);
    return () => window.clearInterval(id);
  }, []);

  // Sequence: intro (black) -> flash to white -> done
  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("flash"), 14100);
    const t2 = window.setTimeout(() => {
      setPhase("done");
      onDone();
    }, 15000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div className={`ec-preloader ec-preloader-${phase}`} aria-hidden="true">
      <div className="ec-preloader-header">
        <span>Bruno Amaral</span>
        <span>Studio&nbsp;&nbsp;Lab</span>
      </div>

      <div className="ec-preloader-center">
        Bruno Amaral — Creative Director
      </div>

      <div className="ec-preloader-footer">
        <span>Creative Studio</span>
        <span>Email Us</span>
      </div>

      <div className="ec-preloader-thumb">
        <img src={portfolioProjects[thumbIndex].cover} alt="" />
      </div>
    </div>
  );
}
