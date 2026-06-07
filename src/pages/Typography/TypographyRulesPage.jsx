import { useState, useEffect } from "react";

export default function TypographyRulesPage({ onBack }) {
  const [activeRule, setActiveRule] = useState(0);

  const rules = [
    {
      num: "01",
      title: "Readability is everything",
      body: "If your audience can't read it, it doesn't exist. Every decorative decision must pass the readability test first.",
      example: {
        font: "Georgia, serif",
        text: "Design is thinking made visual.",
        size: 28,
        weight: 400,
      },
      accent: "#c4b5fd",
    },
    {
      num: "02",
      title: "One typeface can be enough",
      body: "A single typeface used across weights and sizes can carry an entire design system. Restraint is a skill.",
      example: {
        font: "'DM Sans', sans-serif",
        text: "Less is always more.",
        size: 32,
        weight: 300,
      },
      accent: "#f9a8d4",
    },
    {
      num: "03",
      title: "Align with intention",
      body: "Left-align for long text. Centre only for short headlines. Right-align sparingly. Never justify on screen.",
      example: {
        font: "Georgia, serif",
        text: "Every line starts somewhere deliberate.",
        size: 22,
        weight: 400,
      },
      accent: "#fdba74",
    },
    {
      num: "04",
      title: "Size signals importance",
      body: "Big means important. Small means supporting. The moment you use similar sizes for everything, hierarchy collapses.",
      example: {
        font: "'DM Serif Display', serif",
        text: "Scale creates meaning.",
        size: 36,
        weight: 700,
      },
      accent: "#6ee7b7",
    },
    {
      num: "05",
      title: "White space is typography too",
      body: "The space around type is as important as the type itself. Breathing room signals confidence.",
      example: {
        font: "'DM Sans', sans-serif",
        text: "Space speaks.",
        size: 40,
        weight: 500,
      },
      accent: "#7dd3fc",
    },
    {
      num: "06",
      title: "Contrast creates tension",
      body: "Pairing a large bold display font with small light body text creates dynamic energy. Same size = boring.",
      example: {
        font: "'Playfair Display', serif",
        text: "Bold meets quiet.",
        size: 30,
        weight: 700,
      },
      accent: "#f472b6",
    },
  ];

  const active = rules[activeRule];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&family=Playfair+Display:wght@400;700&display=swap');
        .tr-page{min-height:100vh;background:#080010;font-family:'DM Sans',sans-serif;color:rgba(255,255,255,0.85);overflow-x:hidden;}
        .tr-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 36px;position:sticky;top:0;background:rgba(8,0,16,0.88);backdrop-filter:blur(20px);border-bottom:0.5px solid rgba(255,255,255,0.07);z-index:100;}
        .tr-back{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.05);border:0.5px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);padding:8px 18px;border-radius:999px;cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
        .tr-back:hover{background:rgba(255,255,255,0.09);color:#fff;}
        .tr-nav-label{font-family:'DM Serif Display',serif;font-size:16px;color:rgba(255,255,255,0.7);}
        .tr-inner{max-width:860px;margin:0 auto;padding:60px 36px 80px;}
        .tr-eyebrow{font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:12px;}
        .tr-title{font-family:'DM Serif Display',serif;font-size:clamp(2.4rem,5vw,4rem);color:#fff;letter-spacing:-0.02em;line-height:1.08;margin-bottom:16px;}
        .tr-sub{font-size:14px;color:rgba(255,255,255,0.3);line-height:1.8;max-width:460px;margin-bottom:52px;}

        /* BIG TYPE SPOTLIGHT */
        .tr-spotlight{border-radius:24px;padding:48px 40px;margin-bottom:48px;position:relative;overflow:hidden;transition:background 0.4s,border-color 0.4s;min-height:220px;display:flex;flex-direction:column;justify-content:center;}
        .tr-spotlight-text{transition:all 0.3s ease;margin-bottom:28px;}
        .tr-spotlight-rule{font-size:11px;letter-spacing:0.1em;text-transform:uppercase;opacity:0.4;margin-bottom:8px;}
        .tr-spotlight-body{font-size:13px;color:rgba(255,255,255,0.4);line-height:1.75;max-width:480px;}
        .tr-spotlight-num{position:absolute;right:32px;top:28px;font-family:'DM Serif Display',serif;font-size:80px;opacity:0.05;line-height:1;font-weight:700;}

        /* RULES LIST */
        .tr-rules{display:flex;flex-direction:column;gap:10px;}
        .tr-rule-item{display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:14px;cursor:pointer;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);transition:all 0.2s;}
        .tr-rule-item:hover{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.12);}
        .tr-rule-item.active-rule{background:rgba(196,181,253,0.08);border-color:rgba(196,181,253,0.3);}
        .tr-rule-num{font-size:11px;color:rgba(255,255,255,0.2);letter-spacing:0.1em;width:24px;flex-shrink:0;}
        .tr-rule-title{font-size:15px;color:rgba(255,255,255,0.82);flex:1;}
        .tr-rule-arrow{font-size:12px;color:rgba(255,255,255,0.2);transition:color 0.2s;}
        .tr-rule-item.active-rule .tr-rule-arrow{color:#c4b5fd;}

        .tr-divider{height:0.5px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent);margin:48px 0;}

        /* KEY REMINDERS */
        .tr-reminders{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;}
        .tr-reminder{border-radius:16px;padding:20px;border:1px solid;}
        .tr-reminder-icon{font-size:22px;margin-bottom:10px;}
        .tr-reminder-title{font-size:14px;font-weight:500;color:rgba(255,255,255,0.85);margin-bottom:6px;}
        .tr-reminder-text{font-size:12px;color:rgba(255,255,255,0.35);line-height:1.7;}
        .tr-section-title{font-family:'DM Serif Display',serif;font-size:22px;color:rgba(255,255,255,0.88);margin-bottom:20px;}
      `}</style>

      <div className="tr-page">
        <nav className="tr-nav">
          <button className="tr-back" onClick={onBack}>
            ← Back
          </button>
          <span className="tr-nav-label">Rules of Typography</span>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            LESSON 01
          </span>
        </nav>

        <div className="tr-inner">
          <div className="tr-eyebrow">Typography · Lesson 01</div>
          <div className="tr-title">
            Rules of
            <br />
            Typography
          </div>
          <p className="tr-sub">
            These aren't arbitrary restrictions — they're the condensed wisdom
            of centuries of type design.
          </p>

          {/* INTERACTIVE SPOTLIGHT */}
          <div
            className="tr-spotlight"
            style={{
              background: `${active.accent}0d`,
              border: `1px solid ${active.accent}30`,
            }}
          >
            <div className="tr-spotlight-num">{active.num}</div>
            <div
              className="tr-spotlight-text"
              style={{
                fontFamily: active.example.font,
                fontSize: active.example.size,
                fontWeight: active.example.weight,
                color: active.accent,
                letterSpacing: "-0.01em",
              }}
            >
              {active.example.text}
            </div>
            <div className="tr-spotlight-rule" style={{ color: active.accent }}>
              {active.title}
            </div>
            <div className="tr-spotlight-body">{active.body}</div>
          </div>

          {/* RULES LIST */}
          <div className="tr-section-title">All Rules</div>
          <div className="tr-rules">
            {rules.map((r, i) => (
              <div
                key={i}
                className={`tr-rule-item${activeRule === i ? " active-rule" : ""}`}
                onClick={() => setActiveRule(i)}
              >
                <div className="tr-rule-num">{r.num}</div>
                <div className="tr-rule-title">{r.title}</div>
                <div className="tr-rule-arrow">→</div>
              </div>
            ))}
          </div>

          <div className="tr-divider" />

          {/* KEY REMINDERS */}
          <div className="tr-section-title">Quick Reminders</div>
          <div className="tr-reminders">
            {[
              {
                icon: "📐",
                title: "Measure (line length)",
                text: "Optimal reading: 45–75 characters per line. Too wide = eye fatigue.",
                color: "rgba(196,181,253,0.08)",
                border: "rgba(196,181,253,0.2)",
              },
              {
                icon: "🔤",
                title: "Font size minimum",
                text: "Body text below 14px on screens becomes uncomfortable to read.",
                color: "rgba(249,168,212,0.08)",
                border: "rgba(249,168,212,0.2)",
              },
              {
                icon: "🎯",
                title: "Max 3 levels",
                text: "Use only 3 hierarchy levels: headline, subheadline, body. More = confusion.",
                color: "rgba(253,186,116,0.08)",
                border: "rgba(253,186,116,0.2)",
              },
              {
                icon: "⚡",
                title: "Contrast ratio",
                text: "WCAG AA: 4.5:1 for body text. WCAG AAA: 7:1. Never grey on grey.",
                color: "rgba(110,231,183,0.07)",
                border: "rgba(110,231,183,0.2)",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="tr-reminder"
                style={{ background: r.color, borderColor: r.border }}
              >
                <div className="tr-reminder-icon">{r.icon}</div>
                <div className="tr-reminder-title">{r.title}</div>
                <div className="tr-reminder-text">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
