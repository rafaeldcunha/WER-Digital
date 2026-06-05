export const siteConfig = {
  name: "Grupo Rolê da Gurizada",
  shortName: "Rolê da Gurizada",
  description:
    "Moto grupo de Pelotas/RS. Aqui não importa a cilindrada. O que vale é a parceria.",
  location: "Pelotas/RS",
  region: "Pelotas e região, RS",

  // Redes sociais
  instagram: "https://www.instagram.com/grupo_role_da_gurizada",
  instagramHandle: "@grupo_role_da_gurizada",

  // WhatsApp — número principal do grupo
  whatsapp: {
    number: "5553991801112",
    messages: {
      entrar:
        "Oi, vi o site e quero andar com a gurizada! Pode me passar mais informações?",
      moletom:
        "Oi, quero saber sobre o moletom do Grupo Rolê da Gurizada!",
      parceiro:
        "Oi, tenho interesse em ser parceiro do Grupo Rolê da Gurizada!",
    },
  },

  // SEO / OpenGraph
  url: "https://roledagurizada.com.br", // [PLACEHOLDER] atualizar quando tiver domínio
  ogImage: "/images/og-image.jpg", // [PLACEHOLDER] gerar após ter foto real

  // Frase principal — não alterar
  tagline: "Aqui não importa a cilindrada.",
  taglineSub: "O que vale é a parceria.",
} as const;

export function waLink(message: keyof typeof siteConfig.whatsapp.messages) {
  const text = encodeURIComponent(siteConfig.whatsapp.messages[message]);
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${text}`;
}
