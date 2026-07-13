import { useEffect, useState } from "react";
import { Preloader } from "./Preloader";
import { hideInitialOverlay } from "@/lib/initial-overlay";

/**
 * Mounts the intro loader on every full page reload.
 * Route transitions never remount this — it's owned by the root layout.
 */
export function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    hideInitialOverlay();
  }, []);

  const handleDone = () => {
    hideInitialOverlay();
    setShow(false);
  };

  if (!show) return null;
  return <Preloader onDone={handleDone} />;
}
