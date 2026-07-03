import { useRouter } from "@tanstack/react-router";

export function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="ec-back-btn"
      data-cursor="back"
      onClick={() => {
        // Prefer real back so scroll is preserved by the browser
        if (window.history.length > 1) {
          router.history.back();
        } else {
          router.navigate({ to: "/" });
        }
      }}
    >
      ← {label}
    </button>
  );
}
