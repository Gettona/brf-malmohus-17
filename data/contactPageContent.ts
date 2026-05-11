export type ContactPageTexts = {
  pageEyebrow: string;
  pageTitle: string;
  pageDescription: string;
  emailCardTitle: string;
  phoneCardTitle: string;
  expeditionCardTitle: string;
  boardEyebrow: string;
  boardTitle: string;
  boardDescription: string;
  responsibilityEyebrow: string;
  responsibilityTitle: string;
  expeditionEyebrow: string;
  expeditionTitle: string;
  addressCardTitle: string;
  telephoneHoursCardTitle: string;
  officeYearEyebrow: string;
  officeTitle: string;
  officeDescription: string;
  formEyebrow: string;
  formTitle: string;
  formDescription: string;
  contactPanelTitle: string;
  contactPanelEmailLabel: string;
  contactPanelPhoneLabel: string;
  contactPanelExpeditionLabel: string;
  formLoadingText: string;
  formIntroBeforeEmail: string;
  formIntroAfterEmail: string;
  formCaseTypeLabel: string;
  formCaseTypes: string[];
  formFaultAlertTitle: string;
  formFaultAlertBeforePhone: string;
  formFaultAlertAfterPhone: string;
  formNameLabel: string;
  formEmailLabel: string;
  formAddressLabel: string;
  formMessageLabel: string;
  formFileLabel: string;
  formFileHelpText: string;
  formSelectedFileLabel: string;
  formFileTypeError: string;
  formFileSizeError: string;
  formSubmitLabel: string;
  formSubmitAlert: string;
};

export const contactPageTexts: ContactPageTexts = {
  pageEyebrow: "Kontakt",
  pageTitle: "Kontakta föreningen",
  pageDescription: "Här hittar du föreningens kontaktuppgifter, styrelse, övriga roller, expedition och kontaktformulär.",
  emailCardTitle: "E-post",
  phoneCardTitle: "Telefon",
  expeditionCardTitle: "Expedition",
  boardEyebrow: "Styrelsen",
  boardTitle: "Styrelsemedlemmar",
  boardDescription: "Kontakta gärna rätt person om du vet vem ärendet gäller. Annars går det bra att kontakta styrelsen gemensamt.",
  responsibilityEyebrow: "Ansvar",
  responsibilityTitle: "Övriga roller och ansvarsområden",
  expeditionEyebrow: "Expeditionen",
  expeditionTitle: "Besök och telefontid",
  addressCardTitle: "Adress",
  telephoneHoursCardTitle: "Telefontid",
  officeYearEyebrow: "2026",
  officeTitle: "Expeditionens öppettider",
  officeDescription: "Under 2026 kommer expeditionen att vara öppen mellan kl. 18.00-19.00 under dessa dagar.",
  formEyebrow: "Kontaktformulär",
  formTitle: "Skicka ett ärende",
  formDescription: "Beskriv ditt ärende så tydligt som möjligt. Observera att formuläret ännu är en prototyp och inte skickar e-post.",
  contactPanelTitle: "Kontakta föreningen",
  contactPanelEmailLabel: "E-post:",
  contactPanelPhoneLabel: "Telefon:",
  contactPanelExpeditionLabel: "Expedition:",
  formLoadingText: "Laddar kontaktformulär...",
  formIntroBeforeEmail: "Formuläret är ett förberett kontaktflöde. Tills e-postkoppling är på plats når du styrelsen direkt via",
  formIntroAfterEmail: ".",
  formCaseTypeLabel: "Ärendetyp",
  formCaseTypes: ["Felanmälan", "Fråga till styrelsen", "Parkering", "Dokument", "Mäklare", "Annat"],
  formFaultAlertTitle: "Viktigt",
  formFaultAlertBeforePhone: "Ordinarie felanmälan görs till Riksbyggen på",
  formFaultAlertAfterPhone: ". Detta formulär skickas till styrelsen och ersätter inte en felanmälan till Riksbyggen.",
  formNameLabel: "Namn",
  formEmailLabel: "E-post",
  formAddressLabel: "Adress eller lägenhetsnummer",
  formMessageLabel: "Meddelande",
  formFileLabel: "Bifoga fil",
  formFileHelpText: "Du kan bifoga en fil till alla ärendetyper. Tillåtna filtyper: PDF, JPG, PNG, DOC och DOCX. Maxstorlek: 10 MB.",
  formSelectedFileLabel: "Vald fil:",
  formFileTypeError: "Filtypen stöds inte. Välj PDF, JPG, PNG, DOC eller DOCX.",
  formFileSizeError: "Filen är för stor. Maxstorlek är 10 MB.",
  formSubmitLabel: "Skicka ärende",
  formSubmitAlert: "Tack. Formuläret är en prototyp och skickar ännu inte e-post.",
};
