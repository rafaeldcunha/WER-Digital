import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardBadge } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getProximosRoles, getRolesRealizados, formatarData } from "@/lib/content";
import type { Role } from "@/lib/types";

export const metadata: Metadata = {
  title: "Rolês e Viagens",
  description: "Calendário de rolês e registro dos passeios do Grupo Rolê da Gurizada.",
};

function RoleCard({ role }: { role: Role }) {
  return (
    <Card as="article" className="overflow-hidden">
      {/* [PLACEHOLDER] imagem do rolê */}
      <div className="aspect-video bg-brand-border relative flex items-center justify-center">
        {role.imagem ? (
          <Image
            src={role.imagem}
            alt={role.titulo}
            fill
            className="object-cover"
          />
        ) : (
          <p className="text-brand-gray text-xs font-body">[PLACEHOLDER] foto do rolê</p>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <CardBadge variant={role.status === "agendado" ? "neon" : "gray"}>
            {role.status === "agendado" ? "Agendado" : "Realizado"}
          </CardBadge>
        </div>
        <h3 className="font-display text-xl text-brand-white mb-1">{role.titulo}</h3>
        <p className="text-neon text-sm font-body font-semibold mb-3">
          {formatarData(role.data)}
        </p>
        <div className="flex flex-col gap-1 text-brand-gray text-sm font-body">
          <span>Saída: {role.pontoEncontro}</span>
          <span>Destino: {role.destino}</span>
        </div>
        {role.descricao && (
          <p className="text-brand-gray text-sm font-body mt-3 leading-relaxed">
            {role.descricao}
          </p>
        )}
      </div>
    </Card>
  );
}

function ListaVazia({ mensagem }: { mensagem: string }) {
  return (
    <div className="border border-brand-border rounded-md p-8 text-center">
      <p className="text-brand-gray font-body">{mensagem}</p>
    </div>
  );
}

export default async function Roles() {
  const [proximos, realizados] = await Promise.all([
    getProximosRoles(),
    getRolesRealizados(),
  ]);

  return (
    <>
      {/* Hero interno */}
      <section className="bg-brand-black pt-16 pb-10 border-b border-brand-border">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <p className="text-neon text-xs uppercase tracking-widest font-body font-semibold mb-4">
            Na estrada
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-brand-white leading-none">
            Rolês e Viagens
          </h1>
          <p className="text-brand-gray font-body mt-4 max-w-md leading-relaxed">
            O que a gente mais gosta de fazer. Aqui fica o calendário do que vem por aí e o registro do que já rolou.
          </p>
        </div>
      </section>

      {/* Próximos rolês */}
      <Section id="proximos" surface>
        <SectionHeader
          label="Tá chegando"
          title="Próximos Rolês"
          subtitle="Data, ponto de encontro e destino. Pra ninguém ter desculpa de perder."
        />
        {proximos.length === 0 ? (
          <ListaVazia mensagem="Nenhum rolê agendado agora. Entra no grupo do WhatsApp pra saber quando sai o próximo." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {proximos.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        )}
      </Section>

      {/* Galeria de passeios realizados */}
      {realizados.length > 0 && (
        <Section id="galeria">
          <SectionHeader
            label="O que já rolou"
            title="Registro dos Rolês"
            subtitle="Cada viagem tem história. Aqui fica o registro de quem foi e de onde a gurizada já andou."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {realizados.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
