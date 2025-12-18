
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

const faqItems: FAQItem[] = [
  {
    question: "Preciso de suplementos caros?",
    answer: "Não. O foco do protocolo é em comida de verdade encontrada em qualquer supermercado. Suplementos são opcionais e discutidos apenas para otimizações específicas."
  },
  {
    question: "O acesso é vitalício?",
    answer: "O suporte e as atualizações do protocolo são válidos por 12 meses, garantindo que você tenha acompanhamento durante todo o seu ciclo de transformação e manutenção."
  },
  {
    question: "Serve para quem tem rotina corrida?",
    answer: "Com certeza. Desenvolvemos o protocolo pensando em executivos e pessoas que não têm horas para gastar na cozinha. Menos tempo preparando, mais tempo vivendo."
  },
  {
    question: "Tem lista de compras?",
    answer: "Sim! Você recebe listas de compras semanais otimizadas e sugestões de cardápios práticos para eliminar qualquer indecisão no seu dia a dia."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 px-6 bg-[#020617]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-emerald-400 font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">Central de Ajuda</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">PERGUNTAS FREQUENTES</h2>
        </div>
        
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="liquid-glass rounded-[2rem] border border-white/10 overflow-hidden transition-all bg-slate-900/40">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex items-center justify-between text-left hover:bg-white/5 transition-all group"
              >
                <span className={`font-black text-xl md:text-2xl transition-colors ${openIndex === index ? 'text-emerald-400' : 'text-white'}`}>
                  {item.question}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${openIndex === index ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                  {openIndex === index ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-10 text-slate-100 leading-relaxed text-lg md:text-xl border-t border-white/10 pt-8 animate-in slide-in-from-top-4 duration-500">
                  <p className="font-medium bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/10">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
