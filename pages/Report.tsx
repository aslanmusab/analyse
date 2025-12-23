import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store';
import { Button, Card, Badge } from '../components/UI';
import { analyzeFit } from '../utils/engine';
import { Download, Share2, HelpCircle } from 'lucide-react';

export const Report = () => {
  const { data } = useStore();
  const [activeTab, setActiveTab] = useState<'current' | 'meta' | 'seo'>('current');
  
  if (!data.hasPaid) {
    return <Navigate to="/ontgrendel" />;
  }

  const result = analyzeFit(data);

  // Helper to get verdict color/text
  const getVerdict = (status: string) => {
    if (status === 'fit') return { color: 'text-green-600', label: 'Hoog Potentieel' };
    if (status === 'risk') return { color: 'text-yellow-600', label: 'Risicovol' };
    return { color: 'text-red-600', label: 'Afrader' };
  };

  const renderWhatIfContent = () => {
    switch (activeTab) {
      case 'current':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div>
               <h4 className="font-bold text-slate-900 mb-2">Verwacht effect</h4>
               <ul className="list-disc pl-5 text-slate-600 space-y-1">
                 <li>Groei stagneert waarschijnlijk binnen 3 maanden.</li>
                 <li>Concurrentie (o.a. {result.competitors[0].name}) pakt marktaandeel op mobiel.</li>
                 <li>Kosten per acquisitie stijgen door inflatie in veilingen.</li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold text-slate-900 mb-2">Grootste Risico</h4>
               <p className="text-slate-600">Afhankelijkheid van één bron maakt je kwetsbaar voor algoritme updates.</p>
             </div>
          </div>
        );
      case 'meta':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div>
               <h4 className="font-bold text-slate-900 mb-2">Verwacht effect</h4>
               <ul className="list-disc pl-5 text-slate-600 space-y-1">
                 <li>Merkbekendheid stijgt met ~40% in lokale regio.</li>
                 <li>Retargeting verlaagt de gemiddelde CPA.</li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold text-slate-900 mb-2">Waar op letten</h4>
               <p className="text-slate-600">Creative fatigue: je moet elke 2 weken nieuwe visuals hebben.</p>
             </div>
          </div>
        );
      case 'seo':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div>
               <h4 className="font-bold text-slate-900 mb-2">Verwacht effect</h4>
               <ul className="list-disc pl-5 text-slate-600 space-y-1">
                 <li>Traag start (0-6 maanden weinig resultaat).</li>
                 <li>Daarna exponentiële daling in kosten per bezoeker.</li>
               </ul>
             </div>
             <div>
               <h4 className="font-bold text-slate-900 mb-2">Waar op letten</h4>
               <p className="text-slate-600">Focus niet op 'head terms' maar op vragen die klanten hebben tijdens het aankoopproces.</p>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Strategisch Advies Rapport</h1>
              <p className="text-slate-500">Gegenereerd voor {data.url}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="text-sm py-2 px-4 h-10"><Share2 size={16} className="mr-2"/> Delen</Button>
              <Button variant="primary" className="text-sm py-2 px-4 h-10"><Download size={16} className="mr-2"/> PDF</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {['googleAds', 'metaAds', 'seo'].map((channel: any) => {
              const info = (result as any)[channel];
              const verdict = getVerdict(info.status);
              return (
                <div key={channel} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">
                    {channel.replace('Ads', ' Ads').toUpperCase()}
                  </div>
                  <div className={`text-xl font-bold ${verdict.color} flex items-center gap-2`}>
                    <Badge status={info.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        
        {/* What If Scenarios */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What-if Scenario's</h2>
          <Card className="p-0 overflow-hidden">
            <div className="flex border-b border-slate-200 bg-slate-50">
              <button onClick={() => setActiveTab('current')} className={`px-6 py-4 font-medium text-sm ${activeTab === 'current' ? 'bg-white border-t-2 border-brand-600 text-brand-600' : 'text-slate-600 hover:text-slate-900'}`}>Als je zo doorgaat</button>
              <button onClick={() => setActiveTab('meta')} className={`px-6 py-4 font-medium text-sm ${activeTab === 'meta' ? 'bg-white border-t-2 border-brand-600 text-brand-600' : 'text-slate-600 hover:text-slate-900'}`}>Focus op Meta Ads</button>
              <button onClick={() => setActiveTab('seo')} className={`px-6 py-4 font-medium text-sm ${activeTab === 'seo' ? 'bg-white border-t-2 border-brand-600 text-brand-600' : 'text-slate-600 hover:text-slate-900'}`}>Focus op SEO</button>
            </div>
            <div className="p-8">
              {renderWhatIfContent()}
            </div>
          </Card>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Jouw prioriteiten</h2>
          <div className="space-y-6">
            <div className="flex gap-4 md:gap-8">
              <div className="w-24 md:w-32 flex-shrink-0 pt-1 font-bold text-slate-400 text-right text-sm md:text-base">0-30 Dagen</div>
              <div className="flex-grow bg-white border border-slate-200 p-6 rounded-lg relative">
                <div className="absolute top-6 -left-2 w-4 h-4 bg-white border-l border-b border-slate-200 transform rotate-45"></div>
                <h3 className="font-bold text-slate-900 mb-2">Quick Wins & Setup</h3>
                <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1">
                  <li>Installeer tracking pixels correct (nu missend).</li>
                  <li>Stop budget op brede zoekwoorden in Google Ads.</li>
                  <li>Test 3 visuele advertentiesets op Meta (retargeting).</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-4 md:gap-8">
              <div className="w-24 md:w-32 flex-shrink-0 pt-1 font-bold text-slate-400 text-right text-sm md:text-base">30-90 Dagen</div>
              <div className="flex-grow bg-white border border-slate-200 p-6 rounded-lg relative">
                 <div className="absolute top-6 -left-2 w-4 h-4 bg-white border-l border-b border-slate-200 transform rotate-45"></div>
                <h3 className="font-bold text-slate-900 mb-2">Optimalisatie</h3>
                <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1">
                  <li>Schaal het winnende kanaal op met 20%.</li>
                  <li>Begin met SEO content clusters voor "Top of Funnel".</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 md:gap-8">
              <div className="w-24 md:w-32 flex-shrink-0 pt-1 font-bold text-slate-400 text-right text-sm md:text-base">Daarna</div>
              <div className="flex-grow bg-white border border-slate-200 p-6 rounded-lg relative">
                 <div className="absolute top-6 -left-2 w-4 h-4 bg-white border-l border-b border-slate-200 transform rotate-45"></div>
                <h3 className="font-bold text-slate-900 mb-2">Dominantie</h3>
                <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1">
                  <li>Market leader worden op organische zoektermen.</li>
                  <li>Automatisering van e-mail flows.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Framboos Upsell */}
        <section className="bg-brand-50 border border-brand-100 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-brand-900 mb-2">Wil je dit niet zelf uitvoeren?</h3>
            <p className="text-brand-800 text-sm max-w-lg">
              Als je wilt, kan het team van <span className="font-semibold">framboos.io</span> dit plan exact zo voor je opzetten. Volledig optioneel, geen verplichtingen.
            </p>
          </div>
          <Button className="shrink-0 bg-brand-600 hover:bg-brand-700 text-white whitespace-nowrap">
            Hulp bij uitvoering
          </Button>
        </section>

      </div>
    </div>
  );
};