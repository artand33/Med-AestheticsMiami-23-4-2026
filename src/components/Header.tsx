import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useBooking } from "@/components/BookingDialog";

const PRIMARY_NAV = [
  { label: "Why Us", to: "#why-us" },
  { label: "Transformations", to: "#transformations" },
  { label: "Locations", to: "#locations" },
  { label: "About", to: "#about" },
  { label: "Membership", to: "#membership" },
  { label: "FAQ", to: "#faq" },
  { label: "Contact", to: "#contact" },
];

const Header = () => {
  const { open } = useBooking();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const desktopMenuRef = useRef<HTMLDivElement | null>(null);
  const desktopMenuTriggerRef = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    if (!desktopMenuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!desktopMenuRef.current?.contains(event.target as Node)) {
        setDesktopMenuOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopMenuOpen(false);
        desktopMenuTriggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [desktopMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-ivory/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-[0_8px_24px_rgba(15,15,15,0.08)]" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="#top" className="font-serif text-xl tracking-wide text-ink">
          Med Aesthetics <span className="text-gold">Miami</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <div
            ref={desktopMenuRef}
            className="relative"
            onMouseEnter={() => setDesktopMenuOpen(true)}
            onMouseLeave={() => setDesktopMenuOpen(false)}
            onFocus={() => setDesktopMenuOpen(true)}
            onBlur={(event) => {
              if (!desktopMenuRef.current?.contains(event.relatedTarget as Node | null)) {
                setDesktopMenuOpen(false);
              }
            }}
          >
            <button
              ref={desktopMenuTriggerRef}
              type="button"
              aria-haspopup="true"
              aria-expanded={desktopMenuOpen}
              aria-controls="treatments-menu"
              onClick={() => setDesktopMenuOpen((value) => !value)}
              className="inline-flex items-center gap-1 rounded text-sm font-medium text-ink/70 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              Treatments
              <ChevronDown
                className={`h-4 w-4 transition-transform ${desktopMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              id="treatments-menu"
              role="menu"
              aria-label="Treatments menu"
              className={`absolute left-0 top-full z-30 mt-3 w-72 rounded-xl border border-[#E7E2D9] bg-white p-3 shadow-lg transition-all ${
                desktopMenuOpen
                  ? "visible translate-y-0 opacity-100"
                  : "pointer-events-none invisible -translate-y-1 opacity-0"
              }`}
            >
              <a
                role="menuitem"
                href="#treatments"
                onClick={() => setDesktopMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-ink/75 transition-colors hover:bg-[#F5F0E8] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55"
              >
                All Treatments
              </a>
              <a
                role="menuitem"
                href="#journey"
                onClick={() => setDesktopMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-ink/75 transition-colors hover:bg-[#F5F0E8] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55"
              >
                Your Journey
              </a>
              <button
                role="menuitem"
                type="button"
                onClick={() => {
                  setDesktopMenuOpen(false);
                  open();
                }}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-ink/75 transition-colors hover:bg-[#F5F0E8] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55"
              >
                Book Consultation
              </button>
            </div>
          </div>

          {PRIMARY_NAV.map((item) => (
            <a
              key={item.label}
              href={item.to}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => open()}
            className="premium-btn premium-btn-gold inline-flex h-10 items-center rounded-md bg-gold px-5 text-sm font-medium tracking-wide text-ink hover:bg-gold/90"
          >
            Book Consultation
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E7E2D9] text-ink transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 md:hidden"
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
          className={`absolute right-0 top-0 h-full w-full bg-ivory p-6 transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <a href="#top" onClick={() => setDrawerOpen(false)} className="font-serif text-xl text-ink">
              Med Aesthetics <span className="text-gold">Miami</span>
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E7E2D9] text-ink transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
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
              className="flex w-full items-center justify-between border-b border-[#E7E2D9] py-3 text-left text-base font-medium text-ink"
            >
              <span>Treatments</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${treatmentsOpen ? "rotate-180" : ""}`} />
            </button>
            {treatmentsOpen && (
              <ul className="space-y-2 pl-3">
                <li>
                  <a href="#treatments" onClick={() => setDrawerOpen(false)} className="block py-1 text-sm text-ink/75 transition-colors hover:text-gold">All Treatments</a>
                </li>
                <li>
                  <a href="#journey" onClick={() => setDrawerOpen(false)} className="block py-1 text-sm text-ink/75 transition-colors hover:text-gold">Your Journey</a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      open();
                    }}
                    className="block py-1 text-sm text-ink/75 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                  >
                    Book Consultation
                  </button>
                </li>
              </ul>
            )}

            {PRIMARY_NAV.map((item) => (
              <div key={item.label} className="border-b border-[#E7E2D9] py-3">
                <a
                  href={item.to}
                  onClick={() => setDrawerOpen(false)}
                  className="text-sm font-medium text-ink/70 transition-colors hover:text-gold"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setDrawerOpen(false);
              open();
            }}
            className="premium-btn premium-btn-gold mt-8 inline-flex h-11 w-full items-center justify-center rounded-md bg-gold px-5 text-sm font-medium tracking-wide text-ink hover:bg-gold/90"
          >
            Book Consultation
          </button>
        </aside>
      </div>
    </header>
  );
};

export default Header;
