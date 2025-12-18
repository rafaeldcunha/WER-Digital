
import React from 'react';
import { Instagram, Youtube, Facebook, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'method' | 'results', anchor?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
          <div className="col-span-1 md:col-span-2">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 mb-8 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-black text-xl leading-none tracking-tight text-white">Nutricionista Elite</span>
                <span className="text-[10px] text-emerald-400 font-bold tracking-[0.3em] uppercase">Protocolo Janeiro Ápice</span>
              </div>
            </button>
            <p className="text-slate-400 max-w-sm mb-10 text-lg leading-relaxed font-light">
              Transformando a biologia humana através da nutrição baseada em evidências. Alcance o seu ápice genético hoje.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"><Youtube className="w-6 h-6" /></a>
              <a href="#" className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"><Facebook className="w-6 h-6" /></a>
            </div>
          </div>
          
          <div>
            <h5 className="font-black text-white text-xs uppercase tracking-[0.3em] mb-10">Explorar</h5>
            <ul className="space-y-6 text-slate-400 font-medium">
              <li><button onClick={() => onNavigate('method')} className="hover:text-emerald-400 transition-colors">O Método</button></li>
              <li><button onClick={() => onNavigate('results')} className="hover:text-emerald-400 transition-colors">Resultados</button></li>
              <li><button onClick={() => onNavigate('home', 'faq')} className="hover:text-emerald-400 transition-colors">Dúvidas Frequentes</button></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-black text-white text-xs uppercase tracking-[0.3em] mb-10">Institucional</h5>
            <ul className="space-y-6 text-slate-400 font-medium text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li className="pt-4 border-t border-white/5">
                <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">CNPJ</span>
                00.000.000/0001-00
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-xs text-slate-600 font-bold tracking-widest uppercase">
          <p>© 2024 NUTRICIONISTA ELITE. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex gap-10">
            <span>Desenvolvido com IA</span>
            <span>Made in Brazil</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
