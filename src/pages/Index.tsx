import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BookingProvider, BookButton, useBooking } from "@/components/BookingDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { locations } from "@/lib/locations";
import { ShieldCheck, Sparkles, HeartHandshake, MapPin, Phone } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const SERVICES = [
  {
    slug: "morpheus8-rf",
    tag: "Face / Neck / Body",
    title: "Skin Remodeling",
    treatments: ["Morpheus8 RF", "Microneedling", "Fraxel resurfacing"],
    startingPrice: "$XXX",
    img: "https://placehold.co/400x300/f5f0e8/c5a059?text=Skin%20Remodeling",
  },
  {
    slug: "venus-bliss-max",
    tag: "Body / Sculpting",
    title: "Body Contouring",
    treatments: ["Venus Bliss MAX", "Quantum RF", "Lymphatic sculpt support"],
    startingPrice: "$XXX",
    img: "https://placehold.co/400x300/f5f0e8/c5a059?text=Body%20Contouring",
  },
  {
    slug: "dermal-fillers",
    tag: "Injectables",
    title: "Injectables & Facial Artistry",
    treatments: ["Neuromodulators", "Dermal fillers", "Biostimulator artistry"],
    startingPrice: "$XXX",
    img: "https://placehold.co/400x300/f5f0e8/c5a059?text=Injectables%20%26%20Facial%20Artistry",
  },
  {
    slug: "aerolase-neo",
    tag: "Skin Health",
    title: "Laser Treatments",
    treatments: ["Aerolase Neo", "IPL photofacial", "Laser hair removal"],
    startingPrice: "$XXX",
    img: "https://placehold.co/400x300/f5f0e8/c5a059?text=Laser%20Treatments",
  },
  {
    slug: "iv-hydration-therapy",
    tag: "Wellness",
    title: "Wellness & IV Therapy",
    treatments: ["IV hydration drips", "Vitamin infusions", "Recovery boosters"],
    startingPrice: "$XXX",
    img: "https://placehold.co/400x300/f5f0e8/c5a059?text=Wellness%20%26%20IV%20Therapy",
  },
  {
    slug: "hydrafacial",
    tag: "Skin Essentials",
    title: "Core Skincare",
    treatments: ["HydraFacial", "Chemical peels", "Clinical facials"],
    startingPrice: "$XXX",
    img: "https://placehold.co/400x300/f5f0e8/c5a059?text=Core%20Skincare",
  },
];

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

