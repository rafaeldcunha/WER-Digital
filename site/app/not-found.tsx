import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-brand-black px-4">
      <div className="text-center max-w-md">
        <p className="font-display text-neon text-8xl mb-4" aria-hidden="true">
          404
        </p>
        <h1 className="font-display text-3xl text-brand-white mb-3">
          Essa estrada não existe
        </h1>
        <p className="text-brand-gray font-body mb-8 leading-relaxed">
          A página que você procura não foi encontrada. Mas a gurizada tá por aqui.
        </p>
        <Button href="/">Voltar pra home</Button>
      </div>
    </section>
  );
}
