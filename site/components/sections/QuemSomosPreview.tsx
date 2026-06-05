import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function QuemSomosPreview() {
  return (
    <Section id="quem-somos">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <p className="text-neon text-xs uppercase tracking-widest font-body font-semibold mb-3">
            Quem é a gurizada
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-brand-white mb-4 leading-tight">
            Pelotas e Região,
            <br />Dois Pneus e Muita Parceria
          </h2>
          <div className="h-0.5 w-12 bg-neon mb-6" aria-hidden="true" />
          <p className="text-brand-gray font-body leading-relaxed mb-8">
            Somos um moto grupo informal de Pelotas/RS. Não tem hierarquia de cilindrada, não tem regra de marca. Tem respeito, tem união e tem estrada pra rodar.
          </p>
          <Button href="/a-gurizada" variant="secondary">
            Conhecer a gurizada
          </Button>
        </div>

        {/* Valores em linha */}
        <div className="flex flex-col gap-4">
          {[
            {
              titulo: "União",
              texto: "Na estrada, a gurizada não deixa ninguém pra trás. Se um para, todo mundo para.",
            },
            {
              titulo: "Respeito",
              texto: "Não importa a moto, não importa a experiência. Todo piloto é bem-vindo do mesmo jeito.",
            },
            {
              titulo: "Liberdade",
              texto: "Sem regra pesada, sem burocracia. A única obrigação é aproveitar a estrada.",
            },
          ].map((valor) => (
            <div
              key={valor.titulo}
              className="flex gap-4 p-4 bg-brand-surface border border-brand-border rounded-md"
            >
              <div
                className="w-1 shrink-0 bg-neon rounded-full"
                aria-hidden="true"
              />
              <div>
                <p className="font-display text-brand-white text-lg mb-1">
                  {valor.titulo}
                </p>
                <p className="text-brand-gray text-sm font-body leading-relaxed">
                  {valor.texto}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
