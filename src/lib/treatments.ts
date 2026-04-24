export type Treatment = {
  slug: string;
  name: string;
  category: string;
  shortDesc: string;
  startingPrice: string;
};

export const treatments: Treatment[] = [
  {
    slug: "morpheus8-rf",
    name: "Morpheus8 RF",
    category: "Skin Remodeling",
    shortDesc: "Fractional RF microneedling to tighten skin, refine texture, and improve tone with minimal downtime.",
    startingPrice: "$850",
  },
  {
    slug: "venus-bliss-max",
    name: "Venus Bliss MAX",
    category: "Body Contouring",
    shortDesc: "Non-invasive body sculpting that targets stubborn fat pockets and supports smoother contours.",
    startingPrice: "$700",
  },
  {
    slug: "dermal-fillers",
    name: "Dermal Fillers",
    category: "Injectables",
    shortDesc: "Strategic filler placement to restore balance, soften lines, and enhance natural facial harmony.",
    startingPrice: "$650",
  },
  {
    slug: "aerolase-neo",
    name: "Aerolase Neo",
    category: "Laser Treatments",
    shortDesc: "A 650-microsecond laser protocol for clearer skin tone, reduced redness, and improved clarity.",
    startingPrice: "$450",
  },
  {
    slug: "iv-hydration-therapy",
    name: "IV Hydration Therapy",
    category: "Wellness",
    shortDesc: "Customized infusions that support hydration, recovery, and overall wellness from within.",
    startingPrice: "$180",
  },
  {
    slug: "hydrafacial",
    name: "HydraFacial",
    category: "Core Skincare",
    shortDesc: "A multi-step clinical facial that deeply cleanses, exfoliates, and hydrates for an instant glow.",
    startingPrice: "$225",
  },
];
