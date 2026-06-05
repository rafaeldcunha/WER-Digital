import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ProximosRolesSection } from "@/components/sections/ProximosRolesSection";
import { QuemSomosPreview } from "@/components/sections/QuemSomosPreview";
import { ParceirosPreview } from "@/components/sections/ParceirosPreview";
import { StoreSection } from "@/components/sections/StoreSection";
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
      <ProximosRolesSection roles={roles} />
      <QuemSomosPreview />
      <ParceirosPreview parceiros={parceiros} />
      <StoreSection />
    </>
  );
}
