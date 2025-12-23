import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Button, Card } from '../components/UI';
import { Check, ShieldCheck, ArrowLeft } from 'lucide-react';

export const Unlock = () => {
  const { unlockReport } = useStore();
  const navigate = useNavigate();

  const handlePay = () => {
    // Simulate payment process
    setTimeout(() => {
      unlockReport();
      navigate('/rapport');
    }, 1000);
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 py-12 bg-slate-50">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Col: Value */}
        <div className="space-y-6">
          <button onClick={() => navigate('/resultaat')} className="text-slate-500 hover:text-slate-900 flex items-center gap-1 text-sm font-medium">
             <ArrowLeft size={16} /> Terug naar gratis resultaten
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Krijg grip op je marketing euro's.
          </h1>
          <p className="text-lg text-slate-600">
            Eénmalige investering voor een plan waar je maanden mee vooruit kunt. Geen abonnement.
          </p>

          <ul className="space-y-4 pt-4">
            {[
              "Duidelijke kanaalkeuzes (doen / niet doen / later)",
              "What-if scenario’s voor budgettering",
              "Prioriteiten & focus (30-60-90 dagen)",
              "Diepere concurrentie-inzichten (patronen)",
              "Downloadbaar PDF rapport"
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <div className="bg-green-100 text-green-700 p-0.5 rounded-full mt-0.5">
                  <Check size={14} />
                </div>
                <span className="text-slate-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Col: Checkout Card */}
        <Card className="p-8 md:p-10 shadow-2xl border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-600"></div>
          
          <div className="text-center mb-8">
            <div className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-2">Premium Rapport</div>
            <div className="text-5xl font-extrabold text-slate-900 flex items-start justify-center">
              <span className="text-2xl mt-1">€</span>29
            </div>
            <div className="text-slate-400 text-sm mt-2">éénmalig, ex. btw</div>
          </div>

          <Button onClick={handlePay} className="w-full text-lg py-4 mb-4 shadow-lg shadow-brand-200">
            Betaal en ontgrendel
          </Button>

          <div className="text-center">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck size={14} /> Veilig betalen via Stripe (Demo)
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};