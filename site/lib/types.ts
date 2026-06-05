export interface Role {
  id: string;
  titulo: string;
  data: string; // ISO 8601
  pontoEncontro: string;
  destino: string;
  descricao?: string;
  imagem?: string;
  status: "agendado" | "realizado" | "cancelado";
}

export interface Evento {
  id: string;
  titulo: string;
  data: string;
  local: string;
  descricao?: string;
  imagem?: string;
  link?: string;
}

export interface Parceiro {
  id: string;
  nome: string;
  descricao: string;
  beneficio?: string;
  logo: string;
  link?: string;
  instagram?: string;
}

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco?: string;
  variacoes?: string[];
  imagem?: string;
  disponivel: boolean;
}
