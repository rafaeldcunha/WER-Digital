"use client";

import Image from "next/image";

const ASSETS = "/assets/store";

export function StoreSection() {
  return (
    <section className="relative w-full overflow-hidden">

      {/* ── Background absoluto da seção inteira ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`${ASSETS}/background-store.png`}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Overlay gradiente sobre o background ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, #000 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Conteúdo acima dos fundos ── */}
      <div className="relative z-[2] max-w-7xl mx-auto px-4 md:px-8">

        {/*
          ═══════════════════════════════════════════════
          LAYOUT DESKTOP: dois painéis lado a lado (50/50)
          LAYOUT MOBILE: coluna única — conteúdo → cards → piloto
          ═══════════════════════════════════════════════
        */}
        <div className="flex flex-col lg:flex-row lg:min-h-[700px]">

          {/* ── Painel esquerdo: conteúdo (50%) ── */}
          <div className="
            w-full lg:w-1/2
            flex flex-col justify-center
            py-16 lg:py-24
            pr-0 lg:pr-12
            order-1
          ">
            {/* [PLACEHOLDER CONTEÚDO] label, título, descrição, CTA */}
            <div className="h-8 w-24 rounded bg-white/10 mb-4" />
            <div className="h-14 w-3/4 rounded bg-white/10 mb-3" />
            <div className="h-14 w-1/2 rounded bg-white/10 mb-6" />
            <div className="h-4 w-full rounded bg-white/10 mb-2" />
            <div className="h-4 w-5/6 rounded bg-white/10 mb-8" />
            <div className="h-12 w-40 rounded bg-white/10" />
          </div>

          {/* ── Painel direito: composição visual (50%) ── */}
          <div className="
            w-full lg:w-1/2
            relative
            order-3 lg:order-2
            min-h-[420px] lg:min-h-0
            overflow-hidden
          ">

            {/* z-index 2: watermark — centralizada, misturada ao background */}
            <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
              <div
                className="relative"
                style={{ width: "clamp(700px, 85%, 1000px)", aspectRatio: "1/1" }}
              >
                <Image
                  src={`${ASSETS}/watermark.png`}
                  alt=""
                  fill
                  className="object-contain"
                  style={{ opacity: 0.04, mixBlendMode: "screen" }}
                />
              </div>
            </div>

            {/* z-index 3: moto-escura
                Posicionada para que os faróis (topo da moto) fiquem na altura
                da cintura do piloto (~58% a partir do topo da seção).
                A moto ocupa ~55% da altura, ancorada em top: 30% → base em ~85%. */}
            <div
              className="absolute inset-x-0 z-[3]"
              style={{ top: "30%", bottom: "0", opacity: 0.82 }}
            >
              <Image
                src={`${ASSETS}/moto-escura.png`}
                alt=""
                fill
                className="object-contain object-top"
              />
            </div>

            {/* Glow dos faróis verdes — radial posicionado no topo da moto (~58% do container) */}
            <div
              className="absolute inset-x-0 z-[3] pointer-events-none"
              style={{
                top: "50%",
                height: "18%",
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 20%, rgba(140,230,0,0.22) 0%, rgba(140,230,0,0.07) 55%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            {/* z-index 4: piloto-moletom */}
            <div className="absolute inset-x-0 bottom-0 z-[4]" style={{ top: "-10%" }}>
              <Image
                src={`${ASSETS}/piloto-moletom.png`}
                alt="Piloto com moletom do Grupo Rolê da Gurizada"
                fill
                className="object-contain object-bottom"
                style={{ objectPosition: "center bottom" }}
              />
            </div>

          </div>

          {/* ── Cards mobile (order-2) ── */}
          <div className="w-full lg:hidden order-2 py-8">
            <ProductCards />
          </div>

        </div>

        {/* Cards desktop */}
        <div className="hidden lg:block w-1/2 pb-16">
          <ProductCards />
        </div>

      </div>
    </section>
  );
}

function ProductCards() {
  const products = [
    {
      id: "moletom",
      front: `${ASSETS}/moletom-frente.png`,
      label: "Moletom",
    },
    {
      id: "camiseta",
      front: `${ASSETS}/camiseta-frente.png`,
      label: "Camiseta",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 md:gap-6">
      {products.map((p) => (
        <article
          key={p.id}
          className="relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
          style={{
            background: "rgba(8, 18, 8, 0.55)",
            backdropFilter: "blur(14px) saturate(1.4)",
            WebkitBackdropFilter: "blur(14px) saturate(1.4)",
            border: "1px solid rgba(140, 230, 0, 0.28)",
            boxShadow:
              "0 0 0 1px rgba(140,230,0,0.06), inset 0 1px 0 rgba(140,230,0,0.12)",
            transition: "transform 0.25s cubic-bezier(.2,.7,.2,1), box-shadow 0.25s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 24px rgba(140,230,0,0.25), 0 0 48px rgba(140,230,0,0.1), inset 0 1px 0 rgba(140,230,0,0.2)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 0 0 1px rgba(140,230,0,0.06), inset 0 1px 0 rgba(140,230,0,0.12)";
          }}
        >
          <div className="absolute inset-0">
            <Image
              src={p.front}
              alt={p.label}
              fill
              className="object-cover object-center"
            />
          </div>
          {/* [PLACEHOLDER] badge / preço / CTA */}
        </article>
      ))}
    </div>
  );
}
