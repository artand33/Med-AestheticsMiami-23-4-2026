
# Med Aesthetics Miami — Luxury Clinical Landing Page

A single-page, mobile-first site engineered to convert high-end Miami/Aventura clients into consultation bookings. Every section funnels toward one action: **Book Your Bespoke Consultation**.

## Design system
- **Palette:** Ivory white base (#FAF8F4), deep charcoal text, **Champagne Gold #C5A059** for CTAs, accent rules, icons, and headline flourishes.
- **Typography:** Serif display (Playfair Display or Cormorant) for headlines; clean sans-serif (Inter) for body.
- **Feel:** Generous whitespace, thin gold dividers, subtle fade/slide-in on scroll, soft image grain. No heavy animations.

## Sections

**1. Sticky nav** — Logo wordmark left; anchor links (Services, Why Us, Journey, FAQ); gold "Book Consultation" button right. Collapses to a clean drawer on mobile. Button is always one tap away.

**2. Hero** — Full-bleed Unsplash image (glowing skin / clinical interior), soft dark overlay. Serif headline *"The Science of Self-Love: Bespoke Aesthetic Excellence."* Supporting line about Miami total-body transformation. Gold primary CTA + secondary "Explore Treatments" anchor link.

**3. Services** — 4-card grid (1 col mobile, 2 tablet, 4 desktop). Each card: imagery, gold tag chip, serif title, 1-line description, subtle hover lift. Cards: Skin Remodeling, Body Transformation, Facial Artistry, Laser Excellence.

**4. Why Us** — 3-column value pillars with thin gold line-icons: Medical Integrity, Advanced Innovation, Inclusive Beauty.

**5. Trust** — Two-column layout: Aventura clinic photo on one side; founder/medical director portrait + 3 philosophy bullets on the other. Quiet, editorial feel.

**6. Social Proof** — Before/After gallery (4 placeholder pairs with subtle slider/reveal), followed by 2–3 testimonial cards in serif italics with client initials and treatment tag.

**7. The Journey** — Horizontal 3-step roadmap (Deep Analysis → Bespoke Treatment → Sustainable Maintenance) with gold numerals. Below: location line ("Proudly serving Aventura, Miami & surrounding areas") and aftercare note.

**8. FAQ** — Elegant accordion with the 4 specified questions, concise jargon-free answers.

**9. Final CTA** — Full-width gold-tinted band: *"Start Your Journey to Self-Love."* Reassurance line + large CTA button.

**10. Footer** — Wordmark, placeholder address/phone/email/IG, hours, fine print.

## Booking flow
Every "Book Your Bespoke Consultation" button (hero, nav, final CTA, service cards) opens the same **modal booking form**:
- Fields: Name, Phone, Email, Area of Interest (dropdown of the 4 services + "Not sure yet"), Preferred Date, Notes.
- Submissions persisted via **Lovable Cloud** (consultations table) so you can review leads later.
- Success state with warm confirmation message; error toast on failure.
- Honeypot field for basic spam protection.

## Imagery
Curated Unsplash photography: glowing skin close-ups, modern clinical interiors, sculpted silhouettes, neutral-toned portraits. All images lazy-loaded and responsively sized for fast mobile performance.

## Tech & quality
- React + Tailwind, semantic HTML, accessible (focus rings, aria labels, keyboard-navigable modal & accordion).
- Mobile-first breakpoints, optimized image sizes, minimal JS.
- Smooth scroll on anchor links; reduced-motion respected.
- Placeholders clearly marked so you can swap clinic photos, founder image, before/afters, and contact details later.