const PRESS_LOGOS = ["Logo", "Logo", "Logo", "Logo", "Logo"];

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
      before: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?w=900&q=80&auto=format&fit=crop",
      label: "Lip Balance + Midface Support",
    },
    {
      before: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=80&auto=format&fit=crop",
      label: "Jawline Contour Protocol",
    },
    {
      before: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=900&q=80&auto=format&fit=crop",
      label: "Perioral Volume Rebalancing",
    },
    {
      before: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=80&auto=format&fit=crop",
      label: "Smile Line Softening",
    },
  ],
  Face: [
    {
      before: "https://images.unsplash.com/photo-1614108557772-66f55a275d11?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=80&auto=format&fit=crop",
      label: "Morpheus8 Texture Refinement",
    },
    {
      before: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80&auto=format&fit=crop",
      label: "Tone + Elasticity Renewal",
    },
    {
      before: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=80&auto=format&fit=crop",
      label: "Contour Lift Sequence",
    },
    {
      before: "https://images.unsplash.com/photo-1463770770528-7aa57e9f9118?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?w=900&q=80&auto=format&fit=crop",
      label: "Fine-Line Densification",
    },
  ],
  Body: [
    {
      before: "https://images.unsplash.com/photo-1532926381893-7542290edf1d?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80&auto=format&fit=crop",
      label: "Venus Bliss Sculpt Series",
    },
    {
      before: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1604506862775-28435553f6cd?w=900&q=80&auto=format&fit=crop",
      label: "Waistline Definition Cycle",
    },
    {
      before: "https://images.unsplash.com/photo-1616279967983-ec413476e824?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=900&q=80&auto=format&fit=crop",
      label: "Abdominal Sculpt Protocol",
    },
    {
      before: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80&auto=format&fit=crop",
      label: "Lower Body Refinement",
    },
  ],
  Skin: [
    {
      before: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=900&q=80&auto=format&fit=crop",
      label: "Aerolase Clarity Protocol",
    },
    {
      before: "https://images.unsplash.com/photo-1463770770528-7aa57e9f9118?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=80&auto=format&fit=crop",
      label: "Pigment Harmony Program",
    },
    {
      before: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1614108557772-66f55a275d11?w=900&q=80&auto=format&fit=crop",
      label: "Clarity + Pore Reduction",
    },
    {
      before: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=900&q=80&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=900&q=80&auto=format&fit=crop",
      label: "Texture Recovery Plan",
    },
  ],
};

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  return (
    <section id="top" ref={ref} className="relative min-h-[94vh] flex items-center overflow-hidden">
      <motion.img
        src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1800&q=80&auto=format&fit=crop"
        alt="Glowing skin close-up — luxury medical aesthetics"
        style={{ scale: heroScale }}
        className="absolute inset-0 w-full h-full object-cover origin-center"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="container relative z-10 py-32 md:py-36 max-w-3xl text-[#F9F9F7]"
      >
        <div className="h-px w-16 bg-[#C5A059] mb-8" />
        <p className="uppercase tracking-[0.35em] text-xs text-[#C5A059] mb-6">Miami · 3 Locations</p>
        {/* Headline option 1: Smoother Skin, Firmer Contours, Confidence You Can See */}
        {/* Headline option 2: Lift, Smooth, and Sculpt With Natural-Looking Results */}
        {/* Headline option 3: Reveal Clearer Skin and More Defined Contours */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.03] mb-6">
          Smoother Skin, Firmer Contours, Confidence You Can See
        </h1>
        <p className="text-lg md:text-xl text-[#F9F9F7]/85 max-w-xl mb-10 font-light">
          Personalized aesthetic plans for visible, natural results across 3 Miami locations, with 4.9★ from 340+ patients.
        </p>
        <div>
          <BookButton className="h-12 px-8 text-base bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#0F0F0F]">
            Book Free Consultation
          </BookButton>
          <p className="mt-5 text-xs sm:text-sm text-[#F9F9F7]/80 font-light">
            4.9★ rating · 340+ reviews · 15+ years in Miami · 3 Miami locations
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function TrustSignals() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-[#F5F0E8] border-y border-[#C5A059]/20 py-12 md:py-14">
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
              <p className="font-serif text-4xl md:text-5xl text-[#C5A059]">{stat.value}</p>
              <p className="mt-2 text-sm md:text-base font-light text-[#0F0F0F]/60">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-3 md:gap-4">
          {PRESS_LOGOS.map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="h-12 md:h-14 flex-1 rounded-md border border-[#0F0F0F]/14 bg-[#E7E2D9] text-[#0F0F0F]/45 text-xs uppercase tracking-[0.2em] flex items-center justify-center"
            >
              {logo}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <motion.div
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className="max-w-2xl mb-10 md:mb-12"
    >
      <div className="h-px w-14 bg-[#C5A059] mb-6" />
      <p className="uppercase tracking-[0.32em] text-xs text-[#C5A059] mb-4">{eyebrow}</p>
      <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-4 text-[#0F0F0F]">{title}</h2>
      {intro && <p className="text-[#0F0F0F]/70 text-lg font-light">{intro}</p>}
    </motion.div>
  );
}

function Services() {
  return (
    <section id="treatments" className="py-20 md:py-24 bg-[#F5F0E8]/45 border-y border-[#C5A059]/20">
      <div className="container">
        <SectionTitle
          eyebrow="Treatments"
          title="Medical-Grade, Tailored to You."
          intro="From contouring and lasers to IV wellness and skin essentials, every category is protocolized to your anatomy and goals."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <article key={s.title} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={s.img}
                    alt={`${s.title} category`}
                    loading="lazy"
                    className="h-12 w-12 rounded-xl object-cover ring-1 ring-[#C5A059]/35"
                  />
                  <span className="inline-block rounded-full text-[10px] uppercase tracking-[0.25em] text-[#C5A059] border border-[#C5A059]/40 px-3 py-1">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-serif text-2xl mb-3">{s.title}</h3>
                <ul className="mb-4 space-y-1.5">
                  {s.treatments.map((treatment) => (
                    <li key={treatment} className="flex items-start gap-2 text-sm text-[#0F0F0F]/72 font-light">
                      <span className="mt-2 h-px w-2 bg-[#C5A059] flex-shrink-0" />
                      <span>{treatment}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-3 text-sm text-[#0F0F0F]/70">
                  <span className="text-[#0F0F0F]/55">Starting from </span>
                  <span className="font-medium text-[#C5A059]">{s.startingPrice}</span>
                </p>
                <Link to={`/treatments/${s.slug}`} className="text-sm text-[#0F0F0F]/60 transition-colors hover:text-[#C5A059]">
                  Learn more →
                </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why" className="py-20 md:py-24 bg-transparent">
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
              className="rounded-2xl border border-[#FFFFFF]/50 bg-[#FFFFFF]/35 p-8 backdrop-blur-xl text-center md:text-left"
            >
              <Icon className="h-8 w-8 text-[#C5A059] mb-5 mx-auto md:mx-0" strokeWidth={1.25} />
              <h3 className="font-serif text-2xl mb-3">{title}</h3>
              <p className="text-[#0F0F0F]/70 font-light leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="py-20 md:py-24 bg-transparent">
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
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-px w-14 bg-[#C5A059] mb-6" />
          <p className="uppercase tracking-[0.32em] text-xs text-[#C5A059] mb-4">The Clinic</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">A sanctuary of clinical precision across Miami.</h2>
          <p className="text-[#0F0F0F]/70 font-light mb-8 leading-relaxed">
            Led by our board-certified medical director, our practice is built on the belief that beauty and medicine belong together — practiced with restraint, science, and an unwavering eye for the individual.
          </p>
          <div className="flex items-center gap-5 mb-8 p-5 border border-[#E7E2D9] bg-[#FFFFFF]/60 rounded-2xl backdrop-blur-xl">
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
              <p className="text-sm text-[#0F0F0F]/65">Founder & Lead Aesthetic Practitioner</p>
            </div>
          </div>
          <ul className="space-y-3">
            {[
              'Comprehensive 360° transformation roadmaps',
              'Medical-grade safety standards on every protocol',
              'A focus on sustainable, long-term skin health',
            ].map((p) => (
              <li key={p} className="flex gap-3 items-start">
                <span className="mt-2 w-2 h-px bg-[#C5A059] flex-shrink-0" />
                <span className="font-light">{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
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
        className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[#FFFFFF]/50 bg-black"
        onMouseLeave={() => {
          if (!isMobile) setPosition(50);
        }}
        onMouseMove={(event) => {
          if (!isMobile) updatePosition(event.clientX, event.currentTarget);
        }}
        onTouchStart={(event) => {
          if (isMobile) updatePosition(event.touches[0].clientX, event.currentTarget);
        }}
        onTouchMove={(event) => {
          if (isMobile) updatePosition(event.touches[0].clientX, event.currentTarget);
        }}
      >
        <img src={before} alt={`Before result for ${label}`} className="h-full w-full object-cover" loading="lazy" />
        <motion.div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} transition={{ duration: 0.15, ease: "easeOut" }}>
          <img src={after} alt={`After result for ${label}`} className="h-full w-full object-cover" loading="lazy" />
        </motion.div>
        <motion.div
          animate={{ left: `${position}%` }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          className="pointer-events-none absolute inset-y-0 w-px bg-[#F9F9F7]/95 shadow-[0_0_10px_rgba(255,255,255,0.45)]"
        />
        <span className="absolute left-4 top-4 text-[11px] uppercase tracking-[0.24em] text-[#F9F9F7] font-medium transition-opacity" style={{ opacity: beforeOpacity }}>
          Before
        </span>
        <span className="absolute right-4 top-4 text-[11px] uppercase tracking-[0.24em] text-[#F9F9F7] font-medium transition-opacity" style={{ opacity: afterOpacity }}>
          After
        </span>
      </div>
      <figcaption className="text-[11px] uppercase tracking-[0.24em] text-[#0F0F0F]/60">{label}</figcaption>
    </div>
  );
}

function SocialProof() {
  const [activeFilter, setActiveFilter] = useState<(typeof TRANSFORMATION_FILTERS)[number]>("Injectables");
  const activePairs = TRANSFORMATIONS[activeFilter];

  return (
    <section id="transformations" className="py-20 md:py-24 bg-transparent">
      <div className="container">
        <SectionTitle eyebrow="Results" title="Transformations, Documented." intro="Real outcomes from our journey-based protocols. Individual results vary." />
        <div className="mx-auto mb-8 flex w-full max-w-3xl flex-wrap gap-2">
          {TRANSFORMATION_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.26em] transition-all ${
                activeFilter === filter
                  ? "bg-[#C5A059] text-[#0F0F0F] shadow-[0_8px_18px_rgba(197,160,89,0.3)]"
                  : "bg-[#FFFFFF]/55 text-[#0F0F0F]/65 border border-[#0F0F0F]/10 hover:border-[#C5A059]/45 hover:text-[#0F0F0F]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <motion.div
          key={activeFilter}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-14 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {activePairs.map((pair) => (
            <motion.figure key={pair.label} variants={staggerItem}>
              <MirrorSlider before={pair.before} after={pair.after} label={pair.label} />
            </motion.figure>
          ))}
        </motion.div>

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
              className="border border-[#FFFFFF]/45 bg-[#FFFFFF]/40 backdrop-blur-xl p-8 rounded-2xl"
            >
              <p className="font-serif text-xl italic leading-relaxed mb-6">“{t.quote}”</p>
              <footer className="flex items-center justify-between text-sm">
                <span className="font-medium tracking-wide">— {t.name}</span>
                <span className="text-[#C5A059] text-xs uppercase tracking-[0.2em]">{t.tag}</span>
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
    <section id="journey" className="py-20 md:py-24 bg-transparent">
      <div className="container">
        <SectionTitle eyebrow="The Journey" title="A Roadmap, Not a Quick Fix." />
        <div className="grid md:grid-cols-3 gap-7 mb-12">
          {steps.map((s) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: Number(s.n) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-[#C5A059] pt-6"
            >
              <span className="font-serif text-5xl text-[#C5A059]">{s.n}</span>
              <h3 className="font-serif text-2xl mt-3 mb-2">{s.title}</h3>
              <p className="text-[#0F0F0F]/70 font-light leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="border-t border-[#0F0F0F]/12 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          <p className="flex items-center gap-2 text-foreground/80">
            <MapPin className="h-4 w-4 text-[#C5A059]" />
            Proudly serving Miami across three locations.
          </p>
          <p className="text-[#0F0F0F]/55 italic">Comprehensive aftercare for sustained, long-term skin health.</p>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-24 bg-transparent">
      <div className="container max-w-3xl">
        <SectionTitle eyebrow="FAQ" title="Considered Answers." />
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-[#0F0F0F]/15">
              <AccordionTrigger className="font-serif text-xl text-left hover:no-underline hover:text-[#C5A059] py-6">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#0F0F0F]/70 font-light text-base leading-relaxed">
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
  return (
    <section id="locations" className="py-20 md:py-24 bg-transparent">
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
              className="rounded-2xl border border-[#FFFFFF]/45 bg-[#FFFFFF]/45 p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(15,15,15,0.08)]"
            >
              <p className="font-serif text-2xl mb-4">{location.name}</p>
              <ul className="space-y-3 text-sm font-light text-[#0F0F0F]/75 mb-6">
                <li className="flex gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-[#C5A059] flex-shrink-0" />
                  <span>{location.address}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Phone className="h-4 w-4 text-[#C5A059] flex-shrink-0" />
                  <span>{location.phone}</span>
                </li>
                <li>{location.hours}</li>
              </ul>
              <a
                href={location.mapEmbedUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-[#C5A059] hover:text-[#0F0F0F] transition-colors"
              >
                Get Directions
              </a>
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
    <section className="relative py-24 md:py-28 overflow-hidden bg-[#0F0F0F]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(197,160,89,0.3),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(197,160,89,0.2),transparent_45%)]" />
      <div className="container relative z-10 text-center max-w-3xl text-primary-foreground">
        <div className="w-12 h-px bg-white/60 mx-auto mb-8" />
        <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">Start Your Journey to Self-Love.</h2>
        <p className="text-lg md:text-xl font-light mb-10 text-white/90">
          Custom plans tailored to your unique anatomy. No cookie-cutter solutions — only thoughtful, medical-grade transformation.
        </p>
        <Button onClick={open} className="h-12 px-10 bg-[#C5A059] text-[#0F0F0F] hover:bg-[#C5A059]/90 text-base tracking-wide">
          Book Your Bespoke Consultation
        </Button>
      </div>
    </section>
  );
}

function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-[#F9F9F7]/15 bg-[#0F0F0F]/85 backdrop-blur-xl md:hidden">
      <div className="container py-3">
        <BookButton className="h-11 w-full bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#0F0F0F]">
          Book Consultation
        </BookButton>
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <BookingProvider>
      <div className="relative min-h-screen bg-[#F9F9F7] text-[#0F0F0F]">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[#F9F9F7]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(197,160,89,0.14),transparent_42%),radial-gradient(circle_at_78%_12%,rgba(15,15,15,0.05),transparent_34%),radial-gradient(circle_at_50%_88%,rgba(197,160,89,0.09),transparent_40%)]" />
          <motion.div
            className="absolute -left-24 top-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.16)_0%,rgba(197,160,89,0)_72%)] blur-3xl"
            animate={{ x: [0, 42, 0], y: [0, -24, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-28 bottom-12 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(15,15,15,0.08)_0%,rgba(15,15,15,0)_74%)] blur-3xl"
            animate={{ x: [0, -36, 0], y: [0, 26, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <main className="pb-20 md:pb-0">
          <Hero />
          <TrustSignals />
          <Services />
          <WhyUs />
          <Trust />
          <SocialProof />
          <Journey />
          <FAQ />
          <Locations />
          <FinalCTA />
        </main>
        <MobileBookingBar />
      </div>
    </BookingProvider>
  );
};

export default Index;
