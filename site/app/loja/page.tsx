import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getProdutos } from "@/lib/content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Loja",
  description: "Produtos oficiais do Grupo Rolê da Gurizada. Compra via WhatsApp.",
};

export default async function Loja() {
  const produtos = await getProdutos();

  return (
    <>
      {/* Hero interno */}
      <section className="bg-brand-black pt-16 pb-10 border-b border-brand-border">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <p className="text-neon text-xs uppercase tracking-widest font-body font-semibold mb-4">
            Representa
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-brand-white leading-none">
            Loja do Grupo
          </h1>
          <p className="text-brand-gray font-body mt-4 max-w-md leading-relaxed">
            Produtos oficiais do Grupo Rolê da Gurizada. Compra via WhatsApp, sem complicação.
          </p>
        </div>
      </section>

      {/* Produtos */}
      <Section id="produtos" surface>
        <SectionHeader label="Produtos" title="O que tem na loja" />

        {produtos.length === 0 ? (
          <div className="border border-brand-border rounded-md p-8 text-center">
            <p className="text-brand-gray font-body mb-4">
              Produtos sendo cadastrados. Enquanto isso, fala direto com a gurizada.
            </p>
            <Button
              href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.messages.moletom)}`}
            >
              Perguntar sobre o moletom
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {produtos.map((produto) => {
              const msg = encodeURIComponent(
                `Quero o ${produto.nome} do Grupo Rolê da Gurizada!`
              );
              const waUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${msg}`;

              return (
                <Card key={produto.id} as="article" className="overflow-hidden">
                  <div className="aspect-square bg-brand-border relative flex items-center justify-center">
                    {produto.imagem ? (
                      <Image
                        src={produto.imagem}
                        alt={produto.nome}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <p className="text-brand-gray text-xs font-body px-4 text-center">
                        [PLACEHOLDER] foto do produto
                      </p>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-brand-white mb-1">
                      {produto.nome}
                    </h3>
                    <p className="text-brand-gray text-sm font-body leading-relaxed mb-3">
                      {produto.descricao}
                    </p>
                    {produto.variacoes && produto.variacoes.length > 0 && (
                      <p className="text-brand-gray text-xs font-body mb-3">
                        Tamanhos: {produto.variacoes.join(", ")}
                      </p>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-neon text-lg">
                        {produto.preco ?? "Consultar"}
                      </span>
                      <Button href={waUrl} size="sm">
                        Quero esse
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Section>

      {/* Aviso de compra */}
      <Section id="como-comprar">
        <div className="flex flex-col md:flex-row items-start gap-6 bg-brand-surface border border-brand-border rounded-md p-6 md:p-8">
          <div
            className="w-1 shrink-0 self-stretch bg-neon rounded-full hidden md:block"
            aria-hidden="true"
          />
          <div>
            <h3 className="font-display text-xl text-brand-white mb-2">
              Como funciona a compra
            </h3>
            <p className="text-brand-gray font-body text-sm leading-relaxed">
              Venda e entrega combinada pelo WhatsApp. Sem checkout online, sem taxa. Direto com a gurizada.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
