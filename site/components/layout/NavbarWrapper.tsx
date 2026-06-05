"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export function NavbarWrapper() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    // Na home a Navbar é absolute e fica dentro do hero via stacking context
    return <Navbar />;
  }

  // Nas demais páginas: sticky com fundo sólido
  return (
    <div className="sticky top-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-brand-border">
      <Navbar />
    </div>
  );
}
