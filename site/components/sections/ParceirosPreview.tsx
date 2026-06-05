import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import type { Parceiro } from "@/lib/types";

interface Props {
  parceiros: Parceiro[];
}

export function ParceirosPreview({ parceiros }: Props) {
  return (
    <Section id="parceiros" surface>
      <SectionHeader
        label="Quem tá com a gente"
        title="Parceiros do Grupo"
        subtitle="Lojas e serviços que apoiam a gurizada de verdade. Vai lá e menciona o grupo."
      />

      {parceiros.length > 0 && (
        <div className="flex flex-wrap gap-6 mb-8">
          {parceiros.map((p) => (
            <a
              key={p.id}
              href={p.link ?? p.instagram ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-brand-black border border-brand-border rounded-md px-5 py-4 hover:border-neon/50 transition-colors"
              aria-label={p.nome}
            >
              <Image
                src={p.logo}
                alt={p.nome}
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <span className="font-display text-brand-white text-sm">{p.nome}</span>
            </a>
          ))}
        </div>
      )}

      <Button href="/parceiros" variant="secondary">
        Ver todos os parceiros
      </Button>
    </Section>
  );
}
