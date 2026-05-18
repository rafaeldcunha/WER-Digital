#!/usr/bin/env python3
"""Generator for Essenz Imóveis commercial proposal HTML.

Coloque os logos em images/ e rode sem argumentos:
    python3 generate_essenz_proposal.py

Ou passe caminhos explícitos:
    python3 generate_essenz_proposal.py --essenz images/logo-essenz.png --wer images/logo-wer.png

Arquivos padrão esperados:
    images/logo-essenz.{png,webp,svg,jpg}
    images/logo-wer.{png,webp,svg,jpg}
"""

import argparse
import base64
import mimetypes
import os
import urllib.request
import urllib.error
import ssl

# ── Fetch Essenz logo ──────────────────────────────────────────────────────────
def fetch_essenz_logo():
    url = "https://www.essenzimoveis.com.br/assets/img/logo/logo.webp"
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            "Referer": "https://www.essenzimoveis.com.br/",
        })
        with urllib.request.urlopen(req, context=ctx, timeout=15) as r:
            data = r.read()
        if len(data) < 100:
            raise ValueError("Response too small, likely an error page")
        b64 = base64.b64encode(data).decode()
        mime = "image/webp"
        return f"data:{mime};base64,{b64}"
    except Exception as e:
        print(f"[WARN] Could not fetch Essenz logo: {e}. Using SVG placeholder.")
        return None

# ── WER Digital logo SVG — W orgânico roxo/azul (fiel ao avatar fornecido) ───
WER_LOGO_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="wbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D0EA8"/>
      <stop offset="50%" stop-color="#5B21B6"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="44" fill="url(#wbg)"/>
  <path d="M38 65
           C38 65 52 65 58 80
           L78 128
           C80 133 84 133 86 128
           L96 100
           C98 95 102 95 104 100
           L114 128
           C116 133 120 133 122 128
           L142 80
           C148 65 162 65 162 65"
        fill="none" stroke="#E8E4F0" stroke-width="22"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>"""

WER_LOGO_B64 = "data:image/svg+xml;base64," + base64.b64encode(WER_LOGO_SVG.encode()).decode()

# ── Essenz logo SVG — casa outline dourada + wordmark serif (fiel ao original) ─
ESSENZ_LOGO_FALLBACK_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 110">
  <g fill="none" stroke="#B8922A" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">
    <polygon points="54,22 96,58 96,96 12,96 12,58" stroke-width="3.5"/>
    <polyline points="4,62 54,18 104,62"/>
  </g>
  <text x="124" y="76" font-family="Georgia,'Times New Roman',serif" font-size="58"
        font-weight="700" fill="#B8922A" letter-spacing="2">ESSENZ</text>
  <text x="127" y="100" font-family="Arial,Helvetica,sans-serif" font-size="13.5"
        font-weight="400" fill="#B8922A" letter-spacing="5.5">CURADORIA IMOBILIÁRIA</text>
</svg>"""
ESSENZ_LOGO_FALLBACK_B64 = "data:image/svg+xml;base64," + base64.b64encode(ESSENZ_LOGO_FALLBACK_SVG.encode()).decode()


def build_html(essenz_logo_src: str, wer_logo_src: str) -> str:
    essenz_logo_b64 = essenz_logo_src  # kept for compat; variable used in template
    wer_logo_b64 = wer_logo_src
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Proposta Comercial · Essenz Imóveis × WER Digital</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
/* ═══════════════════════════════════════════════
   RESET & BASE
═══════════════════════════════════════════════ */
*, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
:root {{
  --blue:    #047AFF;
  --cyan:    #64CBFF;
  --black:   #111111;
  --white:   #F8F8F8;
  --grad:    linear-gradient(135deg, #047AFF, #64CBFF);
  --grad-r:  linear-gradient(135deg, #64CBFF, #047AFF);
  --font-display: 'Nunito', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
  --radius: 16px;
  --shadow: 0 8px 40px rgba(4,122,255,.18);
  --transition: .35s cubic-bezier(.4,0,.2,1);
}}
html {{ scroll-behavior: smooth; cursor: none; }}
body {{
  font-family: var(--font-body);
  background: var(--black);
  color: var(--white);
  overflow-x: hidden;
  cursor: none;
}}
::selection {{ background: var(--blue); color: #fff; }}

/* ═══════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════ */
#cursor-dot {{
  position: fixed; top: 0; left: 0; z-index: 99999;
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--blue);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width .15s, height .15s, background .15s;
}}
#cursor-ring {{
  position: fixed; top: 0; left: 0; z-index: 99998;
  width: 34px; height: 34px; border-radius: 50%;
  border: 1.5px solid rgba(4,122,255,.55);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: transform .12s ease-out, width .2s, height .2s, border-color .2s;
}}
body:has(a:hover) #cursor-dot,
body:has(button:hover) #cursor-dot,
body:has(.sim-card:hover) #cursor-dot {{
  width: 12px; height: 12px; background: var(--cyan);
}}
body:has(a:hover) #cursor-ring,
body:has(button:hover) #cursor-ring,
body:has(.sim-card:hover) #cursor-ring {{
  width: 48px; height: 48px; border-color: rgba(100,203,255,.7);
}}

/* ═══════════════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════════════ */
#scroll-bar {{
  position: fixed; top: 0; left: 0; z-index: 9999;
  height: 3px; width: 0%;
  background: var(--grad);
  transition: width .1s linear;
}}

/* ═══════════════════════════════════════════════
   TYPOGRAPHY
═══════════════════════════════════════════════ */
h1 {{ font-family: var(--font-display); font-weight: 900;
      font-size: clamp(2.4rem, 6vw, 5rem); line-height: 1.08; }}
h2 {{ font-family: var(--font-display); font-weight: 900;
      font-size: clamp(1.8rem, 4vw, 3rem); line-height: 1.15; }}
h3 {{ font-family: var(--font-display); font-weight: 900;
      font-size: clamp(1.2rem, 2.5vw, 1.7rem); line-height: 1.2; }}
p  {{ font-size: clamp(.95rem, 1.5vw, 1.1rem); line-height: 1.72; }}
.mono {{ font-family: var(--font-mono); font-size: .78rem; letter-spacing: .04em; }}

/* ═══════════════════════════════════════════════
   LAYOUT UTILITIES
═══════════════════════════════════════════════ */
section {{ position: relative; overflow: hidden; }}
.container {{ max-width: 1100px; margin: 0 auto; padding: 0 clamp(1.2rem,4vw,3rem); }}
.section-pad {{ padding: clamp(4rem,8vw,7rem) 0; }}
.dark  {{ background: var(--black); color: var(--white); }}
.light {{ background: var(--white); color: var(--black); }}

