import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="text-center px-4">
        <p className="font-display text-neon text-sm uppercase tracking-widest mb-4">
          Pelotas / RS
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-brand-white mb-2">
          {siteConfig.tagline}
        </h1>
        <p className="font-display text-5xl md:text-7xl text-neon mb-8">
          {siteConfig.taglineSub}
        </p>
        <div className="neon-line w-48 mx-auto" />
        <p className="mt-6 text-brand-gray text-sm">
          Setup OK — Fase 0 completa
        </p>
      </div>
    </main>
  );
}
