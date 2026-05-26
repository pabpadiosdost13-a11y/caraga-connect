import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
          </div>
          <h3 className="mt-3 text-base font-semibold text-foreground">
            DOST Caraga — MSME Innovation & Service Navigator
          </h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Your digital front door to all DOST Caraga services. Discover, understand, and access the right support for your business.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary">Service Catalog</Link></li>
            <li><Link to="/directory" className="hover:text-primary">Office Directory</Link></li>
            <li><Link to="/wizard" className="hover:text-primary">Find the Right Help</Link></li>
            <li><Link to="/stories" className="hover:text-primary">Success Stories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Contact DOST Caraga</h4>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>DOST Caraga Compound, J.C. Aquino Ave., Butuan City</li>
            <li>(085) 342-5675</li>
            <li>region13@dost.gov.ph</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Department of Science and Technology — Caraga Region. A service discovery platform — official booking happens on DOST portals.
        </div>
      </div>
    </footer>
  );
}