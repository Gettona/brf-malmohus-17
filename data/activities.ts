export type ActivityItem = {
  title: string;
  schedule: string;
  description: string;
  contact?: string;
  phone?: string;
  phoneHref?: string;
};

export const activities: ActivityItem[] = [
  {
    title: "Tisdagsklubben",
    schedule: "Tisdagar 18.30-21.30, 3/1-16/5 samt 5/9-5/12",
    description: "En enkel och social träff där boende handarbetar, samtalar och umgås. Kaffe serveras till självkostnadspris. Ta gärna med egen kaka.",
    contact: "Ingrid Mandorf",
    phone: "0730-618545",
    phoneHref: "tel:0730618545",
  },
  {
    title: "Torsdagsträffen",
    schedule: "Helgfria torsdagar 14.00-17.00, 5/1-4/5 samt 14/9-7/12",
    description: "Träffen börjar med en promenad och fortsätter med gemenskap mellan medlemmar. Ta med egen fika om du vill.",
    contact: "Kerstin Svensson",
    phone: "0733-3425939",
    phoneHref: "tel:07333425939",
  },
  {
    title: "Boule",
    schedule: "Onsdagar kl. 14.00 under sommarhalvåret",
    description: "Boule spelas vid boulebanan. Efter spelet finns möjlighet att grilla tillsammans. Var och en tar med det man vill grilla.",
    contact: "Kjell-Åke Palm",
    phone: "0708-157988",
    phoneHref: "tel:0708157988",
  },
];

export const activityInfo = {
  skadebanan:
    "Föreningens medlemmar är automatiskt medlemmar i Skådebanan, som erbjuder förmånliga kulturarrangemang hos bland annat teatrar, operan, symfoniorkestrar, museer, bibliotek och konsthallar i Skåne.",
  facilities:
    "Fritidslokalerna kan bokas för privat bruk, till exempel kalas eller mindre träffar. Mer information om bokning finns på sidan Lokaler och bokning.",
};
