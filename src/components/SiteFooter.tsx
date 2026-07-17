import { Link } from "@tanstack/react-router";
import { profile } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="ec-site-footer">
      <div className="ec-site-footer-inner">
        <div className="ec-site-footer-col">
          <p className="ec-site-footer-brand">{profile.name}</p>
          <p className="ec-site-footer-desc">{profile.bio}</p>
        </div>

        <div className="ec-site-footer-col">
          <span className="ec-site-footer-label">Menu</span>
          <Link to="/">Home</Link>
          <Link to="/studio">Studio</Link>
          <Link to="/lab">Lab</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="ec-site-footer-col">
          <span className="ec-site-footer-label">Contact</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.behanceUrl} target="_blank" rel="noreferrer">
            Behance
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>

      <div className="ec-site-footer-bottom">
        <span>© {new Date().getFullYear()} Bruno Amaral. All rights reserved.</span>
        <span>Made with care in São Paulo</span>
      </div>
    </footer>
  );
}
