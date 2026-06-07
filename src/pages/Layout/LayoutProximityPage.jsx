import { useState, useEffect } from "react";

export default function LayoutProximityPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [spread, setSpread] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    {
      label: "Related items",
      desc: "Elements that share a purpose live close together.",
      accent: "#86efac",
    },
    {
      label: "White space groups",
      desc: "Space between groups is larger than space within groups.",
      accent: "#a5f3fc",
    },
    {
      label: "Visual chunks",
      desc: "The eye reads clusters as single units before reading the parts.",
      accent: "#fda4af",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        .lp-page { min-height:100vh; background:#06080f; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.85); overflow-x:hidden; }
        .lp-nav { display:flex; align-items:center; justify-content:space-between; padding:18px 48px; position:sticky; top:0; background:rgba(6,8,15,0.9); backdrop-filter:blur(24px); border-bottom:0.5px solid rgba(255,255,255,0.06); z-index:100; }
        .lp-back { background:none; border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.45); padding:8px 20px; border-radius:999px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .lp-back:hover { color:#fff; border-color:rgba(255,255,255,0.25); }
        .lp-nav-label { font-family:'DM Serif Display',serif; font-size:16px; color:rgba(255,255,255,0.6); }
        .lp-tag { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.2); }

        .lp-hero { position:relative; padding:80px 48px 60px; border-bottom:0.5px solid rgba(255,255,255,0.06); overflow:hidden; }
        .lp-hero-lines { position:absolute; inset:0; pointer-events:none; }
        .lp-hl { position:absolute; left:0; right:0; height:0.5px; background:linear-gradient(to right, transparent 5%, rgba(134,239,172,0.07) 40%, rgba(134,239,172,0.07) 60%, transparent 95%); }
        .lp-vl { position:absolute; top:0; bottom:0; width:0.5px; background:linear-gradient(to bottom, transparent 10%, rgba(134,239,172,0.05) 50%, transparent 90%); }
        .lp-hero-inner { position:relative; z-index:1; max-width:640px; }
        .lp-eyebrow { font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:16px; display:flex; align-items:center; gap:12px; }
        .lp-eyebrow::after { content:''; flex:0 0 40px; height:0.5px; background:rgba(255,255,255,0.2); }
        .lp-hero-title { font-family:'DM Serif Display',serif; font-size:clamp(3rem,7vw,6rem); font-weight:400; line-height:0.95; letter-spacing:-0.03em; color:#fff; margin-bottom:24px; }
        .lp-hero-title em { font-style:italic; color:#86efac; display:block; }
        .lp-hero-sub { font-size:15px; color:rgba(255,255,255,0.32); line-height:1.8; max-width:480px; }
        .lp-hero-num { position:absolute; right:48px; bottom:-20px; font-family:'DM Serif Display',serif; font-size:clamp(6rem,15vw,14rem); color:transparent; -webkit-text-stroke:0.5px rgba(134,239,172,0.08); line-height:1; pointer-events:none; user-select:none; }

        .lp-section { padding:72px 48px; border-bottom:0.5px solid rgba(255,255,255,0.06); }
        .lp-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .lp-section-title { font-family:'DM Serif Display',serif; font-size:clamp(1.6rem,3vw,2.2rem); color:#fff; letter-spacing:-0.02em; }
        .lp-section-line { flex:1; height:0.5px; background:rgba(255,255,255,0.07); }
        .lp-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:40px; max-width:520px; line-height:1.7; }

        /* PROXIMITY INTERACTIVE */
        .lp-prox-wrap { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .lp-prox-canvas { border:0.5px solid rgba(255,255,255,0.08); border-radius:16px; padding:36px; background:rgba(255,255,255,0.02); min-height:260px; display:flex; flex-direction:column; justify-content:center; gap:var(--gap, 8px); transition:all 0.5s; position:relative; overflow:hidden; }
        .lp-dot-group { display:flex; gap:8px; flex-wrap:wrap; }
        .lp-dot { width:10px; height:10px; border-radius:50%; background:rgba(134,239,172,0.6); flex-shrink:0; transition:margin 0.5s; }
        .lp-dot.spread { margin:12px; }
        .lp-prox-info { display:flex; flex-direction:column; justify-content:center; gap:16px; }
        .lp-prox-title { font-family:'DM Serif Display',serif; font-size:24px; color:#fff; margin-bottom:6px; }
        .lp-prox-desc { font-size:13px; color:rgba(255,255,255,0.35); line-height:1.75; }
        .lp-toggle-btn { display:flex; align-items:center; gap:10px; cursor:pointer; width:fit-content; margin-top:8px; }
        .lp-toggle-track { width:36px; height:20px; border-radius:10px; border:0.5px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.04); position:relative; transition:background 0.2s; }
        .lp-toggle-track.on { background:rgba(134,239,172,0.2); border-color:rgba(134,239,172,0.4); }
        .lp-toggle-thumb { width:14px; height:14px; border-radius:50%; background:rgba(255,255,255,0.4); position:absolute; top:2px; left:2px; transition:all 0.2s; }
        .lp-toggle-track.on .lp-toggle-thumb { left:18px; background:#86efac; }
        .lp-toggle-label { font-size:12px; color:rgba(255,255,255,0.35); }

        /* GESTALT DEMOS */
        .lp-tabs { display:flex; gap:8px; margin-bottom:28px; }
        .lp-tab { padding:8px 20px; border-radius:999px; font-size:12px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:0.5px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.38); }
        .lp-tab.active { background:rgba(134,239,172,0.1); border-color:rgba(134,239,172,0.3); color:#86efac; }
        .lp-demo-layout { display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:center; }
        .lp-demo-canvas { border:0.5px solid rgba(255,255,255,0.07); border-radius:16px; padding:36px; background:rgba(255,255,255,0.02); min-height:200px; display:flex; align-items:center; justify-content:center; }
        .lp-demo-info { font-size:13px; color:rgba(255,255,255,0.38); line-height:1.8; }
        .lp-demo-name { font-family:'DM Serif Display',serif; font-size:22px; color:#fff; margin-bottom:10px; }

        /* UI EXAMPLE */
        .lp-ui-example { border:0.5px solid rgba(255,255,255,0.07); border-radius:20px; overflow:hidden; }
        .lp-ui-top { background:rgba(255,255,255,0.03); padding:20px 24px; border-bottom:0.5px solid rgba(255,255,255,0.06); display:flex; align-items:center; gap:16px; }
        .lp-ui-avatar { width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,#86efac,#a5f3fc); }
        .lp-ui-name { font-size:14px; color:#fff; font-weight:500; }
        .lp-ui-role { font-size:11px; color:rgba(255,255,255,0.28); margin-top:2px; }
        .lp-ui-body { padding:24px; display:flex; flex-direction:column; gap:16px; }
        .lp-ui-stat-group { display:flex; gap:0; border:0.5px solid rgba(255,255,255,0.08); border-radius:12px; overflow:hidden; }
        .lp-ui-stat { flex:1; padding:14px 16px; text-align:center; border-right:0.5px solid rgba(255,255,255,0.06); }
        .lp-ui-stat:last-child { border-right:none; }
        .lp-ui-stat-num { font-family:'DM Serif Display',serif; font-size:22px; color:#fff; }
        .lp-ui-stat-label { font-size:10px; color:rgba(255,255,255,0.25); letter-spacing:0.08em; text-transform:uppercase; margin-top:3px; }
        .lp-ui-action-group { display:flex; gap:8px; }
        .lp-ui-btn { flex:1; padding:10px; border-radius:8px; text-align:center; font-size:12px; cursor:default; font-weight:500; }

        /* RULES */
        .lp-rules { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        .lp-rule { border-radius:16px; padding:22px; border:1px solid; }
        .lp-rule-icon { font-size:24px; margin-bottom:12px; }
        .lp-rule-title { font-size:14px; font-weight:500; color:rgba(255,255,255,0.85); margin-bottom:7px; }
        .lp-rule-text { font-size:12px; color:rgba(255,255,255,0.35); line-height:1.7; }
      `}</style>

      <div className="lp-page">
        <nav className="lp-nav">
          <button className="lp-back" onClick={onBack}>
            ← Back
          </button>
          <span className="lp-nav-label">Proximity & Grouping</span>
          <span className="lp-tag">Lesson 02</span>
        </nav>

        <div className="lp-hero">
          <div className="lp-hero-lines">
            {[25, 50, 75].map((p, i) => (
              <div key={i} className="lp-hl" style={{ top: `${p}%` }} />
            ))}
            {[20, 40, 60, 80].map((p, i) => (
              <div key={i} className="lp-vl" style={{ left: `${p}%` }} />
            ))}
          </div>
          <div className="lp-hero-inner">
            <div className="lp-eyebrow">Layout · Lesson 02</div>
            <h1 className="lp-hero-title">
              Proximity &<br />
              <em>Grouping</em>
            </h1>
            <p className="lp-hero-sub">
              Things that belong together should live together. Space
              communicates relationship before the eye reads a single word.
            </p>
          </div>
          <div className="lp-hero-num">02</div>
        </div>

        {/* INTERACTIVE PROXIMITY */}
        <div className="lp-section">
          <div className="lp-section-header">
            <div className="lp-section-title">See It Live</div>
            <div className="lp-section-line" />
          </div>
          <p className="lp-section-sub">
            Toggle the spacing to see how proximity creates — or destroys —
            perceived relationships.
          </p>
          <div className="lp-prox-wrap">
            <div className="lp-prox-canvas">
              <div
                className="lp-dot-group"
                style={{ marginBottom: spread ? 32 : 4 }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`lp-dot${spread ? " spread" : ""}`} />
                ))}
              </div>
              <div
                className="lp-dot-group"
                style={{ marginBottom: spread ? 32 : 4 }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`lp-dot${spread ? " spread" : ""}`}
                    style={{ background: "rgba(165,243,252,0.6)" }}
                  />
                ))}
              </div>
              <div className="lp-dot-group">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`lp-dot${spread ? " spread" : ""}`}
                    style={{ background: "rgba(253,164,175,0.6)" }}
                  />
                ))}
              </div>
            </div>
            <div className="lp-prox-info">
              <div>
                <div className="lp-prox-title">
                  {spread ? "No grouping" : "Clear groups"}
                </div>
                <div className="lp-prox-desc">
                  {spread
                    ? "With equal spacing between all dots, the eye sees 15 individual elements — no hierarchy, no relationships."
                    : "Tight spacing within rows and larger gaps between rows makes the brain instantly read 3 groups of 5."}
                </div>
              </div>
              <div className="lp-toggle-btn" onClick={() => setSpread(!spread)}>
                <div className={`lp-toggle-track${spread ? " on" : ""}`}>
                  <div className="lp-toggle-thumb" />
                </div>
                <span className="lp-toggle-label">
                  {spread ? "Spread out" : "Grouped"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* GESTALT */}
        <div className="lp-section">
          <div className="lp-section-header">
            <div className="lp-section-title">Gestalt Principles</div>
            <div className="lp-section-line" />
          </div>
          <p className="lp-section-sub">
            The human brain creates meaning from visual patterns before
            conscious thought.
          </p>
          <div className="lp-tabs">
            {demos.map((d, i) => (
              <button
                key={i}
                className={`lp-tab${activeDemo === i ? " active" : ""}`}
                onClick={() => setActiveDemo(i)}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="lp-demo-layout">
            <div className="lp-demo-canvas">
              {activeDemo === 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    width: "100%",
                  }}
                >
                  {[
                    ["Title", 180, "#fff"],
                    ["Subtitle", 120, "rgba(255,255,255,0.5)"],
                    ["Body text line one", 220, "rgba(255,255,255,0.25)"],
                    ["Body text line two", 180, "rgba(255,255,255,0.25)"],
                  ].map(([t, w, c], i) => (
                    <div
                      key={i}
                      style={{
                        height: 8,
                        width: w,
                        background: c,
                        borderRadius: 4,
                      }}
                    />
                  ))}
                  <div style={{ height: 24 }} />
                  {[
                    ["Another title", 160, "#fff"],
                    ["Subtitle here", 100, "rgba(255,255,255,0.5)"],
                  ].map(([t, w, c], i) => (
                    <div
                      key={i}
                      style={{
                        height: 8,
                        width: w,
                        background: c,
                        borderRadius: 4,
                      }}
                    />
                  ))}
                </div>
              )}
              {activeDemo === 1 && (
                <div style={{ display: "flex", gap: 32 }}>
                  {[
                    [3, "#86efac"],
                    [2, "#a5f3fc"],
                    [4, "#fda4af"],
                  ].map(([count, color], gi) => (
                    <div
                      key={gi}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {Array.from({ length: count }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: `${color}40`,
                            border: `0.5px solid ${color}60`,
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {activeDemo === 2 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20,
                  }}
                >
                  {[
                    ["#86efac", 3],
                    ["#a5f3fc", 2],
                    ["#fda4af", 4],
                    ["#c4b5fd", 2],
                  ].map(([color, count], gi) => (
                    <div
                      key={gi}
                      style={{
                        border: `0.5px solid ${color}30`,
                        borderRadius: 10,
                        padding: 12,
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      {Array.from({ length: count }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            height: 6,
                            background: `${color}40`,
                            borderRadius: 3,
                            width: i === 0 ? "80%" : "60%",
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="lp-demo-info">
              <div className="lp-demo-name">{demos[activeDemo].label}</div>
              <div>{demos[activeDemo].desc}</div>
            </div>
          </div>
        </div>

        {/* UI EXAMPLE */}
        <div className="lp-section">
          <div className="lp-section-header">
            <div className="lp-section-title">Proximity in UI</div>
            <div className="lp-section-line" />
          </div>
          <p className="lp-section-sub">
            A real card component uses proximity to communicate what belongs
            together.
          </p>
          <div style={{ maxWidth: 400 }}>
            <div className="lp-ui-example">
              <div className="lp-ui-top">
                <div className="lp-ui-avatar" />
                <div>
                  <div className="lp-ui-name">Alex Morgan</div>
                  <div className="lp-ui-role">Senior Designer</div>
                </div>
              </div>
              <div className="lp-ui-body">
                <div className="lp-ui-stat-group">
                  {[
                    ["142", "Projects"],
                    ["98%", "Rating"],
                    ["4.2k", "Hours"],
                  ].map(([n, l], i) => (
                    <div key={i} className="lp-ui-stat">
                      <div className="lp-ui-stat-num">{n}</div>
                      <div className="lp-ui-stat-label">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="lp-ui-action-group">
                  <div
                    className="lp-ui-btn"
                    style={{
                      background: "rgba(134,239,172,0.15)",
                      color: "#86efac",
                      border: "0.5px solid rgba(134,239,172,0.3)",
                    }}
                  >
                    Follow
                  </div>
                  <div
                    className="lp-ui-btn"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.4)",
                      border: "0.5px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    Message
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RULES */}
        <div className="lp-section" style={{ borderBottom: "none" }}>
          <div className="lp-section-header">
            <div className="lp-section-title">Key Rules</div>
            <div className="lp-section-line" />
          </div>
          <div className="lp-rules">
            {[
              {
                icon: "◎",
                title: "Space within < Space between",
                text: "The gap inside a group must always be smaller than the gap separating groups. This is the fundamental proximity rule.",
                bg: "rgba(134,239,172,0.07)",
                border: "rgba(134,239,172,0.2)",
              },
              {
                icon: "⊠",
                title: "Label proximity",
                text: "Form labels should be closer to their input than to the previous field. Misplaced labels cause user errors.",
                bg: "rgba(165,243,252,0.07)",
                border: "rgba(165,243,252,0.2)",
              },
              {
                icon: "□",
                title: "White space is grouping",
                text: "A generous margin around a block of content groups it as a unit. You don't need a border — space does the job.",
                bg: "rgba(253,164,175,0.07)",
                border: "rgba(253,164,175,0.2)",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="lp-rule"
                style={{ background: r.bg, borderColor: r.border }}
              >
                <div className="lp-rule-icon">{r.icon}</div>
                <div className="lp-rule-title">{r.title}</div>
                <div className="lp-rule-text">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
