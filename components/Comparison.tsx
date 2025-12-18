
import React from 'react';
import { Check, X, Sparkles, Zap, Timer, Brain, Shield } from 'lucide-react';

const Comparison: React.FC = () => {
  const points = [
    { title: "Metabolismo", old: "Lento e estagnado", elite: "Otimizado e acelerado", icon: Zap },
    { title: "Dieta", old: "Privação e fome", elite: "Proteína e saciedade", icon: Sparkles },
    { title: "Energia", old: "Cansaço constante", elite: "Vigor o dia todo", icon: Timer },
    { title: "Foco", old: "Névoa mental", elite: "Clareza absoluta", icon: Brain },
    { title: "Longevidade", old: "Efeito rebote", elite: "Mudança definitiva", icon: Shield },
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-slate-950">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover grayscale"
          alt="Abstract Food"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            A EVOLUÇÃO <br /> DA <span className="text-emerald-500 underline decoration-emerald-500/30">NUTRIÇÃO</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Não é sobre comer menos. É sobre dar ao seu corpo as ferramentas certas para ele trabalhar por você.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Legacy Side - High Readability Refactor */}
          <div className="p-1 liquid-glass rounded-[3rem] group">
            <div className="bg-slate-900/95 p-12 rounded-[2.8rem] h-full flex flex-col border border-white/10 transition-all">
              <span className="text-red-400 font-black text-[10px] tracking-[0.3em] uppercase mb-10 flex items-center gap-3">
                <X className="w-5 h-5" /> Métodos Obsoletos
              </span>
              <h3 className="text-3xl font-black mb-12 text-white border-b border-white/5 pb-6">O Caminho do Erro</h3>
              <div className="space-y-10 flex-grow">
                {points.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                      <p.icon className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.25em] mb-1">{p.title}</p>
                      <p className="text-white font-bold text-xl leading-tight">{p.old}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Elite Side */}
          <div className="p-1 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-[3rem] shadow-[0_0_80px_-20px_rgba(16,185,129,0.3)]">
            <div className="liquid-glass p-12 rounded-[2.8rem] h-full flex flex-col border border-emerald-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32 text-emerald-400" />
              </div>
              
              <span className="text-emerald-400 font-black text-[10px] tracking-[0.3em] uppercase mb-10 flex items-center gap-3">
                <Zap className="w-5 h-5 fill-emerald-400 shadow-[0_0_15px_#10b981]" /> Padrão Janeiro Ápice
              </span>
              <h3 className="text-3xl font-black mb-12 text-white border-b border-emerald-500/20 pb-6">A Ciência de Elite</h3>
              <div className="space-y-10 flex-grow">
                {points.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-6 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/40 group-hover/item:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                      <p.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.25em] mb-1">{p.title}</p>
                      <p className="text-white font-black text-2xl leading-tight">{p.elite}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-14 pt-10 border-t border-emerald-500/10">
                <p className="text-emerald-400/60 text-sm italic font-medium leading-relaxed">"Biohacking metabólico desenhado para resultados em 12 semanas."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
