import { Instagram, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { treatments } from "@/lib/treatments";
import { locations } from "@/lib/locations";

const Footer = () => {
  return (
    <footer className="bg-ink text-ivory/85">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div>
          <a href="#top" className="font-serif text-2xl text-ivory">
            Med Aesthetics <span className="text-gold">Miami</span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-ivory/70">
            Elevated medical aesthetics for natural, confidence-first results across Miami.
          </p>
          <p className="mt-4 inline-flex items-center gap-1 text-sm text-gold">
            <Star className="h-4 w-4 fill-gold text-gold" />
            4.9/5 based on 340+ patient reviews
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">Treatments</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {treatments.slice(0, 6).map((treatment) => (
              <li key={treatment.slug}>
                <a href="#treatments" className="text-ivory/70 transition-colors hover:text-ivory">
                  {treatment.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">Locations</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {locations.slice(0, 3).map((location) => (
              <li key={location.id}>
                <a href="#locations" className="text-ivory/70 transition-colors hover:text-ivory">
                  {location.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#about" className="text-ivory/70 transition-colors hover:text-ivory">About</a></li>
            <li><a href="#journey" className="text-ivory/70 transition-colors hover:text-ivory">Journey</a></li>
            <li><a href="#membership" className="text-ivory/70 transition-colors hover:text-ivory">Membership</a></li>
            <li><a href="#faq" className="text-ivory/70 transition-colors hover:text-ivory">FAQ</a></li>
            <li><a href="#contact" className="text-ivory/70 transition-colors hover:text-ivory">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="container flex flex-col gap-4 py-5 text-xs text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Med Aesthetics Miami. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="transition-colors hover:text-ivory">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-ivory">
              Terms
            </Link>
            <a
              href="https://www.instagram.com/medaesthetics.miami"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-ivory"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
