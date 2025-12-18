
import React from 'react';
import { Star } from 'lucide-react';
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
    <section className="py-32 px-6 bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4">Aprovado por quem já fez</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
               {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-emerald-500 fill-current" />
              ))}
            </div>
            <span className="font-bold text-gray-500 text-sm">Mais de 5.000 vidas transformadas</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group">
              <div className="flex gap-5 items-center mb-8">
                <div className="relative">
                  <div className="absolute -inset-1 bg-emerald-500 rounded-full blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  <img src={t.image} alt={t.name} className="relative w-16 h-16 rounded-full object-cover ring-2 ring-white" loading="lazy" />
                </div>
                <div>
                  <h4 className="font-black text-lg text-gray-900">{t.name}</h4>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{t.location}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">"{t.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