/* Reveal animations */
.reveal {{
  opacity: 0;
  transform: translateY(32px);
  transition: opacity .65s ease, transform .65s ease;
}}
.reveal.visible {{
  opacity: 1;
  transform: translateY(0);
}}
.reveal-delay-1 {{ transition-delay: .1s; }}
.reveal-delay-2 {{ transition-delay: .2s; }}
.reveal-delay-3 {{ transition-delay: .3s; }}
.reveal-delay-4 {{ transition-delay: .4s; }}
.reveal-delay-5 {{ transition-delay: .5s; }}

/* ═══════════════════════════════════════════════
   DECORATIVE ARCS
═══════════════════════════════════════════════ */
.arc {{
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid rgba(4,122,255,.13);
  pointer-events: none;
}}
.arc-1 {{ width: 600px; height: 600px; top: -200px; right: -200px; }}
.arc-2 {{ width: 400px; height: 400px; bottom: -120px; left: -120px; }}
.arc-3 {{ width: 300px; height: 300px; top: 50%; right: -80px; transform: translateY(-50%); border-color: rgba(100,203,255,.1); }}
.arc-4 {{ width: 800px; height: 800px; top: -300px; left: -300px; border-color: rgba(4,122,255,.07); }}

/* ═══════════════════════════════════════════════
   GRADIENT TEXT
═══════════════════════════════════════════════ */
.grad-text {{
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}}

/* ═══════════════════════════════════════════════
   CHIP / BADGE
═══════════════════════════════════════════════ */
.chip {{
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .32rem .9rem;
  border: 1px solid rgba(4,122,255,.4);
  border-radius: 100px;
  font-family: var(--font-mono); font-size: .72rem;
  color: var(--cyan); background: rgba(4,122,255,.08);
  letter-spacing: .05em; text-transform: uppercase;
}}
.chip-dot {{ width: 6px; height: 6px; border-radius: 50%; background: var(--blue); animation: pulse 2s infinite; }}
@keyframes pulse {{ 0%,100%{{opacity:1;transform:scale(1)}} 50%{{opacity:.4;transform:scale(.75)}} }}

/* ═══════════════════════════════════════════════
   SECTION 1 — HERO
═══════════════════════════════════════════════ */
#hero {{
  background: var(--black);
  padding: clamp(5rem,10vw,9rem) 0 clamp(4rem,7vw,6rem);
}}
.hero-logos {{
  display: flex; align-items: center; gap: 1.8rem; margin-bottom: 2.8rem;
  flex-wrap: wrap;
}}
.hero-logo-wer {{
  display: flex; align-items: center; gap: .9rem;
}}
.hero-logo-wer img {{ width: 54px; height: 54px; border-radius: 50%; }}
.hero-logo-divider {{
  width: 1px; height: 52px;
  background: linear-gradient(to bottom, transparent, rgba(255,255,255,.2), transparent);
}}
.hero-logo-essenz {{ display: flex; align-items: center; }}
.hero-logo-essenz img {{ max-height: 52px; max-width: 200px; object-fit: contain; filter: brightness(0) invert(1); }}
.hero-meta {{ display: flex; flex-wrap: wrap; gap: .6rem; margin-top: 2.2rem; }}
.hero-tag {{
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .28rem .85rem;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 100px;
  font-family: var(--font-mono); font-size: .7rem;
  color: rgba(255,255,255,.55);
  letter-spacing: .04em;
}}
.hero-eyebrow {{ margin-bottom: 1.2rem; }}
.hero-subtitle {{
  margin-top: 1.5rem; max-width: 600px;
  font-size: clamp(1rem,2vw,1.18rem);
  color: rgba(255,255,255,.6); line-height: 1.7;
}}

