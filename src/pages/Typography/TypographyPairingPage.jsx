import { useState, useEffect } from "react";
const PAIRS = [
  {
    name: "Classic Editorial",
    display: {
      font: "'Playfair Display', serif",
      name: "Playfair Display",
      weight: 700,
      role: "Headline",
      sample: "The Art of Design",
    },
    body: {
      font: "'DM Sans', sans-serif",
      name: "DM Sans",
      weight: 400,
      role: "Body",
      sample:
        "Clean and modern sans meets the elegance of a serif display face. This combination is used across editorial publications worldwide.",
    },
    accent: "#c4b5fd",
    bg: "rgba(196,181,253,0.07)",
    border: "rgba(196,181,253,0.25)",
    why: "Serif headline creates authority. Sans body ensures readability at small sizes.",
  },
  {
    name: "Modern Minimal",
    display: {
      font: "'DM Serif Display', serif",
      name: "DM Serif Display",
      weight: 400,
      role: "Headline",
      sample: "Less is More",
    },
    body: {
      font: "'DM Sans', sans-serif",
      name: "DM Sans",
      weight: 300,
      role: "Body",
      sample:
        "When everything is from the same type family, harmony is guaranteed. Slight variations in style keep it interesting.",
    },
    accent: "#7dd3fc",
    bg: "rgba(125,211,252,0.07)",
    border: "rgba(125,211,252,0.22)",
    why: "Same family pairings always work. The italic serif vs light sans creates personality without chaos.",
  },
  {
    name: "Tech Contrast",
    display: {
      font: "'Syne', sans-serif",
      name: "Syne",
      weight: 800,
      role: "Headline",
      sample: "SYSTEM OVERRIDE",
    },
    body: {
      font: "'Space Mono', monospace",
      name: "Space Mono",
      weight: 400,
      role: "Body",
      sample:
        "High contrast between a bold display and a monospace body gives a technical, code-adjacent aesthetic popular in SaaS and dev tools.",
    },
    accent: "#6ee7b7",
    bg: "rgba(110,231,183,0.07)",
    border: "rgba(110,231,183,0.22)",
    why: "Ultra-bold display + monospace body creates a distinct tech personality. Used by Vercel, Linear, Raycast.",
  },
  {
    name: "Luxury Brand",
    display: {
      font: "'Cormorant', serif",
      name: "Cormorant",
      weight: 300,
      role: "Headline",
      sample: "Understated Excellence",
    },
    body: {
      font: "'DM Sans', sans-serif",
      name: "DM Sans",
      weight: 400,
      role: "Body",
      sample:
        "Ultra-light serif headlines communicate refinement and exclusivity. Paired with neutral sans for clarity.",
    },
    accent: "#fdba74",
    bg: "rgba(253,186,116,0.07)",
    border: "rgba(253,186,116,0.22)",
    why: "Thin, tall serifs signal luxury. Think fashion houses — Vogue, Chanel, Bottega Veneta.",
  },
];

