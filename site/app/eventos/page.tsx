import type { Metadata } from "next";
import { Card, CardBadge } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getProximosEventos, formatarData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Concentrações e eventos do Grupo Rolê da Gurizada em Pelotas e região.",
};

export default async function Eventos() {
  const eventos = await getProximosEventos();

  return (
    <>
      {/* Hero interno */}
      <section className="bg-brand-black pt-16 pb-10 border-b border-brand-border">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <p className="text-neon text-xs uppercase tracking-widest font-body font-semibold mb-4">
            Na agenda
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-brand-white leading-none">
            Eventos
          </h1>
          <p className="text-brand-gray font-body mt-4 max-w-md leading-relaxed">
            Concentrações, encontros e tudo que a gurizada marca. Salva na agenda e aparece.
          </p>
        </div>
      </section>

      <Section id="calendario" surface>
        <SectionHeader
          label="O que vem aí"
          title="Calendário de Eventos"
        />

        {eventos.length === 0 ? (
          <div className="border border-brand-border rounded-md p-8 text-center">
            <p className="text-brand-gray font-body">
              Sem evento marcado no momento.{" "}
              <a
                href="https://www.instagram.com/grupo_role_da_gurizada"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon hover:underline"
              >
                Segue o Instagram
              </a>{" "}
              pra não perder nada.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {eventos.map((evento) => (
              <Card key={evento.id} as="article" className="p-6">
                <CardBadge variant="red">Em breve</CardBadge>
                <h3 className="font-display text-xl text-brand-white mt-3 mb-1">
                  {evento.titulo}
                </h3>
                <p className="text-neon text-sm font-body font-semibold mb-2">
                  {formatarData(evento.data)}
                </p>
                <p className="text-brand-gray text-sm font-body mb-3">
                  {evento.local}
                </p>
                {evento.descricao && (
                  <p className="text-brand-gray text-sm font-body leading-relaxed">
                    {evento.descricao}
                  </p>
                )}
                {evento.link && (
                  <a
                    href={evento.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-neon text-sm font-body hover:underline"
                  >
                    Ver detalhes
                  </a>
                )}
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
