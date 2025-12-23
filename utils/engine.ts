import { UserData, AnalysisResult, ChannelStatus } from '../types';

export const analyzeFit = (data: UserData): AnalysisResult => {
  const { answers } = data;

  // Default Mock Logic - Deterministic based on inputs
  
  // 1. Google Ads Logic
  let gAdsStatus: ChannelStatus = 'risk';
  const gAdsReasons: string[] = [];
  let gAdsExp = "Google Ads is vaak duur als de marge laag is of de concurrentie moordend.";

  if (answers.urgency === 'urgent') {
    gAdsStatus = 'fit';
    gAdsReasons.push("Hoge urgentie betekent vaak hoge zoekintentie.");
    gAdsExp = "Omdat jouw klanten 'nu' een oplossing zoeken, werkt search advertising waarschijnlijk goed.";
  } else if (answers.orderValue === 'low' && answers.urgency === 'compare') {
    gAdsStatus = 'bad';
    gAdsReasons.push("Lage orderwaarde vs. hoge klikprijzen.");
    gAdsReasons.push("Oriënterende klanten converteren traag.");
    gAdsExp = "De kosten per klik (CPC) liggen waarschijnlijk hoger dan je marge toelaat bij directe verkoop.";
  } else {
    gAdsReasons.push("Gemiddelde concurrentie op zoekwoorden.");
    gAdsReasons.push("Kosten kunnen snel oplopen.");
  }

  // 2. Meta Ads Logic
  let metaStatus: ChannelStatus = 'risk';
  const metaReasons: string[] = [];
  let metaExp = "Meta werkt goed voor impuls of visuele producten, minder voor saaie diensten.";

  if (answers.visualFit === 'yes' && answers.businessType === 'B2C') {
    metaStatus = 'fit';
    metaReasons.push("Product leent zich uitstekend voor visuals.");
    metaReasons.push("B2C doelgroep is goed te targeten.");
    metaExp = "Je aanbod is visueel en richt zich op consumenten, een sweet spot voor Facebook & Instagram.";
  } else if (answers.decisionTime === 'months') {
    metaStatus = 'bad';
    metaReasons.push("Beslistraject is te lang voor push-ads.");
    metaExp = "Mensen beslissen zelden over zware B2B trajecten via een advertentie in hun tijdlijn.";
  } else {
    metaReasons.push("Retargeting kan werken, cold traffic lastig.");
  }

  // 3. SEO Logic
  let seoStatus: ChannelStatus = 'fit';
  const seoReasons: string[] = [];
  let seoExp = "SEO is traag maar duurzaam.";

  if (answers.urgency === 'urgent') {
    seoStatus = 'risk';
    seoReasons.push("Duurt te lang voor urgente klantbehoefte.");
    seoExp = "Als klanten NU hulp nodig hebben, kun je niet wachten op organische rankings.";
  } else if (answers.decisionTime === 'months' || answers.urgency === 'compare') {
    seoStatus = 'fit';
    seoReasons.push("Ideaal voor lange oriëntatiefases.");
    seoReasons.push("Bouwt autoriteit op tijdens vergelijking.");
    seoExp = "Jouw klanten vergelijken veel. Aanwezig zijn met informatieve content is hier waarschijnlijk de winnende strategie.";
  } else {
    seoReasons.push("Concurrentie op hoofdtermen is waarschijnlijk hoog.");
  }

  return {
    googleAds: {
      status: gAdsStatus,
      reasons: gAdsReasons,
      explanation: gAdsExp
    },
    metaAds: {
      status: metaStatus,
      reasons: metaReasons,
      explanation: metaExp
    },
    seo: {
      status: seoStatus,
      reasons: seoReasons,
      explanation: seoExp
    },
    competitors: [
      { name: "Concurrent A", signals: ["Meta Ads: Actief", "SEO: Blog focus"] },
      { name: "Concurrent B", signals: ["Google Ads: Agressief", "SEO: Zwak"] },
      { name: "Concurrent C", signals: ["Meta Ads: Inactief", "SEO: Domain Authority 45+"] }
    ]
  };
};