export default function TypographyPairingPage({ onBack }) {
  const [active, setActive] = useState(0);
  const pair = PAIRS[active];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&family=Playfair+Display:wght@700&family=Space+Mono&family=Cormorant:wght@300&family=Syne:wght@800&display=swap');
        .pp-page{min-height:100vh;background:#080010;font-family:'DM Sans',sans-serif;color:rgba(255,255,255,0.85);overflow-x:hidden;}
        .pp-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 36px;position:sticky;top:0;background:rgba(8,0,16,0.88);backdrop-filter:blur(20px);border-bottom:0.5px solid rgba(255,255,255,0.07);z-index:100;}
        .pp-back{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.05);border:0.5px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);padding:8px 18px;border-radius:999px;cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
        .pp-back:hover{background:rgba(255,255,255,0.09);color:#fff;}
        .pp-nav-label{font-family:'DM Serif Display',serif;font-size:16px;color:rgba(255,255,255,0.7);}
        .pp-inner{max-width:860px;margin:0 auto;padding:60px 36px 80px;}
        .pp-eyebrow{font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:12px;}
        .pp-title{font-family:'DM Serif Display',serif;font-size:clamp(2.4rem,5vw,4rem);color:#fff;letter-spacing:-0.02em;line-height:1.08;margin-bottom:16px;}
        .pp-sub{font-size:14px;color:rgba(255,255,255,0.3);line-height:1.8;max-width:460px;margin-bottom:48px;}
        .pp-section-title{font-family:'DM Serif Display',serif;font-size:22px;color:rgba(255,255,255,0.88);margin-bottom:20px;}
        .pp-divider{height:0.5px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent);margin:48px 0;}

        /* PAIR TABS */
        .pp-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px;}
        .pp-tab{padding:8px 18px;border-radius:999px;font-size:12px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:rgba(255,255,255,0.4);}
        .pp-tab.active{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);color:#fff;}

        /* LIVE PREVIEW */
        .pp-preview{border-radius:24px;padding:48px 40px;margin-bottom:32px;transition:all 0.4s ease;position:relative;overflow:hidden;}
        .pp-preview-display{margin-bottom:20px;line-height:1.1;letter-spacing:-0.02em;}
        .pp-preview-body{line-height:1.8;opacity:0.65;}
        .pp-preview-label{position:absolute;top:20px;right:20px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.3;}

        /* PAIR INFO */
        .pp-info{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px;}
        .pp-font-card{border-radius:14px;padding:18px;border:1px solid rgba(255,255,255,0.07);background:rgba(255,255,255,0.03);}
        .pp-font-role{font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-bottom:8px;}
        .pp-font-name{font-size:16px;font-weight:500;color:rgba(255,255,255,0.85);margin-bottom:4px;}
        .pp-font-sample{font-size:32px;margin-top:10px;line-height:1;}

        /* WHY CARD */
        .pp-why{border-radius:14px;padding:18px 20px;background:rgba(255,255,255,0.03);border:0.5px solid rgba(255,255,255,0.07);margin-bottom:48px;}
        .pp-why-label{font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:8px;}
        .pp-why-text{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.75;}

        /* RULES */
        .pp-rules{display:flex;flex-direction:column;gap:10px;}
        .pp-rule{display:flex;gap:16px;padding:16px 18px;border-radius:14px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);}
        .pp-rule-icon{font-size:18px;flex-shrink:0;margin-top:2px;}
        .pp-rule-title{font-size:14px;font-weight:500;color:rgba(255,255,255,0.8);margin-bottom:4px;}
        .pp-rule-text{font-size:12px;color:rgba(255,255,255,0.35);line-height:1.7;}
      `}</style>

      <div className="pp-page">
        <nav className="pp-nav">
          <button className="pp-back" onClick={onBack}>
            ← Back
          </button>
          <span className="pp-nav-label">Which Fonts Go Together</span>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            LESSON 04
          </span>
        </nav>

        <div className="pp-inner">
          <div className="pp-eyebrow">Typography · Lesson 04</div>
          <div className="pp-title">
            Which Fonts
            <br />
            Go Together
          </div>
          <p className="pp-sub">
            Font pairing is part science, part intuition. Learn the principles,
            then trust your eye.
          </p>

          <div className="pp-section-title">Live Pairings</div>
          <div className="pp-tabs">
            {PAIRS.map((p, i) => (
              <button
                key={i}
                className={`pp-tab${active === i ? " active" : ""}`}
                onClick={() => setActive(i)}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* LIVE PREVIEW */}
          <div
            className="pp-preview"
            style={{
              background: `${pair.accent}0d`,
              border: `1px solid ${pair.accent}25`,
            }}
          >
            <div className="pp-preview-label">{pair.name}</div>
            <div
              className="pp-preview-display"
              style={{
                fontFamily: pair.display.font,
                fontWeight: pair.display.weight,
                fontSize: "clamp(2rem,4vw,3rem)",
                color: pair.accent,
              }}
            >
              {pair.display.sample}
            </div>
            <div
              className="pp-preview-body"
              style={{
                fontFamily: pair.body.font,
                fontWeight: pair.body.weight,
                fontSize: "14px",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {pair.body.sample}
            </div>
          </div>

          <div className="pp-info">
            {[pair.display, pair.body].map((f, i) => (
              <div key={i} className="pp-font-card">
                <div className="pp-font-role">{f.role}</div>
                <div className="pp-font-name">{f.name}</div>
                <div
                  className="pp-font-sample"
                  style={{
                    fontFamily: f.font,
                    fontWeight: f.weight,
                    color: pair.accent,
                  }}
                >
                  Aa
                </div>
              </div>
            ))}
          </div>

          <div className="pp-why">
            <div className="pp-why-label">Why it works</div>
            <div className="pp-why-text">{pair.why}</div>
          </div>

          <div className="pp-divider" />

          <div className="pp-section-title">Pairing Principles</div>
          <div className="pp-rules">
            {[
              {
                icon: "⚖️",
                title: "Contrast, not conflict",
                text: "Pair fonts that are different enough to create contrast but share a similar mood or era. Too similar = boring. Too different = chaos.",
              },
              {
                icon: "👨‍👩‍👧",
                title: "Same family is always safe",
                text: "Using light, regular, and bold from a single font family is the most reliable pairing strategy. It's not boring — it's intentional.",
              },
              {
                icon: "🎭",
                title: "Personality match matters",
                text: "A playful display font needs a neutral body. A serious serif needs a clean sans. Matching energy levels creates harmony.",
              },
              {
                icon: "🔢",
                title: "Maximum 2 typefaces",
                text: "In 90% of projects, 2 fonts is the limit. Every additional typeface requires justification. Ask: what does this third font add?",
              },
              {
                icon: "📏",
                title: "Test at actual sizes",
                text: "Fonts that look great at 100px can fall apart at 14px. Always evaluate your pairing at the sizes you'll actually use them.",
              },
            ].map((r, i) => (
              <div key={i} className="pp-rule">
                <div className="pp-rule-icon">{r.icon}</div>
                <div>
                  <div className="pp-rule-title">{r.title}</div>
                  <div className="pp-rule-text">{r.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
