export type ImageItem = {
  src: string;
  alt: string;
  title: string;
  description?: string;
};

export type InfoSection = {
  title: string;
  body: string[];
  list?: string[];
};

export const facilitiesImages: ImageItem[] = [
  {
    src: "/images/lokaler/fritidslokal-bisittaren-oversikt.jpg",
    alt: "Översikt över lilla fritidslokalen i Bisittaren låghus.",
    title: "Lilla lokalen, Bisittaren",
    description: "Fritidslokal med plats för cirka 40 personer.",
  },
  {
    src: "/images/lokaler/fritidslokal-bisittaren-kok.jpg",
    alt: "Köksdel i lilla fritidslokalen i Bisittaren.",
    title: "Köksdel i lilla lokalen",
  },
  {
    src: "/images/lokaler/fritidslokal-bisittaren-hall.jpg",
    alt: "Entré och hall i lilla fritidslokalen.",
    title: "Hall i lilla lokalen",
  },
  {
    src: "/images/lokaler/fritidslokal-bisittaren-rum.jpg",
    alt: "Rumsdel i lilla fritidslokalen.",
    title: "Rumsdel i lilla lokalen",
  },
  {
    src: "/images/lokaler/fritidslokal-albinsro-oversikt.jpg",
    alt: "Översikt över stora fritidslokalen på Albinsrogatan 37.",
    title: "Stora lokalen, Albinsrogatan 37",
    description: "Fritidslokal med plats för cirka 60 personer.",
  },
  {
    src: "/images/lokaler/fritidslokal-albinsro-kok.jpg",
    alt: "Köksdel i stora fritidslokalen på Albinsrogatan 37.",
    title: "Köksdel i stora lokalen",
  },
  {
    src: "/images/lokaler/fritidslokal-albinsro-hall.jpg",
    alt: "Hall i stora fritidslokalen på Albinsrogatan 37.",
    title: "Hall i stora lokalen",
  },
];

export const facilitiesSections: InfoSection[] = [
  {
    title: "Tvättstugor",
    body: [
      "Det finns tvättstugor i källaren i varje hus. Tvättid bokas genom att du låser fast din tvättkolv på bokningstavlan bredvid tvättstugan.",
      "Anmäl fel på maskiner eller annan utrustning via Riksbyggen Dag & Natt så att felet registreras och kan åtgärdas.",
    ],
  },
  {
    title: "Allhobbyrum",
    body: [
      "Föreningen har ett allhobbyrum i Hus 2. Rummet kan hyras av medlemmar i högst en vecka åt gången.",
      "Lokalen passar för hobby- och renoveringsprojekt som kan vara svåra att utföra i lägenheten. I rummet finns arbetsbänk och strömuttag. Verktyg och övrig utrustning tar du med själv.",
      "Efter användning ska lokalen städas. Kölista finns och bokning sker via vaktmästaren.",
    ],
    list: [
      "Störande arbeten är tillåtna vardagar 08.00-20.00.",
      "Lördagar är störande arbeten tillåtna 10.00-16.00.",
      "Söndagar och helgdagar ska vara tysta.",
    ],
  },
  {
    title: "Förråd",
    body: [
      "Föreningen har ett antal mindre förråd för uthyrning i fastigheterna. Kostnaden är 7 kr/kvm.",
      "Intresseanmälan skickas till styrelsen. Kölista finns.",
    ],
  },
  {
    title: "Fritidslokaler",
    body: [
      "Föreningens fritidslokaler är nyrenoverade och i mycket gott skick. De kan lånas av medlemmar för privat bruk, till exempel barnkalas eller mindre sammankomster.",
      "Lokalerna kan lånas fram till kl. 22.00. Storhelger, till exempel jul och nyår, är undantagna.",
      "Kostnaden faktureras på nästa avgifts- eller hyresperiod. Depositionen återbetalas när lokalen har inspekterats och godkänts.",
      "Eventuella kostnader för extra städning eller störningsjour debiteras den lägenhetsinnehavare som har lånat lokalen.",
    ],
    list: ["Bisittaregatan: 700 kr.", "Albinsrogatan 37: 700 kr.", "Deposition: 500 kr."],
  },
  {
    title: "Lilla lokalen",
    body: ["Lilla lokalen i Bisittaren låghus har plats för cirka 40 personer."],
  },
];

