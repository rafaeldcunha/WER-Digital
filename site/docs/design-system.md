# Design System — Grupo Rolê da Gurizada

## Paleta de cores

| Nome | Hex | Uso |
|---|---|---|
| `neon` / `#9BEC00` | Verde neon | Cor principal: CTAs, destaques, bordas ativas, hover states |
| `brand-black` / `#0B0B0B` | Preto fundo | Background de todas as páginas |
| `brand-surface` / `#141414` | Preto superfície | Cards, navbar, footer, inputs |
| `brand-red` / `#E11D2A` | Vermelho ponteiro | Acento raro: badges de evento urgente, linha decorativa abaixo do hero |
| `brand-white` / `#F2F2F2` | Branco texto | Texto principal, títulos |
| `brand-gray` / `#6B7280` | Cinza | Texto secundário, metadados, placeholders |
| `brand-border` / `#1F1F1F` | Cinza escuro | Bordas de cards, divisores |

### Regra de uso do vermelho
O `brand-red` é como o ponteiro do velocímetro no limite: aparece pouco e quando aparece chama atenção. Usar só em:
- Linha decorativa abaixo do tagline no hero
- Badges "EM BREVE" ou "HOJE"
- Hover state secundário em links de rodapé

---

## Tipografia

### Títulos: Archivo Black
- `font-display` (Tailwind custom)
- Peso fixo 400 (a fonte já é black)
- `line-height: 1.1`, `letter-spacing: -0.02em`
- Sempre em maiúsculas ou capitalização por palavra, nunca minúsculas puras em H1/H2

### Corpo: Inter
- `font-body`
- Peso regular 400 para texto corrido, 600 para ênfase
- `line-height: 1.6` no corpo, `1.4` em legendas

### Escala tipográfica (mobile primeiro)
| Classe Tailwind | Tamanho mobile | Tamanho desktop | Uso |
|---|---|---|---|
| `text-4xl md:text-6xl lg:text-7xl` | 36px | 72px | H1 hero |
| `text-3xl md:text-4xl` | 30px | 36px | H2 seção |
| `text-xl md:text-2xl` | 20px | 24px | H3 card |
| `text-base` | 16px | 16px | Corpo |
| `text-sm` | 14px | 14px | Metadados, labels |
| `text-xs` | 12px | 12px | Rodapé, badges |

---

## Espaçamento

Baseado na escala padrão do Tailwind (múltiplos de 4px).

| Uso | Classe |
|---|---|
| Padding interno de seção (mobile) | `py-16 px-4` |
| Padding interno de seção (desktop) | `md:py-24 md:px-8` |
| Gap entre cards (grid) | `gap-4 md:gap-6` |
| Padding interno de card | `p-6` |
| Espaço entre título e subtítulo | `mb-3` |
| Espaço entre subtítulo e CTA | `mt-6 md:mt-8` |

---

## Componentes base

### Button

Três variantes:

**Primary** (ação principal)
```
bg-neon text-brand-black font-display uppercase tracking-wide
px-6 py-3 rounded-sm
hover: brightness-110, shadow-neon-sm
```

**Secondary** (ação secundária)
```
border border-neon text-neon bg-transparent
px-6 py-3 rounded-sm
hover: bg-neon/10
```

**Ghost** (links de navegação)
```
text-brand-gray hover:text-neon
underline-offset-4 transition
```

---

### Card

Estrutura base para rolê, evento, parceiro e produto:
```
bg-brand-surface border border-brand-border rounded-md
overflow-hidden
hover: border-neon/50 transition
```

---

### Section

Container semântico de cada bloco da página:
```
<section> com py-16 md:py-24 e fundo variável:
- bg-brand-black (seções ímpares)
- bg-brand-surface (seções pares, alternância sutil)
```

Título de seção sempre com:
- Label acima em `text-neon text-xs uppercase tracking-widest`
- H2 em `font-display text-3xl md:text-4xl text-brand-white`
- Linha neon de 48px abaixo do H2

---

### Navbar

- Fundo: `bg-brand-surface/90 backdrop-blur`
- Sticky no topo
- Mobile: hamburger menu com drawer lateral
- Logo à esquerda, links à direita (desktop) / hamburger (mobile)
- CTA "Quero andar" sempre visível como botão primário

---

### Footer

- Fundo: `bg-brand-surface`
- Linha neon no topo
- Três colunas (desktop): Logo + tagline | Links rápidos | Redes sociais
- Mobile: empilhado
- Rodapé mínimo: Instagram, WhatsApp, "Pelotas/RS"

---

## Efeitos e animações

| Utilitário CSS | Uso |
|---|---|
| `.neon-line` | Linha horizontal decorativa com gradiente neon |
| `.text-neon-glow` | Text-shadow neon em títulos hero |
| `.speed-lines` | Background sutil de linhas de velocidade |
| `shadow-neon` | Box-shadow neon para botões e cards em hover |
| `animate-pulse-neon` | Pulso de brilho neon em elementos de destaque |

---

## Regras mobile-first

- Todos os componentes desenvolvidos pra tela de 380px primeiro
- Breakpoints usados: `md:` (768px) e `lg:` (1024px)
- Touch targets mínimos de 44x44px em botões e links
- Texto nunca menor que 14px em mobile
- Nenhum elemento com scroll horizontal
