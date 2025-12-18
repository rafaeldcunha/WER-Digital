
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
    <section id="faq" className="py-32 px-6 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-emerald-400 font-bold text-[10px] tracking-[0.3em] uppercase mb-4 block">Suporte</span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Perguntas Frequentes</h2>
        </div>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="liquid-glass rounded-3xl border border-white/5 overflow-hidden transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex items-center justify-between text-left hover:bg-white/5 transition-colors group"
              >
                <span className={`font-bold text-lg md:text-xl transition-colors ${openIndex === index ? 'text-emerald-400' : 'text-white'}`}>
                  {item.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/40'}`}>
                  {openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-8 text-slate-300 leading-relaxed text-lg border-t border-white/5 pt-6 animate-in slide-in-from-top-2 duration-300">
                  {item.answer}
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
