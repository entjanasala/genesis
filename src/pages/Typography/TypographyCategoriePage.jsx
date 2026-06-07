import { useState, useEffect } from "react";

const CATEGORIES = [
  {
    name: "Serif",
    description:
      "Letterforms with small decorative strokes (serifs) at the ends. The oldest category — born from handwriting and stone carving.",
    when: "Long-form reading, editorial, luxury brands, law, finance, academia.",
    avoid:
      "Interfaces at small sizes, tech products, anything needing a modern feel.",
    fonts: [
      "Georgia",
      "Times New Roman",
      "Playfair Display",
      "Garamond",
      "Merriweather",
    ],
    accent: "#c4b5fd",
    bg: "rgba(196,181,253,0.08)",
    border: "rgba(196,181,253,0.25)",
    sample: "Serif",
    fontFamily: "Georgia, serif",
    personality: ["Traditional", "Trustworthy", "Elegant", "Authoritative"],
  },
  {
    name: "Sans-Serif",
    description:
      "Clean letterforms without decorative strokes. The dominant category of the digital age — optimised for screens.",
    when: "Interfaces, apps, body text on screen, tech brands, anything modern.",
    avoid: "Very long print documents where readers need rhythm cues.",
    fonts: ["Inter", "DM Sans", "Helvetica", "Roboto", "Futura"],
    accent: "#7dd3fc",
    bg: "rgba(125,211,252,0.08)",
    border: "rgba(125,211,252,0.22)",
    sample: "Sans",
    fontFamily: "'DM Sans', sans-serif",
    personality: ["Modern", "Clean", "Neutral", "Accessible"],
  },
  {
    name: "Display",
    description:
      "Typefaces designed exclusively for large sizes — logos, headlines, posters. Usually too complex or expressive for body text.",
    when: "Headlines above 40px, logo type, poster design, brand identity.",
    avoid: "Body text, captions, anything below 24px.",
    fonts: ["Syne", "Bebas Neue", "Abril Fatface", "Righteous", "Boogaloo"],
    accent: "#fdba74",
    bg: "rgba(253,186,116,0.08)",
    border: "rgba(253,186,116,0.22)",
    sample: "Display",
    fontFamily: "Impact, sans-serif",
    personality: ["Expressive", "Bold", "Personality-driven", "Situational"],
  },
  {
    name: "Monospace",
    description:
      "Every character occupies the same width. Originally designed for typewriters and code terminals.",
    when: "Code samples, technical content, developer tools, retro/terminal aesthetics.",
    avoid: "General body text — reading long paragraphs in mono is exhausting.",
    fonts: [
      "Space Mono",
      "JetBrains Mono",
      "Courier",
      "Fira Code",
      "Source Code Pro",
    ],
    accent: "#6ee7b7",
    bg: "rgba(110,231,183,0.08)",
    border: "rgba(110,231,183,0.22)",
    sample: "Mono",
    fontFamily: "'Courier New', monospace",
    personality: ["Technical", "Precise", "Retro", "Developer"],
  },
  {
    name: "Script",
    description:
      "Mimics handwriting and calligraphy. Extremely expressive but highly situational — easily overused.",
    when: "Wedding invitations, luxury packaging, personal brands, short decorative headlines.",
    avoid:
      "Body text (ever), interfaces, anything requiring legibility at speed.",
    fonts: ["Pacifico", "Dancing Script", "Great Vibes", "Satisfy", "Lobster"],
    accent: "#f9a8d4",
    bg: "rgba(249,168,212,0.08)",
    border: "rgba(249,168,212,0.22)",
    sample: "Script",
    fontFamily: "cursive",
    personality: ["Romantic", "Personal", "Decorative", "Flowing"],
  },
];

