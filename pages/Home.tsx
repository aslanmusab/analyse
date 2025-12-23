import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store';
import { Button } from '../components/UI';
import { Check, X, ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react';

export const Home = () => {
  const [urlInput, setUrlInput] = useState('');
  const navigate = useNavigate();
  const { updateUrl } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;
    updateUrl(urlInput);
    navigate('/start');
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-4 pt-20 pb-16 md:pt-32 md:pb-24 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Investeer je in het <span className="text-brand-600">verkeerde</span> marketingkanaal?
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Stop met gokken. Ontdek welke marketingkanalen waarschijnlijk wel — en niet — werken voor jouw type business.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6">
          <input
            type="text"
            placeholder="jouwwebsite.nl"
            className="flex-grow px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <Button type="submit">
            Check mijn website
          </Button>
        </form>
        
        <div className="text-sm text-slate-500 hover:text-brand-600 transition-colors">
          <Link to="/voorbeeld">Bekijk een voorbeeldrapport &rarr;</Link>
        </div>

        {/* Trust Strip */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
          <span className="flex items-center gap-2"><Lock size={16} /> Geen login</span>
          <span className="flex items-center gap-2"><Zap size={16} /> Binnen 2 minuten</span>
          <span className="flex items-center gap-2"><ShieldCheck size={16} /> Geen koppelingen nodig</span>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Geen bullshit, alleen data</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Column A */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="bg-green-100 p-1 rounded text-green-700"><Check size={20} /></span>
                Wat je krijgt (gratis)
              </h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex gap-3"><Check size={18} className="text-green-600 shrink-0 mt-1" /> Eerlijk bewijs per kanaal</li>
                <li className="flex gap-3"><Check size={18} className="text-green-600 shrink-0 mt-1" /> Confrontatie met risico's</li>
                <li className="flex gap-3"><Check size={18} className="text-green-600 shrink-0 mt-1" /> Concurrentie snapshot</li>
              </ul>
            </div>

            {/* Column B */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 opacity-75">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="bg-red-100 p-1 rounded text-red-700"><X size={20} /></span>
                Wat je NIET krijgt
              </h3>
              <ul className="space-y-4 text-slate-600">
                <li className="flex gap-3"><X size={18} className="text-red-500 shrink-0 mt-1" /> Geen "gouden bergen"</li>
                <li className="flex gap-3"><X size={18} className="text-red-500 shrink-0 mt-1" /> Geen advertentie copy</li>
                <li className="flex gap-3"><X size={18} className="text-red-500 shrink-0 mt-1" /> Geen keyword lijsten</li>
              </ul>
            </div>

            {/* Column C */}
            <div className="p-8 rounded-2xl bg-brand-50 border border-brand-100">
              <h3 className="text-lg font-bold mb-6 text-brand-900 flex items-center gap-2">
                <span className="bg-brand-200 p-1 rounded text-brand-700"><Zap size={20} /></span>
                Waarom dit anders is
              </h3>
              <p className="text-brand-800 leading-relaxed">
                De meeste bureaus verkopen wat ze <em>kunnen</em>, niet wat jij <em>nodig hebt</em>. Wij kijken naar markt-fit en concurrentiedata, niet naar onderbuikgevoel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};