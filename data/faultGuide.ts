export type FaultAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  external?: boolean;
  ariaLabel?: string;
};

export type FaultOption = {
  id: string;
  label: string;
  acute: boolean;
  contact: string;
  action: string;
  jour: string;
  actions: FaultAction[];
};

export const riksbyggenContact = {
  title: "Riksbyggen Dag & Natt",
  phone: "0771-860 860",
  phoneHref: "tel:0771860860",
  websiteLabel: "www.riksbyggen.se/Kontakt/",
  websiteHref: "https://www.riksbyggen.se/Kontakt/",
  caretakerPhone: "0704-023 395",
  caretakerPhoneHref: "tel:0704023395",
};

const riksbyggenActions: FaultAction[] = [
  {
    label: "Felanmäl via Riksbyggen.se",
    href: riksbyggenContact.websiteHref,
    variant: "primary",
    external: true,
  },
  {
    label: "Ring felanmälan/jour: 0771-860 860",
    href: riksbyggenContact.phoneHref,
    variant: "secondary",
    ariaLabel: "Ring Riksbyggen Dag och Natt på 0771 860 860",
  },
];

const contactFormAction: FaultAction = {
  label: "Gå vidare till kontaktformulär",
  href: "/kontakt?arende=Fråga%20till%20styrelsen#kontaktformular",
  variant: "primary",
};

export const faultOptions: FaultOption[] = [
  {
    id: "water",
    label: "Akut vattenläcka",
    acute: true,
    contact: "Felanmäl alltid till Riksbyggen Dag & Natt. Ring direkt om felet är akut.",
    action: "Stäng av vatten om du kan göra det säkert. Begränsa skadan och varna berörda grannar.",
    jour: "Jour ska användas om läckan pågår, riskerar att sprida sig eller påverkar el.",
    actions: riksbyggenActions,
  },
  {
    id: "electricity",
    label: "Elfel",
    acute: false,
    contact: "Fel som gäller fastighet, trapphus, port eller gemensamma utrymmen felanmäls till Riksbyggen Dag & Natt.",
    action: "Kontrollera säkringar och jordfelsbrytare. Rör inte skadade kablar eller uttag.",
    jour: "Ring jour vid fara, rökutveckling eller elfel som påverkar säkerhet eller gemensamma funktioner.",
    actions: riksbyggenActions,
  },
  {
    id: "laundry",
    label: "Tvättstuga",
    acute: false,
    contact: "Trasiga maskiner och fel i tvättstugan felanmäls till Riksbyggen Dag & Natt.",
    action: "Ange maskinnummer, datum och kort beskrivning. Sätt gärna en lapp på maskinen så andra boende undviker att använda den.",
    jour: "Jour behövs normalt inte för tvättstugeärenden, om det inte finns risk för vatten- eller personskada.",
    actions: riksbyggenActions,
  },
  {
    id: "entry",
    label: "Port / tagg / nyckel",
    acute: false,
    contact: "Fel på port, elektronisk nyckeltagg eller borttappad lägenhetsnyckel hanteras via Riksbyggen Dag & Natt.",
    action: "Beskriv port, taggnummer eller nyckeltyp och när felet uppstod.",
    jour: "Ring jour om boende inte kommer in i fastigheten och felet inte kan vänta.",
    actions: riksbyggenActions,
  },
  {
    id: "disturbance",
    label: "Störning",
    acute: false,
    contact: "Vid ordningsproblem i trappa eller på gård kontaktar du Riksbyggen Dag & Natt.",
    action: "Dokumentera tidpunkt och vad som har hänt. Vid hot eller akut fara ska du ringa 112.",
    jour: "Ring jour vid allvarliga ordningsproblem utanför ordinarie tid.",
    actions: riksbyggenActions,
  },
  {
    id: "common",
    label: "Fel i gemensamma utrymmen",
    acute: false,
    contact: "Fel i fastigheten och gemensamma utrymmen felanmäls till Riksbyggen Dag & Natt.",
    action: "Ta gärna en bild och ange plats så exakt som möjligt, till exempel trapphus, våning eller rumsnummer.",
    jour: "Ring jour vid risk för personskada, inbrott, vatten eller säkerhetsproblem.",
    actions: riksbyggenActions,
  },
  {
    id: "board",
    label: "Fråga till styrelsen",
    acute: false,
    contact: "Skicka frågan via kontaktformuläret eller besök expeditionen.",
    action: "Skriv kort vad ärendet gäller och vilken lägenhet eller adress det berör.",
    jour: "Jour ska inte användas för styrelsefrågor.",
    actions: [contactFormAction],
  },
  {
    id: "other",
    label: "Annat ärende",
    acute: false,
    contact: "Om ärendet gäller fastigheten ska du kontakta Riksbyggen. Om det är en fråga till styrelsen kan du använda kontaktformuläret.",
    action: "Beskriv vad som hänt, plats, tidpunkt och om någon åtgärd redan är gjord.",
    jour: "Ring jour om ärendet är akut och inte kan vänta till nästa vardag.",
    actions: [
      {
        label: "Gå vidare till kontaktformulär",
        href: "/kontakt?arende=Annat#kontaktformular",
        variant: "primary",
      },
      ...riksbyggenActions,
    ],
  },
];
