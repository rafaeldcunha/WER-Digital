"use client";

import Image from "next/image";
import { waLink } from "@/config/site";

const ASSETS = "/assets/store";

const PARTICLES = [
  { left: "22%", bottom: "38%", delay: "0s",   dur: "3.2s", opacity: 0.55 },
  { left: "36%", bottom: "32%", delay: "0.9s", dur: "4.1s", opacity: 0.40 },
  { left: "50%", bottom: "42%", delay: "1.6s", dur: "3.8s", opacity: 0.50 },
  { left: "28%", bottom: "28%", delay: "2.3s", dur: "5.0s", opacity: 0.35 },
  { left: "60%", bottom: "36%", delay: "0.5s", dur: "4.4s", opacity: 0.45 },
  { left: "44%", bottom: "24%", delay: "1.2s", dur: "3.6s", opacity: 0.38 },
];

export function StoreSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#070707]">

      {/* ════ z-0: background pista ════ */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`${ASSETS}/background-store.png`}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ════ z-1: overlay gradiente ════ */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg,#000 0%,rgba(0,0,0,.85) 25%,rgba(0,0,0,.3) 70%,rgba(0,0,0,.6) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ════ FAIXA SUPERIOR ════ */}
      <div className="relative z-[10] max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:min-h-[680px]">

          {/* ── Coluna esquerda: texto + CTA ── */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center py-16 lg:py-24 pr-0 lg:pr-16 order-1 relative z-[30]">
            <p
              className="font-mono font-bold text-[11px] tracking-[4px] uppercase mb-5"
              style={{ color: "#8CE600" }}
            >
              Loja oficial
            </p>

            <h2
              className="font-display italic font-black uppercase leading-[.88] text-brand-white mb-5"
              style={{ fontSize: "clamp(36px,5.5vw,72px)" }}
            >
              Vista a gurizada.
              <br />
              <span style={{ color: "#8CE600" }}>Literalmente.</span>
            </h2>

            <p className="font-body text-brand-muted leading-relaxed mb-8 max-w-sm"
              style={{ fontSize: "clamp(14px,1.2vw,16px)" }}>
              Não é só um moletom. É o símbolo de quem roda junto.
            </p>

            <a
              href={waLink("moletom")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono font-bold text-sm uppercase tracking-[1.5px] px-7 py-4 rounded-md transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 self-start"
              style={{
                background: "#8CE600",
                color: "#070707",
                boxShadow: "0 0 0 0 rgba(140,230,0,0)",
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 20px rgba(140,230,0,0.45)")}
              onMouseLeave={e =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
            >
              Quero o meu
            </a>
          </div>

          {/* ── Coluna direita: composição piloto + moto ── */}
          <div className="w-full lg:w-1/2 relative order-2 min-h-[500px] lg:min-h-0 overflow-hidden">

            {/* z-2: watermark 1200px, centralizada na área do piloto */}
            <div
              className="absolute z-[2] pointer-events-none"
              style={{
                top: "50%", left: "50%",
                transform: "translate(-30%, -50%)",
                width: 1200, height: 1200,
              }}
            >
              <Image
                src={`${ASSETS}/watermark.png`}
                alt=""
                fill
                className="object-contain"
                style={{ opacity: 0.03, mixBlendMode: "screen" }}
              />
            </div>

            {/* z-3: smoke atrás da moto */}
            <div className="absolute inset-0 z-[3] pointer-events-none" aria-hidden="true">
              <div className="store-smoke store-smoke-1"
                style={{ width: 200, height: 110, bottom: "22%", left: "30%" }} />
              <div className="store-smoke store-smoke-2"
                style={{ width: 160, height: 90,  bottom: "30%", left: "48%" }} />
              <div className="store-smoke store-smoke-3"
                style={{ width: 130, height: 70,  bottom: "18%", left: "62%" }} />
            </div>

            {/* z-4: moto-escura — offset +120px direita com o piloto */}
            <div
              className="absolute z-[4]"
              style={{
                top: "32%", bottom: 0,
                left: "120px", right: "-120px",
                opacity: 0.82,
              }}
            >
              <Image
                src={`${ASSETS}/moto-escura.png`}
                alt=""
                fill
                className="object-contain object-top"
              />
            </div>

            {/* Glow dos faróis */}
            <div
              className="absolute z-[4] inset-x-0 pointer-events-none"
              style={{
                top: "52%", height: "16%",
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 20%,rgba(140,230,0,.20) 0%,rgba(140,230,0,.06) 55%,transparent 100%)",
              }}
              aria-hidden="true"
            />

            {/* z-5: piloto — offset +120px direita, topo a 80px do início */}
            <div
              className="absolute z-[5]"
              style={{
                top: "80px", bottom: 0,
                left: "120px", right: "-120px",
              }}
            >
              <Image
                src={`${ASSETS}/piloto-moletom.png`}
                alt="Piloto com moletom do Grupo Rolê da Gurizada"
                fill
                className="object-contain object-bottom"
                style={{ objectPosition: "center bottom" }}
              />
            </div>

            {/* Partículas */}
            <div className="absolute inset-0 z-[6] pointer-events-none" aria-hidden="true">
              {PARTICLES.map((p, i) => (
                <span
                  key={i}
                  className="store-particle"
                  style={{
                    left: p.left, bottom: p.bottom,
                    opacity: p.opacity,
                    animationDelay: p.delay,
                    animationDuration: p.dur,
                    boxShadow: "0 0 4px rgba(140,230,0,.8)",
                  }}
                />
              ))}
            </div>

            {/* Brilho no chão */}
            <div
              className="store-ground-glow absolute inset-x-0 bottom-0 z-[6] pointer-events-none"
              style={{
                height: "14%",
                background:
                  "radial-gradient(ellipse 70% 100% at 50% 100%,rgba(140,230,0,.18) 0%,rgba(140,230,0,.06) 50%,transparent 100%)",
              }}
              aria-hidden="true"
            />

          </div>
        </div>
      </div>

      {/* ════ FAIXA INFERIOR: container de produtos ════ */}
      <div className="relative z-[20] max-w-7xl mx-auto px-4 md:px-8 pb-16 md:pb-24">
        <div
          className="rounded-2xl p-6 md:p-10"
          style={{
            background: "rgba(5,12,5,0.72)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(140,230,0,.35)",
            boxShadow: "0 0 0 1px rgba(140,230,0,.06), inset 0 1px 0 rgba(140,230,0,.10)",
          }}
        >
          {/* Título do container */}
          <p
            className="font-mono font-bold text-center uppercase tracking-[5px] text-xs mb-8"
            style={{ color: "#8CE600" }}
          >
            Produtos Oficiais
          </p>

          {/* Grid de produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-2xl mx-auto">
            {[
              { id: "moletom",  src: `${ASSETS}/moletom-frente.png`,  label: "Moletom" },
              { id: "camiseta", src: `${ASSETS}/camiseta-frente.png`, label: "Camiseta" },
            ].map((p) => (
              <article
                key={p.id}
                className="relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer"
                style={{
                  background: "rgba(8,18,8,.6)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(140,230,0,.22)",
                  boxShadow: "inset 0 1px 0 rgba(140,230,0,.1)",
                  transition: "transform .25s cubic-bezier(.2,.7,.2,1), box-shadow .25s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "scale(1.03)";
                  el.style.boxShadow =
                    "0 0 24px rgba(140,230,0,.25),0 0 48px rgba(140,230,0,.10),inset 0 1px 0 rgba(140,230,0,.20)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "scale(1)";
                  el.style.boxShadow = "inset 0 1px 0 rgba(140,230,0,.1)";
                }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={p.src}
                    alt={p.label}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