/* ═══════════════════════════════════════════════
   SECTION 2 — CONTEXT
═══════════════════════════════════════════════ */
.context-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}}
@media(max-width:700px) {{ .context-grid {{ grid-template-columns: 1fr; }} }}
.context-essenz-logo {{
  display: flex; flex-direction: column; align-items: flex-start; gap: 1rem;
  padding: 2rem; background: #f0f0f0; border-radius: var(--radius);
}}
.context-essenz-logo img {{
  max-height: 60px; max-width: 240px; object-fit: contain;
}}
.context-badge {{
  font-family: var(--font-mono); font-size: .7rem;
  color: var(--blue); letter-spacing: .06em; text-transform: uppercase;
}}
.pillar-list {{ list-style: none; margin-top: 1.6rem; display: flex; flex-direction: column; gap: .9rem; }}
.pillar-list li {{
  display: flex; gap: .85rem; align-items: flex-start;
  font-size: .97rem; color: #333; line-height: 1.55;
}}
.pillar-icon {{
  flex-shrink: 0; width: 28px; height: 28px; border-radius: 8px;
  background: var(--grad); display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: .85rem; margin-top: .1rem;
}}
.stat-row {{
  display: flex; gap: 2rem; flex-wrap: wrap; margin-top: 2rem;
}}
.stat-item {{ display: flex; flex-direction: column; gap: .2rem; }}
.stat-num {{
  font-family: var(--font-display); font-weight: 900;
  font-size: 2.4rem;
  background: var(--grad); -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; background-clip: text;
}}
.stat-label {{ font-family: var(--font-mono); font-size: .72rem; color: #888; text-transform: uppercase; letter-spacing: .06em; }}

/* ═══════════════════════════════════════════════
   SECTION 3 — SERVICES
═══════════════════════════════════════════════ */
.services-grid {{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.4rem;
  margin-top: 2.8rem;
}}
.svc-card {{
  background: rgba(255,255,255,.035);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: var(--radius);
  padding: 2rem;
  position: relative;
  transition: var(--transition);
  overflow: hidden;
}}
.svc-card::after {{
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: var(--grad);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition);
}}
.svc-card:hover {{ border-color: rgba(4,122,255,.35); transform: translateY(-4px); box-shadow: var(--shadow); }}
.svc-card:hover::after {{ transform: scaleX(1); }}
.svc-card.featured {{
  border-color: rgba(4,122,255,.45);
  background: rgba(4,122,255,.07);
}}
.svc-card.featured::after {{ transform: scaleX(1); }}
.svc-label {{
  font-family: var(--font-mono); font-size: .7rem;
  text-transform: uppercase; letter-spacing: .08em;
  color: var(--cyan); margin-bottom: .7rem;
}}
.svc-price {{
  font-family: var(--font-display); font-weight: 900;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  background: var(--grad); -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; background-clip: text;
  line-height: 1;
}}
.svc-period {{
  font-size: .85rem; color: rgba(255,255,255,.45);
  font-family: var(--font-mono); margin-left: .3rem;
}}
.svc-desc {{ font-size: .9rem; color: rgba(255,255,255,.58); margin-top: .9rem; line-height: 1.65; }}
.svc-includes {{ margin-top: 1.2rem; list-style: none; display: flex; flex-direction: column; gap: .5rem; }}
.svc-includes li {{
  font-size: .88rem; color: rgba(255,255,255,.65);
  display: flex; align-items: flex-start; gap: .55rem;
}}
.svc-includes li::before {{
  content: "✓"; color: var(--cyan); font-weight: 700; flex-shrink: 0;
  margin-top: .05rem;
}}
.badge-bonus {{
  display: inline-flex; align-items: center; gap: .35rem;
  padding: .22rem .7rem;
  background: var(--grad);
  border-radius: 100px;
  font-family: var(--font-mono); font-size: .68rem;
  color: #fff; font-weight: 500; letter-spacing: .06em;
  text-transform: uppercase;
}}
.svc-original-price {{
  text-decoration: line-through;
  color: rgba(255,255,255,.35);
  font-size: .88rem;
  font-family: var(--font-mono);
}}
.svc-price-row {{ display: flex; align-items: center; gap: .8rem; flex-wrap: wrap; margin-top: .3rem; }}
.bonus-card {{
  border: 1px solid rgba(4,122,255,.3);
  background: rgba(4,122,255,.05);
}}
.bonus-card .svc-label {{ color: var(--blue); }}
.setup-note {{
  font-family: var(--font-mono); font-size: .72rem;
  color: rgba(255,255,255,.35); margin-top: .8rem;
  padding-top: .8rem; border-top: 1px solid rgba(255,255,255,.07);
}}

/* ═══════════════════════════════════════════════
   SECTION 4 — SIMULATOR
═══════════════════════════════════════════════ */
#simulator {{ background: var(--white); }}
.sim-intro {{ max-width: 580px; margin-bottom: 3rem; }}
.sim-intro h2 {{ color: var(--black); }}
.sim-intro p  {{ color: #555; margin-top: .8rem; }}
.sim-section-label {{
  font-family: var(--font-mono); font-size: .72rem;
  text-transform: uppercase; letter-spacing: .08em;
  color: var(--blue); margin-bottom: 1rem;
}}
.sim-group {{ margin-bottom: 2.5rem; }}
.sim-cards-row {{ display: flex; flex-wrap: wrap; gap: 1rem; }}
.sim-card {{
  flex: 1; min-width: 220px;
  border: 2px solid #e0e0e0;
  border-radius: var(--radius);
  padding: 1.4rem 1.6rem;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  background: #fff;
  user-select: none;
}}
.sim-card:hover {{ border-color: var(--blue); box-shadow: 0 4px 24px rgba(4,122,255,.12); }}
.sim-card.active {{
  border-color: var(--blue);
  background: rgba(4,122,255,.04);
  box-shadow: 0 4px 24px rgba(4,122,255,.15);
}}
.sim-card.disabled {{
  opacity: .45; cursor: not-allowed;
  pointer-events: none;
}}
.sim-checkbox {{
  width: 20px; height: 20px; border-radius: 50%;
  border: 2px solid #ccc;
  position: absolute; top: 1.1rem; right: 1.1rem;
  display: flex; align-items: center; justify-content: center;
  transition: var(--transition);
}}
.sim-card.active .sim-checkbox {{
  background: var(--blue); border-color: var(--blue);
}}
.sim-card.active .sim-checkbox::after {{
  content: ''; width: 8px; height: 8px; border-radius: 50%; background: #fff;
}}
.sim-card-name {{
  font-family: var(--font-display); font-weight: 900;
  font-size: 1rem; color: var(--black); margin-bottom: .3rem;
}}
.sim-card-price {{
  font-family: var(--font-mono); font-size: .88rem;
  color: var(--blue); font-weight: 500;
}}
.sim-card-type {{
  font-family: var(--font-mono); font-size: .68rem;
  color: #999; text-transform: uppercase; letter-spacing: .06em; margin-top: .2rem;
}}
.sim-card.locked {{
  border-color: rgba(4,122,255,.5);
  background: rgba(4,122,255,.03);
  cursor: default;
}}
.sim-card.locked .sim-checkbox {{
  background: rgba(4,122,255,.35); border-color: var(--blue);
}}
.sim-card.locked .sim-checkbox::after {{
  content: ''; display: block; width: 8px; height: 8px; border-radius: 50%; background: #fff;
}}
.sim-lock-icon {{ position: absolute; top: 1.1rem; right: 2.4rem; font-size: .85rem; color: var(--blue); }}

.sim-bonus-row {{
  display: flex; flex-wrap: wrap; gap: 1rem;
}}
.sim-bonus-card {{
  flex: 1; min-width: 220px;
  border: 1.5px dashed rgba(4,122,255,.35);
  border-radius: var(--radius);
  padding: 1.2rem 1.5rem;
  background: rgba(4,122,255,.03);
  opacity: .5;
  transition: var(--transition);
}}
.sim-bonus-card.unlocked {{
  opacity: 1;
}}
.sim-bonus-name {{
  font-family: var(--font-display); font-weight: 900;
  font-size: .95rem; color: var(--black);
  display: flex; align-items: center; gap: .6rem; flex-wrap: wrap;
}}
.sim-bonus-price-row {{
  display: flex; align-items: center; gap: .6rem; margin-top: .35rem; flex-wrap: wrap;
}}
.sim-bonus-original {{
  text-decoration: line-through; color: #aaa;
  font-family: var(--font-mono); font-size: .82rem;
}}
.sim-bonus-free {{
  font-family: var(--font-mono); font-size: .82rem;
  color: var(--blue); font-weight: 500;
}}
.sim-bonus-desc {{
  font-size: .83rem; color: #777; margin-top: .4rem; line-height: 1.5;
}}

/* Total block */
.sim-total-block {{
  background: var(--black);
  border-radius: var(--radius);
  padding: 2rem 2.4rem;
  margin-top: 3rem;
}}
.sim-total-block .total-row {{
  display: flex; justify-content: space-between; align-items: center;
  padding: .7rem 0;
  border-bottom: 1px solid rgba(255,255,255,.07);
}}
.sim-total-block .total-row:last-child {{ border-bottom: none; }}
.total-label {{
  font-family: var(--font-mono); font-size: .78rem;
  color: rgba(255,255,255,.5); text-transform: uppercase; letter-spacing: .05em;
}}
.total-value {{
  font-family: var(--font-display); font-weight: 900;
  font-size: 1.55rem;
  background: var(--grad); -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; background-clip: text;
}}
.total-value.zero {{
  background: none; -webkit-text-fill-color: rgba(255,255,255,.25);
  color: rgba(255,255,255,.25); font-size: 1.1rem;
}}
.total-value-zero-label {{
  font-family: var(--font-mono); font-size: .75rem; color: var(--cyan);
}}
.total-divider {{ border: none; border-top: 1px solid rgba(255,255,255,.12); margin: .5rem 0; }}
.total-grand-label {{
  font-family: var(--font-display); font-weight: 900;
  font-size: 1rem; color: #fff;
}}
.total-grand-value {{
  font-family: var(--font-display); font-weight: 900;
  font-size: 2rem;
  background: var(--grad); -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; background-clip: text;
}}
.total-grand-note {{
  font-family: var(--font-mono); font-size: .7rem;
  color: rgba(255,255,255,.35); margin-top: .3rem;
  text-align: right;
}}

/* Conditions */
.conditions-grid {{
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem; margin-top: 2.8rem;
}}
.condition-item {{
  background: #f5f5f5; border-radius: 12px; padding: 1.4rem 1.5rem;
  border-left: 3px solid var(--blue);
}}
.condition-item .cond-label {{
  font-family: var(--font-mono); font-size: .68rem;
  text-transform: uppercase; letter-spacing: .07em; color: var(--blue); margin-bottom: .4rem;
}}
.condition-item p {{ font-size: .88rem; color: #444; line-height: 1.55; }}
.sim-notice {{
  margin-top: 1.5rem; padding: 1rem 1.4rem;
  background: rgba(4,122,255,.06); border: 1px solid rgba(4,122,255,.2);
  border-radius: 10px;
  font-size: .85rem; color: #555; line-height: 1.55;
}}
.sim-notice strong {{ color: var(--blue); }}

/* ═══════════════════════════════════════════════
   SECTION 5 — TIMELINE
═══════════════════════════════════════════════ */
.timeline {{ position: relative; margin-top: 3rem; }}
.timeline::before {{
  content: ''; position: absolute;
  left: 28px; top: 0; bottom: 0;
  width: 2px; background: linear-gradient(to bottom, var(--blue), var(--cyan));
}}
@media(max-width:600px) {{ .timeline::before {{ left: 20px; }} }}
.tl-item {{
  display: flex; gap: 2rem; margin-bottom: 2.5rem;
  position: relative;
}}
.tl-marker {{
  flex-shrink: 0; width: 58px; height: 58px;
  border-radius: 50%;
  background: var(--grad);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-weight: 900;
  font-size: 1.2rem; color: #fff;
  z-index: 1;
  box-shadow: 0 0 0 4px var(--black), 0 0 0 6px rgba(4,122,255,.3);
}}
@media(max-width:600px) {{
  .tl-marker {{ width: 42px; height: 42px; font-size: 1rem; }}
  .tl-item {{ gap: 1.2rem; }}
}}
.tl-content {{ padding-top: .8rem; }}
.tl-week {{
  font-family: var(--font-mono); font-size: .7rem;
  color: var(--cyan); letter-spacing: .06em; text-transform: uppercase; margin-bottom: .3rem;
}}
.tl-title {{
  font-family: var(--font-display); font-weight: 900;
  font-size: 1.2rem; color: var(--white); margin-bottom: .5rem;
}}
.tl-desc {{ font-size: .9rem; color: rgba(255,255,255,.55); line-height: 1.65; }}

/* ═══════════════════════════════════════════════
   SECTION 6 — CTA
═══════════════════════════════════════════════ */
#cta {{
  background: var(--grad);
  padding: clamp(5rem,8vw,7rem) 0;
  text-align: center;
  position: relative;
}}
#cta .arc {{ border-color: rgba(255,255,255,.15); }}
#cta h2 {{ color: #fff; text-shadow: 0 2px 20px rgba(0,0,0,.2); }}
#cta p  {{ color: rgba(255,255,255,.85); max-width: 560px; margin: 1rem auto 0; font-size: 1.05rem; }}
.btn-wa {{
  display: inline-flex; align-items: center; gap: .8rem;
  margin-top: 2.5rem;
  padding: 1rem 2.6rem;
  background: #fff;
  color: var(--blue);
  font-family: var(--font-display); font-weight: 900;
  font-size: 1.05rem;
  border-radius: 100px;
  text-decoration: none;
  transition: var(--transition);
  box-shadow: 0 8px 32px rgba(0,0,0,.15);
  cursor: none;
}}
.btn-wa:hover {{
  transform: translateY(-3px);
  box-shadow: 0 16px 48px rgba(0,0,0,.22);
  background: #fff;
}}
.btn-wa svg {{ flex-shrink: 0; }}
.cta-validity {{
  margin-top: 1.5rem;
  font-family: var(--font-mono); font-size: .72rem;
  color: rgba(255,255,255,.65); letter-spacing: .05em;
}}

/* ═══════════════════════════════════════════════
   SECTION 7 — FOOTER
═══════════════════════════════════════════════ */
#footer {{
  background: var(--black);
  border-top: 1px solid rgba(255,255,255,.07);
  padding: 3.5rem 0 2.5rem;
}}
.footer-inner {{
  display: flex; flex-direction: column; align-items: center; gap: 1.2rem;
  text-align: center;
}}
.footer-logo img {{ width: 52px; height: 52px; border-radius: 50%; }}
.footer-tagline {{
  font-family: var(--font-body); font-size: .9rem;
  color: rgba(255,255,255,.35); font-style: italic;
}}
.footer-meta {{
  font-family: var(--font-mono); font-size: .68rem;
  color: rgba(255,255,255,.22); letter-spacing: .05em;
  display: flex; gap: 1.2rem; flex-wrap: wrap; justify-content: center;
}}
.footer-divider {{
  width: 40px; height: 2px; background: var(--grad); border-radius: 2px;
}}
</style>
</head>
<body>

<!-- Cursor -->
<div id="cursor-dot"></div>
<div id="cursor-ring"></div>

<!-- Scroll bar -->
<div id="scroll-bar"></div>

<!-- ═══════════════════════════════════════════
     SECTION 1 · HERO
═══════════════════════════════════════════ -->
<section id="hero" class="dark">
  <div class="arc arc-1"></div>
  <div class="arc arc-4"></div>
  <div class="container">

    <div class="reveal hero-logos">
      <div class="hero-logo-wer">
        <img src="{wer_logo_b64}" alt="WER Digital"/>
      </div>
      <div class="hero-logo-divider"></div>
      <div class="hero-logo-essenz">
        <img src="{essenz_logo_b64}" alt="Essenz Imóveis"/>
      </div>
    </div>

    <div class="reveal reveal-delay-1 hero-eyebrow">
      <span class="chip"><span class="chip-dot"></span>Proposta Comercial</span>
    </div>

    <h1 class="reveal reveal-delay-2">
      Presença digital que<br/>
      <span class="grad-text">gera negócios reais</span>
    </h1>

    <p class="reveal reveal-delay-3 hero-subtitle">
      Estratégia de tráfego pago construída para o mercado imobiliário premium de Ribeirão Preto —
      posicionando a Essenz onde seu público está, no momento em que ele decide.
    </p>

    <div class="reveal reveal-delay-4 hero-meta">
      <span class="hero-tag">📅 Emissão: 18/05/2026</span>
      <span class="hero-tag">⏳ Válida até: 02/06/2026</span>
      <span class="hero-tag">📍 Ribeirão Preto, SP</span>
      <span class="hero-tag">🏢 Essenz Curadoria Imobiliária</span>
      <span class="hero-tag">🔖 CRECI 50.075-J</span>
    </div>

  </div>
</section>

<!-- ═══════════════════════════════════════════
     SECTION 2 · CONTEXT
═══════════════════════════════════════════ -->
<section id="context" class="light section-pad">
  <div class="arc arc-2" style="border-color:rgba(4,122,255,.08)"></div>
  <div class="container">
    <div class="context-grid">

      <div>
        <p class="reveal mono" style="color:var(--blue);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.8rem">O Cenário</p>
        <h2 class="reveal reveal-delay-1" style="color:var(--black)">
          A Essenz já tem<br/>o produto certo.<br/>
          <span class="grad-text">Falta ser encontrada.</span>
        </h2>
        <p class="reveal reveal-delay-2" style="color:#555;margin-top:1.2rem">
          Com mais de 800 imóveis curados e atendimento online 24 horas, a Essenz oferece exatamente
          o que o comprador moderno busca — mas a decisão de compra começa no digital, muito antes
          do primeiro contato com um corretor.
        </p>
        <p class="reveal reveal-delay-3" style="color:#555;margin-top:.9rem">
          Tráfego pago bem estruturado coloca a Essenz na frente de quem está ativamente pesquisando
          imóveis em Ribeirão Preto — no Google, quando buscam "apartamento à venda"; no Instagram,
          quando um vídeo do imóvel certo aparece na hora certa.
        </p>

        <div class="reveal reveal-delay-4 stat-row">
          <div class="stat-item">
            <span class="stat-num">800+</span>
            <span class="stat-label">imóveis no portfólio</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">24h</span>
            <span class="stat-label">atendimento online</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">2</span>
            <span class="stat-label">plataformas cobertas</span>
          </div>
        </div>
      </div>

      <div>
        <div class="reveal reveal-delay-1 context-essenz-logo">
          <img src="{essenz_logo_b64}" alt="Essenz Imóveis"/>
          <span class="context-badge">Proposta WER Digital para Essenz Imóveis</span>
          <p style="font-size:.88rem;color:#555;line-height:1.6;margin-top:.3rem">
            Mais do que morar, viver com essência — e mais do que anunciar,
            construir uma presença digital que converte.
          </p>
        </div>

        <ul class="reveal reveal-delay-2 pillar-list" style="margin-top:1.4rem">
          <li>
            <span class="pillar-icon">🎯</span>
            <span><strong style="color:#111">Segmentação cirúrgica</strong> — públicos qualificados por intenção de compra, localização e comportamento imobiliário.</span>
          </li>
          <li>
            <span class="pillar-icon">📊</span>
            <span><strong style="color:#111">Otimização contínua</strong> — campanhas monitoradas e ajustadas semanalmente para maximizar o retorno sobre o investimento em mídia.</span>
          </li>
          <li>
            <span class="pillar-icon">📋</span>
            <span><strong style="color:#111">Relatórios mensais</strong> — transparência total sobre o desempenho, alcance, leads e custo por resultado.</span>
          </li>
          <li>
            <span class="pillar-icon">🚀</span>
            <span><strong style="color:#111">Estratégia omnichannel</strong> — Meta Ads e Google Ads operando em sinergia para cobrir toda a jornada do comprador.</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     SECTION 3 · SERVICES
═══════════════════════════════════════════ -->
<section id="services" class="dark section-pad">
  <div class="arc arc-1"></div>
  <div class="arc arc-3"></div>
  <div class="container">

    <p class="reveal mono" style="color:var(--cyan);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.8rem">Entregáveis</p>
    <h2 class="reveal reveal-delay-1">O que está incluído</h2>
    <p class="reveal reveal-delay-2" style="color:rgba(255,255,255,.5);margin-top:.7rem;max-width:560px">
      Gestão de mídia completa — estruturação, segmentação, otimização e relatórios —
      para Meta Ads, Google Ads ou os dois juntos.
    </p>

    <div class="services-grid">

      <!-- Meta -->
      <div class="svc-card reveal reveal-delay-1">
        <p class="svc-label">Meta Ads · Mensal</p>
        <h3>Gestão de Tráfego<br/>Facebook & Instagram</h3>
        <div class="svc-price-row">
          <span class="svc-price">R$&nbsp;1.800</span>
          <span class="svc-period">/mês</span>
        </div>
        <p class="svc-desc">Campanhas de captação de leads imobiliários no ecossistema Meta, cobrindo Facebook e Instagram com segmentação por interesse e comportamento.</p>
        <ul class="svc-includes">
          <li>Estruturação completa das campanhas</li>
          <li>Segmentação por público-alvo e remarketing</li>
          <li>Testes A/B de conjuntos de anúncios</li>
          <li>Otimização contínua de performance</li>
          <li>Relatório mensal de resultados</li>
        </ul>
        <p class="setup-note">* Setup inicial de R$ 1.200 cobrado na assinatura. Criativos fornecidos pelo cliente.</p>
      </div>

      <!-- Google -->
      <div class="svc-card reveal reveal-delay-2">
        <p class="svc-label">Google Ads · Mensal</p>
        <h3>Gestão de Tráfego<br/>Google</h3>
        <div class="svc-price-row">
          <span class="svc-price">R$&nbsp;2.200</span>
          <span class="svc-period">/mês</span>
        </div>
        <p class="svc-desc">Campanhas de busca, display e performance max para capturar quem está ativamente pesquisando imóveis em Ribeirão Preto no Google.</p>
        <ul class="svc-includes">
          <li>Campanhas de busca (Search) e Display</li>
          <li>Pesquisa e seleção de palavras-chave</li>
          <li>Performance Max para imóveis</li>
          <li>Otimização de lances e qualidade</li>
          <li>Relatório mensal de resultados</li>
        </ul>
        <p class="setup-note">* Setup inicial de R$ 1.200 cobrado na assinatura. Criativos fornecidos pelo cliente.</p>
      </div>

      <!-- Pacote -->
      <div class="svc-card featured reveal reveal-delay-3">
        <p class="svc-label">⭐ Pacote Completo · Mensal</p>
        <h3>Meta Ads +<br/>Google Ads</h3>
        <div class="svc-price-row">
          <span class="svc-price">R$&nbsp;3.000</span>
          <span class="svc-period">/mês</span>
        </div>
        <p class="svc-desc">Cobertura total da jornada do comprador imobiliário: do momento da pesquisa no Google até o impacto visual nas redes sociais.</p>
        <ul class="svc-includes">
          <li>Tudo do plano Meta + tudo do plano Google</li>
          <li>Estratégia integrada omnichannel</li>
          <li>Sinergia entre plataformas maximizando ROI</li>
          <li>Relatório consolidado mensal</li>
          <li>Economia de R$ 1.000/mês vs. planos individuais</li>
        </ul>
        <p class="setup-note">* Setup inicial de R$ 1.200 cobrado na assinatura. Criativos fornecidos pelo cliente.</p>
      </div>

      <!-- Setup -->
      <div class="svc-card reveal reveal-delay-1">
        <p class="svc-label">Único · Obrigatório</p>
        <h3>Setup Inicial</h3>
        <div class="svc-price-row">
          <span class="svc-price">R$&nbsp;1.200</span>
          <span class="svc-period">única vez</span>
        </div>
        <p class="svc-desc">Estruturação técnica completa das contas e infraestrutura de rastreamento — a base que garante que as campanhas entreguem dados confiáveis desde o dia 1.</p>
        <ul class="svc-includes">
          <li>Configuração e auditoria das contas de anúncio</li>
          <li>Instalação e validação do pixel Meta / tag Google</li>
          <li>Criação de públicos personalizados e lookalikes</li>
          <li>Estrutura inicial das campanhas</li>
          <li>Briefing estratégico e definição de metas</li>
        </ul>
        <p class="setup-note">* Cobrado uma única vez, na assinatura do contrato.</p>
      </div>

      <!-- Bônus Roteiros -->
      <div class="svc-card bonus-card reveal reveal-delay-2">
        <div style="display:flex;align-items:center;gap:.7rem;margin-bottom:.6rem">
          <p class="svc-label" style="margin:0">Bônus Mensal Incluso</p>
          <span class="badge-bonus">BÔNUS</span>
        </div>
        <h3>10 Roteiros de Vídeo</h3>
        <div class="svc-price-row">
          <span class="svc-price">Bonificado</span>
        </div>
        <p class="svc-desc">Todo mês, 10 roteiros de vídeo prontos para conteúdo orgânico no Instagram e TikTok — estratégia de conteúdo alinhada ao posicionamento premium da Essenz.</p>
        <ul class="svc-includes">
          <li>Roteiros mensais para Reels e Stories</li>
          <li>Alinhados à identidade da marca Essenz</li>
          <li>Temas: lançamentos, dicas, bastidores, depoimentos</li>
          <li>Gravação e edição por conta do cliente</li>
        </ul>
        <p class="setup-note">* Incluído em qualquer plano de gestão de tráfego.</p>
      </div>

      <!-- Bônus Landing Page -->
      <div class="svc-card bonus-card reveal reveal-delay-3">
        <div style="display:flex;align-items:center;gap:.7rem;margin-bottom:.6rem">
          <p class="svc-label" style="margin:0">Bônus Entrega Única</p>
          <span class="badge-bonus">BÔNUS</span>
        </div>
        <h3>Landing Page de Alta Conversão</h3>
        <div class="svc-price-row">
          <span class="svc-original-price">R$ 2.200</span>
          <span class="svc-price">R$&nbsp;0</span>
        </div>
        <p class="svc-desc">Uma landing page desenhada para converter o tráfego dos anúncios em leads qualificados — estrutura persuasiva, carregamento rápido e integração com CRM.</p>
        <ul class="svc-includes">
          <li>Design personalizado para a Essenz</li>
          <li>Copywriting focado em conversão imobiliária</li>
          <li>Formulário de captura + integração WhatsApp</li>
          <li>Responsiva e otimizada para mobile</li>
        </ul>
        <p class="setup-note">* Entrega única, condicionada à assinatura de contrato mínimo de 6 meses.</p>
      </div>

    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     SECTION 4 · SIMULATOR + CONDITIONS
═══════════════════════════════════════════ -->
<section id="simulator" class="light section-pad">
  <div class="container">

    <div class="sim-intro">
      <p class="reveal mono" style="color:var(--blue);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.8rem">Investimento</p>
      <h2 class="reveal reveal-delay-1">Simule sua<br/>proposta</h2>
      <p class="reveal reveal-delay-2">
        Selecione o plano de gestão de tráfego e veja o investimento em tempo real.
      </p>
    </div>

    <div class="sim-group reveal">
      <p class="sim-section-label">1. Escolha o plano de gestão de tráfego</p>
      <div class="sim-cards-row" id="mgmt-options">

        <div class="sim-card" data-id="meta" data-type="monthly" data-price="1800" onclick="selectMgmt(this)">
          <div class="sim-checkbox"></div>
          <div class="sim-card-name">Meta Ads</div>
          <div class="sim-card-price">R$ 1.800</div>
          <div class="sim-card-type">mensal</div>
        </div>

        <div class="sim-card" data-id="google" data-type="monthly" data-price="2200" onclick="selectMgmt(this)">
          <div class="sim-checkbox"></div>
          <div class="sim-card-name">Google Ads</div>
          <div class="sim-card-price">R$ 2.200</div>
          <div class="sim-card-type">mensal</div>
        </div>

        <div class="sim-card featured" data-id="pacote" data-type="monthly" data-price="3000" onclick="selectMgmt(this)">
          <div class="sim-checkbox"></div>
          <div class="sim-card-name">Pacote Completo ⭐</div>
          <div class="sim-card-price">R$ 3.000</div>
          <div class="sim-card-type">mensal · melhor valor</div>
        </div>

      </div>
    </div>

    <!-- Setup (auto-locked) -->
    <div class="sim-group reveal reveal-delay-1">
      <p class="sim-section-label">2. Setup inicial <span style="color:#aaa;font-weight:400">(obrigatório — selecionado automaticamente)</span></p>
      <div class="sim-cards-row">
        <div class="sim-card locked" id="setup-card" style="max-width:280px">
          <span class="sim-lock-icon">🔒</span>
          <div class="sim-checkbox"></div>
          <div class="sim-card-name">Setup Inicial</div>
          <div class="sim-card-price">R$ 1.200</div>
          <div class="sim-card-type">pagamento único</div>
        </div>
      </div>
    </div>

    <!-- Bonuses -->
    <div class="sim-group reveal reveal-delay-2">
      <p class="sim-section-label">3. Bônus inclusos (sem custo adicional)</p>
      <div class="sim-bonus-row" id="bonus-row">

        <div class="sim-bonus-card" id="bonus-roteiros">
          <div class="sim-bonus-name">
            10 Roteiros/mês
            <span class="badge-bonus">BÔNUS</span>
          </div>
          <div class="sim-bonus-price-row">
            <span class="sim-bonus-free">Bonificado</span>
          </div>
          <div class="sim-bonus-desc">Roteiros mensais de vídeo para conteúdo orgânico. Gravação e edição por conta do cliente.</div>
        </div>

        <div class="sim-bonus-card" id="bonus-lp">
          <div class="sim-bonus-name">
            Landing Page
            <span class="badge-bonus">BÔNUS</span>
          </div>
          <div class="sim-bonus-price-row">
            <span class="sim-bonus-original">R$ 2.200</span>
            <span class="sim-bonus-free">R$ 0</span>
          </div>
          <div class="sim-bonus-desc">Landing page de alta conversão. Entrega única condicionada à assinatura de 6 meses.</div>
        </div>

      </div>
    </div>

    <!-- Total block -->
    <div class="sim-total-block reveal reveal-delay-3" id="total-block">
      <div class="total-row">
        <span class="total-label">Investimento mensal</span>
        <span class="total-value zero" id="total-monthly">—</span>
      </div>
      <div class="total-row">
        <span class="total-label">Investimento único (setup)</span>
        <span class="total-value zero" id="total-setup">—</span>
      </div>
      <div class="total-row">
        <span class="total-label">10 Roteiros/mês <span class="badge-bonus" style="font-size:.6rem;padding:.15rem .5rem">BÔNUS</span></span>
        <span class="total-value-zero-label">Bonificado</span>
      </div>
      <div class="total-row" id="bonus-lp-row">
        <span class="total-label">Landing Page <span class="badge-bonus" style="font-size:.6rem;padding:.15rem .5rem">BÔNUS</span></span>
        <div style="text-align:right">
          <span style="text-decoration:line-through;color:rgba(255,255,255,.3);font-family:var(--font-mono);font-size:.8rem">R$ 2.200</span>
          <span class="total-value-zero-label" style="display:block">Incluído</span>
        </div>
      </div>
      <hr class="total-divider"/>
      <div class="total-row" style="border:none">
        <span class="total-grand-label">Total 1º mês</span>
        <div style="text-align:right">
          <span class="total-grand-value" id="total-grand">Selecione um plano</span>
          <div class="total-grand-note" id="total-note"></div>
        </div>
      </div>
    </div>

    <div class="sim-notice reveal reveal-delay-4">
      <strong>Verba de anúncios não incluída.</strong> O investimento em mídia (pago diretamente ao Facebook/Google) é definido pelo cliente e não compõe os honorários acima. Recomendamos verba mínima de R$ 1.500/mês para resultados consistentes.
    </div>

    <!-- Conditions -->
    <div style="margin-top:3.5rem">
      <h3 class="reveal" style="color:var(--black)">Condições contratuais</h3>
      <div class="conditions-grid">
        <div class="condition-item reveal reveal-delay-1">
          <div class="cond-label">Prazo mínimo</div>
          <p>Contrato com fidelidade de <strong>6 meses</strong> a partir da data de assinatura.</p>
        </div>
        <div class="condition-item reveal reveal-delay-2">
          <div class="cond-label">Cancelamento</div>
          <p>Aviso prévio de <strong>45 dias</strong> para encerramento do contrato.</p>
        </div>
        <div class="condition-item reveal reveal-delay-3">
          <div class="cond-label">Reajuste</div>
          <p>Honorários renegociados quando a verba mensal de anúncios ultrapassar <strong>R$ 3.000</strong>.</p>
        </div>
        <div class="condition-item reveal reveal-delay-4">
          <div class="cond-label">Setup</div>
          <p>Obrigatório na contratação de qualquer plano. Cobrado <strong>uma única vez</strong> na assinatura.</p>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- ═══════════════════════════════════════════
     SECTION 5 · TIMELINE
═══════════════════════════════════════════ -->
<section id="timeline" class="dark section-pad">
  <div class="arc arc-4"></div>
  <div class="arc arc-3"></div>
  <div class="container">

    <p class="reveal mono" style="color:var(--cyan);text-transform:uppercase;letter-spacing:.08em;margin-bottom:.8rem">Processo</p>
    <h2 class="reveal reveal-delay-1">Como funciona<br/><span class="grad-text">o início</span></h2>
    <p class="reveal reveal-delay-2" style="color:rgba(255,255,255,.5);margin-top:.7rem;max-width:520px">
      Da assinatura ao primeiro resultado: um processo estruturado para que nada seja deixado ao acaso.
    </p>

    <div class="timeline" style="margin-top:3.5rem">

      <div class="tl-item reveal">
        <div class="tl-marker">1</div>
        <div class="tl-content">
          <p class="tl-week">Semana 1–2</p>
          <h3 class="tl-title">Setup & Estruturação</h3>
          <p class="tl-desc">
            Configuração das contas de anúncio, instalação dos pixels de rastreamento (Meta e Google),
            criação de públicos personalizados e lookalikes. Briefing estratégico com a equipe Essenz
            para definir metas, imóveis prioritários e diferenciais da marca.
          </p>
        </div>
      </div>

      <div class="tl-item reveal reveal-delay-1">
        <div class="tl-marker">2</div>
        <div class="tl-content">
          <p class="tl-week">Semana 2–3</p>
          <h3 class="tl-title">Ativação das Campanhas</h3>
          <p class="tl-desc">
            Criação e lançamento das primeiras campanhas com os criativos fornecidos pelo cliente.
            Campanhas de busca no Google para capturar intenção ativa. Campanhas de lead no Meta
            para remarketing e novos públicos. Landing page configurada e integrada.
          </p>
        </div>
      </div>

      <div class="tl-item reveal reveal-delay-2">
        <div class="tl-marker">3</div>
        <div class="tl-content">
          <p class="tl-week">Semanas 3–4 em diante</p>
          <h3 class="tl-title">Otimização Contínua</h3>
          <p class="tl-desc">
            Monitoramento semanal de desempenho, ajuste de lances, testes A/B de segmentações
            e criativos, exclusão de públicos irrelevantes. A cada semana as campanhas ficam
            mais precisas e o custo por lead tende a cair.
          </p>
        </div>
      </div>

      <div class="tl-item reveal reveal-delay-3">
        <div class="tl-marker">4</div>
        <div class="tl-content">
          <p class="tl-week">Todo mês</p>
          <h3 class="tl-title">Relatório Mensal</h3>
          <p class="tl-desc">
            Relatório completo com métricas de alcance, impressões, cliques, leads gerados,
            custo por lead e ROAS. Reunião ou call para apresentação dos resultados, alinhamento
            de estratégia e planejamento do próximo período. Os 10 roteiros mensais são entregues
            junto ao relatório.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     SECTION 6 · CTA
═══════════════════════════════════════════ -->
<section id="cta">
  <div class="arc arc-1"></div>
  <div class="arc arc-2"></div>
  <div class="container" style="position:relative;z-index:1">
    <div class="reveal" style="text-align:center">
      <span class="chip" style="border-color:rgba(255,255,255,.4);color:#fff;background:rgba(255,255,255,.12)">
        <span class="chip-dot" style="background:#fff"></span>
        Próximo passo
      </span>
    </div>
    <h2 class="reveal reveal-delay-1" style="color:#fff;margin-top:1.2rem">
      Pronto para colocar<br/>a Essenz no digital?
    </h2>
    <p class="reveal reveal-delay-2">
      Fale com a WER Digital agora. Vamos alinhar os detalhes,
      tirar dúvidas e dar o primeiro passo juntos.
    </p>
    <div class="reveal reveal-delay-3">
      <a href="https://wa.me/5511959351865?text=Ol%C3%A1%2C+vim+pela+proposta+comercial+da+WER+Digital+e+gostaria+de+saber+mais." class="btn-wa" target="_blank" rel="noopener">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Falar no WhatsApp
      </a>
    </div>
    <p class="reveal reveal-delay-4 cta-validity">
      Proposta válida até 02/06/2026 · Emitida em 18/05/2026
    </p>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     SECTION 7 · FOOTER
═══════════════════════════════════════════ -->
<footer id="footer">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-logo">
        <img src="{wer_logo_b64}" alt="WER Digital"/>
      </div>
      <div class="footer-divider"></div>
      <p class="footer-tagline">Estratégias digitais, resultados reais.</p>
      <div class="footer-meta">
        <span>WER Digital</span>
        <span>·</span>
        <span>Proposta para Essenz Imóveis</span>
        <span>·</span>
        <span>Emitida 18/05/2026</span>
        <span>·</span>
        <span>Válida até 02/06/2026</span>
      </div>
    </div>
  </div>
</footer>

<!-- ═══════════════════════════════════════════
     SCRIPTS
═══════════════════════════════════════════ -->
<script>
// ── Cursor ─────────────────────────────────────────────────────────────────
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {{ mx = e.clientX; my = e.clientY; }});
(function animateCursor() {{
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
  rx += (mx - rx) * .14;
  ry += (my - ry) * .14;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
}})();

