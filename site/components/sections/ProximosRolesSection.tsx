import Link from "next/link";
import Image from "next/image";
import type { Role } from "@/lib/types";
import { formatarData } from "@/lib/content";

interface Props {
  roles: Role[];
}

function SpeedometerDeco() {
  return (
    <div className="w-full flex justify-center mb-6 select-none" aria-hidden="true">
      <div className="relative flex items-end gap-[2px]">
        {/* Números */}
        {["0","2","4","6","8","10","12","14"].map((n, i) => (
          <div key={n} className="flex flex-col items-center" style={{ width: i >= 5 ? 36 : 28 }}>
            <div className="flex gap-[2px] mb-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <div
                  key={j}
                  className="w-[3px] rounded-sm"
                  style={{
                    height: j === 2 ? 14 : 10,
                    background:
                      i === 5 ? "#8CE600"
                      : i === 6 ? "#8CE600"
                      : i === 7 ? "#FF2A2A"
                      : "rgba(255,255,255,0.18)",
                  }}
                />
              ))}
            </div>
            <span
              className="font-mono text-[10px] font-bold"
              style={{ color: i >= 7 ? "#FF2A2A" : i >= 5 ? "#8CE600" : "rgba(255,255,255,0.35)" }}
            >
              {n}
            </span>
          </div>
        ))}
        {/* Label vermelho */}
        <span
          className="absolute -right-16 bottom-5 font-display italic font-black text-sm tracking-wider"
          style={{ color: "#FF2A2A", textShadow: "0 0 10px rgba(255,42,42,.6)" }}
        >
          RÚGOS
        </span>
      </div>
    </div>
  );
}

function LeftCircuitDeco() {
  return (
    <div className="absolute left-0 top-16 bottom-16 w-10 hidden lg:flex flex-col items-center gap-2" aria-hidden="true">
      <div className="w-px flex-1 bg-gradient-to-b from-transparent via-neon/40 to-transparent" />
      {[0,1,2,3].map(i => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="w-2 h-2 rounded-full border border-neon/60" style={{ background: i === 1 ? "#8CE600" : "transparent" }} />
          <div className="w-px h-8 bg-neon/20" />
        </div>
      ))}
      <div className="w-px flex-1 bg-gradient-to-b from-transparent via-neon/40 to-transparent" />
    </div>
  );
}

function RouteSVG() {
  return (
    <svg
      viewBox="0 0 80 220"
      className="absolute right-4 top-0 bottom-0 h-full w-16 pointer-events-none"
      aria-hidden="true"
    >
      <circle cx="40" cy="16" r="5" fill="none" stroke="#8CE600" strokeWidth="1.5" />
      <circle cx="40" cy="16" r="2" fill="#8CE600" />
      {/* Ícone de localização topo */}
      <path d="M40 8 C36 8 33 11 33 15 C33 20 40 26 40 26 C40 26 47 20 47 15 C47 11 44 8 40 8Z"
        fill="none" stroke="#8CE600" strokeWidth="1" opacity="0.6" />
      {/* Linha tracejada */}
      <line x1="40" y1="28" x2="40" y2="190" stroke="#8CE600" strokeWidth="1.5"
        strokeDasharray="4 4" opacity="0.7" />
      {/* Pontos de parada */}
      <circle cx="40" cy="80"  r="4" fill="#070707" stroke="#8CE600" strokeWidth="1.5" />
      <circle cx="40" cy="140" r="4" fill="#070707" stroke="#8CE600" strokeWidth="1.5" />
      {/* Destino */}
      <circle cx="40" cy="194" r="6" fill="#8CE600" opacity="0.9" />
      <circle cx="40" cy="194" r="3" fill="#070707" />
    </svg>
  );
}

