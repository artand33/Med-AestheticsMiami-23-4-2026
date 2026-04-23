import { useState } from "react";
import { BookingProvider, BookButton, useBooking } from "@/components/BookingDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Menu, X, ShieldCheck, Sparkles, HeartHandshake, MapPin, Phone, Mail, Instagram } from "lucide-react";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Journey", href: "#journey" },
  { label: "FAQ", href: "#faq" },
];

const SERVICES = [
  {
    tag: "Face / Neck / Body",
    title: "Skin Remodeling",
    desc: "Advanced microneedling and RF treatments like Morpheus8 to tighten and restore the integrity of the epidermis.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80&auto=format&fit=crop",
  },
  {
    tag: "Body / Recovery",
    title: "Body Transformation",
    desc: "Fat reduction and muscle toning using Venus Bliss MAX and lymphatic drainage for a sculpted silhouette.",
    img: "https://images.unsplash.com/photo-1532926381893-7542290edf1d?w=900&q=80&auto=format&fit=crop",
  },
  {
    tag: "Injectables",
    title: "Facial Artistry",
    desc: "Expertly administered neurotoxins and dermal fillers designed for natural-looking rejuvenation.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=80&auto=format&fit=crop",
  },
  {
    tag: "Skin Health",
    title: "Laser Excellence",
    desc: "Safe-for-all-tones laser treatments (Aerolase Neo) for acne, hyperpigmentation, and hair removal.",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop",
  },
];

const PILLARS = [
  { icon: ShieldCheck, title: "Medical Integrity", desc: "NP-led clinical expertise with a focus on safety and anatomical precision." },
  { icon: Sparkles, title: "Advanced Innovation", desc: "Only the latest, gold-standard technology — Morpheus8, Aerolase, Venus Bliss." },
  { icon: HeartHandshake, title: "Inclusive Beauty", desc: "Specialized protocols designed to be safe and effective for all skin types and tones." },
];

const TESTIMONIALS = [
  { quote: "From the first consultation, it felt like a true partnership. The roadmap was personal — and the results, life-changing.", name: "A.M.", tag: "Morpheus8 Journey" },
  { quote: "I've never been treated with this level of care and precision. My skin and confidence have never looked better.", name: "J.R.", tag: "Body Contouring" },
  { quote: "Finally a clinic that understands my skin tone and treats it with the expertise it deserves.", name: "S.K.", tag: "Aerolase Protocol" },
];

