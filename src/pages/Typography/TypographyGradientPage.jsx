import { useState, useEffect } from "react";

const GRADIENT_STYLES = [
  {
    name: "Linear Gradient",
    css: "linear-gradient(135deg, #c4b5fd, #f472b6)",
    text: "Gradient Type",
    desc: "Left to right, top to bottom, or at any angle. The most common gradient on text.",
    code: `background: linear-gradient(135deg, #c4b5fd, #f472b6);
-webkit-background-clip: text;
background-clip: text;
color: transparent;`,
  },
  {
    name: "Radial Gradient",
    css: "radial-gradient(circle at 30% 50%, #a5f3fc, #6ee7b7, #fda4af)",
    text: "Radiating Out",
    desc: "Emanates from a centre point. Creates a spotlight or glow effect on type.",
    code: `background: radial-gradient(circle at 30% 50%, #a5f3fc, #6ee7b7);
-webkit-background-clip: text;
background-clip: text;
color: transparent;`,
  },
  {
    name: "Conic Gradient",
    css: "conic-gradient(from 0deg, #f472b6, #fde68a, #86efac, #a5f3fc, #f472b6)",
    text: "Spectrum",
    desc: "Rotates around a point like a colour wheel. Rare but striking on display text.",
    code: `background: conic-gradient(from 0deg, #f472b6, #fde68a, #86efac, #a5f3fc, #f472b6);
-webkit-background-clip: text;
background-clip: text;
color: transparent;`,
  },
  {
    name: "Outlined",
    css: null,
    outlined: true,
    text: "Outlined",
    desc: "Transparent fill with a visible stroke. Creates a light, editorial feel.",
    code: `color: transparent;
-webkit-text-stroke: 1.5px rgba(196,181,253,0.8);`,
  },
  {
    name: "Split Colour",
    css: "linear-gradient(to right, #fff 50%, #f472b6 50%)",
    text: "Split",
    desc: "A hard stop at exactly 50% creates two distinct colour zones across the text.",
    code: `background: linear-gradient(to right, #fff 50%, #f472b6 50%);
-webkit-background-clip: text;
background-clip: text;
color: transparent;`,
  },
];

