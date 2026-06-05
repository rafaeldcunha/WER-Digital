import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "A Gurizada",
  description: "De onde vem o Grupo Rolê da Gurizada e o que a gente carrega na estrada.",
};

const valores = [
  {
    titulo: "União",
    texto:
      "Na estrada, a gurizada não deixa ninguém pra trás. Se um para, todo mundo para. Essa é a regra que não precisa ser escrita porque a gente já sabe.",
  },
  {
    titulo: "Respeito",
    texto:
      "Não importa a moto, não importa a experiência. Todo piloto é bem-vindo do mesmo jeito. Nada de olhar torto pra quem chegou ontem.",
  },
  {
    titulo: "Liberdade",
    texto:
      "Sem regra pesada, sem burocracia. A única obrigação é aproveitar a estrada e trazer de volta todo mundo que saiu junto.",
  },
];

export default function AGurizada() {
  return (
    <>
      {/* Hero interno */}
      <section className="bg-brand-black pt-16 pb-10 border-b border-brand-border">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <p className="text-neon text-xs uppercase tracking-widest font-body font-semibold mb-4">
            Pelotas/RS
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-brand-white leading-none">
            De onde vem
            <br />
            <span className="text-neon">a gurizada</span>
          </h1>
        </div>
      </section>

      {/* História */}
      <Section id="historia" surface>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <SectionHeader label="Como tudo começou" title="A história" />
            <div className="space-y-4 text-brand-gray font-body leading-relaxed">
              <p>
                O Grupo Rolê da Gurizada nasceu em Pelotas/RS da vontade simples de reunir quem gosta de estrada. Sem protocolo, sem hierarquia. Um grupo que se encontra, define o destino na hora e vai junto.
              </p>
              <p>
                O nome já diz tudo: rolê é o passeio, gurizada é a turma. Junto, vira o jeito que a gente anda por aqui.
              </p>
              <p>
                Hoje a gente reúne pilotos de Pelotas e da região, de motos de todos os tamanhos e marcas. O que une não é a máquina, é o gosto pela estrada e pelo que acontece no caminho.
              </p>
            </div>
          </div>

          {/* [PLACEHOLDER] Foto real do grupo — substituir quando disponível */}
          <div className="bg-brand-border rounded-md aspect-square md:aspect-auto flex items-center justify-center">
            <p className="text-brand-gray text-sm font-body text-center px-4">
              [PLACEHOLDER]
              <br />Foto real do grupo
            </p>
          </div>
        </div>
      </Section>

      {/* Valores */}
      <Section id="valores">
        <SectionHeader
          label="O que a gente carrega"
          title="Na estrada e fora dela"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {valores.map((v) => (
            <div
              key={v.titulo}
              className="bg-brand-surface border border-brand-border rounded-md p-6"
            >
              <div className="h-0.5 w-8 bg-neon mb-4" aria-hidden="true" />
              <h3 className="font-display text-2xl text-brand-white mb-3">
                {v.titulo}
              </h3>
              <p className="text-brand-gray font-body text-sm leading-relaxed">
                {v.texto}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Presença */}
      <Section id="presenca" surface>
        <SectionHeader
          label="Tamo aqui"
          title="Uma comunidade pequena e engajada"
          subtitle="A gurizada não é grande por acidente. É pequena por escolha. Cada piloto que entra conhece o outro pelo nome. E é assim que a gente quer manter."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { destaque: "Pelotas e região", desc: "Base de operação" },
            { destaque: "O ano todo", desc: "Rolês frequentes na estrada" },
            {
              destaque: "[PLACEHOLDER]",
              desc: "Membros ativos — atualizar com número real",
            },
          ].map((item) => (
            <div
              key={item.destaque}
              className="bg-brand-black border border-brand-border rounded-md p-6 text-center"
            >
              <p className="font-display text-2xl text-neon mb-1">
                {item.destaque}
              </p>
              <p className="text-brand-gray text-sm font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
