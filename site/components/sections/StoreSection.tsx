import Image from "next/image";

const ASSETS = "/assets/store";

export function StoreSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#070707]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

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
            <div className="h-8 w-24 rounded bg-brand-border mb-4" />
            <div className="h-14 w-3/4 rounded bg-brand-border mb-3" />
            <div className="h-14 w-1/2 rounded bg-brand-border mb-6" />
            <div className="h-4 w-full rounded bg-brand-border mb-2" />
            <div className="h-4 w-5/6 rounded bg-brand-border mb-8" />
            <div className="h-12 w-40 rounded bg-brand-border" />
          </div>

          {/* ── Painel direito: composição visual (50%) ── */}
          <div className="
            w-full lg:w-1/2
            relative
            order-3 lg:order-2
            min-h-[420px] lg:min-h-0
          ">

            {/* z-index 1: background-store */}
            <div className="absolute inset-0 z-[1]">
              <Image
                src={`${ASSETS}/background-store.png`}
                alt=""
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* z-index 2: watermark */}
            <div className="absolute inset-0 z-[2] flex items-center justify-center">
              <div className="relative w-4/5 h-4/5">
                <Image
                  src={`${ASSETS}/watermark.png`}
                  alt=""
                  fill
                  className="object-contain opacity-30"
                />
              </div>
            </div>

            {/* z-index 3: moto-escura */}
            <div className="absolute inset-x-0 bottom-0 z-[3] h-3/5">
              <Image
                src={`${ASSETS}/moto-escura.png`}
                alt=""
                fill
                className="object-contain object-bottom"
              />
            </div>

            {/* z-index 4: piloto-moletom
                +30% de tamanho: extrapola o topo (top: -10%) pra cabeça ficar próxima
                ao topo da seção. Pés tocam a base (bottom: 0). Proporção preservada
                via object-contain. overflow-hidden no painel pai contém o excesso. */}
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

          {/* ── Cards de produto (desktop: dentro do painel esquerdo, abaixo do conteúdo) ── */}
          {/* ── Mobile: entre conteúdo e piloto (order-2) ── */}
          <div className="
            w-full lg:hidden
            order-2
            py-8 px-0
          ">
            <ProductCards />
          </div>

        </div>

        {/* Cards desktop — abaixo do painel esquerdo, alinhados à esquerda */}
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
      back: `${ASSETS}/moletom-costas.png`,
      label: "Moletom",
    },
    {
      id: "camiseta",
      front: `${ASSETS}/camiseta-frente.png`,
      back: `${ASSETS}/camiseta-costas.png`,
      label: "Camiseta",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((p) => (
        <article
          key={p.id}
          className="relative rounded-xl overflow-hidden bg-[#0d0d0d] border border-brand-border aspect-[3/4]"
        >
          {/* Imagem frente */}
          <div className="absolute inset-0">
            <Image
              src={p.front}
              alt={p.label}
              fill
              className="object-cover object-center"
            />
          </div>

          {/* [PLACEHOLDER] badge / preço / CTA — sem conteúdo nesta versão */}
        </article>
      ))}
    </div>
  );
}
