import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export const Analyze = () => {
  const { data } = useStore();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Verbinding maken...');

  useEffect(() => {
    if (!data.url) {
      navigate('/start');
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1; // 100 ticks approx
      });
    }, 30); // ~3 seconds total

    const timeouts = [
      setTimeout(() => setStatus(`Scannen van ${data.url}...`), 500),
      setTimeout(() => setStatus('Technologie detecteren...'), 1500),
      setTimeout(() => setStatus('Concurrentie signalen ophalen...'), 2200),
      setTimeout(() => navigate('/vragen'), 3200),
    ];

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, [data.url, navigate]);

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 animate-pulse">
          {status}
        </h2>
        
        <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-brand-600 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-slate-500 text-sm">
          We verzamelen publieke data. Dit duurt enkele seconden.
        </p>
      </div>
    </div>
  );
};