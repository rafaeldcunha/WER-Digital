export interface Role {
  id: string;
  titulo: string;
  data: string;
  pontoEncontro: string;
  destino: string;
  descricao?: string | null;
  imagem?: string | null;
  status: "agendado" | "realizado" | "cancelado";
}

export interface Evento {
  id: string;
  titulo: string;
  data: string;
  local: string;
  descricao?: string | null;
  imagem?: string | null;
  link?: string | null;
}

export interface Parceiro {
  id: string;
  nome: string;
  descricao: string;
  beneficio?: string | null;
  logo: string;
  link?: string | null;
  instagram?: string | null;
}

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco?: string | null;
  variacoes?: string[] | null;
  imagem?: string | null;
  disponivel: boolean;
}
