# Como atualizar o conteúdo do site

Todos os dados dinâmicos ficam nesta pasta `/content`. São arquivos JSON simples que qualquer editor de texto consegue abrir.

---

## Adicionar um rolê novo

Edita o arquivo `roles/roles.json` e adiciona um objeto no array:

```json
{
  "id": "nome-unico-do-role",
  "titulo": "Nome do rolê",
  "data": "2026-08-15",
  "pontoEncontro": "Posto X — Endereço completo, Pelotas",
  "destino": "Cidade ou ponto de chegada",
  "descricao": "Descrição curta opcional do rolê.",
  "imagem": "/images/nome-da-foto.jpg",
  "status": "agendado"
}
```

**Campos obrigatórios:** `id`, `titulo`, `data`, `pontoEncontro`, `destino`, `status`

**Status possíveis:** `agendado` | `realizado` | `cancelado`

**Data:** sempre no formato `AAAA-MM-DD` (ex: `2026-08-15`)

O site separa automaticamente os rolês agendados (data futura) dos realizados (data passada).

---

## Adicionar um evento

Edita `eventos/eventos.json`:

```json
{
  "id": "nome-unico-do-evento",
  "titulo": "Nome do evento",
  "data": "2026-09-20",
  "local": "Local completo com endereço",
  "descricao": "Descrição do evento.",
  "link": "https://link-externo-do-evento.com"
}
```

**Campos obrigatórios:** `id`, `titulo`, `data`, `local`

---

## Adicionar ou editar um parceiro

Edita `parceiros/parceiros.json`:

```json
{
  "id": "nome-do-parceiro",
  "nome": "Nome da loja",
  "descricao": "Descrição curta — o que a loja faz.",
  "beneficio": "Desconto de X% pra quem mencionar o grupo.",
  "logo": "/logos/logo-nome-do-parceiro.png",
  "link": "https://site-do-parceiro.com.br",
  "instagram": "https://www.instagram.com/perfildo-parceiro"
}
```

Salvar o logo em `public/logos/` com o mesmo nome que entrou no campo `"logo"`.

---

## Adicionar um produto na loja

Edita `loja/produtos.json`:

```json
{
  "id": "nome-do-produto",
  "nome": "Nome do produto",
  "descricao": "Descrição do produto.",
  "preco": "R$ 150,00",
  "variacoes": ["P", "M", "G", "GG"],
  "imagem": "/images/nome-do-produto.jpg",
  "disponivel": true
}
```

Pra tirar um produto do ar sem apagar: muda `"disponivel"` pra `false`.

---

## Onde ficam as imagens

- Logos de parceiros: `public/logos/`
- Fotos de rolês, produtos e geral: `public/images/`
- Placeholders: `public/placeholders/`

Formatos recomendados: `.jpg` ou `.webp`. Tamanho máximo sugerido: 1200px de largura.

---

## Itens pendentes de preenchimento real

Busca por `_placeholder_notes` nos arquivos JSON pra ver o que ainda falta.
