import type { Role, Evento, Parceiro, Produto } from "./types";

export async function getRoles(): Promise<Role[]> {
  const data = await import("@/content/roles/roles.json");
  return data.default as Role[];
}

export async function getProximosRoles(): Promise<Role[]> {
  const roles = await getRoles();
  const hoje = new Date().toISOString().split("T")[0];
  return roles
    .filter((r) => r.status === "agendado" && r.data >= hoje)
    .sort((a, b) => a.data.localeCompare(b.data));
}

export async function getRolesRealizados(): Promise<Role[]> {
  const roles = await getRoles();
  const hoje = new Date().toISOString().split("T")[0];
  return roles
    .filter((r) => r.status === "realizado" || r.data < hoje)
    .sort((a, b) => b.data.localeCompare(a.data));
}

export async function getEventos(): Promise<Evento[]> {
  const data = await import("@/content/eventos/eventos.json");
  return data.default as Evento[];
}

export async function getProximosEventos(): Promise<Evento[]> {
  const eventos = await getEventos();
  const hoje = new Date().toISOString().split("T")[0];
  return eventos
    .filter((e) => e.data >= hoje)
    .sort((a, b) => a.data.localeCompare(b.data));
}

export async function getParceiros(): Promise<Parceiro[]> {
  const data = await import("@/content/parceiros/parceiros.json");
  return data.default as Parceiro[];
}

export async function getProdutos(): Promise<Produto[]> {
  const data = await import("@/content/loja/produtos.json");
  return (data.default as Produto[]).filter((p) => p.disponivel);
}

export function formatarData(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const data = new Date(year, month - 1, day);
  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatarDataCurta(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const data = new Date(year, month - 1, day);
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}
