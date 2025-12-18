
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg leading-none tracking-tight text-white">Nutricionista Elite</span>
            <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase">Protocolo Janeiro Ápice</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-white/80 font-medium text-sm">
          <a href="#metodo" className="hover:text-emerald-400 transition-colors">O Método</a>
          <a href="#resultados" className="hover:text-emerald-400 transition-colors">Resultados</a>
          <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
