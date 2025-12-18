
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Comparison from './components/Comparison';
import Authority from './components/Authority';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AISection from './components/AISection';
import { MessageCircle, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show based on percentage or pixel
      if (window.scrollY > 450) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#020617] selection:bg-emerald-500/30 text-slate-100">
      <Header />
      
      <main className="relative z-10">
        <Hero />
        
        {/* Apple style sub-bar sticky under the header or top of screen */}
        <div className="bg-emerald-600/90 backdrop-blur-xl py-4 px-4 text-center text-white text-[10px] font-black tracking-[0.3em] uppercase sticky top-0 z-40 shadow-2xl border-b border-emerald-400/20">
          Inscrições abertas para o grupo de Janeiro. <span className="hidden sm:inline">Últimas 12 vagas com 50% de bônus.</span>
        </div>

        <section id="metodo">
           <Comparison />
        </section>

        {/* Dynamic AI Background Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=2000" 
               className="w-full h-full object-cover opacity-10 grayscale-[100%] parallax-bg"
               alt="Cooking Ingredients"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
          </div>
          <div className="max-w-7xl mx-auto relative z-10 liquid-glass rounded-[4rem] shadow-3xl border border-white/5 overflow-hidden">
            <AISection />
          </div>
        </section>

        <SocialProof />
        
        <div className="bg-slate-950 rounded-t-[6rem] shadow-[0_-50px_100px_rgba(0,0,0,0.8)] mt-20">
          <Authority />
          <FAQ />
          <Footer />
        </div>
      </main>

      {/* Apple-style Blurred Bottom Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-1000 transform ${showStickyCta ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="apple-blur-bar w-full py-6 px-8 flex items-center justify-center">
          <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="hidden md:block">
              <p className="text-white font-black text-xl tracking-tighter">Protocolo Janeiro Ápice 2.0</p>
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mt-1">Sua transformação começa agora</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
              <div className="text-center md:text-right hidden sm:block">
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest line-through">De R$ 1.297,00</p>
                <p className="text-white font-black text-2xl">Por R$ 597,00</p>
              </div>
              <button 
                onClick={() => window.open('https://wa.me/5500000000000', '_blank')}
                className="w-full sm:w-auto bg-emerald-500 text-white px-10 py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-black uppercase tracking-widest hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_-5px_rgba(16,185,129,0.5)]"
              >
                <MessageCircle className="w-6 h-6" />
                Quero meu ápice agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