export default function TypographyGradientPage({ onBack }) {
  const [activeStyle, setActiveStyle] = useState(0);
  const [fontSize, setFontSize] = useState(72);
  const [copied, setCopied] = useState(false);
  const style = GRADIENT_STYLES[activeStyle];

  const copy = () => {
    navigator.clipboard.writeText(style.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const getTextStyle = (s) => {
    if (s.outlined) {
      return {
        color: "transparent",
        WebkitTextStroke: "1.5px rgba(196,181,253,0.8)",
        display: "inline-block",
      };
    }
    return {
      backgroundImage: s.css,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      display: "inline-block",
    };
  };

  const WALL_ITEMS = [
    {
      text: "Bold",
      style: {
        backgroundImage: "linear-gradient(135deg,#c4b5fd,#f472b6)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        display: "inline-block",
      },
    },
    {
      text: "Light",
      style: {
        color: "transparent",
        WebkitTextStroke: "1px rgba(165,243,252,0.7)",
        display: "inline-block",
      },
    },
    {
      text: "Split",
      style: {
        backgroundImage:
          "linear-gradient(to bottom, #fff 50%, rgba(255,255,255,0.15) 50%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        display: "inline-block",
      },
    },
    {
      text: "Glow",
      style: {
        color: "#f472b6",
        textShadow:
          "0 0 40px rgba(244,114,182,0.6), 0 0 80px rgba(244,114,182,0.3)",
        display: "inline-block",
      },
    },
    {
      text: "Arc",
      style: {
        backgroundImage:
          "conic-gradient(from 180deg,#fde68a,#f472b6,#c4b5fd,#86efac,#fde68a)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        display: "inline-block",
      },
    },
    {
      text: "Noise",
      style: {
        backgroundImage:
          "linear-gradient(45deg,rgba(255,255,255,0.9),rgba(255,255,255,0.2),rgba(255,255,255,0.8))",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        display: "inline-block",
      },
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&family=Playfair+Display:wght@700&display=swap');
        .tg-page { min-height:100vh; background:#06080f; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.85); overflow-x:hidden; }
        .tg-nav { display:flex; align-items:center; justify-content:space-between; padding:18px 48px; position:sticky; top:0; background:rgba(6,8,15,0.9); backdrop-filter:blur(24px); border-bottom:0.5px solid rgba(255,255,255,0.06); z-index:100; }
        .tg-back { background:none; border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.45); padding:8px 20px; border-radius:999px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .tg-back:hover { color:#fff; border-color:rgba(255,255,255,0.25); }
        .tg-nav-label { font-family:'DM Serif Display',serif; font-size:16px; color:rgba(255,255,255,0.6); }
        .tg-tag { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.2); }

        .tg-hero { position:relative; padding:80px 48px 60px; border-bottom:0.5px solid rgba(255,255,255,0.06); overflow:hidden; display:flex; flex-direction:column; align-items:center; text-align:center; min-height:50vh; justify-content:center; }
        .tg-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 50% 60%, rgba(244,114,182,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 20%, rgba(196,181,253,0.05) 0%, transparent 50%); pointer-events:none; }
        .tg-hero-lines { position:absolute; inset:0; pointer-events:none; }
        .tg-hl { position:absolute; left:0; right:0; height:0.5px; background:linear-gradient(to right, transparent 5%, rgba(244,114,182,0.07) 40%, rgba(244,114,182,0.07) 60%, transparent 95%); }
        .tg-vl { position:absolute; top:0; bottom:0; width:0.5px; background:linear-gradient(to bottom, transparent 10%, rgba(244,114,182,0.05) 50%, transparent 90%); }
        .tg-eyebrow { font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:20px; display:flex; align-items:center; gap:12px; position:relative; z-index:1; }
        .tg-eyebrow::before,.tg-eyebrow::after { content:''; flex:0 0 40px; height:0.5px; background:rgba(255,255,255,0.2); }
        .tg-hero-title { font-family:'Playfair Display',serif; font-size:clamp(4rem,10vw,9rem); font-weight:700; line-height:1.1; letter-spacing:-0.03em; padding-bottom: 0.1em;; position:relative; z-index:1; display:inline-block; background-image:linear-gradient(135deg,#fff 0%,#f472b6 50%,#c4b5fd 100%); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .tg-hero-sub { font-size:15px; color:rgba(255,255,255,0.32); line-height:1.8; max-width:480px; position:relative; z-index:1; }

        .tg-section { padding:72px 48px; border-bottom:0.5px solid rgba(255,255,255,0.06); }
        .tg-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .tg-section-title { font-family:'DM Serif Display',serif; font-size:clamp(1.6rem,3vw,2.2rem); color:#fff; letter-spacing:-0.02em; }
        .tg-section-line { flex:1; height:0.5px; background:rgba(255,255,255,0.07); }
        .tg-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:40px; max-width:520px; line-height:1.7; }

        .tg-style-tabs { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:32px; }
        .tg-style-tab { padding:8px 20px; border-radius:999px; font-size:12px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:0.5px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.38); }
        .tg-style-tab.active { background:rgba(244,114,182,0.1); border-color:rgba(244,114,182,0.3); color:#f472b6; }

        .tg-preview-wrap { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .tg-preview-canvas { border:0.5px solid rgba(255,255,255,0.07); border-radius:20px; padding:48px 36px; background:rgba(255,255,255,0.02); display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:240px; gap:32px; }
        .tg-preview-info { display:flex; flex-direction:column; gap:14px; }
        .tg-style-name { font-family:'DM Serif Display',serif; font-size:24px; color:#fff; margin-bottom:4px; }
        .tg-style-desc { font-size:13px; color:rgba(255,255,255,0.38); line-height:1.75; margin-bottom:16px; }

        .tg-code { background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:12px; padding:18px 20px; position:relative; }
        .tg-code pre { font-family:'Courier New',monospace; font-size:12px; color:rgba(255,255,255,0.55); line-height:1.7; margin:0; white-space:pre-wrap; }
        .tg-code-copy { position:absolute; top:12px; right:12px; background:rgba(255,255,255,0.05); border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.4); padding:4px 10px; border-radius:6px; font-size:10px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .tg-code-copy:hover { color:#fff; }
        .tg-code-copy.copied { color:#86efac; border-color:rgba(134,239,172,0.3); }

        .tg-slider-wrap { display:flex; align-items:center; gap:14px; }
        .tg-slider-label { font-size:11px; color:rgba(255,255,255,0.3); white-space:nowrap; }
        .tg-slider { flex:1; accent-color:#f472b6; }

        .tg-rules { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:14px; }
        .tg-rule { border-radius:16px; padding:22px; border:1px solid; }
        .tg-rule-title { font-size:14px; font-weight:500; color:rgba(255,255,255,0.85); margin-bottom:7px; }
        .tg-rule-text { font-size:12px; color:rgba(255,255,255,0.35); line-height:1.7; }

        .tg-wall { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(255,255,255,0.06); border-radius:20px; overflow:hidden; }
        .tg-wall-cell { background:#06080f; padding:40px 28px; display:flex; align-items:center; justify-content:center; }
      `}</style>

      <div className="tg-page">
        <nav className="tg-nav">
          <button className="tg-back" onClick={onBack}>
            ← Back
          </button>
          <span className="tg-nav-label">Gradient & Styled Fonts</span>
          <span className="tg-tag">Lesson 06</span>
        </nav>

        <div className="tg-hero">
          <div className="tg-hero-bg" />
          <div className="tg-hero-lines">
            {[30, 60].map((p, i) => (
              <div key={i} className="tg-hl" style={{ top: `${p}%` }} />
            ))}
            {[25, 50, 75].map((p, i) => (
              <div key={i} className="tg-vl" style={{ left: `${p}%` }} />
            ))}
          </div>
          <div className="tg-eyebrow">Typography · Lesson 06</div>
          <div className="tg-hero-title" style={{ paddingBottom: "0.1em" }}>
            Styled
            <br />
            Type
          </div>
          <p className="tg-hero-sub">
            When typography becomes the visual. Gradients, outlines, and
            creative styling turn letters into art.
          </p>
        </div>

        <div className="tg-section">
          <div className="tg-section-header">
            <div className="tg-section-title">Style Explorer</div>
            <div className="tg-section-line" />
          </div>
          <p className="tg-section-sub">
            Click a style to preview it live. Adjust the size slider. Copy the
            CSS directly.
          </p>

          <div className="tg-style-tabs">
            {GRADIENT_STYLES.map((s, i) => (
              <button
                key={i}
                className={`tg-style-tab${activeStyle === i ? " active" : ""}`}
                onClick={() => setActiveStyle(i)}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="tg-preview-wrap">
            <div className="tg-preview-canvas">
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                  fontSize,
                  transition: "font-size 0.2s",
                  ...getTextStyle(style),
                }}
              >
                {style.text}
              </div>
              <div className="tg-slider-wrap" style={{ width: "100%" }}>
                <span className="tg-slider-label">Size</span>
                <input
                  type="range"
                  className="tg-slider"
                  min={32}
                  max={120}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                />
                <span className="tg-slider-label">{fontSize}px</span>
              </div>
            </div>
            <div className="tg-preview-info">
              <div>
                <div className="tg-style-name">{style.name}</div>
                <div className="tg-style-desc">{style.desc}</div>
              </div>
              <div className="tg-code">
                <pre>{style.code}</pre>
                <button
                  className={`tg-code-copy${copied ? " copied" : ""}`}
                  onClick={copy}
                >
                  {copied ? "✓ copied" : "copy"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="tg-section">
          <div className="tg-section-header">
            <div className="tg-section-title">Style Gallery</div>
            <div className="tg-section-line" />
          </div>
          <p className="tg-section-sub">
            The same word — six different personalities.
          </p>
          <div className="tg-wall">
            {WALL_ITEMS.map((w, i) => (
              <div key={i} className="tg-wall-cell">
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    textAlign: "center",
                    fontSize: "clamp(3rem,6vw,5rem)",
                    ...w.style,
                  }}
                >
                  {w.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tg-section" style={{ borderBottom: "none" }}>
          <div className="tg-section-header">
            <div className="tg-section-title">When to Use It</div>
            <div className="tg-section-line" />
          </div>
          <div className="tg-rules">
            {[
              {
                title: "Headlines only",
                text: "Gradient text is a display technique. Never apply it to body text — it kills readability at small sizes.",
                bg: "rgba(196,181,253,0.08)",
                border: "rgba(196,181,253,0.2)",
              },
              {
                title: "High contrast backgrounds",
                text: "Gradient text needs a dark or neutral background to read well. On busy backgrounds it disappears.",
                bg: "rgba(244,114,182,0.08)",
                border: "rgba(244,114,182,0.2)",
              },
              {
                title: "Brand moments",
                text: "Use gradient type for hero sections, landing page headlines, and splash screens — not for UI labels or navigation.",
                bg: "rgba(253,230,138,0.08)",
                border: "rgba(253,230,138,0.2)",
              },
              {
                title: "Outline type = editorial",
                text: "Outlined (stroke) type signals sophistication and luxury. Used heavily in fashion, editorial, and premium brand identity.",
                bg: "rgba(134,239,172,0.07)",
                border: "rgba(134,239,172,0.2)",
              },
              {
                title: "Animate gradients",
                text: "Moving the background-position of a gradient creates a flowing shimmer effect — great for loading states and hero accents.",
                bg: "rgba(165,243,252,0.07)",
                border: "rgba(165,243,252,0.2)",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="tg-rule"
                style={{ background: r.bg, borderColor: r.border }}
              >
                <div className="tg-rule-title">{r.title}</div>
                <div className="tg-rule-text">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
