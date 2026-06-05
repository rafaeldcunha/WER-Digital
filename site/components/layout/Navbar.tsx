"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/config/site";

const navLinks = [
  { href: "/a-gurizada", label: "A Gurizada" },
  { href: "/roles", label: "Rolês" },
  { href: "/eventos", label: "Eventos" },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/loja", label: "Loja" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-surface/90 backdrop-blur-md border-b border-brand-border">
      <div className="mx-auto max-w-6xl px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo — substituir /logos/logo-grupo.png pela imagem real */}
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Grupo Rolê da Gurizada — Home">
          <div className="w-10 h-10 rounded-sm bg-brand-border flex items-center justify-center overflow-hidden">
            <Image
              src="/logos/logo-grupo.png"
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              priority
              onError={() => {}}
            />
          </div>
          <span className="font-display text-brand-white text-sm uppercase tracking-wide leading-tight">
            Rolê da<br />Gurizada
          </span>
        </Link>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-gray hover:text-neon text-sm font-body transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:block">
          <Button href={waLink("entrar")} size="sm">
            Quero andar
          </Button>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-0.5 w-6 bg-brand-white transition-transform duration-200 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-white transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-brand-white transition-transform duration-200 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="md:hidden bg-brand-surface border-t border-brand-border">
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Menu mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-brand-white hover:text-neon py-3 text-base font-body border-b border-brand-border last:border-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button
                href={waLink("entrar")}
                className="w-full justify-center"
                onClick={() => setOpen(false)}
              >
                Quero andar com a gurizada
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
