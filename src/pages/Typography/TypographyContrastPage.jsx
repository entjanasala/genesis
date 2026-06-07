import { useState, useEffect } from "react";

const EXAMPLES = [
  {
    name: "Editorial Punch",
    headline: {
      text: "Bold",
      font: "'Playfair Display', serif",
      weight: 700,
      size: "clamp(5rem,12vw,9rem)",
      color: "#fff",
    },
    sub: {
      text: "MEETS LIGHT",
      font: "'DM Sans', sans-serif",
      weight: 300,
      size: "clamp(0.9rem,2vw,1.3rem)",
      color: "rgba(255,255,255,0.4)",
      tracking: "0.3em",
    },
    body: {
      text: "When heavy and light coexist, tension creates interest.",
      font: "'DM Sans', sans-serif",
      weight: 400,
      size: "14px",
      color: "rgba(255,255,255,0.35)",
    },
    accent: "#c4b5fd",
  },
  {
    name: "Number Feature",
    headline: {
      text: "99",
      font: "'DM Serif Display', serif",
      weight: 400,
      size: "clamp(6rem,14vw,11rem)",
      color: "#f9a8d4",
    },
    sub: {
      text: "percent satisfaction",
      font: "'DM Sans', sans-serif",
      weight: 300,
      size: "clamp(0.85rem,1.8vw,1.1rem)",
      color: "rgba(255,255,255,0.35)",
      tracking: "0.08em",
    },
    body: {
      text: "Pairing a giant numeral with featherweight body copy is a classic brand move.",
      font: "'DM Sans', sans-serif",
      weight: 400,
      size: "13px",
      color: "rgba(255,255,255,0.3)",
    },
    accent: "#f9a8d4",
  },
  {
    name: "Weight Cascade",
    headline: {
      text: "HEAVY",
      font: "'DM Sans', sans-serif",
      weight: 700,
      size: "clamp(3rem,7vw,5.5rem)",
      color: "#fdba74",
    },
    sub: {
      text: "Regular sits here",
      font: "'DM Sans', sans-serif",
      weight: 400,
      size: "clamp(1rem,2.5vw,1.6rem)",
      color: "rgba(255,255,255,0.55)",
      tracking: "0.02em",
    },
    body: {
      text: "thin whisper at the bottom",
      font: "'DM Sans', sans-serif",
      weight: 300,
      size: "clamp(0.75rem,1.5vw,1rem)",
      color: "rgba(255,255,255,0.25)",
      tracking: "0.12em",
    },
    accent: "#fdba74",
  },
  {
    name: "Italic Contrast",
    headline: {
      text: "The Story",
      font: "'Playfair Display', serif",
      weight: 700,
      size: "clamp(2.8rem,6vw,5rem)",
      color: "#7dd3fc",
      style: "italic",
    },
    sub: {
      text: "TOLD IN TYPE",
      font: "'DM Sans', sans-serif",
      weight: 700,
      size: "clamp(0.8rem,1.6vw,1rem)",
      color: "rgba(255,255,255,0.3)",
      tracking: "0.22em",
    },
    body: {
      text: "Italic serif headline against upright sans creates directional contrast — one moves, one holds still.",
      font: "'DM Sans', sans-serif",
      weight: 400,
      size: "13px",
      color: "rgba(255,255,255,0.3)",
    },
    accent: "#7dd3fc",
  },
];

const WEIGHT_DEMO = [
  { weight: 100, label: "Thin 100", opacity: 0.5 },
  { weight: 200, label: "ExtraLight 200", opacity: 0.55 },
  { weight: 300, label: "Light 300", opacity: 0.6 },
  { weight: 400, label: "Regular 400", opacity: 0.75 },
  { weight: 500, label: "Medium 500", opacity: 0.82 },
  { weight: 600, label: "SemiBold 600", opacity: 0.88 },
  { weight: 700, label: "Bold 700", opacity: 0.92 },
  { weight: 800, label: "ExtraBold 800", opacity: 0.96 },
  { weight: 900, label: "Black 900", opacity: 1 },
];