const FAQS = [
  { q: "Are your treatments safe for darker skin tones?", a: "Absolutely. Our entire technology stack — including Aerolase Neo and Morpheus8 — is selected and protocolized to be safe and effective across all Fitzpatrick skin types. Inclusive care is foundational to our practice." },
  { q: "What is the difference between a Med Spa and a day spa?", a: "A medical aesthetics clinic is supervised by licensed medical professionals and offers clinically validated, results-driven treatments. A day spa focuses on relaxation. We deliver measurable transformation under medical oversight." },
  { q: "How many sessions will I need for my roadmap?", a: "Every roadmap is bespoke. Following your deep analysis, we design a sequence based on your anatomy, goals, and skin response — typically a curated series rather than a single session, with sustainable maintenance afterward." },
  { q: "Is there downtime with Morpheus8 or Venus Bliss?", a: "Morpheus8 typically involves 1–3 days of mild redness; Venus Bliss has effectively no downtime. We provide detailed aftercare guidance so you can plan around your lifestyle." },
];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#top" className="font-serif text-xl tracking-wide">
          Med Aesthetics <span className="text-gold">Miami</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-foreground/80 hover:text-gold transition-colors">{n.label}</a>
          ))}
        </nav>
        <div className="hidden md:block">
          <BookButton className="h-10 px-5">Book Consultation</BookButton>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-4">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-foreground/80 hover:text-gold py-1">{n.label}</a>
            ))}
            <BookButton className="w-full h-11">Book Consultation</BookButton>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[88vh] flex items-center">
      <img
        src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1800&q=80&auto=format&fit=crop"
        alt="Glowing skin close-up — luxury medical aesthetics"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
      <div className="container relative z-10 py-24 md:py-32 max-w-3xl text-white fade-in">
        <div className="gold-rule mb-8" />
        <p className="uppercase tracking-[0.25em] text-xs text-gold mb-5">Aventura · Miami</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6">
          The Science of Self-Love:<br />
          <span className="text-gold">Bespoke</span> Aesthetic Excellence.
        </h1>
        <p className="text-lg md:text-xl text-white/85 max-w-xl mb-10 font-light">
          A total body transformation clinic in Miami specializing in advanced skin health and non-surgical remodeling — for all skin tones.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <BookButton className="h-12 px-8 text-base">Book Your Bespoke Consultation</BookButton>
          <Button asChild variant="outline" className="h-12 px-8 bg-transparent text-white border-white/40 hover:bg-white hover:text-foreground">
            <a href="#services">Explore Treatments</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl mb-14">
      <div className="gold-rule mb-6" />
      <p className="uppercase tracking-[0.25em] text-xs text-gold mb-4">{eyebrow}</p>
      <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-4">{title}</h2>
      {intro && <p className="text-muted-foreground text-lg font-light">{intro}</p>}
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container">
        <SectionTitle eyebrow="Treatments" title="Medical-Grade, Tailored to You." intro="Four pillars of advanced aesthetic medicine — each protocol curated to your unique anatomy and long-term goals." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <article key={s.title} className="group bg-card border border-border rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-gold border border-gold/40 px-2 py-1 mb-4">{s.tag}</span>
                <h3 className="font-serif text-2xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why" className="py-24 md:py-32 bg-secondary/40">
      <div className="container">
        <SectionTitle eyebrow="Why Us" title="A Clinic, Not a Spa." />
        <div className="grid md:grid-cols-3 gap-10">
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center md:text-left">
              <Icon className="h-8 w-8 text-gold mb-5 mx-auto md:mx-0" strokeWidth={1.25} />
              <h3 className="font-serif text-2xl mb-3">{title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="py-24 md:py-32">
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="aspect-[4/5] overflow-hidden rounded-sm">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80&auto=format&fit=crop"
            alt="Modern clinical interior at our Aventura facility"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="gold-rule mb-6" />
          <p className="uppercase tracking-[0.25em] text-xs text-gold mb-4">The Clinic</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">A sanctuary of clinical precision in Aventura.</h2>
          <p className="text-muted-foreground font-light mb-8 leading-relaxed">
            Led by a Nurse Practitioner with deep training in dermatologic aesthetics, our practice is built on the belief that beauty and medicine belong together — practiced with restraint, science, and an unwavering eye for the individual.
          </p>
          <div className="flex items-center gap-5 mb-8 p-5 border border-border bg-card rounded-sm">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-muted">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80&auto=format&fit=crop"
                alt="Medical Director portrait"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-serif text-lg">Medical Director, NP</p>
              <p className="text-sm text-muted-foreground">Founder & Lead Aesthetic Practitioner</p>
            </div>
          </div>
          <ul className="space-y-3">
            {[
              'Comprehensive 360° transformation roadmaps',
              'Medical-grade safety standards on every protocol',
              'A focus on sustainable, long-term skin health',
            ].map((p) => (
              <li key={p} className="flex gap-3 items-start">
                <span className="mt-2 w-2 h-px bg-gold flex-shrink-0" />
                <span className="font-light">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const pairs = [
    { before: "https://images.unsplash.com/photo-1614108557772-66f55a275d11?w=600&q=80&auto=format&fit=crop", after: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80&auto=format&fit=crop", label: "Morpheus8 — 3 sessions" },
    { before: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&auto=format&fit=crop", after: "https://images.unsplash.com/photo-1604506862775-28435553f6cd?w=600&q=80&auto=format&fit=crop", label: "Venus Bliss — 6 sessions" },
    { before: "https://images.unsplash.com/photo-1607081692251-d27a86445e4f?w=600&q=80&auto=format&fit=crop", after: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80&auto=format&fit=crop", label: "Aerolase Neo — Hyperpigmentation" },
    { before: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?w=600&q=80&auto=format&fit=crop", after: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop", label: "Facial Artistry" },
  ];
  return (
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="container">
        <SectionTitle eyebrow="Results" title="Transformations, Documented." intro="Real outcomes from our journey-based protocols. Individual results vary." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {pairs.map((p, i) => (
            <figure key={i} className="space-y-3">
              <div className="grid grid-cols-2 gap-1">
                <div className="aspect-square overflow-hidden relative">
                  <img src={p.before} alt={`Before — ${p.label}`} loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 text-[10px] tracking-widest uppercase text-white bg-black/50 px-2 py-0.5">Before</span>
                </div>
                <div className="aspect-square overflow-hidden relative">
                  <img src={p.after} alt={`After — ${p.label}`} loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 text-[10px] tracking-widest uppercase text-white bg-gold/90 px-2 py-0.5">After</span>
                </div>
              </div>
              <figcaption className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.label}</figcaption>
            </figure>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.name} className="bg-card border border-border p-8 rounded-sm">
              <p className="font-serif text-xl italic leading-relaxed mb-6">“{t.quote}”</p>
              <footer className="flex items-center justify-between text-sm">
                <span className="font-medium tracking-wide">— {t.name}</span>
                <span className="text-gold text-xs uppercase tracking-[0.2em]">{t.tag}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const steps = [
    { n: "01", title: "Deep Analysis", desc: "A thorough medical, lifestyle, and aesthetic consultation with imaging and skin assessment." },
    { n: "02", title: "Bespoke Treatment", desc: "Your personalized protocol — sequenced for optimal synergy and visible, lasting results." },
    { n: "03", title: "Sustainable Maintenance", desc: "Long-term skin health support and refinement, evolving as you do." },
  ];
  return (
    <section id="journey" className="py-24 md:py-32">
      <div className="container">
        <SectionTitle eyebrow="The Journey" title="A Roadmap, Not a Quick Fix." />
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-gold pt-6">
              <span className="font-serif text-5xl text-gold">{s.n}</span>
              <h3 className="font-serif text-2xl mt-3 mb-2">{s.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          <p className="flex items-center gap-2 text-foreground/80">
            <MapPin className="h-4 w-4 text-gold" />
            Proudly serving Aventura, Miami, and surrounding areas.
          </p>
          <p className="text-muted-foreground italic">Comprehensive aftercare for sustained, long-term skin health.</p>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-secondary/40">
      <div className="container max-w-3xl">
        <SectionTitle eyebrow="FAQ" title="Considered Answers." />
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="font-serif text-xl text-left hover:no-underline hover:text-gold py-6">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-light text-base leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { open } = useBooking();
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gold))] via-[hsl(40,45%,62%)] to-[hsl(35,40%,50%)]" />
      <div className="container relative z-10 text-center max-w-3xl text-primary-foreground">
        <div className="w-12 h-px bg-white/60 mx-auto mb-8" />
        <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">Start Your Journey to Self-Love.</h2>
        <p className="text-lg md:text-xl font-light mb-10 text-white/90">
          Custom plans tailored to your unique anatomy. No cookie-cutter solutions — only thoughtful, medical-grade transformation.
        </p>
        <Button onClick={open} className="h-12 px-10 bg-white text-foreground hover:bg-white/90 text-base tracking-wide">
          Book Your Bespoke Consultation
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background/80 py-16">
      <div className="container grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl text-background mb-3">
            Med Aesthetics <span className="text-gold">Miami</span>
          </p>
          <p className="text-sm font-light max-w-sm leading-relaxed">
            A medical aesthetics clinic in Aventura dedicated to bespoke, inclusive, and clinically excellent transformation.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Visit</p>
          <ul className="space-y-2 text-sm font-light">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />000 Aventura Blvd, Suite 000<br />Aventura, FL 33180</li>
            <li>Mon–Sat · 10am–7pm</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Contact</p>
          <ul className="space-y-2 text-sm font-light">
            <li className="flex gap-2 items-center"><Phone className="h-4 w-4" />(305) 000-0000</li>
            <li className="flex gap-2 items-center"><Mail className="h-4 w-4" />hello@medaesthetics.miami</li>
            <li className="flex gap-2 items-center"><Instagram className="h-4 w-4" />@medaesthetics.miami</li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t border-background/15 text-xs flex flex-col md:flex-row justify-between gap-3">
        <p>© {new Date().getFullYear()} Med Aesthetics Miami. All rights reserved.</p>
        <p className="text-background/60">Individual results may vary. Treatments performed under medical supervision.</p>
      </div>
    </footer>
  );
}

const Index = () => {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main>
          <Hero />
          <Services />
          <WhyUs />
          <Trust />
          <SocialProof />
          <Journey />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </BookingProvider>
  );
};

export default Index;