// ── Scroll progress ────────────────────────────────────────────────────────
const bar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {{
  const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  bar.style.width = (p * 100) + '%';
}}, {{ passive: true }});

// ── Reveal on scroll ───────────────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {{
  entries.forEach(e => {{ if (e.isIntersecting) e.target.classList.add('visible'); }});
}}, {{ threshold: 0.12 }});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Simulator ──────────────────────────────────────────────────────────────
const prices = {{ meta: 1800, google: 2200, pacote: 3000 }};
let activeMgmt = null;

function fmt(n) {{
  return 'R$ ' + n.toLocaleString('pt-BR');
}}

function selectMgmt(card) {{
  const id = card.dataset.id;
  // deselect all
  document.querySelectorAll('#mgmt-options .sim-card').forEach(c => c.classList.remove('active'));
  if (activeMgmt === id) {{
    // toggle off
    activeMgmt = null;
    unlockBonuses(false);
    updateTotal();
    return;
  }}
  activeMgmt = id;
  card.classList.add('active');
  unlockBonuses(true);
  updateTotal();
}}

function unlockBonuses(on) {{
  document.querySelectorAll('.sim-bonus-card').forEach(c => {{
    c.classList.toggle('unlocked', on);
  }});
}}

function updateTotal() {{
  const mEl  = document.getElementById('total-monthly');
  const sEl  = document.getElementById('total-setup');
  const gEl  = document.getElementById('total-grand');
  const nEl  = document.getElementById('total-note');

  if (!activeMgmt) {{
    mEl.textContent = '—';
    mEl.className   = 'total-value zero';
    sEl.textContent = '—';
    sEl.className   = 'total-value zero';
    gEl.textContent = 'Selecione um plano';
    gEl.className   = 'total-grand-value';
    nEl.textContent = '';
    return;
  }}

  const monthly = prices[activeMgmt];
  const setup   = 1200;
  const grand   = monthly + setup;

  mEl.textContent = fmt(monthly) + '/mês';
  mEl.className   = 'total-value';
  sEl.textContent = fmt(setup);
  sEl.className   = 'total-value';
  gEl.textContent = fmt(grand);
  gEl.className   = 'total-grand-value';
  nEl.textContent = '1º mês: ' + fmt(monthly) + ' + R$ 1.200 setup · A partir do 2º mês: ' + fmt(monthly) + '/mês';
}}
</script>
</body>
</html>"""


def image_to_b64(path: str) -> str:
    mime, _ = mimetypes.guess_type(path)
    if not mime:
        ext = os.path.splitext(path)[1].lower()
        mime = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg",
                "webp": "image/webp", "svg": "image/svg+xml"}.get(ext.lstrip("."), "image/png")
    with open(path, "rb") as f:
        return f"data:{mime};base64,{base64.b64encode(f.read()).decode()}"


IMAGES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")
LOGO_EXTENSIONS = ["png", "webp", "jpg", "jpeg", "svg"]


def find_in_images(name: str) -> str | None:
    """Return path of first matching file in images/ dir, or None."""
    for ext in LOGO_EXTENSIONS:
        path = os.path.join(IMAGES_DIR, f"{name}.{ext}")
        if os.path.isfile(path):
            return path
    return None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--essenz", metavar="ARQUIVO", help="Caminho para o logo da Essenz (padrão: images/logo-essenz.*)")
    parser.add_argument("--wer",    metavar="ARQUIVO", help="Caminho para o logo da WER Digital (padrão: images/logo-wer.*)")
    parser.add_argument("--out",    metavar="ARQUIVO", default="proposta-essenz-wer.html", help="Nome do arquivo de saída")
    args = parser.parse_args()

    wer_file = args.wer or find_in_images("logo-wer")
    if wer_file:
        wer_filename = os.path.basename(wer_file)
        wer_src = f"images/{wer_filename}"
        print(f"WER logo: {wer_file} → {wer_src}")
    else:
        print("WER logo: images/logo-wer.* não encontrado — usando SVG inline")
        wer_src = WER_LOGO_B64

    essenz_file = args.essenz or find_in_images("logo-essenz")
    if essenz_file:
        essenz_filename = os.path.basename(essenz_file)
        essenz_src = f"images/{essenz_filename}"
        print(f"Essenz logo: {essenz_file} → {essenz_src}")
    else:
        print("Essenz logo: images/logo-essenz.* não encontrado — usando SVG inline")
        essenz_src = ESSENZ_LOGO_FALLBACK_B64

    print("Gerando HTML...")
    html = build_html(essenz_src, wer_src)

    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), args.out)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)

    size_kb = len(html.encode()) / 1024
    print(f"Pronto! {out_path} ({size_kb:.1f} KB)")
    print()
    print("Para fazer upload no Netlify, suba a pasta inteira ou um zip com:")
    print("  index.html  (renomeie proposta-essenz-wer.html)")
    print("  images/     (pasta com os logos)")


if __name__ == "__main__":
    main()
