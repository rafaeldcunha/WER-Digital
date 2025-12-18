
import React from 'react';
import { ShieldCheck, Award, Users, Star } from 'lucide-react';

const Authority: React.FC = () => {
  return (
    <section id="autoridade" className="py-32 bg-[#0f172a] text-white px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-emerald-500/10 rounded-[3rem] blur-2xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
          <div className="relative p-2 liquid-glass rounded-[2.5rem] overflow-hidden">
             {/* Esta imagem simula um retrato de estúdio com iluminação lateral (rim light) e fundo desfocado cinematográfico */}
             <img 
               src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800&h=1000" 
               alt="Dr. Roberto Lima - Nutricionista de Elite" 
               className="rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/5] filter contrast-[1.05] brightness-[1.02]"
               loading="lazy"
             />
             <div className="absolute bottom-6 left-6 right-6 liquid-glass p-6 rounded-2xl flex items-center justify-between border-white/20">
               <div>
                  <p className="text-2xl font-black">Dr. Roberto Lima</p>
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mt-1">CRN 00000 / São Paulo</p>
               </div>
               <div className="bg-emerald-500 p-3 rounded-xl shadow-lg">
                  <Star className="w-6 h-6 text-white fill-current" />
               </div>
             </div>
          </div>
        </div>
        
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">Ciência que <br /><span className="text-emerald-400">Transforma</span> Vidas.</h2>
            <p className="text-xl text-slate-400 leading-relaxed font-light">
              Mestre em Fisiologia do Exercício e Pós-graduado em Nutrição Clínica. Minha missão é traduzir a complexidade biológica em um plano simples e executável.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="liquid-glass p-6 rounded-2xl border-white/5">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
              <h4 className="font-bold text-lg mb-2">Segurança Máxima</h4>
              <p className="text-sm text-slate-500">Protocolos testados em laboratório para garantir sua saúde.</p>
            </div>
            
            <div className="liquid-glass p-6 rounded-2xl border-white/5">
              <Award className="w-8 h-8 text-emerald-400 mb-4" />
              <h4 className="font-bold text-lg mb-2">Excelência</h4>
              <p className="text-sm text-slate-500">Premiado como nutricionista destaque em inovação digital.</p>
            </div>

            <div className="liquid-glass p-6 rounded-2xl border-white/5">
              <Users className="w-8 h-8 text-emerald-400 mb-4" />
              <h4 className="font-bold text-lg mb-2">+5.000 Alunos</h4>
              <p className="text-sm text-slate-500">Uma comunidade ativa que se apoia rumo ao ápice.</p>
            </div>
            
            <div className="bg-emerald-500 p-6 rounded-2xl shadow-xl shadow-emerald-500/20">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-white text-white" />)}
              </div>
              <p className="font-black text-white leading-tight">7 dias de satisfação total ou seu dinheiro de volta.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authority;
