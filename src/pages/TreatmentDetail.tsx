import { Link, useParams } from "react-router-dom";
import { BookingProvider, useBooking } from "@/components/BookingDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { treatments } from "@/lib/treatments";

function StickyBookCTA({ treatmentName }: { treatmentName: string }) {
  const { open } = useBooking();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E7E2D9] bg-[#F9F9F7]/95 p-3 backdrop-blur md:p-4">
      <div className="container flex items-center justify-between gap-3">
        <p className="hidden text-sm text-[#0F0F0F]/70 md:block">
          Ready to book <span className="font-medium text-[#0F0F0F]">{treatmentName}</span>?
        </p>
        <Button
          onClick={() => open({ treatmentName })}
          className="h-11 w-full bg-[#C5A059] text-[#0F0F0F] hover:bg-[#C5A059]/90 md:w-auto md:px-8"
        >
          Book This Treatment
        </Button>
      </div>
    </div>
  );
}

function TreatmentDetailContent() {
  const { slug } = useParams();
  const treatment = treatments.find((item) => item.slug === slug);

  if (!treatment) {
    return (
      <main className="container py-24">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#C5A059]">Treatment Not Found</p>
        <h1 className="mb-4 font-serif text-4xl">We could not find that treatment page.</h1>
        <Link to="/" className="text-sm text-[#0F0F0F]/70 transition-colors hover:text-[#C5A059]">
          Return to homepage
        </Link>
      </main>
    );
  }

  const whatItTreats = [
    "Fine lines, texture irregularities, and dullness",
    "Loss of elasticity or contour definition",
    "Uneven tone, congestion, or early signs of aging",
  ];

  const howItWorks = [
    "Consultation and skin analysis to map your goals and timeline.",
    "Personalized treatment protocol performed by our clinical team.",
    "Aftercare and follow-up optimization for sustained, natural-looking results.",
  ];

  const faqs = [
    {
      q: `Who is a good candidate for ${treatment.name}?`,
      a: "Candidates are determined during consultation based on skin condition, goals, and medical history.",
    },
    {
      q: "How many sessions are usually recommended?",
      a: "Most treatment plans are built as a short series, then transitioned into maintenance for long-term results.",
    },
    {
      q: "Is there any downtime?",
      a: "Downtime varies by treatment intensity. We review expected recovery and aftercare before your appointment.",
    },
    {
      q: "When should I expect to see results?",
      a: "Some improvements appear quickly, while full collagen and contour benefits typically build over several weeks.",
    },
  ];

  return (
    <>
      <main className="pb-28">
        <section className="border-b border-[#E7E2D9] bg-[#F5F0E8]/45 py-20">
          <div className="container">
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[#C5A059]">{treatment.category}</p>
            <h1 className="mb-4 font-serif text-4xl md:text-6xl">{treatment.name}</h1>
            <p className="max-w-3xl text-lg text-[#0F0F0F]/75">{treatment.shortDesc}</p>
          </div>
        </section>

        <section className="container grid gap-10 py-14 md:grid-cols-2">
          <article className="rounded-2xl border border-[#E7E2D9] bg-white p-7">
            <h2 className="mb-4 font-serif text-3xl">What it treats</h2>
            <ul className="space-y-2">
              {whatItTreats.map((item) => (
                <li key={item} className="flex gap-2 text-[#0F0F0F]/75">
                  <span className="mt-2 h-px w-2 flex-shrink-0 bg-[#C5A059]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-[#E7E2D9] bg-white p-7">
            <h2 className="mb-4 font-serif text-3xl">How it works</h2>
            <ol className="space-y-3">
              {howItWorks.map((step, index) => (
                <li key={step} className="flex gap-3 text-[#0F0F0F]/75">
                  <span className="font-serif text-[#C5A059]">{String(index + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>
        </section>

        <section className="container py-2">
          <div className="rounded-2xl border border-[#E7E2D9] bg-[#F5F0E8]/45 p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[#0F0F0F]/50">Pricing Range</p>
            <p className="mt-2 font-serif text-4xl text-[#C5A059]">{treatment.startingPrice} - $X,XXX</p>
          </div>
        </section>

        <section className="container py-14">
          <h2 className="mb-6 font-serif text-3xl">Before &amp; after gallery</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl border border-dashed border-[#C5A059]/45 bg-[#F5F0E8] p-3 text-xs uppercase tracking-[0.2em] text-[#0F0F0F]/45"
              >
                Placeholder {index + 1}
              </div>
            ))}
          </div>
        </section>

        <section className="container pb-16">
          <h2 className="mb-6 font-serif text-3xl">FAQ</h2>
          <Accordion type="single" collapsible>
            {faqs.map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index}`} className="border-[#0F0F0F]/15">
                <AccordionTrigger className="text-left font-serif text-xl hover:text-[#C5A059] hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#0F0F0F]/75">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <StickyBookCTA treatmentName={treatment.name} />
    </>
  );
}

const TreatmentDetail = () => {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-[#F9F9F7] text-[#0F0F0F]">
        <TreatmentDetailContent />
      </div>
    </BookingProvider>
  );
};

export default TreatmentDetail;
