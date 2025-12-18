
import React, { useState, useRef } from 'react';
import { Sparkles, Camera, Film, Loader2, Download, AlertCircle } from 'lucide-react';
import { generateResultImage, animateImageWithVeo, checkAiStudioKey, openAiStudioSelectKey } from '../services/geminiService';
import { ImageSize } from '../types';

const AISection: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAuth = async () => {
    const hasKey = await checkAiStudioKey();
    if (!hasKey) {
      await openAiStudioSelectKey();
      return false;
    }
    return true;
  };

  const handleGenerateImage = async () => {
    if (!prompt) return;
    setError(null);
    const authOk = await handleAuth();
    if (!authOk) return;

    setIsGeneratingImg(true);
    try {
      const result = await generateResultImage(prompt, size);
      if (result) setGeneratedImage(result);
      else setError("Falha ao gerar imagem. Verifique sua chave de API.");
    } catch (e) {
      setError("Erro durante a geração.");
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGeneratedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnimate = async () => {
    if (!generatedImage) return;
    setError(null);
    const authOk = await handleAuth();
    if (!authOk) return;

    setIsAnimating(true);
    try {
      const result = await animateImageWithVeo(generatedImage, "Cinematic video of transformation, health, and vitality");
      if (result) setGeneratedVideo(result);
      else setError("Falha ao animar vídeo. Veo pode levar alguns minutos.");
    } catch (e) {
      setError("Erro durante a animação.");
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <div className="p-8 md:p-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs mb-6 border border-emerald-100">
            <Sparkles className="w-4 h-4 animate-pulse" />
            VIRTUAL TRANSFORMATION ENGINE
          </div>
          <h2 className="text-4xl font-black mb-4 tracking-tight">Visualize o seu Futuro</h2>
          <p className="text-gray-500 font-medium">Use nossa IA para simular sua evolução física com o protocolo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="p-8 rounded-[2rem] border border-gray-100 bg-white/50 backdrop-blur-sm space-y-6 shadow-sm ring-1 ring-black/5">
              <div className="space-y-2">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Descreva seu objetivo</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Visual de uma pessoa saudável com pele radiante e corpo definido após 12 semanas..."
                  className="w-full p-5 rounded-2xl border border-gray-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none resize-none h-40 bg-white transition-all text-sm leading-relaxed"
                />
              </div>
              
              <div className="flex gap-2">
                {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                  <button 
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${size === s ? 'bg-gray-900 text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-400 hover:text-gray-900'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleGenerateImage}
                disabled={isGeneratingImg || !prompt}
                className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 transition-all disabled:opacity-30 active:scale-95"
              >
                {isGeneratingImg ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
                Gerar Projeção
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]"><span className="bg-white/50 px-3 text-gray-300">ou</span></div>
              </div>

              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 bg-white border-2 border-dashed border-gray-200 text-gray-400 rounded-2xl font-bold text-xs hover:border-emerald-200 hover:text-emerald-600 transition-all"
              >
                Upload de Foto Real
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
            </div>

            {error && (
              <div className="p-5 rounded-2xl bg-red-50 text-red-700 flex items-start gap-3 border border-red-100 animate-in fade-in slide-in-from-bottom-2">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-bold">Houve um imprevisto</p>
                  <p className="opacity-80">{error}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8 h-full">
            <div className="aspect-[4/5] bg-gray-50 rounded-[2.5rem] overflow-hidden relative flex items-center justify-center border-2 border-dashed border-gray-200 group shadow-inner">
              {generatedImage ? (
                <img src={generatedImage} alt="Resultado Gerado" className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700" />
              ) : (
                <div className="text-center px-12 text-gray-300">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
                    <Sparkles className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-60">Prévia do Resultado</p>
                </div>
              )}
            </div>

            {generatedImage && !generatedVideo && (
              <button 
                onClick={handleAnimate}
                disabled={isAnimating}
                className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-black shadow-2xl transition-all disabled:opacity-30 active:scale-95"
              >
                {isAnimating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Film className="w-5 h-5" />}
                Dar Vida à Projeção (VEO IA)
              </button>
            )}

            {generatedVideo && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-1000">
                <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl ring-4 ring-emerald-500/10">
                  <video src={generatedVideo} controls autoPlay loop className="w-full h-full" />
                </div>
                <button 
                  onClick={() => window.open(generatedVideo, '_blank')}
                  className="w-full py-4 bg-white border border-gray-100 text-gray-900 rounded-2xl font-bold text-xs flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Salvar em Meus Dispositivos
                </button>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default AISection;
