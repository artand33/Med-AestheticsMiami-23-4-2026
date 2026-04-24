import { type ReactNode, useMemo, useRef, useState } from "react";
import { BookButton, useBooking } from "@/components/BookingDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReveal } from "@/hooks/useReveal";
import { locations } from "@/lib/locations";
import { SERVICES, type ServiceCategory } from "@/lib/services";
import { ShieldCheck, Sparkles, HeartHandshake, MapPin, Phone } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const PILLARS = [
  { icon: ShieldCheck, title: "Medical Integrity", desc: "Led by our board-certified medical director with a focus on safety and anatomical precision." },
  { icon: Sparkles, title: "Advanced Innovation", desc: "Only the latest, gold-standard technology — Morpheus8, Aerolase, Venus Bliss." },
  { icon: HeartHandshake, title: "Inclusive Beauty", desc: "Specialized protocols designed to be safe and effective for all skin types and tones." },
];

const TRUST_STATS = [
  { value: "4.9★", label: "Google Rating" },
  { value: "340+", label: "Five-Star Reviews" },
  { value: "15+", label: "Years in Miami" },
  { value: "3", label: "Miami Locations" },
];

const MEDICAL_AFFILIATIONS = [
  "FDA-Cleared Technology",
  "Board-Certified Medical Team",
  "HIPAA Compliant",
  "Licensed in Florida",
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

const TRANSFORMATION_FILTERS = ["Injectables", "Face", "Body", "Skin"] as const;

const TRANSFORMATIONS: Record<(typeof TRANSFORMATION_FILTERS)[number], { before: string; after: string; label: string }[]> = {
  Injectables: [
    {
      before: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700",
      after: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700",
      label: "Lip Balance + Midface Support",
    },
    {
      before: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700",
      after: "https://images.unsplash.com/photo-1498842812179-c81beecf902a?w=700",
      label: "Jawline Contour Protocol",
    },
    {
      before: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700",
      after: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700",
      label: "Perioral Volume Rebalancing",
    },
  ],
  Face: [
    {
      before: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700",
      after: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=700",
      label: "Morpheus8 Texture Refinement",
    },
    {
      before: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700",
      after: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=700",
      label: "Tone + Elasticity Renewal",
    },
    {
      before: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=700",
      after: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700",
      label: "Contour Lift Sequence",
    },
  ],
  Body: [
    {
      before: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=700",
      after: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=700",
      label: "Venus Bliss Sculpt Series",
    },
    {
      before: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=700",
      after: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=700",
      label: "Waistline Definition Cycle",
    },
    {
      before: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=700",
      after: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=700",
      label: "Abdominal Sculpt Protocol",
    },
  ],
  Skin: [
    {
      before: "https://images.unsplash.com/photo-1583241475880-083f84372725?w=700",
      after: "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=700",
      label: "Aerolase Clarity Protocol",
    },
    {
      before: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=700",
      after: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=700",
      label: "Pigment Harmony Program",
    },
    {
      before: "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?w=700",
      after: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=700",
      label: "Clarity + Pore Reduction",
    },
  ],
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  return (
    <section id="top" ref={ref} className="relative min-h-[94vh] flex items-center overflow-hidden">
      <motion.img
        src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1800&q=80&auto=format&fit=crop"
        srcSet="
          https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=80&auto=format&fit=crop 900w,
          https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1400&q=80&auto=format&fit=crop 1400w,
          https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1800&q=80&auto=format&fit=crop 1800w,
          https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=2400&q=80&auto=format&fit=crop 2400w"
        sizes="100vw"
        alt="Glowing skin close-up — luxury medical aesthetics"
        style={shouldReduceMotion ? undefined : { scale: heroScale }}
        className="absolute inset-0 w-full h-full object-cover origin-center"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="container relative z-10 py-32 md:py-36 max-w-3xl text-ivory"
      >
        <div className="h-px w-16 bg-gold mb-8" />
        <p className="uppercase tracking-[0.35em] text-xs text-gold mb-6">Miami · 3 Locations</p>
        {/* Headline option 1: Smoother Skin, Firmer Contours, Confidence You Can See */}
        {/* Headline option 2: Lift, Smooth, and Sculpt With Natural-Looking Results */}
        {/* Headline option 3: Reveal Clearer Skin and More Defined Contours */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.03] mb-6">
          Smoother Skin, Firmer Contours, Confidence You Can See
        </h1>
        <p className="text-lg md:text-xl text-ivory/85 max-w-xl mb-10 font-light">
          Personalized aesthetic plans for visible, natural results across 3 Miami locations, with 4.9★ from 340+ patients.
        </p>
        <div>
          <BookButton className="h-12 px-8 text-base text-ink">
            Book Free Consultation
          </BookButton>
        </div>
      </motion.div>
    </section>
  );
}

function TrustSignals() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-ivory border-y border-gold/20 py-12 md:py-14">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="container"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl md:text-5xl text-gold">{stat.value}</p>
              <p className="mt-2 text-sm md:text-base font-light text-ink/60">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {MEDICAL_AFFILIATIONS.map((item) => (
            <span
              key={item}
              className="rounded-full border border-gold/45 bg-white/65 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-ink/70"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function RevealItem({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { elementRef, isVisible, prefersReducedMotion } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={elementRef}
      className={`reveal-item ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={prefersReducedMotion ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  intro,
  titleClassName = "text-ink",
  introClassName = "text-ink/70",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  titleClassName?: string;
  introClassName?: string;
}) {
  const { elementRef, isVisible, prefersReducedMotion } = useReveal<HTMLDivElement>({
    threshold: 0.25,
  });

  return (
    <div
      ref={elementRef}
      className={`reveal-item max-w-2xl mb-10 md:mb-12 ${isVisible ? "is-visible" : ""}`}
      style={prefersReducedMotion ? undefined : { transitionDelay: "40ms" }}
    >
      <div className="h-px w-14 bg-gold mb-6" />
      <div className="mb-4 inline-block bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_70%)] px-8 py-2">
        <p className="uppercase tracking-[0.32em] text-xs text-gold">{eyebrow}</p>
      </div>
      <h2 className={`font-serif text-3xl md:text-5xl leading-tight mb-4 ${titleClassName}`}>{title}</h2>
      {intro && <p className={`text-lg font-light ${introClassName}`}>{intro}</p>}
    </div>
  );
}

function TreatmentCard({ service, index }: { service: ServiceCategory; index: number }) {
  const { elementRef, isVisible, prefersReducedMotion } = useReveal<HTMLElement>({
    threshold: 0.18,
  });

  return (
    <article
      ref={elementRef}
      className={`reveal-item treatment-card premium-card premium-card-soft rounded-2xl border border-stone-100 bg-white p-6 ${isVisible ? "is-visible" : ""}`}
      style={prefersReducedMotion ? undefined : { transitionDelay: `${index * 80}ms` }}
    >
      <div className="mb-4 flex items-center gap-3">
        <img
          src={service.img}
          alt={`${service.title} category`}
          loading="lazy"
          className="h-12 w-12 rounded-xl object-cover ring-1 ring-gold/35"
        />
        <span className="inline-block rounded-full text-[10px] uppercase tracking-[0.25em] text-gold border border-gold/40 px-3 py-1">
          {service.tag}
        </span>
      </div>
      <h3 className="font-serif text-2xl mb-3">{service.title}</h3>
      <ul className="mb-4 space-y-1.5">
        {service.treatments.map((treatment) => (
          <li key={treatment} className="flex items-start gap-2 text-sm text-ink/72 font-light">
            <span className="mt-2 h-px w-2 bg-gold flex-shrink-0" />
            <span>{treatment}</span>
          </li>
        ))}
      </ul>
      <p className="mb-3 text-sm text-ink/70">
        <span className="text-ink/55">Starting from </span>
        <span className="font-medium text-gold">{service.startingPrice}</span>
      </p>
      <a href="#contact" className="text-sm text-ink/60 transition-colors hover:text-gold">
        Learn more →
      </a>
    </article>
  );
}

function Services() {
  return (
    <section id="treatments" className="py-20 md:py-24 bg-cream texture-grain border-y border-gold/20">
      <div className="container relative z-10">
        <SectionTitle
          eyebrow="Treatments"
          title="Medical-Grade, Tailored to You."
          intro="From contouring and lasers to IV wellness and skin essentials, every category is protocolized to your anatomy and goals."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <TreatmentCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-us" className="py-20 md:py-24 bg-ivory">
      <div className="container">
        <SectionTitle eyebrow="Why Us" title="A Clinic, Not a Spa." />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid md:grid-cols-3 gap-10"
        >
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              variants={staggerItem}
              key={title}
              className="premium-card premium-card-soft premium-card-sm rounded-2xl border border-white/50 bg-white/35 p-8 backdrop-blur-xl text-center md:text-left"
            >
              <Icon className="h-8 w-8 text-gold mb-5 mx-auto md:mx-0" strokeWidth={1.25} />
              <h3 className="font-serif text-2xl mb-3">{title}</h3>
              <p className="text-ink/70 font-light leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section id="about" className="py-20 md:py-24 bg-stone-warm">
      <div className="container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-[4/5] overflow-hidden rounded-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80&auto=format&fit=crop"
            alt="Modern clinical interior at one of our Miami locations"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <RevealItem delay={80}>
          <div className="h-px w-14 bg-gold mb-6" />
          <div className="mb-4 inline-block bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_70%)] px-8 py-2">
            <p className="uppercase tracking-[0.32em] text-xs text-gold">The Clinic</p>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">A sanctuary of clinical precision across Miami.</h2>
          <p className="text-ink/70 font-light mb-8 leading-relaxed">
            Led by our board-certified medical director, our practice is built on the belief that beauty and medicine belong together — practiced with restraint, science, and an unwavering eye for the individual.
          </p>
          <p className="text-ink/70 font-light mb-4 leading-relaxed">
            Every client journey starts with listening first: your concerns, your goals, your pace. We shape each roadmap to be clinically responsible and naturally flattering, not trend-driven.
          </p>
          <p className="text-ink/70 font-light mb-8 leading-relaxed">
            This section is intentionally kept editable as placeholder brand copy, so your team can refine voice, credentials, and positioning without changing the site structure.
          </p>
          <div className="flex items-center gap-5 mb-8 p-5 border border-[#E7E2D9] bg-white/60 rounded-2xl backdrop-blur-xl">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-muted">
              <img
                src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=300&q=80&auto=format&fit=crop"
                alt="Clinical luxury skin close-up"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-serif text-lg">Led by our board-certified medical director</p>
              <p className="text-sm text-ink/65">Founder & Lead Aesthetic Practitioner</p>
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
        </RevealItem>
      </div>
    </section>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function MirrorSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState(50);

  const updatePosition = (clientX: number, element: HTMLDivElement | null) => {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(next, 0, 100));
  };

  const beforeOpacity = useMemo(() => clamp(Math.abs(position - 14) / 16, 0, 1), [position]);
  const afterOpacity = useMemo(() => clamp(Math.abs(position - 86) / 16, 0, 1), [position]);

  return (
    <div className="space-y-2">
      <div
        className="relative h-96 overflow-hidden rounded-xl border border-white/50 bg-black md:h-[28rem]"
        onMouseMove={(event) => {
          if (!isMobile) updatePosition(event.clientX, event.currentTarget);
        }}
        onTouchMove={(event) => {
          if (isMobile) updatePosition(event.touches[0].clientX, event.currentTarget);
        }}
      >
        <img
          src={before}
          alt={`${label} — before illustrative reference image`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <motion.div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} transition={{ duration: 0.15, ease: "easeOut" }}>
          <img
            src={after}
            alt={`${label} — after illustrative reference image`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <motion.div
          animate={{ left: `${position}%` }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          className="pointer-events-none absolute inset-y-0 w-px bg-ivory/95 shadow-[0_0_10px_rgba(255,255,255,0.45)]"
        />
        <span className="absolute left-4 top-4 text-[11px] uppercase tracking-[0.24em] text-ink/85 font-medium transition-opacity" style={{ opacity: beforeOpacity }}>
          Before
        </span>
        <span className="absolute right-4 top-4 text-[11px] uppercase tracking-[0.24em] text-ink/85 font-medium transition-opacity" style={{ opacity: afterOpacity }}>
          After
        </span>
      </div>
      <figcaption className="text-[11px] uppercase tracking-[0.24em] text-ink/60">{label}</figcaption>
    </div>
  );
}

function SocialProof() {
  const [activeFilter, setActiveFilter] = useState<(typeof TRANSFORMATION_FILTERS)[number]>("Injectables");
  const activePairs = TRANSFORMATIONS[activeFilter];

  return (
    <section id="transformations" className="py-20 md:py-24 bg-cream">
      <div className="container">
        <SectionTitle eyebrow="Results" title="Transformations, Documented." intro="Real outcomes from our journey-based protocols. Individual results vary." />
        <div className="mx-auto mb-8 flex w-full max-w-3xl flex-wrap gap-2">
          {TRANSFORMATION_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              data-active={activeFilter === filter}
              className={`premium-btn premium-filter-chip rounded-full px-5 py-2 text-xs uppercase tracking-[0.26em] focus-visible:outline-none ${
                activeFilter === filter
                  ? "bg-gold text-ink focus-visible:ring-2 focus-visible:ring-gold/55"
                  : "bg-white/55 text-ink/65 hover:border-gold/45 hover:text-ink focus-visible:ring-2 focus-visible:ring-gold/45"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div
          key={activeFilter}
          className="mx-auto mb-14 grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {activePairs.map((pair, index) => (
            <RevealItem key={`${activeFilter}-${pair.label}`} delay={index * 100}>
              <figure>
                <MirrorSlider before={pair.before} after={pair.after} label={pair.label} />
              </figure>
            </RevealItem>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid md:grid-cols-3 gap-5"
        >
          {TESTIMONIALS.map((t) => (
            <motion.blockquote
              variants={staggerItem}
              key={t.name}
              className="border border-white/45 bg-white/40 backdrop-blur-xl p-8 rounded-2xl"
            >
              <p className="font-serif text-xl italic leading-relaxed mb-6">“{t.quote}”</p>
              <footer className="flex items-center justify-between text-sm">
                <span className="font-medium tracking-wide">— {t.name}</span>
                <span className="text-gold text-xs uppercase tracking-[0.2em]">{t.tag}</span>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
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
    <section id="journey" className="py-20 md:py-24 bg-dark-warm">
      <div className="container relative z-10">
        <SectionTitle eyebrow="The Journey" title="A Roadmap, Not a Quick Fix." titleClassName="text-ivory" />
        <div className="grid md:grid-cols-3 gap-7 mb-12">
          {steps.map((s, index) => (
            <RevealItem key={s.n} delay={index * 150}>
              <div className="journey-step-card premium-card premium-card-dark relative overflow-hidden rounded-2xl border border-gold/25 bg-[#241e16]/50 p-6">
                <span className="pointer-events-none select-none absolute -top-2 right-2 font-serif text-[8rem] md:text-[9rem] leading-none text-[#D0AB63] opacity-[0.07]">
                  {s.n}
                </span>
                <div className="relative z-10">
                  <span className="font-serif text-5xl text-[#D0AB63]">{s.n}</span>
                  <h3 className="font-serif text-2xl mt-3 mb-2 text-ivory">{s.title}</h3>
                  <p className="text-ivory/75 font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
        <div className="border-t border-gold/30 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          <p className="flex items-center gap-2 text-ivory/75">
            <MapPin className="h-4 w-4 text-gold" />
            Proudly serving Miami across three locations.
          </p>
          <p className="text-ivory/70 italic">Comprehensive aftercare for sustained, long-term skin health.</p>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-24 bg-cream texture-grain">
      <div className="container relative z-10 max-w-3xl">
        <SectionTitle eyebrow="FAQ" title="Considered Answers." />
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-ink/15">
              <AccordionTrigger className="font-serif text-xl text-left hover:no-underline hover:text-gold py-6">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-ink/70 font-light text-base leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Locations() {
  const { open } = useBooking();
  return (
    <section
      id="locations"
      className="py-20 md:py-24 bg-ivory"
      style={{ backgroundImage: "radial-gradient(circle at 85% 15%, hsl(var(--primary) / 0.12), transparent 55%)" }}
    >
      <div className="container">
        <SectionTitle
          eyebrow="Locations"
          title="Three Miami Locations, One Standard of Care."
          intro="Placeholder details below can be updated with final addresses, phones, and hours."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {locations.map((location) => (
            <motion.article
              key={location.name}
              variants={staggerItem}
              className="rounded-2xl border border-white/50 bg-white/60 p-6 backdrop-blur-md shadow-[0_10px_40px_rgba(15,15,15,0.08)]"
            >
              <p className="font-serif text-2xl mb-4">{location.name}</p>
              <ul className="space-y-3 text-sm font-light text-ink/75 mb-6">
                <li className="flex gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-gold flex-shrink-0" />
                  <span>{location.address}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                  <span>{location.phone}</span>
                </li>
                <li>{location.hours}</li>
              </ul>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <button
                  type="button"
                  onClick={() => open({ locationId: location.id })}
                  className="inline-flex items-center rounded text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                >
                  Book this location
                </button>
                <a
                  href={location.mapEmbedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded text-xs uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                >
                  Get Directions
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { open } = useBooking();
  return (
    <section className="relative py-24 md:py-28 overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(197,160,89,0.3),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(197,160,89,0.2),transparent_45%)]" />
      <div className="container relative z-10 text-center max-w-3xl text-primary-foreground">
        <div className="w-12 h-px bg-white/60 mx-auto mb-8" />
        <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">Start Your Journey to Self-Love.</h2>
        <p className="text-lg md:text-xl font-light mb-10 text-white/90">
          Custom plans tailored to your unique anatomy. No cookie-cutter solutions — only thoughtful, medical-grade transformation.
        </p>
        <Button onClick={open} className="premium-btn premium-btn-gold h-12 px-10 bg-gold text-ink hover:bg-gold/90 text-base tracking-wide">
          Book Your Bespoke Consultation
        </Button>
      </div>
    </section>
  );
}

function SectionHairline() {
  return (
    <div
      aria-hidden
      className="h-px max-w-32 mx-auto bg-[linear-gradient(90deg,transparent,hsl(var(--primary)/0.4),transparent)]"
    />
  );
}

function MembershipSection() {
  const membershipTiers = [
    {
      title: "Foundation",
      copy: "Membership clients can receive routine treatment planning, priority scheduling windows, and curated maintenance recommendations based on seasonal skin and lifestyle changes.",
    },
    {
      title: "Refinement",
      copy: "Program details may include preferred pricing, bundled service credits, and quarterly check-ins designed to keep your long-term transformation roadmap consistent and measurable.",
    },
    {
      title: "Signature",
      copy: "Final tiers, terms, and inclusions can be updated later; this section keeps the one-page navigation complete and gives your team a live area for future copy refinements.",
    },
  ];

  return (
    <section id="membership" className="py-20 md:py-24 bg-gold-soft border-y border-gold/25">
      <div className="container max-w-4xl">
        <SectionTitle
          eyebrow="Membership"
          title="Care That Grows With You."
          intro="A simple placeholder for a future membership program with recurring support and elevated benefits."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {membershipTiers.map((tier) => (
            <article
              key={tier.title}
              className="membership-tier-card premium-card premium-card-soft rounded-2xl border border-white/55 bg-white/45 p-6 backdrop-blur-xl"
            >
              <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-gold">{tier.title}</p>
              <p className="text-ink/75 font-light leading-relaxed">{tier.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-24 bg-ivory">
      <div className="container max-w-4xl">
        <SectionTitle
          eyebrow="Contact"
          title="Start With a Consultation."
          intro="This placeholder contact section supports anchor navigation and can be replaced with finalized contact details anytime."
        />
        <div className="space-y-5 text-ink/75 font-light leading-relaxed">
          <p>
            Reach out for treatment guidance, scheduling support, or questions about which protocol best aligns with your goals and timeline.
          </p>
          <p>
            Our team can help you compare options across skin, contouring, injectables, and wellness pathways, then suggest a practical first step based on your priorities.
          </p>
          <p>
            Use the consultation button below to open the booking form and submit your preferred location and availability.
          </p>
        </div>
        <div className="mt-8">
          <BookButton className="h-11 px-8 text-ink">
            Book Consultation
          </BookButton>
        </div>
      </div>
    </section>
  );
}

function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-ivory/15 bg-ink/85 backdrop-blur-xl md:hidden">
      <div className="container py-3">
        <BookButton className="h-11 w-full text-ink">
          Book Consultation
        </BookButton>
      </div>
    </div>
  );
}

const Index = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="relative min-h-screen bg-ivory text-ink">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-ivory" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(197,160,89,0.14),transparent_42%),radial-gradient(circle_at_78%_12%,rgba(15,15,15,0.05),transparent_34%),radial-gradient(circle_at_50%_88%,rgba(197,160,89,0.09),transparent_40%)]" />
        <motion.div
          className="absolute -left-24 top-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.16)_0%,rgba(197,160,89,0)_72%)] blur-3xl"
          animate={shouldReduceMotion ? undefined : { x: [0, 42, 0], y: [0, -24, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-28 bottom-12 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(15,15,15,0.08)_0%,rgba(15,15,15,0)_74%)] blur-3xl"
          animate={shouldReduceMotion ? undefined : { x: [0, -36, 0], y: [0, 26, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <main id="main-content" tabIndex={-1} className="pb-20 md:pb-0 focus:outline-none">
        <Hero />
        <TrustSignals />
        <SectionHairline />
        <Services />
        <WhyUs />
        <SectionHairline />
        <SocialProof />
        <Journey />
        <SectionHairline />
        <Locations />
        <Trust />
        <SectionHairline />
        <MembershipSection />
        <ContactSection />
        <FAQ />
        <FinalCTA />
      </main>
      <MobileBookingBar />
    </div>
  );
};

export default Index;
