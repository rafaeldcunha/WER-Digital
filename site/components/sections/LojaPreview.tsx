import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { waLink } from "@/config/site";

export function LojaPreview() {
  return (
    <Section id="loja">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-xl">
          <p className="text-neon text-xs uppercase tracking-widest font-body font-semibold mb-3">
            Representa o grupo
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-brand-white mb-4 leading-tight">
            Veste a Camiseta.
            <br />Literalmente.
          </h2>
          <div className="h-0.5 w-12 bg-neon mb-6" aria-hidden="true" />
          <p className="text-brand-gray font-body leading-relaxed">
            O moletom do Grupo Rolê da Gurizada. Pra andar na estrada ou no dia a dia, mostrando que faz parte.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <Button href="/loja">
            Ver a loja
          </Button>
          <Button href={waLink("moletom")} variant="secondary">
            Quero o moletom
          </Button>
        </div>
      </div>
    </Section>
  );
}
