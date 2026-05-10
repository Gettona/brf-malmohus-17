export type MaintenanceHistoryItem = {
  period: string;
  title: string;
  details?: string;
};

export const maintenanceHistory: MaintenanceHistoryItem[] = [
  { period: "1999/2000", title: "Balkonger" },
  { period: "2006", title: "Fönster" },
  { period: "2015", title: "Värmesystem", details: "Nya undercentraler och injustering med EB-metoden." },
  { period: "2016", title: "Miljöhus och lokaler", details: "Nybyggt miljöhus samt renovering av styrelserum och vaktmästeri." },
  { period: "2017", title: "Tvättstugor" },
  { period: "2017", title: "Fritidslokal på Albinsrogatan", details: "Totalrenovering av fritidslokalen." },
  { period: "2017", title: "Utemiljö", details: "Lekplats och grillplatser förbättrades." },
  { period: "2017", title: "Installationer", details: "Nytt låssystem installerades." },
  { period: "2018/2019", title: "El- och tappvattenstammar", details: "Underhåll av elstammar och tappvattenstammar." },
  { period: "2019/2020", title: "Fritidslokal Bisittaren", details: "Totalrenovering av fritidslokalen i Bisittaren." },
  { period: "2020/2021", title: "Hissar", details: "Installation av nya hissar ned till entréplan." },
  { period: "2020/2022", title: "Avloppsstammar", details: "Relining av avloppsstammar." },
  { period: "2025", title: "Porttelefonsystem", details: "Nytt porttelefonsystem installerades." },
];
