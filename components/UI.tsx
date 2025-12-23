import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
  
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-brand-600 hover:text-brand-600 bg-transparent"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ status: 'fit' | 'risk' | 'bad' }> = ({ status }) => {
  const config = {
    fit: { bg: 'bg-green-100', text: 'text-green-800', icon: '✅', label: 'Past waarschijnlijk' },
    risk: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⚠️', label: 'Risicovol' },
    bad: { bg: 'bg-red-100', text: 'text-red-800', icon: '❌', label: 'Af te raden' },
  };
  
  const c = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span>{c.icon}</span> {c.label}
    </span>
  );
};