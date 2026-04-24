import { treatments, type Treatment } from "./treatments";

export type ServiceCategory = {
  slug: string;
  tag: string;
  title: string;
  treatments: string[];
  startingPrice: string;
  img: string;
};

export const SERVICES: ServiceCategory[] = [
  {
    slug: "morpheus8-rf",
    tag: "Face / Neck / Body",
    title: "Skin Remodeling",
    treatments: ["Morpheus8 RF", "Microneedling", "Fraxel resurfacing"],
    startingPrice: "From $299/session",
    img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80&auto=format&fit=crop",
  },
  {
    slug: "venus-bliss-max",
    tag: "Body / Sculpting",
    title: "Body Contouring",
    treatments: ["Venus Bliss MAX", "Quantum RF", "Lymphatic sculpt support"],
    startingPrice: "From $599/session",
    img: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80&auto=format&fit=crop",
  },
  {
    slug: "dermal-fillers",
    tag: "Injectables",
    title: "Injectables & Facial Artistry",
    treatments: ["Neuromodulators", "Dermal fillers", "Biostimulator artistry"],
    startingPrice: "From $12/unit",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80&auto=format&fit=crop",
  },
  {
    slug: "aerolase-neo",
    tag: "Skin Health",
    title: "Laser Treatments",
    treatments: ["Aerolase Neo", "IPL photofacial", "Laser hair removal"],
    startingPrice: "From $299/session",
    img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80&auto=format&fit=crop",
  },
  {
    slug: "iv-hydration-therapy",
    tag: "Wellness",
    title: "Wellness & IV Therapy",
    treatments: ["IV hydration drips", "Vitamin infusions", "Recovery boosters"],
    startingPrice: "From $175/session",
    img: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&q=80&auto=format&fit=crop",
  },
  {
    slug: "hydrafacial",
    tag: "Skin Essentials",
    title: "Core Skincare",
    treatments: ["HydraFacial", "Chemical peels", "Clinical facials"],
    startingPrice: "From $175/session",
    img: "https://images.unsplash.com/photo-1583241475880-083f84372725?w=600&q=80&auto=format&fit=crop",
  },
];

export function getHeadlineTreatmentForService(
  service: ServiceCategory,
): Treatment | undefined {
  return treatments.find((item) => item.slug === service.slug);
}
