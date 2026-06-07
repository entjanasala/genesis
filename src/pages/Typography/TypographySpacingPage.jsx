import { useState, useEffect } from "react";

export default function TypographySpacingPage({ onBack }) {
  const [kerning, setKerning] = useState(0);
  const [tracking, setTracking] = useState(0);
  const [leading, setLeading] = useState(1.5);
  const [activeTab, setActiveTab] = useState("kerning");

  const tabs = ["kerning", "tracking", "leading"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&family=Playfair+Display:wght@700&display=swap');
        .ts-page{min-height:100vh;background:#080010;font-family:'DM Sans',sans-serif;color:rgba(255,255,255,0.85);overflow-x:hidden;}
        .ts-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 36px;position:sticky;top:0;background:rgba(8,0,16,0.88);backdrop-filter:blur(20px);border-bottom:0.5px solid rgba(255,255,255,0.07);z-index:100;}
        .ts-back{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.05);border:0.5px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);padding:8px 18px;border-radius:999px;cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
        .ts-back:hover{background:rgba(255,255,255,0.09);color:#fff;}
        .ts-nav-label{font-family:'DM Serif Display',serif;font-size:16px;color:rgba(255,255,255,0.7);}
        .ts-inner{max-width:860px;margin:0 auto;padding:60px 36px 80px;}
        .ts-eyebrow{font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:12px;}
        .ts-title{font-family:'DM Serif Display',serif;font-size:clamp(2.4rem,5vw,4rem);color:#fff;letter-spacing:-0.02em;line-height:1.08;margin-bottom:16px;}
        .ts-sub{font-size:14px;color:rgba(255,255,255,0.3);line-height:1.8;max-width:460px;margin-bottom:48px;}
        .ts-section-title{font-family:'DM Serif Display',serif;font-size:22px;color:rgba(255,255,255,0.88);margin-bottom:20px;}
        .ts-divider{height:0.5px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent);margin:48px 0;}

        /* TABS */
        .ts-tabs{display:flex;gap:0;margin-bottom:32px;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;width:fit-content;}
        .ts-tab{padding:10px 24px;font-size:13px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;border:none;background:rgba(255,255,255,0.02);color:rgba(255,255,255,0.4);text-transform:capitalize;letter-spacing:0.04em;}
        .ts-tab.active{background:rgba(165,243,252,0.1);color:#a5f3fc;}

        /* INTERACTIVE SANDBOX */
        .ts-sandbox{border-radius:24px;padding:48px 40px;background:rgba(165,243,252,0.05);border:1px solid rgba(165,243,252,0.15);margin-bottom:32px;min-height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;}
        .ts-sandbox-text{font-family:'Playfair Display',serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:700;color:#fff;line-height:1.2;text-align:center;transition:all 0.1s;}

        /* SLIDERS */
        .ts-controls{display:flex;flex-direction:column;gap:20px;margin-bottom:48px;}
        .ts-control{display:flex;align-items:center;gap:16px;}
        .ts-control-label{font-size:12px;color:rgba(255,255,255,0.4);width:100px;letter-spacing:0.04em;flex-shrink:0;}
        .ts-slider{flex:1;height:3px;border-radius:2px;outline:none;cursor:pointer;accent-color:#a5f3fc;}
        .ts-control-val{font-size:12px;color:#a5f3fc;width:52px;text-align:right;font-weight:500;flex-shrink:0;}

        /* DEFINITIONS */
        .ts-defs{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:48px;}
        .ts-def{border-radius:16px;padding:20px;border:1px solid;}
        .ts-def-term{font-size:13px;font-weight:500;margin-bottom:6px;}
        .ts-def-text{font-size:12px;color:rgba(255,255,255,0.35);line-height:1.7;}
        .ts-def-visual{font-family:'Playfair Display',serif;font-size:22px;margin-bottom:12px;font-weight:700;}

        /* RULES */
        .ts-rules{display:flex;flex-direction:column;gap:10px;}
        .ts-rule{padding:16px 20px;border-radius:14px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);}
        .ts-rule-title{font-size:14px;font-weight:500;color:rgba(255,255,255,0.8);margin-bottom:5px;}
        .ts-rule-text{font-size:12px;color:rgba(255,255,255,0.35);line-height:1.7;}
      `}</style>

      <div className="ts-page">
        <nav className="ts-nav">
          <button className="ts-back" onClick={onBack}>
            ← Back
          </button>
          <span className="ts-nav-label">Kerning, Tracking & Leading</span>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            LESSON 07
          </span>
        </nav>

        <div className="ts-inner">
          <div className="ts-eyebrow">Typography · Lesson 07</div>
          <div className="ts-title">
            Kerning,
            <br />
            Tracking
            <br />& Leading
          </div>
          <p className="ts-sub">
            The invisible adjustments that separate amateur from professional
            typography. Drag the sliders to feel the difference.
          </p>

          {/* TABS */}
          <div className="ts-tabs">
            {tabs.map((t) => (
              <button
                key={t}
                className={`ts-tab${activeTab === t ? " active" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* SANDBOX */}
          <div className="ts-sandbox">
            {activeTab === "kerning" && (
              <div
                className="ts-sandbox-text"
                style={{ letterSpacing: `${kerning}px` }}
              >
                WAVE
              </div>
            )}
            {activeTab === "tracking" && (
              <div
                className="ts-sandbox-text"
                style={{ letterSpacing: `${tracking}em` }}
              >
                TYPOGRAPHY
              </div>
            )}
            {activeTab === "leading" && (
              <div
                className="ts-sandbox-text"
                style={{
                  lineHeight: leading,
                  fontSize: "clamp(1.4rem,3vw,2.2rem)",
                }}
              >
                The quick brown fox
                <br />
                jumps over the
                <br />
                lazy dog.
              </div>
            )}
          </div>

          {/* CONTROLS */}
          <div className="ts-controls">
            {activeTab === "kerning" && (
              <div className="ts-control">
                <span className="ts-control-label">Kerning</span>
                <input
                  type="range"
                  className="ts-slider"
                  min="-8"
                  max="20"
                  step="0.5"
                  value={kerning}
                  onChange={(e) => setKerning(Number(e.target.value))}
                />
                <span className="ts-control-val">{kerning}px</span>
              </div>
            )}
            {activeTab === "tracking" && (
              <div className="ts-control">
                <span className="ts-control-label">Tracking</span>
                <input
                  type="range"
                  className="ts-slider"
                  min="-0.1"
                  max="0.5"
                  step="0.01"
                  value={tracking}
                  onChange={(e) => setTracking(Number(e.target.value))}
                />
                <span className="ts-control-val">{tracking.toFixed(2)}em</span>
              </div>
            )}
            {activeTab === "leading" && (
              <div className="ts-control">
                <span className="ts-control-label">Leading</span>
                <input
                  type="range"
                  className="ts-slider"
                  min="0.8"
                  max="3"
                  step="0.05"
                  value={leading}
                  onChange={(e) => setLeading(Number(e.target.value))}
                />
                <span className="ts-control-val">{leading.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="ts-divider" />

          {/* DEFINITIONS */}
          <div className="ts-section-title">The Three</div>
          <div className="ts-defs">
            {[
              {
                term: "Kerning",
                text: "Adjusting space between specific letter pairs. Optical kerning fixes awkward gaps that uniform spacing creates.",
                visual: "AV",
                color: "rgba(196,181,253,0.09)",
                border: "rgba(196,181,253,0.25)",
                accent: "#c4b5fd",
              },
              {
                term: "Tracking",
                text: "Uniform letter spacing applied to a word, line, or block of text. Tight for headlines, loose for uppercase.",
                visual: "ABC",
                color: "rgba(165,243,252,0.08)",
                border: "rgba(165,243,252,0.22)",
                accent: "#a5f3fc",
              },
              {
                term: "Leading",
                text: "The vertical space between lines of text. Named after the lead strips typesetters placed between rows.",
                visual: "A\nB",
                color: "rgba(249,168,212,0.08)",
                border: "rgba(249,168,212,0.22)",
                accent: "#f9a8d4",
              },
            ].map((d, i) => (
              <div
                key={i}
                className="ts-def"
                style={{ background: d.color, borderColor: d.border }}
              >
                <div
                  className="ts-def-visual"
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    color: d.accent,
                    whiteSpace: "pre",
                  }}
                >
                  {d.visual}
                </div>
                <div className="ts-def-term" style={{ color: d.accent }}>
                  {d.term}
                </div>
                <div className="ts-def-text">{d.text}</div>
              </div>
            ))}
          </div>

          {/* RULES */}
          <div className="ts-section-title">Key Rules</div>
          <div className="ts-rules">
            {[
              {
                title: "Uppercase = more tracking",
                text: "Capital letter sequences benefit from +0.05em to +0.15em tracking. They were designed for mixed case — extra space improves all-caps readability.",
              },
              {
                title: "Body text: 1.4–1.8 leading",
                text: "For comfortable reading in paragraphs, line height should be 1.4–1.8× the font size. Below 1.2 feels cramped; above 2.0 feels disconnected.",
              },
              {
                title: "Display text: tight kerning",
                text: "Large headlines at 60px+ should have negative letter spacing (−0.02 to −0.04em). Fonts are designed for text sizes — they appear loose at display scale.",
              },
              {
                title: "Never manually kern every pair",
                text: "Modern fonts include built-in kerning tables. Use 'font-kerning: auto' (CSS default) and only adjust optically where it still looks wrong.",
              },
            ].map((r, i) => (
              <div key={i} className="ts-rule">
                <div className="ts-rule-title">{r.title}</div>
                <div className="ts-rule-text">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