export default function TypographyContrastPage({ onBack }) {
  const [active, setActive] = useState(0);
  const ex = EXAMPLES[active];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300&family=DM+Serif+Display&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        .tc-page{min-height:100vh;background:#080010;font-family:'DM Sans',sans-serif;color:rgba(255,255,255,0.85);overflow-x:hidden;}
        .tc-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 36px;position:sticky;top:0;background:rgba(8,0,16,0.88);backdrop-filter:blur(20px);border-bottom:0.5px solid rgba(255,255,255,0.07);z-index:100;}
        .tc-back{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.05);border:0.5px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);padding:8px 18px;border-radius:999px;cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
        .tc-back:hover{background:rgba(255,255,255,0.09);color:#fff;}
        .tc-nav-label{font-family:'DM Serif Display',serif;font-size:16px;color:rgba(255,255,255,0.7);}
        .tc-inner{max-width:860px;margin:0 auto;padding:60px 36px 80px;}
        .tc-eyebrow{font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:12px;}
        .tc-title{font-family:'DM Serif Display',serif;font-size:clamp(2.4rem,5vw,4rem);color:#fff;letter-spacing:-0.02em;line-height:1.08;margin-bottom:16px;}
        .tc-sub{font-size:14px;color:rgba(255,255,255,0.3);line-height:1.8;max-width:460px;margin-bottom:48px;}
        .tc-section-title{font-family:'DM Serif Display',serif;font-size:22px;color:rgba(255,255,255,0.88);margin-bottom:20px;}
        .tc-divider{height:0.5px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent);margin:48px 0;}

        /* TABS */
        .tc-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px;}
        .tc-tab{padding:8px 18px;border-radius:999px;font-size:12px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:rgba(255,255,255,0.4);}
        .tc-tab.active{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);color:#fff;}

        /* SHOWCASE */
        .tc-showcase{border-radius:24px;padding:52px 44px;margin-bottom:48px;transition:all 0.4s;position:relative;overflow:hidden;min-height:260px;display:flex;flex-direction:column;justify-content:center;gap:8px;}

        /* WEIGHT SCALE */
        .tc-weights{display:flex;flex-direction:column;gap:6px;margin-bottom:48px;}
        .tc-weight-row{display:flex;align-items:baseline;gap:16px;padding:10px 0;border-bottom:0.5px solid rgba(255,255,255,0.04);}
        .tc-weight-label{font-size:10px;color:rgba(255,255,255,0.22);letter-spacing:0.08em;width:120px;flex-shrink:0;}
        .tc-weight-text{font-family:'DM Sans',sans-serif;font-size:clamp(1rem,2.5vw,1.8rem);color:#fff;line-height:1;}

        /* RULES */
        .tc-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
        .tc-card{border-radius:16px;padding:20px;border:1px solid;}
        .tc-card-title{font-size:14px;font-weight:500;color:rgba(255,255,255,0.85);margin-bottom:7px;}
        .tc-card-text{font-size:12px;color:rgba(255,255,255,0.35);line-height:1.75;}
        .tc-card-example{margin-top:14px;padding-top:14px;border-top:0.5px solid rgba(255,255,255,0.06);}
      `}</style>

      <div className="tc-page">
        <nav className="tc-nav">
          <button className="tc-back" onClick={onBack}>
            ← Back
          </button>
          <span className="tc-nav-label">Contrast Between Fonts</span>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            LESSON 08
          </span>
        </nav>

        <div className="tc-inner">
          <div className="tc-eyebrow">Typography · Lesson 08</div>
          <div className="tc-title">
            Thin. Regular.
            <br />
            Bold.
          </div>
          <p className="tc-sub">
            Weight contrast is the most powerful typographic tool. Use it
            deliberately to create hierarchy, rhythm, and personality.
          </p>

          {/* EXAMPLES */}
          <div className="tc-section-title">Contrast in Action</div>
          <div className="tc-tabs">
            {EXAMPLES.map((e, i) => (
              <button
                key={i}
                className={`tc-tab${active === i ? " active" : ""}`}
                onClick={() => setActive(i)}
              >
                {e.name}
              </button>
            ))}
          </div>

          <div
            className="tc-showcase"
            style={{
              background: `${ex.accent}0d`,
              border: `1px solid ${ex.accent}25`,
            }}
          >
            <div
              style={{
                fontFamily: ex.headline.font,
                fontWeight: ex.headline.weight,
                fontSize: ex.headline.size,
                color: ex.headline.color,
                lineHeight: 1,
                fontStyle: ex.headline.style || "normal",
                letterSpacing: "-0.02em",
              }}
            >
              {ex.headline.text}
            </div>
            <div
              style={{
                fontFamily: ex.sub.font,
                fontWeight: ex.sub.weight,
                fontSize: ex.sub.size,
                color: ex.sub.color,
                letterSpacing: ex.sub.tracking,
              }}
            >
              {ex.sub.text}
            </div>
            <div
              style={{
                fontFamily: ex.body.font,
                fontWeight: ex.body.weight,
                fontSize: ex.body.size,
                color: ex.body.color,
                marginTop: 8,
              }}
            >
              {ex.body.text}
            </div>
          </div>

          <div className="tc-divider" />

          {/* WEIGHT SCALE */}
          <div className="tc-section-title">The Full Weight Scale</div>
          <div className="tc-weights">
            {WEIGHT_DEMO.map((w, i) => (
              <div key={i} className="tc-weight-row">
                <div className="tc-weight-label">{w.label}</div>
                <div
                  className="tc-weight-text"
                  style={{ fontWeight: w.weight, opacity: w.opacity }}
                >
                  The quick brown fox jumps
                </div>
              </div>
            ))}
          </div>

          <div className="tc-divider" />

          {/* RULES */}
          <div className="tc-section-title">Contrast Rules</div>
          <div className="tc-cards">
            {[
              {
                title: "Skip weights, don't step",
                text: "Bold next to Medium looks like a mistake. Bold next to Light creates tension. Jump at least 2 weights for visible contrast.",
                color: "rgba(196,181,253,0.08)",
                border: "rgba(196,181,253,0.2)",
              },
              {
                title: "Italic is directional contrast",
                text: "An italic face introduces movement and direction against upright type. It's not just emphasis — it's personality.",
                color: "rgba(249,168,212,0.08)",
                border: "rgba(249,168,212,0.2)",
              },
              {
                title: "Thin for luxury, Black for impact",
                text: "Thin weights signal refinement and exclusivity. Black/900 weights signal power and urgency. Choose based on brand emotion.",
                color: "rgba(253,186,116,0.08)",
                border: "rgba(253,186,116,0.2)",
              },
              {
                title: "Variable fonts = infinite contrast",
                text: "Modern variable fonts let you dial in any weight between 100–900. You're not limited to the pre-defined steps.",
                color: "rgba(125,211,252,0.08)",
                border: "rgba(125,211,252,0.2)",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="tc-card"
                style={{ background: c.color, borderColor: c.border }}
              >
                <div className="tc-card-title">{c.title}</div>
                <div className="tc-card-text">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
