import Link from "next/link";
import { Card, CardBadge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { formatarData } from "@/lib/content";
import type { Role } from "@/lib/types";

interface Props {
  roles: Role[];
}

export function ProximosRolesPreview({ roles }: Props) {
  return (
    <Section id="proximos-roles" surface>
      <SectionHeader
        label="Tá chegando"
        title="Próximos Rolês"
        subtitle="Calendário fixo pra ninguém perder o encontro. Confirma presença no grupo do WhatsApp."
      />

      {roles.length === 0 ? (
        <div className="border border-brand-border rounded-md p-8 text-center">
          <p className="text-brand-gray font-body">
            Nenhum rolê agendado agora.{" "}
            <Link
              href="https://wa.me/5553991801112"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon hover:underline"
            >
              Entra no grupo do WhatsApp
            </Link>{" "}
            pra saber quando sai o próximo.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {roles.slice(0, 3).map((role) => (
            <Card key={role.id} as="li" className="p-6">
              <CardBadge>Agendado</CardBadge>
              <h3 className="font-display text-xl text-brand-white mt-3 mb-1">
                {role.titulo}
              </h3>
              <p className="text-neon text-sm font-body font-semibold mb-3">
                {formatarData(role.data)}
              </p>
              <div className="flex flex-col gap-1 text-brand-gray text-sm font-body">
                <span>Saída: {role.pontoEncontro}</span>
                <span>Destino: {role.destino}</span>
              </div>
            </Card>
          ))}
        </ul>
      )}

      {roles.length > 0 && (
        <Button href="/roles" variant="secondary">
          Ver todos os rolês
        </Button>
      )}
    </Section>
  );
}
