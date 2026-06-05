import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getParceiros } from "@/lib/content";
import { waLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Parceiros",
  description: "Lojas e serviços que apoiam a gurizada. Menciona o grupo e aproveita.",
};

export default async function Parceiros() {
  const parceiros = await getParceiros();

  return (
    <>
      {/* Hero interno */}
      <section className="bg-brand-black pt-16 pb-10 border-b border-brand-border">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <p className="text-neon text-xs uppercase tracking-widest font-body font-semibold mb-4">
            Quem apoia a gurizada
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-brand-white leading-none">
            Parceiros do Grupo
          </h1>
          <p className="text-brand-gray font-body mt-4 max-w-lg leading-relaxed">
            São lojas e serviços que acreditam no grupo. Dá o valor: vai lá, menciona o grupo e aproveita.
          </p>
        </div>
      </section>

      {/* Vitrine */}
      <Section id="parceiros" surface>
        <SectionHeader label="Quem tá com a gente" title="Nossos Parceiros" />

        {parceiros.length === 0 ? (
          <div className="border border-brand-border rounded-md p-8 text-center">
            <p className="text-brand-gray font-body">
              Parceiros sendo cadastrados. Volta em breve.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {parceiros.map((p) => (
              <Card key={p.id} as="article" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-brand-black rounded-md flex items-center justify-center shrink-0 overflow-hidden">
                    <Image
                      src={p.logo}
                      alt={p.nome}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl text-brand-white mb-1">
                      {p.nome}
                    </h3>
                    <p className="text-brand-gray text-sm font-body leading-relaxed mb-3">
                      {p.descricao}
                    </p>
                    {p.beneficio && (
                      <div className="bg-neon/10 border border-neon/30 rounded-sm px-3 py-2 mb-3">
                        <p className="text-neon text-xs font-body font-semibold uppercase tracking-wide">
                          Benefício pra gurizada
                        </p>
                        <p className="text-brand-white text-sm font-body mt-0.5">
                          {p.beneficio}
                        </p>
                      </div>
                    )}
                    <div className="flex gap-3">
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neon text-sm font-body hover:underline"
                        >
                          Visitar site
                        </a>
                      )}
                      {p.instagram && (
                        <a
                          href={p.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neon text-sm font-body hover:underline"
                        >
                          Ver no Instagram
                        </a>
                      )}
                      {!p.link && !p.instagram && (
                        <span className="text-brand-gray text-xs font-body">
                          [PLACEHOLDER] link pendente
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {/* CTA: Quer ser parceiro */}
      <Section id="seja-parceiro">
        <div className="max-w-2xl">
          <p className="text-neon text-xs uppercase tracking-widest font-body font-semibold mb-3">
            Vem com a gente
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-brand-white mb-4 leading-tight">
            Quer ser parceiro do grupo?
          </h2>
          <div className="h-0.5 w-12 bg-neon mb-6" aria-hidden="true" />
          <p className="text-brand-gray font-body leading-relaxed mb-8">
            Se você tem um negócio e quer estar do lado de quem anda de moto em Pelotas e região, fala com a gurizada. A gente divulga com seriedade pra comunidade que confia no grupo.
          </p>
          <Button href={waLink("parceiro")}>
            Fala com a gurizada no WhatsApp
          </Button>
        </div>
      </Section>
    </>
  );
}
