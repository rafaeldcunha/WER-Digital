
import React, { useState } from 'react';
import { Play, Flame, CheckCircle2, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-32 px-6 overflow-hidden">
      {/* Parallax Background with Vivid Food Composition (Proteins, Salad, Fruits, Grains) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000" 
          alt="Vivid Healthy Food Spread" 
          className="w-full h-full object-cover animate-subtle-zoom opacity-50 parallax-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/40 to-slate-950"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-emerald-400 font-bold text-[10px] tracking-[0.3em] uppercase mb-12 shadow-2xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Protocolo Janeiro Ápice 2.0
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 text-white leading-[0.85] filter drop-shadow-2xl">
          DOMINE SEU<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-600">METABOLISMO</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
          A transição definitiva para quem busca performance e saúde. <br className="hidden md:block" />
          Nutrição baseada em <span className="font-bold text-white">proteínas de alta biodisponibilidade</span> e ciência metabólica.
        </p>

        <div className="relative group max-w-5xl mx-auto">
          <div className="p-3 rounded-[3rem] liquid-glass shadow-[0_0_100px_-20px_rgba(16,185,129,0.3)]">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-black aspect-video flex items-center justify-center ring-1 ring-white/10">
              {!isPlaying ? (
                <>
                  <img 
                    src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=1200" 
                    alt="Vivid Food Detail" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent"></div>
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="relative z-10 w-28 h-28 bg-white/10 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl transition-all hover:scale-110 active:scale-95 group/btn"
                  >
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                      <Play className="w-10 h-10 text-white fill-current ml-1" />
                    </div>
                  </button>
                  <div className="absolute bottom-10 left-10 flex flex-col items-start gap-4 text-left">
                    <span className="bg-red-600/90 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest text-white backdrop-blur-lg">Assista Agora</span>
                    <h3 className="text-2xl font-bold text-white max-w-md">O plano de 12 semanas que reprograma sua queima de gordura</h3>
                  </div>
                </>
              ) : (
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                  title="VSL Janeiro Ápice" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
