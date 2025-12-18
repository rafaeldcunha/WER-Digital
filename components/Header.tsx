
import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'method' | 'results', anchor?: string) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 rounded-2xl border border-white/10"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-black text-lg leading-none tracking-tight text-white">Nutricionista Elite</span>
            <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase">Protocolo Janeiro Ápice</span>
          </div>
        </button>
        
        <div className="hidden md:flex items-center gap-8 text-white/80 font-medium text-sm">
          <button 
            onClick={() => onNavigate('method')}
            className={`hover:text-emerald-400 transition-colors ${currentView === 'method' ? 'text-emerald-400 font-bold' : ''}`}
          >
            O Método
          </button>
          <button 
            onClick={() => onNavigate('results')}
            className={`hover:text-emerald-400 transition-colors ${currentView === 'results' ? 'text-emerald-400 font-bold' : ''}`}
          >
            Resultados
          </button>
          <button 
            onClick={() => onNavigate('home', 'faq')}
            className="hover:text-emerald-400 transition-colors"
          >
            FAQ
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
