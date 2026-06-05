import { Button } from "@/components/ui/Button";
import { waLink } from "@/config/site";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-black">
      {/* Fundo: placeholder de foto real */}
      <div
        className="absolute inset-0 bg-brand-black"
        aria-hidden="true"
      >
        {/* [PLACEHOLDER] Substituir pelo fundo abaixo quando tiver foto real:
            <Image src="/images/hero-estrada.jpg" alt="" fill className="object-cover opacity-30" priority />
        */}
        {/* Overlay escuro com linhas de velocidade */}
        <div className="absolute inset-0 speed-lines opacity-40" />
        {/* Gradiente de baixo */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-brand-black to-transparent" />
        {/* Brilho neon central sutil */}
        <div className="absolute inset-0 bg-neon-glow opacity-20" />
      </div>

      {/* Linha vermelha de velocidade (acento) */}
      <div
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8 py-24">
        {/* Label */}
        <p className="text-neon text-xs uppercase tracking-widest font-body font-semibold mb-6">
          Pelotas / RS
        </p>

        {/* Headline principal */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-brand-white leading-none mb-2 max-w-3xl">
          Aqui não importa
          <br />a cilindrada.
        </h1>
        <p className="font-display text-5xl md:text-7xl lg:text-8xl text-neon text-neon-glow leading-none mb-8 max-w-3xl">
          O que vale é
          <br />a parceria.
        </p>

        {/* Subtítulo */}
        <p className="text-brand-gray text-base md:text-lg font-body max-w-md mb-10 leading-relaxed">
          A gurizada de Pelotas que anda junta, viaja junto e cuida de quem tá na estrada.
        </p>

        {/* CTAs */}
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
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
