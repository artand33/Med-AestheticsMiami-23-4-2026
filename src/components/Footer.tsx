import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Star } from "lucide-react";
import { treatments } from "@/lib/treatments";
import { locations } from "@/lib/locations";

const Footer = () => {
  return (
    <footer className="bg-[#0F0F0F] text-[#F9F9F7]/85">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="font-serif text-2xl text-[#F9F9F7]">
            Med Aesthetics <span className="text-[#C5A059]">Miami</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-[#F9F9F7]/70">
            Elevated medical aesthetics for natural, confidence-first results across Miami.
          </p>
          <p className="mt-4 inline-flex items-center gap-1 text-sm text-[#C5A059]">
            <Star className="h-4 w-4 fill-[#C5A059] text-[#C5A059]" />
            4.9/5 based on 340+ patient reviews
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#C5A059]">Treatments</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {treatments.slice(0, 6).map((treatment) => (
              <li key={treatment.slug}>
                <Link to={`/treatments/${treatment.slug}`} className="text-[#F9F9F7]/70 transition-colors hover:text-[#F9F9F7]">
                  {treatment.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#C5A059]">Locations</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {locations.slice(0, 3).map((location) => (
              <li key={location.id}>
                <Link to={`/locations/${location.id}`} className="text-[#F9F9F7]/70 transition-colors hover:text-[#F9F9F7]">
                  {location.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#C5A059]">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="text-[#F9F9F7]/70 transition-colors hover:text-[#F9F9F7]">About</Link></li>
            <li><Link to="/blog" className="text-[#F9F9F7]/70 transition-colors hover:text-[#F9F9F7]">Blog</Link></li>
            <li><Link to="/membership" className="text-[#F9F9F7]/70 transition-colors hover:text-[#F9F9F7]">Membership</Link></li>
            <li><Link to="/contact" className="text-[#F9F9F7]/70 transition-colors hover:text-[#F9F9F7]">Contact</Link></li>
            <li><Link to="/careers" className="text-[#F9F9F7]/70 transition-colors hover:text-[#F9F9F7]">Careers</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#F9F9F7]/15">
        <div className="container flex flex-col gap-4 py-5 text-xs text-[#F9F9F7]/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Med Aesthetics Miami. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="transition-colors hover:text-[#F9F9F7]">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-[#F9F9F7]">
              Terms
            </Link>
            <a href="https://www.instagram.com/medaesthetics.miami" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors hover:text-[#F9F9F7]">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="transition-colors hover:text-[#F9F9F7]">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-[#F9F9F7]">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
