import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Button, Card } from '../components/UI';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { BusinessType, DecisionTime, OrderValue, Urgency, VisualFit } from '../types';

const steps = [
  { id: 'businessType', title: 'Wat voor type business heb je?' },
  { id: 'orderValue', title: 'Wat is de gemiddelde orderwaarde (of LTV)?' },
  { id: 'urgency', title: 'Hoe urgent is de klantvraag?' },
  { id: 'visualFit', title: 'Is het product visueel uit te leggen?' },
  { id: 'decisionTime', title: 'Hoe lang duurt het beslistraject?' },
];

export const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { updateAnswer, data } = useStore();
  const navigate = useNavigate();

  // Mock analytics
  React.useEffect(() => {
    if (currentStep === 0) console.log('wizard_started');
  }, []);

  const handleSelect = (val: any) => {
    const key = steps[currentStep].id as any;
    updateAnswer(key, val);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      console.log('wizard_completed');
      navigate('/resultaat');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const renderOptions = () => {
    switch(currentStep) {
      case 0: // Type
        return (
          <div className="grid gap-3">
            {['B2B', 'B2C', 'Gemengd'].map((opt) => (
              <Button key={opt} variant="outline" onClick={() => handleSelect(opt)} className="justify-start text-left h-16 text-lg hover:bg-brand-50 hover:border-brand-200">
                {opt}
              </Button>
            ))}
          </div>
        );
      case 1: // Value
        return (
          <div className="grid gap-3">
            {[
              { val: 'low', label: '< €50 (Laag)' },
              { val: 'medium', label: '€50 - €200 (Midden)' },
              { val: 'high', label: '€200 - €1.000 (Hoog)' },
              { val: 'enterprise', label: '> €1.000 (Enterprise)' }
            ].map((opt) => (
              <Button key={opt.val} variant="outline" onClick={() => handleSelect(opt.val)} className="justify-start text-left h-16 hover:bg-brand-50 hover:border-brand-200">
                {opt.label}
              </Button>
            ))}
          </div>
        );
      case 2: // Urgency
        return (
          <div className="grid gap-3">
             <Button variant="outline" onClick={() => handleSelect('urgent')} className="justify-start text-left h-auto py-4 hover:bg-brand-50 hover:border-brand-200 block">
                <span className="font-bold block">Urgent</span>
                <span className="text-sm text-slate-500 font-normal">Klant heeft NU een probleem (lekkage, pech)</span>
             </Button>
             <Button variant="outline" onClick={() => handleSelect('compare')} className="justify-start text-left h-auto py-4 hover:bg-brand-50 hover:border-brand-200 block">
                <span className="font-bold block">Vergelijken</span>
                <span className="text-sm text-slate-500 font-normal">Klant zoekt de beste optie (software, auto)</span>
             </Button>
             <Button variant="outline" onClick={() => handleSelect('both')} className="justify-start text-left h-auto py-4 hover:bg-brand-50 hover:border-brand-200 block">
                <span className="font-bold block">Beide / Weet ik niet</span>
             </Button>
          </div>
        );
      case 3: // Visual
        return (
          <div className="grid gap-3">
            {[
              { val: 'yes', label: 'Ja (Fashion, Food, Design)' },
              { val: 'no', label: 'Nee (SaaS, Consultancy, Finance)' },
              { val: 'partial', label: 'Gedeeltelijk / Twijfel' }
            ].map((opt) => (
              <Button key={opt.val} variant="outline" onClick={() => handleSelect(opt.val)} className="justify-start text-left h-16 hover:bg-brand-50 hover:border-brand-200">
                {opt.label}
              </Button>
            ))}
          </div>
        );
      case 4: // Time
        return (
          <div className="grid gap-3">
             {[
              { val: 'days', label: 'Dagen (Snelle beslissing)' },
              { val: 'weeks', label: 'Weken (Overleg nodig)' },
              { val: 'months', label: 'Maanden (DMU / Tender)' }
            ].map((opt) => (
              <Button key={opt.val} variant="outline" onClick={() => handleSelect(opt.val)} className="justify-start text-left h-16 hover:bg-brand-50 hover:border-brand-200">
                {opt.label}
              </Button>
            ))}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex items-center justify-between">
          {currentStep > 0 ? (
            <button onClick={handleBack} className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-sm font-medium">
              <ChevronLeft size={16} /> Vorige
            </button>
          ) : <div></div>}
          <div className="text-sm font-medium text-slate-400">
            Stap {currentStep + 1} / {steps.length}
          </div>
        </div>

        <Card className="p-8 md:p-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">{steps[currentStep].title}</h2>
          {renderOptions()}
        </Card>
      </div>
    </div>
  );
};