export interface Service {
  name: string;
  price: string;
  duration: string;
}

export interface BusinessData {
  name: string;
  type: string;
  description: string;
  services: Service[];
  location: {
    neighborhood: string;
    address: string;
  };
  whatsapp: string;
  hours: string;
  social: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  brand: {
    logoUrl: string;
    heroUrl: string;
    primaryColor: string;
  };
}

export const mockBusiness: BusinessData = {
  name: "The Corner Barbershop",
  type: "Barbershop",
  description:
    "Classic barbershop in Villa Crespo. Specialized in precision cuts and beard grooming.",
  services: [
    { name: "Classic Haircut", price: "6500", duration: "45 min" },
    { name: "Beard Trim", price: "4000", duration: "20 min" },
    { name: "Haircut + Beard", price: "9500", duration: "60 min" },
  ],
  location: {
    neighborhood: "Villa Crespo",
    address: "Av. Corrientes 5320",
  },
  whatsapp: "1134567890",
  hours: "Mon–Sat 9am to 8pm",
  social: {
    instagram: "@thecornerbarbershop",
    facebook: "",
    tiktok: "",
  },
  brand: {
    logoUrl: "",
    heroUrl: "",
    primaryColor: "#B8952A",
  },
};
