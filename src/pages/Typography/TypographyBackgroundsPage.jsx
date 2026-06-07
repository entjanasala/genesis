import { useState, useEffect } from "react";

const BACKGROUNDS = [
  {
    name: "Dark Solid",
    bg: "#080010",
    textColor: "#ffffff",
    note: "Pure white on near-black. Maximum contrast. Best for headlines on dark websites.",
    accent: "#c4b5fd",
  },
  {
    name: "Dark with Tint",
    bg: "linear-gradient(135deg, #1a0a2e, #080010)",
    textColor: "#f0e6ff",
    note: "Slightly warm white on a tinted dark bg. Reduces harshness while maintaining contrast.",
    accent: "#c4b5fd",
  },
  {
    name: "Mid-tone Purple",
    bg: "#2d1b69",
    textColor: "#ffffff",
    note: "White text on mid-tone bg. Works for cards and callout sections.",
    accent: "#e0d4ff",
  },
  {
    name: "Frosted Glass",
    bg: "rgba(255,255,255,0.08)",
    textColor: "#ffffff",
    note: "Glassmorphism text area. Text must be strong enough to read through the blur.",
    accent: "#a5f3fc",
    glass: true,
  },
  {
    name: "Warm Cream",
    bg: "#f5f0e8",
    textColor: "#1a1a2e",
    note: "Dark text on warm off-white. Classic editorial. Easier on the eyes than pure white.",
    accent: "#7c5cbf",
    light: true,
  },
  {
    name: "Vibrant Gradient",
    bg: "linear-gradient(135deg, #5227ff, #ff9ffc)",
    textColor: "#ffffff",
    note: "White on strong gradient. The type competes with the bg — use sparingly for hero moments.",
    accent: "#ffffff",
  },
  {
    name: "Photography",
    bg: 'linear-gradient(135deg, rgba(8,0,16,0.7), rgba(8,0,16,0.3)), url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23334" width="100" height="100"/><circle fill="%23556" cx="50" cy="50" r="30"/></svg>\')',
    textColor: "#ffffff",
    note: "Text over images needs either a dark overlay, text shadow, or a solid background band.",
    accent: "#fde68a",
  },
];

