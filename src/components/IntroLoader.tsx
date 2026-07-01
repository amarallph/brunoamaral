import { useEffect, useState } from "react";
import { Preloader } from "./Preloader";
import { hideInitialOverlay } from "@/lib/initial-overlay";

const INTRO_KEY = "bruno_amaral_intro_shown";

/**
 * Mounts the intro loader exactly once per browser session.
 * Route transitions never remount this — it's owned by the root layout.
 */
export function IntroLoader() {
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(INTRO_KEY);
      if (!seen) {
        setShow(true);
      } else {
        hideInitialOverlay();
      }
    } catch {
      setShow(true);
    }
    setChecked(true);
  }, []);

  const handleDone = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    hideInitialOverlay();
    setShow(false);
  };

  if (!checked || !show) return null;
  return <Preloader onDone={handleDone} />;
}
