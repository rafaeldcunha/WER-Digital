import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProximosRolesPreview } from "@/components/sections/ProximosRolesPreview";
import { QuemSomosPreview } from "@/components/sections/QuemSomosPreview";
import { ParceirosPreview } from "@/components/sections/ParceirosPreview";
import { LojaPreview } from "@/components/sections/LojaPreview";
import { getProximosRoles, getParceiros } from "@/lib/content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Pelotas/RS`,
  description: siteConfig.description,
};

export default async function Home() {
  const [roles, parceiros] = await Promise.all([
    getProximosRoles(),
    getParceiros(),
  ]);

  return (
    <>
      <Hero />
      <ProximosRolesPreview roles={roles} />
      <QuemSomosPreview />
      <ParceirosPreview parceiros={parceiros} />
      <LojaPreview />
    </>
  );
}
