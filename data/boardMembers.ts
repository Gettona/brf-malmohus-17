export type BoardMember = {
  name: string;
  role: string;
  phone?: string;
  phoneHref?: string;
  image?: string;
};

export type ResponsibilityGroup = {
  title: string;
  people: Array<{
    name: string;
    phone?: string;
    phoneHref?: string;
  }>;
};

export const boardMembers: BoardMember[] = [
  {
    name: "Kjell-Åke Palm",
    role: "Ordförande",
    phone: "0723-190192",
    phoneHref: "tel:0723190192",
    image: "/images/styrelsen/kjell-ake-palm.jpg",
  },
  {
    name: "Rudolf Kunstek",
    role: "Vice ordförande",
    phone: "0708-310692",
    phoneHref: "tel:0708310692",
    image: "/images/styrelsen/rudolf-kunstek.jpg",
  },
  {
    name: "Anette Jensen",
    role: "Sekreterare",
    phone: "0705-951233",
    phoneHref: "tel:0705951233",
    image: "/images/styrelsen/anette-jensen.jpg",
  },
  {
    name: "Ann-Margreth Lexner",
    role: "Ledamot",
    phone: "0703-226972",
    phoneHref: "tel:0703226972",
    image: "/images/styrelsen/ann-margreth-lexner.jpg",
  },
  {
    name: "Leif Anderberg",
    role: "Suppleant",
    image: "/images/styrelsen/leif-anderberg.jpg",
  },
  {
    name: "Daniela Dolenec",
    role: "Suppleant",
    phone: "0700-542022",
    phoneHref: "tel:0700542022",
    image: "/images/styrelsen/daniela-dolenec.jpg",
  },
  {
    name: "Johan Persson",
    role: "Riksbyggens representant",
    image: "/images/styrelsen/johan-persson.jpg",
  },
];

export const responsibilityGroups: ResponsibilityGroup[] = [
  {
    title: "Studie/Fritid samt utlåning av bord, stolar & fritidslokal",
    people: [{ name: "Anette Jensen" }, { name: "Ann-Margreth Lexner" }],
  },
  {
    title: "Hemsidan och webbansvarig",
    people: [{ name: "Daniela Dolenec" }],
  },
  {
    title: "Föreningsrevisor",
    people: [{ name: "Suzanna Kulisic" }, { name: "Leif Nilsson" }],
  },
  {
    title: "Valberedningen",
    people: [
      { name: "Marcus Odelstig", phone: "0760-273559", phoneHref: "tel:0760273559" },
      { name: "Marcus Petersen", phone: "070-2636746", phoneHref: "tel:0702636746" },
    ],
  },
];
