export type ClinicLocation = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapEmbedUrl: string;
};

export const locations: ClinicLocation[] = [
  {
    id: "brickell",
    name: "Miami - Brickell",
    address: "000 Brickell Ave, Suite 000, Miami, FL 33131",
    phone: "(305) 000-0001",
    hours: "Mon-Fri - 9am-6pm",
    mapEmbedUrl: "https://maps.google.com/?q=Miami+Brickell",
  },
  {
    id: "coral-gables",
    name: "Miami - Coral Gables",
    address: "000 Miracle Mile, Suite 000, Coral Gables, FL 33134",
    phone: "(305) 000-0002",
    hours: "Mon-Sat - 10am-7pm",
    mapEmbedUrl: "https://maps.google.com/?q=Coral+Gables+Miami",
  },
  {
    id: "aventura",
    name: "Miami - Aventura",
    address: "000 Biscayne Blvd, Suite 000, Aventura, FL 33180",
    phone: "(305) 000-0003",
    hours: "Tue-Sun - 10am-6pm",
    mapEmbedUrl: "https://maps.google.com/?q=Aventura+Miami",
  },
];
