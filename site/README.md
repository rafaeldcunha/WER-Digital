# Grupo Rolê da Gurizada — Site oficial

Site do moto grupo de Pelotas/RS. Construído com Next.js 14, TypeScript e Tailwind CSS.

---

## Como rodar localmente

```bash
cd site
npm install
npm run dev
```

Abre em `http://localhost:3000`.

---

## Como atualizar o conteúdo

Todo o conteúdo dinâmico (rolês, eventos, parceiros, produtos) fica em arquivos JSON na pasta `content/`. Você edita o JSON, faz push e o site atualiza no próximo deploy.

Guia completo com exemplos: [`content/COMO-ATUALIZAR.md`](./content/COMO-ATUALIZAR.md)

### Resumo rápido

| O que atualizar | Arquivo |
|---|---|
| Adicionar rolê / passeio | `content/roles/roles.json` |
| Adicionar evento | `content/eventos/eventos.json` |
| Adicionar / editar parceiro | `content/parceiros/parceiros.json` |
| Adicionar produto na loja | `content/loja/produtos.json` |

### Onde colocar as fotos

- Logos dos parceiros: `public/logos/nome-do-arquivo.png`
- Fotos de rolês e produtos: `public/images/nome-do-arquivo.jpg`

Formatos recomendados: `.jpg` ou `.webp`. Largura máxima: 1200px.

---

## Como mudar informações de contato

Edita o arquivo `config/site.ts`:

```ts
whatsapp: {
  number: "5553991801112", // número sem + e sem espaços
},
instagram: "https://www.instagram.com/grupo_role_da_gurizada",
```

As mensagens automáticas do WhatsApp (pra cada CTA do site) também ficam ali, no campo `messages`.

---

## Como subir no Netlify

### Primeiro deploy (manual)

1. Acessa [netlify.com](https://www.netlify.com) e faz login
2. Clica em **Add new site > Import an existing project**
3. Conecta o GitHub e seleciona o repositório `WER-Digital`
4. Configura:
   - **Base directory:** `site`
   - **Build command:** `npm run build`
   - **Publish directory:** `site/.next`
5. Clica em **Deploy site**

O plugin `@netlify/plugin-nextjs` já está instalado e o `netlify.toml` já está configurado. Não precisa mudar nada.

### Deploys automáticos

Depois do primeiro deploy, qualquer push na branch principal atualiza o site automaticamente.

### Domínio personalizado

1. No painel do Netlify, vai em **Domain settings**
2. Clica em **Add custom domain**
3. Aponta o DNS do seu domínio pro Netlify (eles mostram o endereço)
4. O HTTPS é gerado automaticamente

Depois de configurar o domínio, atualiza o `siteConfig.url` em `config/site.ts`.

---

## Estrutura do projeto

```
site/
├── app/                  # Páginas (Next.js App Router)
│   ├── page.tsx          # Home
│   ├── a-gurizada/       # Página A Gurizada
│   ├── roles/            # Rolês e Viagens
│   ├── eventos/          # Eventos
│   ├── parceiros/        # Parceiros
│   └── loja/             # Loja
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Seções das páginas (Hero, etc.)
│   └── ui/               # Botões, Cards, Sections reutilizáveis
├── config/
│   └── site.ts           # WhatsApp, Instagram, textos globais
├── content/              # JSONs editáveis de conteúdo
│   ├── roles/
│   ├── eventos/
│   ├── parceiros/
│   └── loja/
├── docs/                 # Documentação interna
│   ├── tom-de-voz.md
│   ├── design-system.md
│   └── copy-por-secao.md
├── lib/
│   ├── types.ts          # Tipos TypeScript do conteúdo
│   └── content.ts        # Funções de leitura dos JSONs
└── public/
    ├── logos/            # Logos dos parceiros e do grupo
    └── images/           # Fotos do site
```

---

## Placeholders pendentes antes de ir ao ar

- [ ] Salvar logos em `public/logos/`: `logo-grupo.png`, `logo-gil-motos.png`, `logo-daniel-valente.png`
- [ ] Foto do hero — `public/images/hero-estrada.jpg` (foto do grupo na estrada)
- [ ] Foto da seção A Gurizada — qualquer foto boa do grupo
- [ ] Fotos dos rolês realizados — pra galeria
- [ ] Foto do moletom — `public/images/moletom.jpg`
- [ ] OG image — `public/images/og-image.jpg` (1200x630px)
- [ ] Link e/ou Instagram da Gil Motos — atualizar em `content/parceiros/parceiros.json`
- [ ] Link e/ou Instagram do Daniel Valente — idem
- [ ] Benefício/desconto dos parceiros — idem
- [ ] Preço do moletom — `content/loja/produtos.json`
- [ ] Domínio real — `config/site.ts`, campo `url`
- [ ] Substituir rolês de exemplo por rolês reais — `content/roles/roles.json`
- [ ] Substituir eventos de exemplo por eventos reais — `content/eventos/eventos.json`

---

## Fase 2 (futura): CMS headless

O conteúdo está estruturado em JSON com a mesma forma que um CMS headless (Sanity, Decap) exportaria. Pra conectar um CMS no futuro, basta substituir as funções em `lib/content.ts` por chamadas à API do CMS escolhido. Os tipos em `lib/types.ts` e os componentes de página não precisam mudar.
