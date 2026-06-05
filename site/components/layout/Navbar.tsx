"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { waLink } from "@/config/site";

const navLinks = [
  { href: "/a-gurizada", label: "O Grupo" },
  { href: "/roles", label: "Rolês" },
  { href: "/eventos", label: "Eventos" },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/loja", label: "Loja" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-[5]">
      <div
        className="flex items-center justify-between"
        style={{ padding: "24px clamp(20px,4vw,64px)" }}
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-[13px] shrink-0"
          aria-label="Grupo Rolê da Gurizada — Home"
        >
          <Image
            src="/logos/logo-grupo.png"
            alt="Grupo Rolê da Gurizada"
            width={40}
            height={40}
            className="h-10 w-auto rounded-[4px]"
            style={{ filter: "drop-shadow(0 0 12px rgba(140,230,0,.3))" }}
            priority
          />
          <div
            className="font-display italic font-black text-[19px] leading-[.88] tracking-[.5px] uppercase text-brand-white"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,.8)" }}
          >
            Role<br /><span className="text-neon">da Gurizada</span>
          </div>
        </Link>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-white text-sm font-body font-medium opacity-90 hover:opacity-100 hover:text-neon transition-all duration-200"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,.7)" }}
            >
              {link.label}
            </Link>
          ))}
          <span
            className="font-mono font-bold text-xs text-neon tracking-[2px] border px-3 py-1.5 rounded-full"
            style={{ borderColor: "rgba(140,230,0,.5)", backdropFilter: "blur(2px)" }}
          >
            PELOTAS / RS
          </span>
        </nav>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={`block h-0.5 w-6 bg-brand-white transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-brand-white transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-brand-white transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="md:hidden bg-brand-black/95 backdrop-blur-md border-t border-brand-border">
          <nav className="flex flex-col px-6 py-4 gap-1" aria-label="Menu mobile">
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
              <a
                href={waLink("entrar")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block w-full text-center font-mono font-bold text-sm uppercase tracking-[1.5px] px-6 py-4 rounded-md bg-neon text-[#0a0a0a]"
              >
                Quero andar com a gurizada
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
