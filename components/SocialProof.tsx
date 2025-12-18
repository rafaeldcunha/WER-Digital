
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ana Silveira",
    location: "São Paulo, SP",
    rating: 5,
    comment: "Perdi 6kg em janeiro sem passar fome um único dia. O protocolo é realmente diferente de tudo que já fiz. A metodologia científica faz toda a diferença.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "Marcos Oliveira",
    location: "Curitiba, PR",
    rating: 5,
    comment: "Minha disposição triplicou. Finalmente entendi como meu metabolismo funciona. O suporte do Dr. Roberto é o que faltava nas minhas tentativas anteriores.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Juliana Costa",
    location: "Belo Horizonte, MG",
    rating: 5,
    comment: "O suporte é impecável. Valeu cada centavo investido na minha saúde. Recomendo para todos que buscam uma mudança real e duradoura.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  }
];

const SocialProof: React.FC = () => {
  return (
    <section id="resultados" className="py-32 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 text-white uppercase">Resultados de Impacto</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-1 bg-white/5 p-3 rounded-2xl border border-white/10">
               {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-emerald-400 fill-current" />
              ))}
            </div>
            <span className="font-bold text-slate-400 text-lg uppercase tracking-widest">+5.000 VIDAS TRANSFORMADAS ESTE ANO</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t) => (
            <div key={t.id} className="p-1 liquid-glass rounded-[3rem] border border-white/10 transition-all hover:scale-[1.02]">
              <div className="bg-slate-900/50 p-10 rounded-[2.8rem] h-full flex flex-col relative">
                <div className="absolute top-10 right-10 opacity-10">
                  <Quote className="w-16 h-16 text-emerald-400" />
                </div>
                <div className="flex gap-5 items-center mb-10">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-emerald-500 rounded-full blur opacity-20"></div>
                    <img src={t.image} alt={t.name} className="relative w-20 h-20 rounded-2xl object-cover ring-2 ring-emerald-500/20" loading="lazy" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl text-white">{t.name}</h4>
                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mt-1">{t.location}</p>
                  </div>
                </div>
                <p className="text-slate-200 text-lg leading-relaxed font-medium italic grow">"{t.comment}"</p>
                <div className="mt-8 flex gap-1">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-emerald-500 fill-current" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