export default function TypographyCategoriesPage({ onBack }) {
  const [active, setActive] = useState(0);
  const cat = CATEGORIES[active];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&family=Space+Mono&family=Syne:wght@800&display=swap');
        .tcat-page{min-height:100vh;background:#080010;font-family:'DM Sans',sans-serif;color:rgba(255,255,255,0.85);overflow-x:hidden;}
        .tcat-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 36px;position:sticky;top:0;background:rgba(8,0,16,0.88);backdrop-filter:blur(20px);border-bottom:0.5px solid rgba(255,255,255,0.07);z-index:100;}
        .tcat-back{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.05);border:0.5px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);padding:8px 18px;border-radius:999px;cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
        .tcat-back:hover{background:rgba(255,255,255,0.09);color:#fff;}
        .tcat-nav-label{font-family:'DM Serif Display',serif;font-size:16px;color:rgba(255,255,255,0.7);}
        .tcat-inner{max-width:860px;margin:0 auto;padding:60px 36px 80px;}
        .tcat-eyebrow{font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:12px;}
        .tcat-title{font-family:'DM Serif Display',serif;font-size:clamp(2.4rem,5vw,4rem);color:#fff;letter-spacing:-0.02em;line-height:1.08;margin-bottom:16px;}
        .tcat-sub{font-size:14px;color:rgba(255,255,255,0.3);line-height:1.8;max-width:460px;margin-bottom:48px;}
        .tcat-section-title{font-family:'DM Serif Display',serif;font-size:22px;color:rgba(255,255,255,0.88);margin-bottom:20px;}
        .tcat-divider{height:0.5px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent);margin:48px 0;}

        /* CATEGORY TABS */
        .tcat-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px;}
        .tcat-tab{padding:9px 20px;border-radius:999px;font-size:13px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:rgba(255,255,255,0.4);}
        .tcat-tab.active{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);color:#fff;}

        /* BIG SAMPLE */
        .tcat-sample{border-radius:24px;padding:52px 44px;margin-bottom:32px;transition:all 0.4s;display:flex;align-items:center;justify-content:center;min-height:200px;}
        .tcat-sample-text{font-size:clamp(4rem,10vw,8rem);font-weight:700;line-height:1;letter-spacing:-0.02em;text-align:center;transition:all 0.4s;}

        /* INFO GRID */
        .tcat-info{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px;}
        .tcat-info-card{border-radius:16px;padding:18px;border:1px solid rgba(255,255,255,0.07);background:rgba(255,255,255,0.03);}
        .tcat-info-label{font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.22);margin-bottom:8px;}
        .tcat-info-text{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.7;}

        /* PERSONALITY TAGS */
        .tcat-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px;}
        .tcat-tag{font-size:11px;padding:5px 14px;border-radius:999px;}

        /* FONT LIST */
        .tcat-fonts{display:flex;flex-direction:column;gap:6px;margin-bottom:48px;}
        .tcat-font-row{display:flex;align-items:baseline;gap:16px;padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.02);}
        .tcat-font-name{font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:0.06em;width:160px;flex-shrink:0;}
        .tcat-font-sample{font-size:22px;color:rgba(255,255,255,0.7);line-height:1;}

        /* ALL CATEGORIES QUICK VIEW */
        .tcat-all{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;}
        .tcat-all-card{border-radius:16px;padding:20px 16px;cursor:pointer;transition:all 0.2s;border:1px solid;text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;}
        .tcat-all-card:hover{transform:translateY(-2px);}
        .tcat-all-sample{font-size:40px;font-weight:700;line-height:1;}
        .tcat-all-name{font-size:11px;letter-spacing:0.1em;text-transform:uppercase;opacity:0.5;}
      `}</style>

      <div className="tcat-page">
        <nav className="tcat-nav">
          <button className="tcat-back" onClick={onBack}>
            ← Back
          </button>
          <span className="tcat-nav-label">Font Categories</span>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            LESSON 11
          </span>
        </nav>

        <div className="tcat-inner">
          <div className="tcat-eyebrow">Typography · Lesson 11</div>
          <div className="tcat-title">
            Filtering Font
            <br />
            Categories
          </div>
          <p className="tcat-sub">
            Before you can choose a font, you need to know what category to
            choose from. Each one carries different associations.
          </p>

          <div className="tcat-tabs">
            {CATEGORIES.map((c, i) => (
              <button
                key={i}
                className={`tcat-tab${active === i ? " active" : ""}`}
                onClick={() => setActive(i)}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* BIG SAMPLE */}
          <div
            className="tcat-sample"
            style={{
              background: `${cat.accent}0d`,
              border: `1px solid ${cat.accent}25`,
            }}
          >
            <div
              className="tcat-sample-text"
              style={{ fontFamily: cat.fontFamily, color: cat.accent }}
            >
              {cat.sample}
            </div>
          </div>

          {/* PERSONALITY */}
          <div className="tcat-tags">
            {cat.personality.map((p, i) => (
              <span
                key={i}
                className="tcat-tag"
                style={{
                  color: cat.accent,
                  background: `${cat.accent}14`,
                  border: `0.5px solid ${cat.accent}33`,
                }}
              >
                {p}
              </span>
            ))}
          </div>

          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.75,
              marginBottom: 24,
            }}
          >
            {cat.description}
          </p>

          {/* INFO */}
          <div className="tcat-info">
            <div className="tcat-info-card">
              <div className="tcat-info-label" style={{ color: cat.accent }}>
                Use when
              </div>
              <div className="tcat-info-text">{cat.when}</div>
            </div>
            <div className="tcat-info-card">
              <div
                className="tcat-info-label"
                style={{ color: "rgba(251,113,133,0.8)" }}
              >
                Avoid when
              </div>
              <div className="tcat-info-text">{cat.avoid}</div>
            </div>
          </div>

          {/* FONT EXAMPLES */}
          <div className="tcat-section-title">Popular Fonts</div>
          <div className="tcat-fonts">
            {cat.fonts.map((f, i) => (
              <div key={i} className="tcat-font-row">
                <div className="tcat-font-name">{f}</div>
                <div
                  className="tcat-font-sample"
                  style={{ fontFamily: cat.fontFamily, color: cat.accent }}
                >
                  The quick brown fox
                </div>
              </div>
            ))}
          </div>

          <div className="tcat-divider" />

          {/* ALL CATEGORIES */}
          <div className="tcat-section-title">All Categories</div>
          <div className="tcat-all">
            {CATEGORIES.map((c, i) => (
              <div
                key={i}
                className="tcat-all-card"
                style={{
                  background: c.bg,
                  borderColor: c.border,
                  color: c.accent,
                }}
                onClick={() => setActive(i)}
              >
                <div
                  className="tcat-all-sample"
                  style={{ fontFamily: c.fontFamily }}
                >
                  {c.sample[0]}
                </div>
                <div className="tcat-all-name">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
