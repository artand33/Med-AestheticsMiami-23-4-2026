import { Link, useParams } from "react-router-dom";
import { locations } from "@/lib/locations";

const LocationDetail = () => {
  const { slug } = useParams();
  const location = locations.find((item) => item.id === slug);

  if (!location) {
    return (
      <main className="container py-24">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#C5A059]">Location Not Found</p>
        <h1 className="mb-4 font-serif text-4xl">We could not find that location page.</h1>
        <Link to="/" className="text-sm text-[#0F0F0F]/70 transition-colors hover:text-[#C5A059]">
          Return to homepage
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9F9F7] py-24 text-[#0F0F0F]">
      <section className="container">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[#C5A059]">Location Detail</p>
        <h1 className="mb-3 font-serif text-5xl">{location.name}</h1>
        <p className="mb-8 max-w-2xl text-[#0F0F0F]/70">
          Placeholder page for location-specific content. We will add team bios, parking details, nearby landmarks, and location FAQs.
        </p>
        <div className="rounded-2xl border border-[#E7E2D9] bg-white p-6 text-[#0F0F0F]/75">
          <p>{location.address}</p>
          <p className="mt-2">{location.phone}</p>
          <p className="mt-2">{location.hours}</p>
        </div>
      </section>
    </main>
  );
};

export default LocationDetail;
