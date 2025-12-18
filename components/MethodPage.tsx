
import React from 'react';
import { Brain, Zap, ShieldCheck, Apple, ChevronRight, MessageCircle } from 'lucide-react';

interface MethodPageProps {
  onNavigate: (view: 'home' | 'method') => void;
}

const MethodPage: React.FC<MethodPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section of Internal Page */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2000" 
            alt="Protein and Greens" 
            className="w-full h-full object-cover opacity-30 parallax-bg"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-emerald-400 font-black text-xs tracking-[0.4em] uppercase mb-6 block">Inovação Nutricional</span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8">
            A CIÊNCIA DO <br /> <span className="text-emerald-500">ÁPICE</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Esqueça tudo o que você sabe sobre dietas. Nosso método foca em sinalização hormonal e densidade nutricional.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-32 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="liquid-glass p-12 rounded-[3rem] border-white/10 hover:border-emerald-500/30 transition-all group">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Brain className="text-emerald-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Neuro-Nutrição</h3>
              <p className="text-slate-400 leading-relaxed">
                Controlamos os neurotransmissores da saciedade através de proteínas de alta biodisponibilidade, eliminando a ansiedade por doces.
              </p>
            </div>

            <div className="liquid-glass p-12 rounded-[3rem] border-white/10 hover:border-emerald-500/30 transition-all group">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap className="text-emerald-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Termogênese Ativa</h3>
              <p className="text-slate-400 leading-relaxed">
                Protocolo específico de combinação de alimentos que eleva o gasto calórico em repouso através da oxidação de gordura marrom.
              </p>
            </div>

            <div className="liquid-glass p-12 rounded-[3rem] border-white/10 hover:border-emerald-500/30 transition-all group">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-emerald-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Blindagem Metabólica</h3>
              <p className="text-slate-400 leading-relaxed">
                Reprogramação das células para evitar o efeito sanfona, criando uma barreira protetora contra o acúmulo de gordura visceral.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="py-32 px-6 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center text-white mb-20 tracking-tighter">OS 3 ESTÁGIOS DA MUDANÇA</h2>
          
          <div className="space-y-12">
            {[
              { step: "01", title: "Detox Celular", desc: "Remoção de toxinas inflamatórias acumuladas por anos de ultraprocessados." },
              { step: "02", title: "Reprogramação Hormonal", desc: "Ajuste fino da insulina e leptina para queimar gordura como fonte primária." },
              { step: "03", title: "Manutenção do Ápice", desc: "Estilo de vida sustentável com liberdade alimentar e performance máxima." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-10 items-start liquid-glass p-10 rounded-[2.5rem] border-white/10">
                <span className="text-6xl font-black text-emerald-500/20 leading-none">{item.step}</span>
                <div>
                  <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{item.title}</h4>
                  <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action section for Internal Page */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-emerald-500 to-teal-700 p-20 rounded-[4rem] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
             <Apple className="w-40 h-40 text-white" />
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter relative z-10">PRONTO PARA O SEU PRÓXIMO NÍVEL?</h2>
           <button 
             onClick={() => window.open('https://wa.me/5500000000000', '_blank')}
             className="bg-white text-emerald-600 px-12 py-6 rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl flex items-center gap-4 mx-auto relative z-10"
           >
             Começar Protocolo
             <ChevronRight className="w-6 h-6" />
           </button>
        </div>
      </section>

      <div className="pb-32 text-center">
        <button 
          onClick={() => onNavigate('home')}
          className="text-slate-500 font-bold hover:text-white transition-colors"
        >
          ← Voltar para a página inicial
        </button>
      </div>
    </div>
  );
};

export default MethodPage;