export function TypographyBackgroundsPage({ onBack }) {
  const [active, setActive] = useState(0);
  const bg = BACKGROUNDS[active];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&family=Playfair+Display:wght@700&display=swap');
        .tbg-page{min-height:100vh;background:#080010;font-family:'DM Sans',sans-serif;color:rgba(255,255,255,0.85);overflow-x:hidden;}
        .tbg-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 36px;position:sticky;top:0;background:rgba(8,0,16,0.88);backdrop-filter:blur(20px);border-bottom:0.5px solid rgba(255,255,255,0.07);z-index:100;}
        .tbg-back{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.05);border:0.5px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);padding:8px 18px;border-radius:999px;cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
        .tbg-back:hover{background:rgba(255,255,255,0.09);color:#fff;}
        .tbg-nav-label{font-family:'DM Serif Display',serif;font-size:16px;color:rgba(255,255,255,0.7);}
        .tbg-inner{max-width:860px;margin:0 auto;padding:60px 36px 80px;}
        .tbg-eyebrow{font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:12px;}
        .tbg-title{font-family:'DM Serif Display',serif;font-size:clamp(2.4rem,5vw,4rem);color:#fff;letter-spacing:-0.02em;line-height:1.08;margin-bottom:16px;}
        .tbg-sub{font-size:14px;color:rgba(255,255,255,0.3);line-height:1.8;max-width:460px;margin-bottom:48px;}
        .tbg-section-title{font-family:'DM Serif Display',serif;font-size:22px;color:rgba(255,255,255,0.88);margin-bottom:20px;}
        .tbg-divider{height:0.5px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent);margin:48px 0;}
        .tbg-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px;}
        .tbg-tab{padding:7px 16px;border-radius:999px;font-size:12px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:rgba(255,255,255,0.4);}
        .tbg-tab.active{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);color:#fff;}
        .tbg-preview{border-radius:24px;overflow:hidden;margin-bottom:20px;min-height:220px;display:flex;flex-direction:column;justify-content:center;padding:48px 40px;transition:all 0.4s;backdrop-filter:blur(0px);}
        .tbg-preview.glass{backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.15);}
        .tbg-preview-headline{font-family:'Playfair Display',serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:700;line-height:1.1;margin-bottom:12px;letter-spacing:-0.02em;}
        .tbg-preview-body{font-size:14px;line-height:1.75;opacity:0.65;max-width:380px;}
        .tbg-note{font-size:13px;color:rgba(255,255,255,0.35);line-height:1.7;margin-bottom:48px;padding:16px 20px;border-radius:12px;background:rgba(255,255,255,0.03);border:0.5px solid rgba(255,255,255,0.07);}
        .tbg-rules{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;}
        .tbg-rule{border-radius:16px;padding:20px;border:1px solid;}
        .tbg-rule-title{font-size:14px;font-weight:500;color:rgba(255,255,255,0.85);margin-bottom:7px;}
        .tbg-rule-text{font-size:12px;color:rgba(255,255,255,0.35);line-height:1.7;}
      `}</style>

      <div className="tbg-page">
        <nav className="tbg-nav">
          <button className="tbg-back" onClick={onBack}>
            ← Back
          </button>
          <span className="tbg-nav-label">Fonts on Backgrounds</span>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            LESSON 09
          </span>
        </nav>

        <div className="tbg-inner">
          <div className="tbg-eyebrow">Typography · Lesson 09</div>
          <div className="tbg-title">
            Fonts on Different
            <br />
            Backgrounds
          </div>
          <p className="tbg-sub">
            The same typeface can feel completely different depending on what it
            sits on. Background is context.
          </p>

          <div className="tbg-tabs">
            {BACKGROUNDS.map((b, i) => (
              <button
                key={i}
                className={`tbg-tab${active === i ? " active" : ""}`}
                onClick={() => setActive(i)}
              >
                {b.name}
              </button>
            ))}
          </div>

          <div
            className={`tbg-preview${bg.glass ? " glass" : ""}`}
            style={{ background: bg.bg }}
          >
            <div
              className="tbg-preview-headline"
              style={{ color: bg.textColor }}
            >
              Typography Lives Here
            </div>
            <div className="tbg-preview-body" style={{ color: bg.textColor }}>
              The readability of text depends entirely on what it sits against.
              Contrast is not optional.
            </div>
          </div>

          <div className="tbg-note">{bg.note}</div>

          <div className="tbg-divider" />

          <div className="tbg-section-title">Essential Rules</div>
          <div className="tbg-rules">
            {[
              {
                title: "4.5:1 minimum contrast",
                text: "WCAG AA standard for body text. Use a contrast checker — your eye lies. What looks fine at full size fails at small sizes.",
                color: "rgba(196,181,253,0.08)",
                border: "rgba(196,181,253,0.2)",
              },
              {
                title: "Dark overlay for images",
                text: "Never place text directly on a busy photo. Add a semi-transparent overlay or use a text band to guarantee readability.",
                color: "rgba(249,168,212,0.08)",
                border: "rgba(249,168,212,0.2)",
              },
              {
                title: "Gradient text = decoration only",
                text: "Gradient text is illegible at small sizes. Limit it to large display headlines. Never use for body text or UI labels.",
                color: "rgba(253,186,116,0.08)",
                border: "rgba(253,186,116,0.2)",
              },
              {
                title: "Mid-tones are dangerous",
                text: "Placing grey text on a light grey background looks subtle but fails accessibility. High contrast = inclusive design.",
                color: "rgba(110,231,183,0.08)",
                border: "rgba(110,231,183,0.2)",
              },
              {
                title: "Coloured text on coloured bg",
                text: "When both text and background are chromatic, test for both luminance AND hue contrast. Blue on purple often fails both.",
                color: "rgba(125,211,252,0.08)",
                border: "rgba(125,211,252,0.2)",
              },
              {
                title: "Text shadows as last resort",
                text: "A subtle text shadow can save text on a gradient bg. Use sparingly — it signals a design problem rather than a solution.",
                color: "rgba(216,180,254,0.08)",
                border: "rgba(216,180,254,0.2)",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="tbg-rule"
                style={{ background: r.color, borderColor: r.border }}
              >
                <div className="tbg-rule-title">{r.title}</div>
                <div className="tbg-rule-text">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
