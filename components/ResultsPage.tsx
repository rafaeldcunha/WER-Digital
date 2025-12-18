
import React from 'react';
import { Star, TrendingUp, Users, Heart, ArrowRight, Play, Quote } from 'lucide-react';

interface ResultsPageProps {
  onNavigate: (view: 'home' | 'method' | 'results', anchor?: string) => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ onNavigate }) => {
  const caseStudies = [
    {
      name: "Carla Silveira",
      desc: "Loira, atlética, focada no treino",
      result: "-12kg e Definição Extrema",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=1000",
      quote: "O Protocolo Janeiro Ápice transformou meu rendimento. Treinar com a energia lá no alto e ver os músculos aparecendo é indescritível."
    },
    {
      name: "Roberto Lima",
      desc: "Surfista, vida ativa na praia",
      result: "-8kg e Vitalidade Renovada",
      image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=1000",
      quote: "Como surfista, preciso de leveza e explosão. O método limpou meu metabolismo e hoje sinto que deslizo na água com muito mais vigor."
    },
    {
      name: "Mariana Costa",
      desc: "Blogueira, estética slim e moderna",
      result: "-15kg e Autoestima no Topo",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000",
      quote: "Minha imagem é meu trabalho. O protocolo me deu o corpo slim que eu buscava, sem dietas malucas, apenas com a ciência da nutrição de elite."
    },
    {
      name: "João Mendes",
      desc: "Relaxando no clube, aproveitando a vida",
      result: "-10kg e Saúde de Ferro",
      image: "https://images.unsplash.com/photo-1566243052021-d38096f24683?auto=format&fit=crop&q=80&w=1000",
      quote: "Aos 50 anos, achei que não conseguiria mais. Hoje tomo meu sol no clube sem vergonha e com uma disposição que eu não tinha há décadas."
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-slate-950">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=2000" 
            alt="Healthy Transformation" 
            className="w-full h-full object-cover opacity-30 parallax-bg"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="text-emerald-400 font-black text-xs tracking-[0.5em] uppercase mb-8 block">Transformações de Elite</span>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-10 leading-[0.85]">
            RESULTADOS <br /> <span className="text-emerald-500">REAIS</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            Visualizações autênticas de quem seguiu o método e alcançou o ápice genético em 12 semanas.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "Vidas Transformadas", val: "+5.000", icon: Users },
            { label: "Peso Eliminado Médio", val: "7.2kg", icon: TrendingUp },
            { label: "Satisfação dos Alunos", val: "98.7%", icon: Star },
            { label: "Melhora no Bem-Estar", val: "100%", icon: Heart }
          ].map((stat, i) => (
            <div key={i} className="liquid-glass p-10 rounded-[2.5rem] border-white/10 text-center group hover:bg-white/5 transition-all">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8 text-emerald-400" />
              </div>
              <h4 className="text-4xl font-black text-white mb-2">{stat.val}</h4>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Gallery - PADRONIZAÇÃO ABSOLUTA */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-24 tracking-tighter text-center uppercase">Galeria de Conquistas</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {caseStudies.map((item, idx) => (
              <div key={idx} className="liquid-glass rounded-[3.5rem] overflow-hidden group border border-white/5 flex flex-col h-full bg-slate-900/40">
                {/* STRICT SQUARE ASPECT RATIO FOR ALL IMAGES */}
                <div className="aspect-square relative shrink-0 overflow-hidden">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt={item.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-10">
                     <div className="flex gap-1 mb-4">
                       {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />)}
                     </div>
                     <h3 className="text-4xl font-black text-white leading-none mb-2">{item.name}</h3>
                     <p className="text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4">{item.desc}</p>
                     <div className="inline-block bg-emerald-500 px-6 py-2 rounded-full text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/40">
                       {item.result}
                     </div>
                  </div>
                </div>
                
                <div className="p-12 grow flex flex-col justify-center">
                  <Quote className="w-12 h-12 text-emerald-500/20 mb-8" />
                  <p className="text-slate-200 text-2xl leading-relaxed italic font-light">
                    "{item.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonial Preview */}
      <section className="py-32 px-6">
         <div className="max-w-5xl mx-auto liquid-glass p-4 rounded-[4rem] border-white/10 relative">
            <div className="relative rounded-[3.5rem] overflow-hidden aspect-video bg-slate-900 group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1548691906-f61f7ad96fbc?auto=format&fit=crop&q=80&w=1200" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale-[50%] transition-transform duration-1000 group-hover:scale-105"
                  alt="Video Testimonial Preview"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                   <button className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all mb-8 ring-8 ring-emerald-500/20">
                     <Play className="w-8 h-8 text-white fill-current ml-1" />
                   </button>
                   <h2 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase">Depoimentos em Vídeo</h2>
                   <p className="text-slate-400 max-w-md mx-auto font-medium">Histórias que inspiram e provam a eficácia do Protocolo Janeiro Ápice.</p>
                </div>
            </div>
         </div>
      </section>

      {/* Big CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-emerald-600 p-20 rounded-[4rem] text-center shadow-3xl shadow-emerald-500/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter relative z-10">VOCÊ É O PRÓXIMO <br /> CASO DE SUCESSO.</h2>
          <button 
            onClick={() => window.open('https://wa.me/5500000000000', '_blank')}
            className="bg-white text-emerald-700 px-12 py-6 rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-4 mx-auto relative z-10 shadow-2xl"
          >
            Quero meu Resultado
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <div className="pb-32 text-center">
        <button 
          onClick={() => onNavigate('home')}
          className="text-slate-500 font-black text-xs uppercase tracking-widest hover:text-white transition-colors flex items-center gap-3 mx-auto"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
