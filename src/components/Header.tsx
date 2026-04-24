import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { treatments } from "@/lib/treatments";

const PRIMARY_NAV = [
  { label: "Locations", to: "/#locations" },
  { label: "About", to: "/about" },
  { label: "Membership", to: "/membership" },
  { label: "Contact", to: "/contact" },
];

const treatmentCategories = treatments.map((treatment) => ({
  label: treatment.category,
  to: `/treatments/${treatment.slug}`,
}));

function NavItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  const isHashHomeLink = to.startsWith("/#");

  if (isHashHomeLink) {
    return (
      <a
        href={to}
        onClick={onClick}
        className="text-sm font-medium text-[#0F0F0F]/70 transition-colors hover:text-[#C5A059]"
      >
        {label}
      </a>
    );
  }

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors ${
          isActive ? "text-[#C5A059]" : "text-[#0F0F0F]/70 hover:text-[#C5A059]"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-[#F9F9F7]/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-[0_8px_24px_rgba(15,15,15,0.08)]" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="font-serif text-xl tracking-wide text-[#0F0F0F]">
          Med Aesthetics <span className="text-[#C5A059]">Miami</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#0F0F0F]/70 transition-colors hover:text-[#C5A059]"
            >
              Treatments
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-full z-30 mt-3 w-72 translate-y-1 rounded-xl border border-[#E7E2D9] bg-white p-3 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {treatmentCategories.map((category) => (
                <Link
                  key={category.label}
                  to={category.to}
                  className="block rounded-lg px-3 py-2 text-sm text-[#0F0F0F]/75 transition-colors hover:bg-[#F5F0E8] hover:text-[#0F0F0F]"
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          {PRIMARY_NAV.map((item) => (
            <NavItem key={item.label} to={item.to} label={item.label} />
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="inline-flex h-10 items-center rounded-md bg-[#C5A059] px-5 text-sm font-medium text-[#0F0F0F] transition-colors hover:bg-[#b8944d]"
          >
            Book Consultation
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E7E2D9] text-[#0F0F0F] md:hidden"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-[60] md:hidden ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu overlay"
        />
        <aside
          className={`absolute right-0 top-0 h-full w-full bg-[#F9F9F7] p-6 transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" onClick={() => setDrawerOpen(false)} className="font-serif text-xl text-[#0F0F0F]">
              Med Aesthetics <span className="text-[#C5A059]">Miami</span>
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E7E2D9] text-[#0F0F0F]"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setTreatmentsOpen((current) => !current)}
              className="flex w-full items-center justify-between border-b border-[#E7E2D9] py-3 text-left text-base font-medium text-[#0F0F0F]"
            >
              <span>Treatments</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${treatmentsOpen ? "rotate-180" : ""}`} />
            </button>
            {treatmentsOpen && (
              <ul className="space-y-2 pl-3">
                {treatmentCategories.map((category) => (
                  <li key={category.label}>
                    <Link
                      to={category.to}
                      onClick={() => setDrawerOpen(false)}
                      className="block py-1 text-sm text-[#0F0F0F]/75 transition-colors hover:text-[#C5A059]"
                    >
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {PRIMARY_NAV.map((item) => (
              <div key={item.label} className="border-b border-[#E7E2D9] py-3">
                <NavItem to={item.to} label={item.label} onClick={() => setDrawerOpen(false)} />
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            onClick={() => setDrawerOpen(false)}
            className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-md bg-[#C5A059] px-5 text-sm font-medium text-[#0F0F0F] transition-colors hover:bg-[#b8944d]"
          >
            Book Consultation
          </Link>
        </aside>
      </div>
    </header>
  );
};

export default Header;