function RoleCard({ role }: { role: Role }) {
  return (
    <article
      className="relative rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "rgba(10,10,10,0.9)",
        border: "1px solid rgba(140,230,0,0.35)",
        boxShadow: "0 0 0 1px rgba(140,230,0,0.08), inset 0 1px 0 rgba(140,230,0,0.1)",
      }}
    >
      {/* Imagem + overlay de rota */}
      <div className="relative h-48 overflow-hidden">
        {role.imagem ? (
          <Image src={role.imagem} alt={role.titulo} fill className="object-cover" />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(135deg, #0a1a0a 0%, #0d2000 50%, #0a1a0a 100%)",
            }}
          />
        )}
        {/* Gradiente base */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(7,7,7,0) 40%, rgba(7,7,7,0.95) 100%)",
          }}
        />
        {/* Badge AGENDADO */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded font-mono font-bold text-[10px] tracking-[2px] text-neon uppercase"
          style={{
            background: "rgba(7,7,7,0.75)",
            border: "1px solid rgba(140,230,0,0.5)",
            backdropFilter: "blur(4px)",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="#8CE600" strokeWidth="1.2"/>
            <line x1="4" y1="1" x2="4" y2="4" stroke="#8CE600" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="8" y1="1" x2="8" y2="4" stroke="#8CE600" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="1" y1="5.5" x2="11" y2="5.5" stroke="#8CE600" strokeWidth="1"/>
          </svg>
          Agendado
        </div>
        {/* Ícone hexagonal */}
        <div className="absolute bottom-3 left-3">
          <div
            className="w-12 h-12 flex items-center justify-center"
            style={{
              background: "rgba(7,7,7,0.7)",
              border: "1.5px solid rgba(140,230,0,0.5)",
              clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 17L7 9L12 13L17 7L21 11" stroke="#8CE600" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="9" r="1.5" fill="#8CE600"/>
              <circle cx="17" cy="7" r="1.5" fill="#8CE600"/>
              <circle cx="21" cy="11" r="1.5" fill="#8CE600"/>
            </svg>
          </div>
        </div>
        {/* Mapa de rota SVG */}
        <RouteSVG />
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div>
          <h3 className="font-display font-black text-2xl text-brand-white leading-tight mb-1">
            {role.titulo}
          </h3>
          <p className="font-body font-semibold text-sm" style={{ color: "#8CE600" }}>
            {formatarData(role.data)}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2 text-sm font-body text-brand-muted">
            {/* Ícone capacete */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5" style={{ color: "#8CE600" }}>
              <path d="M12 4C7.6 4 4 7.6 4 12v3h16v-3c0-4.4-3.6-8-8-8Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 15h16v1a2 2 0 01-2 2H6a2 2 0 01-2-2v-1Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span><span className="text-brand-white font-medium">Saída:</span> {role.pontoEncontro}</span>
          </div>
          <div className="flex items-start gap-2 text-sm font-body text-brand-muted">
            {/* Ícone pin */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5" style={{ color: "#8CE600" }}>
              <path d="M12 2C8.7 2 6 4.7 6 8c0 5 6 14 6 14s6-9 6-14c0-3.3-2.7-6-6-6Z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span><span className="text-brand-white font-medium">Destino:</span> {role.destino}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function BottomRouteDeco() {
  return (
    <div className="flex items-center gap-3 mt-8 select-none" aria-hidden="true">
      <span className="font-mono text-[11px] font-bold tracking-[3px] text-brand-muted uppercase">
        Pelotas
      </span>
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full" style={{ background: "#8CE600", boxShadow: "0 0 6px #8CE600" }} />
        <div
          className="h-px w-32 md:w-64"
          style={{
            background: "repeating-linear-gradient(90deg,#8CE600 0,#8CE600 6px,transparent 6px,transparent 12px)",
          }}
        />
        <div className="w-2 h-2 rounded-full border border-neon opacity-60" />
        <div
          className="h-px w-16 md:w-32 opacity-40"
          style={{
            background: "repeating-linear-gradient(90deg,#8CE600 0,#8CE600 4px,transparent 4px,transparent 10px)",
          }}
        />
        {/* Flag */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <line x1="5" y1="3" x2="5" y2="21" stroke="#8CE600" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M5 3l14 4-14 4V3Z" fill="#8CE600" opacity="0.7"/>
        </svg>
      </div>
      <span className="font-mono text-[11px] font-bold tracking-[3px] text-brand-muted uppercase">
        Aventura
      </span>
    </div>
  );
}

export function ProximosRolesSection({ roles }: Props) {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      style={{ background: "#070707" }}
    >
      {/* Decoração esquerda */}
      <LeftCircuitDeco />

      {/* Moto decorativa direita */}
      <div
        className="absolute right-0 top-0 bottom-0 w-64 lg:w-80 pointer-events-none hidden md:block"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to left, rgba(7,7,7,0) 0%, #070707 100%)",
          zIndex: 1,
        }}
      />
      {/* [PLACEHOLDER] imagem da moto decorativa — adicionar /images/moto-deco.png */}

      <div className="relative mx-auto max-w-6xl px-8 md:px-16" style={{ zIndex: 2 }}>
        {/* Velocímetro decorativo */}
        <SpeedometerDeco />

        {/* Header da seção */}
        <div className="mb-8">
          <p className="font-mono font-bold text-xs tracking-[4px] uppercase mb-3" style={{ color: "#8CE600" }}>
            Tá chegando
          </p>
          <h2
            className="font-display italic font-black uppercase text-brand-white leading-none mb-3"
            style={{ fontSize: "clamp(40px,6vw,72px)" }}
          >
            Próximos Rolês
          </h2>
          <div className="h-0.5 w-14 mb-4" style={{ background: "#8CE600" }} />
          <p className="text-brand-muted font-body text-sm leading-relaxed max-w-md">
            Calendário fixo pra ninguém perder o encontro.<br />
            Confirma presença no grupo do WhatsApp.
          </p>
        </div>

        {/* Cards ou estado vazio */}
        {roles.length === 0 ? (
          <div
            className="rounded-xl p-8 text-center font-body text-brand-muted"
            style={{ border: "1px solid rgba(140,230,0,0.2)" }}
          >
            Nenhum rolê agendado agora.{" "}
            <a
              href="https://wa.me/5553991801112"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon hover:underline"
            >
              Entra no grupo do WhatsApp
            </a>{" "}
            pra saber quando sai o próximo.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 max-w-3xl">
            {roles.slice(0, 2).map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        )}

        {/* Botão */}
        <Link
          href="/roles"
          className="inline-flex items-center gap-3 font-mono font-bold text-sm tracking-[2px] uppercase px-6 py-3.5 rounded-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-neon/10"
          style={{ color: "#8CE600", border: "1px solid #8CE600" }}
        >
          <span style={{ fontWeight: 900, fontSize: 16 }}>&raquo;</span>
          Ver todos os rolês
        </Link>

        {/* Linha Pelotas → Aventura */}
        <BottomRouteDeco />
      </div>
    </section>
  );
}
