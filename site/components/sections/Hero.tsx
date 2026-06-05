import { waLink } from "@/config/site";

export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden isolate"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* ── Camada 0: vídeo de fundo ── */}
      <video
        src="/images/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-poster.jpg"
        aria-hidden="true"
        className="hero-video absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 56%" }}
      />
      {/* Fallback estático para prefers-reduced-motion */}
      <div
        className="hero-poster absolute inset-0 hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-poster.jpg')",
          backgroundPosition: "center 56%",
        }}
        aria-hidden="true"
      />

      {/* ── Camada 1: overlays de legibilidade ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `
            radial-gradient(120% 80% at 50% 38%, transparent 55%, rgba(7,7,7,.45) 100%),
            linear-gradient(to bottom, rgba(7,7,7,.6) 0%, rgba(7,7,7,0) 22%),
            linear-gradient(to top, rgba(7,7,7,.82) 0%, rgba(7,7,7,0) 26%)
          `,
        }}
        aria-hidden="true"
      />

      {/* ── Camada 2: grain ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[.05]"
        style={{
          zIndex: 2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* ── Camada 4: conteúdo ── */}
      <div
        className="relative flex flex-col items-center justify-between text-center h-full"
        style={{
          zIndex: 4,
          padding: "118px clamp(20px,4vw,64px) 52px",
        }}
      >
        {/* Topo: eyebrow + headline */}
        <div className="flex flex-col items-center">
          <p
            className="font-mono font-bold uppercase tracking-[4px] text-neon text-[13px] mb-[18px] animate-reveal-1"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,.9)" }}
          >
            Grupo de moto · Pelotas / RS
          </p>

          <h1
            className="font-display italic font-black uppercase leading-[.9] tracking-tight animate-reveal-2"
            style={{
              fontSize: "clamp(40px,7vw,104px)",
              textWrap: "balance",
              textShadow: "0 3px 26px rgba(0,0,0,.92), 0 0 70px rgba(0,0,0,.7)",
            }}
          >
            Aqui não importa
            <br />a cilindrada.
            <br />
            <span
              className="text-neon"
              style={{ textShadow: "0 3px 26px rgba(0,0,0,.85), 0 0 50px rgba(140,230,0,.45)" }}
            >
              O que vale é a parceria.
            </span>
          </h1>
        </div>

        {/* Base: botões */}
        <div className="flex flex-wrap gap-[15px] justify-center animate-reveal-4">
          <a
            href="/roles"
            className="font-mono font-bold text-sm uppercase tracking-[1.5px] no-underline px-[30px] py-[17px] rounded-md transition-all duration-200 bg-neon text-[#0a0a0a] border border-neon hover:bg-neon-bright hover:shadow-neon hover:-translate-y-0.5"
          >
            Ver o próximo rolê
          </a>
          <a
            href={waLink("entrar")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono font-bold text-sm uppercase tracking-[1.5px] no-underline px-[30px] py-[17px] rounded-md transition-all duration-200 text-neon border border-neon hover:bg-neon/16 hover:-translate-y-0.5"
            style={{ background: "rgba(7,7,7,.45)", backdropFilter: "blur(3px)" }}
          >
            Quero andar com a gurizada
          </a>
        </div>
      </div>
    </section>
  );
}