export const wasteSections: InfoSection[] = [
  {
    title: "Sortera och packa ihop",
    body: [
      "Miljöhuset är stort, modernt och har tydlig information vid kärlen. För att det ska fungera behöver alla sortera rätt och packa ihop avfall så att det får plats.",
      "Riv eller skär ner kartonger innan du lägger dem i kärlen. Ställ inget på golvet eller ovanpå kärlen.",
    ],
  },
  {
    title: "Matavfall och restavfall",
    body: [
      "Sortera matavfall i rätt påse. Det är bra för miljön och minskar föreningens kostnader.",
      "Fett och matolja ska inte hällas i avloppet. Torka upp mindre mängder med hushållspapper och lägg i sop- eller matavfallspåse. Större mängder kan hällas i en förpackning med lock och läggas i restavfallet.",
    ],
  },
  {
    title: "Grovavfall och container",
    body: [
      "Grovavfall och farligt avfall ska lämnas på Sysavs återvinningscentraler. När föreningen bokar container för boende informeras det separat.",
      "Saker som kan återbrukas kan ofta lämnas till återvinningscentral eller second hand i stället för att slängas.",
    ],
  },
];

export const wasteNotAllowed = [
  "Kartonger och emballage som är större än 1 meter.",
  "Möbler, mattor, madrasser, täcken och kuddar.",
  "Stora sopsäckar med blandat avfall.",
  "Större glaspartier, speglar, tavlor och krukor.",
  "Stora växter eller träd.",
  "Byggmaterial och emballage från större renoveringar.",
  "Farligt avfall som färg, lim, olja, lösningsmedel, rengöringsmedel, nagellack och kvicksilvertermometrar.",
];

export const wasteMistakes = [
  "Att lämna saker på golvet när kärlet är fullt.",
  "Att lägga stora kartonger i kärlen utan att dela dem.",
  "Att blanda flera sorters avfall i stora säckar.",
  "Att lämna renoveringsavfall i miljöhuset.",
  "Att lämna saker som egentligen ska till återvinningscentral eller återbruk.",
];

export const utilityHighlights = [
  {
    title: "Bredband",
    value: "1000/1000 Mbps",
    text: "Bredband via NetAtOnce ingår i avgiften och lägenheterna är anslutna till föreningens bredbandsnät.",
  },
  {
    title: "TV",
    value: "Tele2",
    text: "Föreningen är ansluten till kabel-TV via Tele2. Basutbudet finns analogt och digitalt.",
  },
  {
    title: "El",
    value: "Gruppinköp",
    text: "Föreningen har gruppinköp av el. Varje hushåll betalar för sin egen förbrukning via avgiftsavin.",
  },
];

export const tvChannels = [
  "SVT 1",
  "SVT 2",
  "TV 3",
  "TV 4",
  "TV 5",
  "TV 6",
  "TV 7",
  "TV 8",
  "TV 9",
  "TV 10",
  "TV 11",
  "TV 12",
  "FOX",
  "TCL",
  "SVT 1 HD",
  "SVT 2 HD",
  "TV 4 HD",
  "AXESS",
  "SVT 24 / Barnkanalen",
  "Kunskapskanalen",
];

export const utilityFaq = [
  {
    question: "Behöver jag beställa bredband separat?",
    answer: "Nej, 1000/1000 Mbps bredband ingår i avgiften. Du ansluter din utrustning till bredbandsuttaget i lägenheten.",
  },
  {
    question: "Hur ansluter jag flera enheter?",
    answer: "Använd en egen router. Vill du ha trådlöst nätverk väljer du en router med WLAN eller wifi.",
  },
  {
    question: "Ingår IP-telefoni?",
    answer: "Basavgiften för IP-telefoni ingår, men startavgift och samtalskostnader eller abonnemangskostnad kan tillkomma beroende på val.",
  },
  {
    question: "Vad gör jag vid inflyttning eller avflyttning?",
    answer: "Vid inflyttning kontaktar du Tele2 för att beställa TV-box. Vid avflyttning ska boxen returneras till Tele2.",
  },
  {
    question: "Hur fungerar eldebiteringen?",
    answer: "Föreningen köper in el gemensamt. Din egen förbrukning debiteras via avgiftsavin med några månaders förskjutning.",
  },
];
