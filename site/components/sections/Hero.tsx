import { Button } from "@/components/ui/Button";
import { waLink } from "@/config/site";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-black">

      {/* ── Camada 0: vídeo de fundo ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">

        {/*
          Mobile performance: o arquivo /images/hero.mp4 é servido em todas as telas.
          Se o vídeo for maior que ~8 MB, gere uma versão reduzida (720p, ~2 Mbps)
          e use <source> com media query:
            <source src="/images/hero-mobile.mp4" media="(max-width:760px)" type="video/mp4" />
            <source src="/images/hero.mp4" type="video/mp4" />
        */}
        <video
          src="/images/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          className="hero-video absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 56%" }}
        />

        {/* Fallback estático (visível só com prefers-reduced-motion) */}
        <div
          className="hero-poster absolute inset-0 bg-cover bg-center hidden"
          style={{ backgroundImage: "url('/images/hero-poster.jpg')", backgroundPosition: "center 56%" }}
        />

        {/* Overlay escuro pra texto legível */}
        <div className="absolute inset-0 bg-brand-black/60" />
        {/* Linhas de velocidade sutis */}
        <div className="absolute inset-0 speed-lines opacity-20" />
        {/* Gradiente de baixo */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-brand-black to-transparent" />
        {/* Brilho neon central sutil */}
        <div className="absolute inset-0 bg-neon-glow opacity-10" />
      </div>

      {/* Linha vermelha de velocidade (acento) */}
      <div
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-30 z-10"
        aria-hidden="true"
      />

      {/* ── Conteúdo sobreposto ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8 py-24">
        <p className="text-neon text-xs uppercase tracking-widest font-body font-semibold mb-6">
          Pelotas / RS
        </p>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-brand-white leading-none mb-2 max-w-3xl">
          Aqui não importa
          <br />a cilindrada.
        </h1>
        <p className="font-display text-5xl md:text-7xl lg:text-8xl text-neon text-neon-glow leading-none mb-8 max-w-3xl">
          O que vale é
          <br />a parceria.
        </p>

        <p className="text-brand-gray text-base md:text-lg font-body max-w-md mb-10 leading-relaxed">
          A gurizada de Pelotas que anda junta, viaja junto e cuida de quem tá na estrada.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/roles" size="lg">
            Ver o próximo rolê
          </Button>
          <Button href={waLink("entrar")} variant="secondary" size="lg">
            Quero andar com a gurizada
          </Button>
        </div>
      </div>

      {/* Linha neon no rodapé do hero */}
      <div
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent z-10"
        aria-hidden="true"
      />
    </section>
  );
}
