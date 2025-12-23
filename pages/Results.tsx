import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { analyzeFit } from '../utils/engine';
import { AnalysisResult } from '../types';
import { Badge, Button, Card } from '../components/UI';
import { ChevronDown, ChevronUp, Lock, AlertTriangle } from 'lucide-react';

const ResultCard = ({ title, data }: { title: string, data: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <Badge status={data.status} />
      </div>
      <ul className="space-y-2 mb-4">
        {data.reasons.map((r: string, i: number) => (
          <li key={i} className="text-sm text-slate-600 flex gap-2">
             <span className="text-slate-300">•</span> {r}
          </li>
        ))}
      </ul>
      <button 
        onClick={() => setOpen(!open)}
        className="text-xs font-semibold text-brand-600 flex items-center gap-1 hover:underline"
      >
        {open ? 'Verberg detail' : 'Waarom?'} {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && (
        <p className="mt-3 text-sm text-slate-500 bg-slate-50 p-3 rounded italic">
          "{data.explanation}"
        </p>
      )}
    </Card>
  );
};

export const Results = () => {
  const { data } = useStore();
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (!data.answers.businessType) {
      navigate('/start');
      return;
    }
    setResult(analyzeFit(data));
  }, [data, navigate]);

  if (!result) return null;

  return (
    <div className="px-4 py-12 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Dit is wat we zien</h1>
        <p className="text-slate-500 text-lg">
          Analyse voor <span className="font-semibold text-slate-700">{data.url}</span>
        </p>
      </div>

      {/* Channel Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <ResultCard title="Google Ads" data={result.googleAds} />
        <ResultCard title="Meta Ads" data={result.metaAds} />
        <ResultCard title="SEO" data={result.seo} />
      </div>

      {/* Competitors */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6 text-slate-800">3 concurrenten die dit anders aanpakken</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {result.competitors.map((comp, i) => (
            <Card key={i} className="p-5 bg-slate-50 border-slate-200">
              <div className="font-semibold text-slate-900 mb-2">{comp.name}</div>
              <div className="text-xs text-slate-500 space-y-1">
                {comp.signals.map((s, idx) => <div key={idx}>{s}</div>)}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-slate-800 text-center">Jij vs. Concurrenten</h2>
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-700 font-semibold">
              <tr>
                <th className="p-4">Metric</th>
                <th className="p-4">Jij (Geschat)</th>
                <th className="p-4">Marktleiders</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4">Kanaal Diversificatie</td>
                <td className="p-4 text-red-600 font-medium">Laag</td>
                <td className="p-4 text-green-600 font-medium">Hoog</td>
              </tr>
              <tr>
                <td className="p-4">Est. Ad Spend Efficiëntie</td>
                <td className="p-4 text-yellow-600 font-medium">Gemiddeld</td>
                <td className="p-4 text-green-600 font-medium">Geoptimaliseerd</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Paywall Teaser */}
      <div className="max-w-2xl mx-auto mt-12">
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Lock size={120} />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Wil je weten wat je NU moet doen?</h2>
            <p className="text-slate-300 mb-8 text-lg">
              Je ziet wat er misgaat — niet hoe je het oplost. 
              Krijg helderheid in de chaos.
            </p>
            <Button onClick={() => navigate('/ontgrendel')} className="w-full md:w-auto bg-brand-600 hover:bg-brand-500 text-white text-lg px-8 py-4">
              Ontgrendel volledig advies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};