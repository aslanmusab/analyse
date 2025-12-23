import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Button, Card } from '../components/UI';
import { Globe, ArrowRight } from 'lucide-react';

export const Start = () => {
  const { data, updateUrl } = useStore();
  const [url, setUrl] = useState(data.url || '');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // Normalize URL for appearance
    let cleanUrl = url.replace(/(^\w+:|^)\/\//, '');
    updateUrl(cleanUrl);
    
    navigate('/analyseren');
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 md:p-12 shadow-lg">
        <div className="text-center mb-8">
          <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600">
            <Globe size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Welke website analyseren we?</h2>
          <p className="text-slate-500">We scannen openbare signalen om je business te begrijpen.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              placeholder="bijv. framboos.io"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full justify-between group">
            Start Analyse
            <ArrowRight size={20} className="text-brand-200 group-hover:text-white transition-colors" />
          </Button>
        </form>
      </Card>
    </div>
  );
};