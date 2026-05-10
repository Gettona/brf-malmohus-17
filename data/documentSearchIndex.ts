export type DocumentSearchItem = {
  id: string;
  documentTitle: string;
  sourceUrl: string;
  sectionTitle: string;
  page?: number;
  text: string;
  keywords?: string[];
};

export type DocumentSearchResult = DocumentSearchItem & {
  score: number;
  excerpt: string;
  matchedTerms: string[];
};

// TODO: Byt gärna denna generator till ett mer avancerat byggsteg om PDF:erna växer:
// - extrahera rubriker mer exakt
// - spara sidkoordinater för träffar
// - skapa separata index per dokumentkategori
// Kör: npm run generate:document-index
export const documentSearchIndex: DocumentSearchItem[] = [
  {
    "id": "manual-trivsel-oversikt",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Trivselregler och A-Ö för boende",
    "page": 1,
    "text": "A-Ö för boende samlar praktisk information och trivselregler för vardagen i föreningen, till exempel gemensamma utrymmen, hänsyn, avfall, störningar och frågor som rör boendet.",
    "keywords": [
      "trivsel",
      "trivselregler",
      "ordningsregler",
      "A-Ö",
      "boende",
      "hänsyn"
    ]
  },
  {
    "id": "manual-stadgar-oversikt",
    "documentTitle": "Stadgar för Brf Malmöhus nr 17",
    "sourceUrl": "/documents/stadgar-brf-malmohus-17-2016.pdf",
    "sectionTitle": "Stadgar",
    "page": 1,
    "text": "Stadgarna beskriver föreningens regler, medlemskap, avgifter, ansvarsfördelning, styrelse, föreningsstämma och bostadsrättshavarens rättigheter och skyldigheter.",
    "keywords": [
      "stadgar",
      "förening",
      "medlemskap",
      "avgifter",
      "styrelse",
      "stämma",
      "ansvar"
    ]
  },
  {
    "id": "manual-trivsel-borra",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Borra, renovera och störande arbeten",
    "page": 1,
    "text": "Vid renovering, borrning och andra arbeten som kan störa grannar ska du visa hänsyn och följa föreningens trivselregler. Informera gärna berörda grannar och undvik störande arbeten på sena kvällar, nätter och tidiga morgnar.",
    "keywords": [
      "borra",
      "borrning",
      "renovering",
      "störande arbeten",
      "hänsyn",
      "trivsel"
    ]
  },
  {
    "id": "manual-trivsel-rokning",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Rökning",
    "page": 1,
    "text": "Rökning ska ske med hänsyn till grannar och gemensamma utrymmen. Undvik rökning där rök stör andra boende och lämna inte fimpar på gård, balkong eller vid entréer.",
    "keywords": [
      "rökning",
      "röka",
      "rök",
      "fimpar",
      "cigaretter",
      "balkong",
      "entré"
    ]
  },
  {
    "id": "manual-trivsel-container",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Container och grovavfall",
    "page": 1,
    "text": "När container finns på plats ska föreningens anvisningar följas. Lämna bara tillåtet grovavfall och lägg inte farligt avfall eller elavfall i container om inget annat anges.",
    "keywords": [
      "container",
      "containerdag",
      "grovavfall",
      "avfall",
      "miljöhus",
      "sopor"
    ]
  },
  {
    "id": "manual-trivsel-skadegorelse",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Skadegörelse",
    "page": 1,
    "text": "Skadegörelse, åverkan och klotter på fastighet eller gemensamma utrymmen ska anmälas. Dokumentera plats, tidpunkt och vad som har hänt.",
    "keywords": [
      "skadegörelse",
      "skada",
      "åverkan",
      "klotter",
      "sabotage",
      "anmälan"
    ]
  },
  {
    "id": "manual-stadgar-andrahandsuthyrning",
    "documentTitle": "Stadgar för Brf Malmöhus nr 17",
    "sourceUrl": "/documents/stadgar-brf-malmohus-17-2016.pdf",
    "sectionTitle": "Andrahandsuthyrning",
    "page": 4,
    "text": "Upplåtelse i andra hand kräver normalt styrelsens samtycke. Ansökan bör göras innan uthyrningen börjar och innehålla skäl, tidsperiod och uppgifter om den som ska bo i lägenheten.",
    "keywords": [
      "andrahandsuthyrning",
      "andra hand",
      "uthyrning",
      "hyra ut",
      "styrelsens samtycke"
    ]
  },
  {
    "id": "manual-trivsel-parkering",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Parkering, garage och fordon",
    "page": 1,
    "text": "Information om parkering, garage, köer och fordon hanteras enligt föreningens rutiner. Kontrollera skyltning, avgifter och köhantering via de kontaktvägar föreningen anger.",
    "keywords": [
      "parkering",
      "garage",
      "bilplats",
      "fordon",
      "kö",
      "riksbyggen"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-1-1",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 1, avsnitt 1",
    "page": 1,
    "text": "2022-12-22 Information från styrelsen! A till Ö Om att bo i Malmöhus 17! Kontaktuppgifter Felanmälan/Jour till Riksbyggen Dag & Natt 0771-860 860 Du kan göra felanmälan och ställa frågor om allt från avier till annan information, vilken tid som helst på dygnet. Vaktmästare 0704-023 395 Måndag-torsdag 07. 30-16. 00, fredagar 07. 30-14. 00 Övriga tider eller vid akut problem, kontakta Riksbyggen Dag & Natt Styrelsen/Expeditionen Öppettider finns anslaget i entréerna. Expeditionens telefon: 0723-19 01 92 styrelsen@malmohus17. se Mitt Riksbyggen www. riksbyggen. se Som medlem i Riksbyggen så har du fått inloggning till vår föreningsportal. Här finns allt du behöver veta om att bo i bostadsrätt.",
    "keywords": [
      "stadgar",
      "medlemskap",
      "avgift",
      "styrelse",
      "stämma"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-1-2",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 1, avsnitt 2",
    "page": 1,
    "text": "Här hittar du också personliga data för dig och din bostadsrätt, som garage, parkering etc. Hemsidan www. malmohus17. se Vår hemsida, där du hittar det mesta om oss!",
    "keywords": [
      "parkering",
      "garage",
      "bilplats",
      "lådcykel"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-2-1",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 2, avsnitt 1",
    "page": 2,
    "text": "2022-12-22 Här hittar du svar på det mesta om vad som gäller inom vår förening! Kort om Riksbyggen Riksbyggen finns över hela landet och deras huvudsakliga verksamhet består av att utveckla och förvalta attraktiva bostadsmiljöer. Riksbyggen är ett modernt kooperativt företag där den idémässiga grundsynen förenas med en affärsmässig verksamhet. En majoritet av ägarna är samtidigt kunder vilket ställer höga krav på effektivitet och kvalitet och det ger en stabilitet och kloka beslut som är väl förankrade i verkligheten. Läs mer om ägande i Riksbyggen och den intresseförening vi alla är medlemmar i på www. riksbyggen. se . Kort historik om hur vår förening kom till!",
    "keywords": []
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-2-2",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 2, avsnitt 2",
    "page": 2,
    "text": "Formellt så föddes föreningen den 25 mars 1969 vid ett möte med Riksbyggen i Malmö. De första inflyttningarna skedde den 15 december 1965 och pågick sedan successivt tills området var färdigställt. I området finns 3 st trevåningshus och 2 st åttavåningshus, med totalt 312 lägenheter. I vår bostadsrättsförening bor uppskattningsvis 600 personer, det vill säga, lika många som i ett litet samhälle. Allt vi gör i föreningen – gör vi för oss själva! Välkommen till oss!",
    "keywords": []
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-3-1",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 3, avsnitt 1",
    "page": 3,
    "text": "2022-12-22 Antenner Det är inte tillåtet att ha egna antenner eller paraboler fastsatta på föreningens balkongväggar, tak eller fasader. De får inte heller sticka ut från föreningens fönster, fasader eller balkonger. Samma gäller för radioantenner för privat bruk. Andrahandsuthyrning Det krävs en skriftlig ansökan till styrelsen för att hyra ut lägenheten i andrahand och beviljas endast om det finns mycket goda skäl för uthyrningen. Beviljas högst 6 månader åt gången. Lägenhetsinnehavaren debiteras 10% på månadsavgiften under hela uthyrningsperioden. Anslagstavlor Anslagstavlor som är placerade i entréerna är endast avsedda för styrelsens och Riksbyggens meddelande till föreningens boende.",
    "keywords": [
      "andrahandsuthyrning",
      "andra hand",
      "uthyrning",
      "hyra ut",
      "stadgar",
      "medlemskap",
      "avgift",
      "styrelse",
      "stämma",
      "boende"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-3-2",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Ansvar Att äga och bo i en bostadsrätt innebär ansvar",
    "page": 3,
    "text": "Ansvar Att äga och bo i en bostadsrätt innebär ansvar. Att bry sig om och vårda lägenhet och omgivningar, ställa frågor och återkoppla till ansvariga om något behöver åtgärdas. Avgifter Avgiften/hyran ska vara inbetald senast den sista dagen i varje månad. Avgift för garage, parkeringsplats och förråd betalas varje kvartal då den specificeras på fakturan. Frågor kring avgiften – kontakta Dag & Natt Riksbyggen. Badrum Planerar ni renovering av badrum så finns det en del att tänka på. Det krävs auktoriserad hantverkare, godkänd brunn. Det krävs intyg på tätskikt. Kontakta därför alltid styrelsen skriftligt via mail i samband med renovering.",
    "keywords": [
      "parkering",
      "garage",
      "bilplats",
      "lådcykel",
      "borra",
      "borrning",
      "renovering",
      "störande arbeten",
      "stadgar",
      "medlemskap",
      "avgift",
      "styrelse",
      "stämma"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-3-3",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Att rengöra brunnen minst 1 gång per månad ansvarar lägenhetsinnehavaren för",
    "page": 3,
    "text": "Att rengöra brunnen minst 1 gång per månad ansvarar lägenhetsinnehavaren för. Balkonger Nyckel för öppning av balkongens glaspartier finns till varje lägenhet. Kontakta vaktmästaren om det saknas nyckel och innehavaren bekostar nyckel. Föreningen vill att utsidan på fastigheterna ska vara enhetlig. Balkongens väggar alltid ska målas med färg S 0502-Y. Eventuella paneler på insidan ska vara vita. Rullgardin/solskydd ska alltid vara benvita. Kontakta styrelsen för råd innan uppsättning! Föreningen samarbetar med BT Bygg Malmö som levererar markiser, rullgardiner till bl a balkonger. Kontakt Christer, 070-748 02 16. Blomlådor får endast sättas upp på insidan.",
    "keywords": [
      "stadgar",
      "medlemskap",
      "avgift",
      "styrelse",
      "stämma"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-3-4",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Tvätt får inte hängas synligt på balkongen",
    "page": 3,
    "text": "Tvätt får inte hängas synligt på balkongen. Det är inte tillåtet att grilla på balkongen. Rökning sker med respekt för grannarna. Behöver du kattnät – kontakta styrelsen.",
    "keywords": [
      "rökning",
      "röka",
      "rök",
      "fimpar",
      "cigaretter",
      "störning",
      "störningar",
      "ljud",
      "fest",
      "grannar",
      "stadgar",
      "medlemskap",
      "avgift",
      "styrelse",
      "stämma"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-4-1",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "2022-12-22 Barnvagnar Barnvagnsrum finns i källaren i samtliga hus",
    "page": 4,
    "text": "2022-12-22 Barnvagnar Barnvagnsrum finns i källaren i samtliga hus. Kontakta vaktmästaren/styrelsen för att få taggen uppdaterad. Bilfritt Föreningens område är bilfritt förutom för utryckningsfordon. Bommar finns vid tomtgränsen och det är förbjudet att köra in på området. Endast styrelsens hantverkare får tillgång till området. Boulebana Boulebana, med plats för två spel/matcher samtidigt, finns på området. I förrådshuset på västra lekplatsen finns kratta mm för att återställa ytan. Förrådshuset öppnas med lägenhetsnyckeln. Bord och stolar Det finns möjlighet att låna extra bord och stolar vid behov som endast får användas inom föreningens område.",
    "keywords": [
      "stadgar",
      "medlemskap",
      "avgift",
      "styrelse",
      "stämma"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-4-2",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Bokning – se telefonlista på anslagstavlan i entrén",
    "page": 4,
    "text": "Bokning – se telefonlista på anslagstavlan i entrén. Om något skadas, går sönder så blir den som lånar ersättningsskyldig. Brand Vid brand ring larmnummer 112. Om skada uppstått – kontakta styrelsen och ditt eget försäkringsbolag. Brandvarnare Lägenhetsinnehavaren är ansvarig för att det finns minst en fungerande brandvarnare uppsatt i lägenheten. Årligen ska brandvarnaren funktionstestas och batterier bytas. ComHem - TV ComHem-boxen tillhör lägenhetsinnehavaren och boxen ska lämnas tillbaka till ComHem när innehavaren flyttar. Lämnas inte boxen tillbaka debiteras en kostnad. Container Föreningen bokar container för grovavfall några gånger om året för boende i föreningen.",
    "keywords": [
      "container",
      "containerdag",
      "grovavfall",
      "avfall",
      "skadegörelse",
      "skada",
      "åverkan",
      "klotter",
      "sabotage",
      "stadgar",
      "medlemskap",
      "avgift",
      "styrelse",
      "stämma",
      "boende"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-4-3",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Större möbler, däck, färgavfall och annat farligt avfall får ej lämnas här",
    "page": 4,
    "text": "Större möbler, däck, färgavfall och annat farligt avfall får ej lämnas här. Datum och plats meddelas via anslag. Cyklar Cykelförråd finns för uthyrning i föreningens källare, och är endast avsett för cyklar- och cykelvagnar. Kontakta Mitt Riksbyggen. Cykelställ finns utplacerade på föreningens område och är avsedda för fungerande cyklar. Skrotcyklar får inte placeras i källare eller i cykelställ. Cyklar får inte heller ställas vid husväggar, i gångarna eller vid entréerna (tillåtet endast för Hemtjänsten). Cykel- och mopedåkning är inte tillåtet inom området.",
    "keywords": [
      "container",
      "containerdag",
      "grovavfall",
      "avfall",
      "andrahandsuthyrning",
      "andra hand",
      "uthyrning",
      "hyra ut"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-5-1",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 5, avsnitt 1",
    "page": 5,
    "text": "2022-12-22 Elcentral, spis etc Elsystem i lägenheterna är normalt 1 fas 230 volt och avser t ex spis. Om ny elcentral är installerad så ingår 3 fas 380 volt. Föreningen erbjuder en förmånlig installation av ny elcentral, kontakta styrelsen. Reparationer och byte av TV-uttag åtgärdar föreningen. Byte av vägguttag och strömbrytare eller andra elarbeten ansvarar lägenhetsinnehavaren för. Energikostnader Uppvärmning och varmvatten är en stor del av driftskostnaderna. Lägenhetsinnehavaren ansvarar själv för att fönster och dörrar är tätade ordentligt. För råd om tätningslistor och droppande kranar, kontakta vaktmästaren.",
    "keywords": [
      "stadgar",
      "medlemskap",
      "avgift",
      "styrelse",
      "stämma"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-5-2",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Fastighetsbeteckning Borgmästaregården 6 och 7 och tillhör Eriksfälts församling",
    "page": 5,
    "text": "Fastighetsbeteckning Borgmästaregården 6 och 7 och tillhör Eriksfälts församling. Felanmälan/Jourtjänst Dag & Natt 0771-860 860 Dag & Natt kontaktar du när något är på tok i din lägenhet och om det krävs omedelbara åtgärder! Eller om du vill anmäla störning på småtimmarna, dygnet runt. Riksbyggen registrerar din anmälan som därefter vidtar åtgärder som krävs och skickar över legitimerad och fackmässig personal som temporärt avhjälper felet/störningen. Tänk på att det är viktigt att också kontakta felanmälan om något inte fungerar i fastigheten som behöver åtgärdas, t ex en trasig lampa i trapphusen, hissen fungerar inte, tvättmaskin som är trasig etc.",
    "keywords": [
      "störning",
      "störningar",
      "ljud",
      "fest",
      "grannar"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-5-3",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 5, avsnitt 3",
    "page": 5,
    "text": "Det som vi inte vet och ser, blir inte heller åtgärdat! Fett/Matolja Torka upp det med lite hushållspapper som du lägger i soppåse eller i matavfallspåsen. Matoljan kan också hällas i en förpackning med lock och läggas i restavfallet/soppåsen. Fritidslokal Vi har två fina lokaler för uthyrning i föreningen. Båda är nyrenoverade och kostar 700 kr att hyra. Regler och kontaktpersoner hittar du på anslag i trappan eller på hemsidan. Fritidsverksamhet Aktuella aktiviteter inom föreningen hittar du på anslag i trappan eller på hemsidan.",
    "keywords": [
      "container",
      "containerdag",
      "grovavfall",
      "avfall",
      "andrahandsuthyrning",
      "andra hand",
      "uthyrning",
      "hyra ut"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-6-1",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "2022-12-22 Fåglar Det är inte tillåtet att mata fåglar från fönster och balkonger",
    "page": 6,
    "text": "2022-12-22 Fåglar Det är inte tillåtet att mata fåglar från fönster och balkonger. Det orsakar olägenhet som skrikande måsar, kråkor, kajor men även råttor och annan ohyra. Det är förbjudet enligt den lokala ”Hälsovårdsstadgan §20”. Fönster Kontakta vaktmästaren om du inte fått instruktion om hur du öppnar fönster, vid t ex fönsterputsning, Det krävs en del underhåll av våra fönster och en gång om året behövs att glidbanorna (förankrade i fönsterkarmens sidostycke) smörjs in med ett speciellt glidmedel. Tag kontakt med vaktmästaren för hjälp eller för lån av detta speciella glidmedel. Försäkring Det är viktigt att du som bor i bostadsrätt tecknar en hemförsäkring hos ett försäkringsbolag.",
    "keywords": []
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-6-2",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 6, avsnitt 2",
    "page": 6,
    "text": "Föreningen har gemensamt tecknat bostadsrättstillägg för alla lägenheter i föreningen. Så du behöver inte teckna detta själv. Garage Föreningen har 83 garageplatser avsedda för bilar samt 6 platser för motorcyklar . Spolnings- och biltvätt samt serviceutrymmen i garaget får endast utnyttjas av de som hyr garageplats. Om regler ej följs, förlorar man garageplatsen. Kölista via Mitt Riksbyggen. Golvbrunn Skall utföras av fackman som följer branschregler och är certifierad. Lägenhetsinnehavaren ansvarar för att anslutningar och tätskikt blir korrekt utförda. Skriftlig kopia av intyg på vem som utfört arbetet ska lämnas till styrelsen, då detta följer lägenheten vid försäljning.",
    "keywords": [
      "parkering",
      "garage",
      "bilplats",
      "lådcykel",
      "stadgar",
      "medlemskap",
      "avgift",
      "styrelse",
      "stämma"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-6-3",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 6, avsnitt 3",
    "page": 6,
    "text": "Grannar Att bo i ett flerfamiljshus innebär att bo nära grannar, vilket ställer krav på hänsyn och respekt för varandra. Glödlampor Se MILJÖHUS Grovavfall/Farligt avfall/Vitvaror Får inte lämnas i vårt Miljöhus! Grovavfall och farligt avfall lämnas gratis på Sysavs Återvinningscentraler, nära oss är: Norra Hamnens och Bunkeflos Återvinningscentraler. Mer info www. sysav. se Ditt besök är gratis med passersystem, så glöm inte ditt körkort. På Återvinningscentralerna och i Secondhandbutiker kan du också lämna saker för återbruk!",
    "keywords": [
      "container",
      "containerdag",
      "grovavfall",
      "avfall",
      "störning",
      "störningar",
      "ljud",
      "fest",
      "grannar",
      "trivsel",
      "ordningsregler",
      "hänsyn",
      "gemensamma utrymmen"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-7-1",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "2022-12-22 Hemsida Föreningens hemsida www",
    "page": 7,
    "text": "2022-12-22 Hemsida Föreningens hemsida www. malmohus17. se informerar fortlöpande om vad som händer. Hissar För allas gemensamma trevnad så gäller följande: Hissar får ej blockeras! OBS! Den nedersta knappen på hissen i entréplan, används endast i nödfall. Rökning är absolut förbjudet i hissarna. Hobbyrum/Förråd att hyra I föreningen finns ett all-hobbyrum i Hus 2, som går att hyra max en vecka i taget. Efter användning ska lokalen städas. Samma ordningsregler gäller här som i våra lägenheter, endast tillåtet för borrning eller hamrande vardagar 08. 00-20. 00, lördag 10. 00-16. 00 och tyst söndagar/helgdagar. Kölista finns och bokning sker hos vaktmästaren.",
    "keywords": [
      "rökning",
      "röka",
      "rök",
      "fimpar",
      "cigaretter",
      "borra",
      "borrning",
      "renovering",
      "störande arbeten",
      "trivsel",
      "ordningsregler",
      "hänsyn",
      "gemensamma utrymmen"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-7-2",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Föreningen har ett antal mindre förråd för uthyrning i våra fastigheter",
    "page": 7,
    "text": "Föreningen har ett antal mindre förråd för uthyrning i våra fastigheter. Kostnad för att hyra är 7 kr/kvm och intresseanmälan görs till Mitt Riksbyggen. Husdjur Hundar och andra husdjur får inte rastas eller gå lösa på vårt område. Enligt Malmöstads Miljö- och hälsoskydd så är det förbjudet för hundar att vistas på lekplatsen. Djuren ska vara kopplade med indragna linor/koppel. Naturligtvis så plockar ägaren upp bajset efter sina djur, om olyckan skulle vara framme. Bajset får inte läggas i föreningens papperskorgar. Bajskorgar finns placerade utanför vårt område. Hänsyn/Trivselregler Det är endast tillåtet att betongborra och hamra i väggarna på vardagar 08. 00-20. 00, lördag10. 00-16.",
    "keywords": [
      "andrahandsuthyrning",
      "andra hand",
      "uthyrning",
      "hyra ut",
      "borra",
      "borrning",
      "renovering",
      "störande arbeten",
      "trivsel",
      "ordningsregler",
      "hänsyn",
      "gemensamma utrymmen"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-7-3",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "00 och på söndagar/helgdagar är det tyst",
    "page": 7,
    "text": "00 och på söndagar/helgdagar är det tyst. Reparationer och förbättringar pågår mer eller mindre ständigt i lägenheterna. Husens konstruktioner är tyvärr sådana att ljud fortplantas via golv, väggar och tak. Det är viktigt att vi tänker på våra grannar, som kanske lyssnar på radio eller ser på TV och respekterar detta. Ni som har egna tvättmaskiner och torktumlare installerade - tänk på att maskinerna har rätt underlag och står stadigt. Om inte så uppstår oljud, men framförallt vibrationer som stör och som kan vibrera sönder kakel etc. Dessa maskiner får inte användas efter kl 20. 00!",
    "keywords": [
      "störning",
      "störningar",
      "ljud",
      "fest",
      "grannar"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-8-1",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "2022-12-22 Tänk på era grannar när ni har fest, lyssnar på hög musik eller dylikt",
    "page": 8,
    "text": "2022-12-22 Tänk på era grannar när ni har fest, lyssnar på hög musik eller dylikt. Ett öppet fönster eller en öppen balkongdörr sprider ljudet över ett stort område. Spela inte för högt efter klockan 22. 00! Om ni vill spela högt – använd gärna hörlurar. Internet Leverantör är Net at Once, www. netatonce. se , telefon 0470-472 00 Kranar (kök/badrum) På grund av problem med läckage från många olika vattenarmaturer/kranar, så har föreningen standardiserat vilka märken som är godkända att använda. Kök: F M Mattsons disklådsblandare, med eller utan diskmaskinsavstängning. Badrum/Toalett: F M Mattsons tvättställsblandare med eller utan lyftstång. Dusch/Bad: F M Mattsons termostatblandare.",
    "keywords": [
      "störning",
      "störningar",
      "ljud",
      "fest",
      "grannar"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-8-2",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 8, avsnitt 2",
    "page": 8,
    "text": "Reparationer och byte av packningar i samtliga av föreningen godkända blandare (enligt ovan) utförs av vaktmästaren. Källare och Vind Källare-och vindsutrymmen är (tyvärr) ingen lämplig plats att förvara stöldbegärligt gods på. Det är förbjudet att förvara ämnen som är klassade som brandfarlig vara i dessa utrymmen. Köksfläkt Endast kolfilterfläktar och spiskåpor är tillåtna i kök. MILJÖHUS Avfall/Sopor att sortera! Matavfall = Matrester av allt som du kan äta, förpackat i matavfallspåse! Påsar för detta finns i Miljöhuset. Papper = mjölk, juiceförpackningar, kartonger. Emballage/lådor mindre än 1 meter! Plast = plastförpackningar/behållare, plastpåsar, plasttuber, frigolit, dunkar, flaskor.",
    "keywords": [
      "container",
      "containerdag",
      "grovavfall",
      "avfall"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-8-3",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Tidningar = Dagstidningar, veckotidningar, broschyrer, reklamblad, kataloger",
    "page": 8,
    "text": "Tidningar = Dagstidningar, veckotidningar, broschyrer, reklamblad, kataloger. Metall = Konservburkar, tuber, kapsyler, lock, aluminiumfolie och formar. Glas = burkar och flaskor för ofärgat/färgat glas i separata kärl Restavfall = det som du inte sorterat, t ex blöjor, kuvert- och fönsterkuvert, diskborstar. Behållare finns också för Elektronik, lysrör, glödlampor, batterier! Julgranar kan kastas nerklippta i avsedda kärl. Alla måste hjälpas åt att hålla ordning i vårt fina Miljöhus!",
    "keywords": [
      "container",
      "containerdag",
      "grovavfall",
      "avfall"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-9-1",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 9, avsnitt 1",
    "page": 9,
    "text": "2022-12-22 Ohyra Det är lätt att drabbas av ohyra/skadeinsekter, som t ex mjölbaggar, pälsänglar, myror etc. För din och allas trevnad är det viktigt att vid upptäckt av ohyra direkt kontakta Riksbyggens Dag & Natt för sanering. Pantsättning När du belånar bostadsrätten så vill banken att Riks- byggen informeras om pantsättningen, de ska under- teckna lånehandlingarna. Ring Riksbyggen Dag & Natt. Parkering Föreningens bilparkeringar utomhus är numrerade p-platser. Finns både längs gatan och ovanpå garaget. All parkering har kölista. Kontakta Mitt Riksbyggen. Platser för MC finns i garaget – se under garage. Renovering Föreningen har ett tapetserarbord för utlåning.",
    "keywords": [
      "parkering",
      "garage",
      "bilplats",
      "lådcykel",
      "borra",
      "borrning",
      "renovering",
      "störande arbeten"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-9-2",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Kontakta vaktmästaren på telefon för bokning",
    "page": 9,
    "text": "Kontakta vaktmästaren på telefon för bokning. Rökning Det är förbjudet enligt lag att röka på offentliga platser, så som lekplatser, hissar, trapphus, källare, vind och utanför entréer. Visa hänsyn vid rökning inomhus och på balkongen, då röken sprids via ventilationen till grannarna. Det är absolut förbjudet att slänga glödande fimpar från fönster eller balkonger. Skadegörelse Det är viktigt att vi alla medverkar till att förhindra alla former av skadegörelse på vår gemensamma egendom. Upptäcker du skadegörelse så ska du snarast anmäla det till Riksbyggen Dag & Natt. Då hjälps vi också åt att hålla våra gemensamma driftskostnader låga.",
    "keywords": [
      "rökning",
      "röka",
      "rök",
      "fimpar",
      "cigaretter",
      "skadegörelse",
      "skada",
      "åverkan",
      "klotter",
      "sabotage",
      "störning",
      "störningar",
      "ljud",
      "fest",
      "grannar",
      "trivsel",
      "ordningsregler",
      "hänsyn",
      "gemensamma utrymmen"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-9-3",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 9, avsnitt 3",
    "page": 9,
    "text": "Stadgar Föreningens stadgar (som beskriver formella regler i vår förening) finns på vår hemsida. Styrelsen Vem som ingår i styrelsen, expeditionens öppettider ser du på anslagstavlan i entréerna och på vår hemsida. Du är också välkommen att skriva och lägga en lapp i brevinkastet på expeditionen, Albinsrogatan 23/gaveln. Städning Trappor, entréer, källargångar, tvättstuga, korridorer, expedition samt fritidslokaler städas av extern städfirma (se anslag i entrén). Säkerhetsdörrar Den bästa försäkringen mot objudna gäster är att ha en säkerhetsdörr. Vill du byta till en sådan, så ska alltid styrelsen kontaktas. Dörren måste överensstämma utseendemässigt med befintliga dörrar i trapphuset.",
    "keywords": [
      "stadgar",
      "medlemskap",
      "avgift",
      "styrelse",
      "stämma"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-10-1",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "2022-12-22 Tennisbana Asfalterad bana finns vid låghusen",
    "page": 10,
    "text": "2022-12-22 Tennisbana Asfalterad bana finns vid låghusen. Nät finns att låna i förrådshuset. Trapphus och trappor Det första våra besökare ser är vår trappuppgång, så det är viktigt att vi alla hjälps åt att hålla den i gott skick. Dessa ska också hållas fritt från vagnar, avfallspåsar etc. Trädgård Vår gemensamma trädgård ska vi alla njuta av och den är till för oss alla. Trädgård och gårdsplan sköts av vår vaktmästare tillsammans med Riksbyggen. Tvättstugor Tvättstugorna är placerade i källarplanen. Tvättid bokas med en tvättkolv (märkt med lägenhetens nummer) på tavla vid respektive tvättstuga. Tvättkolven öppnas/låses med tillhörande nyckel.",
    "keywords": [
      "container",
      "containerdag",
      "grovavfall",
      "avfall"
    ]
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-10-2",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Sida 10, avsnitt 2",
    "page": 10,
    "text": "Tvättkolven tillhör lägenheten, så om den kommer bort, så debiteras ägaren med 300 kr för ny kolv. Vänligen respektera varandras tvättider. Tvättstugorna får endast användas för lägenhetsinnehavarens egen tvätt. Läs anvisningar för alla maskiner i tvättstugan. Filter ska rengöras i torktumlaren, torkskåpen samt fläktarna i torkrummen. Tvättstugor, tork- och mangelrum ska städas ordentligt efter varje tvättid. Tänk på att lämna dem i samma skick som du själv önskar finna dem i. VIKTIGT! Om det är fel på maskiner eller annan utrustning så ska detta omedelbart anmälas till Riksbyggen Dag & Natt. Utlåning Föreningen lånar ut flyttvagn vid in- och utflyttning.",
    "keywords": []
  },
  {
    "id": "a-o-for-boende-i-brf-malmohus-17-10-3",
    "documentTitle": "A-Ö för boende i Brf Malmöhus 17",
    "sourceUrl": "/documents/trivselregler-a-o-brf-malmohus-17.pdf",
    "sectionTitle": "Du kan också låna säckakärra, bord och stolar",
    "page": 10,
    "text": "Du kan också låna säckakärra, bord och stolar. Bokning görs hos vaktmästaren under arbetstid, måndag till fredag i god tid före utlåningen. Alla kontaktuppgifter hittar du på första sidan!",
    "keywords": []
  }
];
