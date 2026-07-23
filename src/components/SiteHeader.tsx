import { Link } from "@tanstack/react-router";

import { profile } from "@/lib/portfolio-data";

/**
 * Shared top header used on all interior pages (Studio, Lab, Contact,
 * project cases). Mirrors the Home header positioning exactly so the
 * "Studio" and "Lab" links always sit in the same spot.
 */
export function SiteHeader() {
  return (
    <header className="ec-header">
      <Link to="/" className="ec-brand">
        {profile.name}
      </Link>
      <span aria-hidden="true" />
      <div className="ec-header-right">
        <Link to="/studio">
          <strong>Studio</strong>
        </Link>
        <Link to="/lab">
          <strong>Lab</strong>
        </Link>
      </div>
    </header>
  );
}
