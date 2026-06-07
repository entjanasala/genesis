import { useState, useEffect } from "react";

export default function LayoutBalancePage({ onBack }) {
  const [weight, setWeight] = useState(50);
  const [symmetry, setSymmetry] = useState("symmetric");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        .lb-page { min-height:100vh; background:#06080f; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.85); overflow-x:hidden; }
        .lb-nav { display:flex; align-items:center; justify-content:space-between; padding:18px 48px; position:sticky; top:0; background:rgba(6,8,15,0.9); backdrop-filter:blur(24px); border-bottom:0.5px solid rgba(255,255,255,0.06); z-index:100; }
        .lb-back { background:none; border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.45); padding:8px 20px; border-radius:999px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .lb-back:hover { color:#fff; border-color:rgba(255,255,255,0.25); }
        .lb-nav-label { font-family:'DM Serif Display',serif; font-size:16px; color:rgba(255,255,255,0.6); }
        .lb-tag { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.2); }

        .lb-hero { position:relative; padding:80px 48px 60px; border-bottom:0.5px solid rgba(255,255,255,0.06); overflow:hidden; }
        .lb-hero-lines { position:absolute; inset:0; pointer-events:none; }
        .lb-hl { position:absolute; left:0; right:0; height:0.5px; background:linear-gradient(to right, transparent 5%, rgba(253,164,175,0.07) 40%, rgba(253,164,175,0.07) 60%, transparent 95%); }
        .lb-vl { position:absolute; top:0; bottom:0; width:0.5px; background:linear-gradient(to bottom, transparent 10%, rgba(253,164,175,0.05) 50%, transparent 90%); }
        .lb-hero-inner { position:relative; z-index:1; max-width:640px; }
        .lb-eyebrow { font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:16px; display:flex; align-items:center; gap:12px; }
        .lb-eyebrow::after { content:''; flex:0 0 40px; height:0.5px; background:rgba(255,255,255,0.2); }
        .lb-hero-title { font-family:'DM Serif Display',serif; font-size:clamp(3rem,7vw,6rem); font-weight:400; line-height:0.95; letter-spacing:-0.03em; color:#fff; margin-bottom:24px; }
        .lb-hero-title em { font-style:italic; color:#fda4af; display:block; }
        .lb-hero-sub { font-size:15px; color:rgba(255,255,255,0.32); line-height:1.8; max-width:480px; }
        .lb-hero-num { position:absolute; right:48px; bottom:-20px; font-family:'DM Serif Display',serif; font-size:clamp(6rem,15vw,14rem); color:transparent; -webkit-text-stroke:0.5px rgba(253,164,175,0.08); line-height:1; pointer-events:none; user-select:none; }

        .lb-section { padding:72px 48px; border-bottom:0.5px solid rgba(255,255,255,0.06); }
        .lb-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .lb-section-title { font-family:'DM Serif Display',serif; font-size:clamp(1.6rem,3vw,2.2rem); color:#fff; letter-spacing:-0.02em; }
        .lb-section-line { flex:1; height:0.5px; background:rgba(255,255,255,0.07); }
        .lb-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:40px; max-width:520px; line-height:1.7; }

        /* BALANCE SCALE */
        .lb-scale-wrap { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .lb-scale-canvas { border:0.5px solid rgba(255,255,255,0.08); border-radius:16px; padding:36px; background:rgba(255,255,255,0.02); min-height:260px; display:flex; flex-direction:column; justify-content:space-between; }
        .lb-scale-bar { height:2px; background:rgba(255,255,255,0.1); border-radius:1px; margin-bottom:32px; position:relative; }
        .lb-scale-fill { height:100%; border-radius:1px; background:linear-gradient(to right, #fda4af, #a5f3fc); transition:width 0.3s; }
        .lb-scale-pivot { position:absolute; top:-4px; width:10px; height:10px; border-radius:50%; background:#fff; transform:translateX(-50%); transition:left 0.3s; }
        .lb-elements { display:flex; gap:12px; flex-wrap:wrap; align-items:flex-end; }
        .lb-block { border-radius:8px; background:rgba(253,164,175,0.2); border:0.5px solid rgba(253,164,175,0.3); transition:all 0.3s; }
        .lb-slider-wrap { margin-top:24px; }
        .lb-slider-label { font-size:11px; color:rgba(255,255,255,0.3); margin-bottom:8px; letter-spacing:0.06em; display:flex; justify-content:space-between; }
        .lb-slider { width:100%; accent-color:#fda4af; }
        .lb-scale-info { display:flex; flex-direction:column; justify-content:center; gap:12px; }
        .lb-balance-status { font-family:'DM Serif Display',serif; font-size:28px; color:#fff; margin-bottom:8px; }
        .lb-balance-desc { font-size:13px; color:rgba(255,255,255,0.35); line-height:1.75; }

        /* SYMMETRY TYPES */
        .lb-sym-tabs { display:flex; gap:8px; margin-bottom:28px; }
        .lb-sym-tab { padding:8px 20px; border-radius:999px; font-size:12px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:0.5px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.38); }
        .lb-sym-tab.active { background:rgba(253,164,175,0.1); border-color:rgba(253,164,175,0.3); color:#fda4af; }
        .lb-sym-layout { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .lb-sym-canvas { border:0.5px solid rgba(255,255,255,0.07); border-radius:16px; padding:32px; background:rgba(255,255,255,0.02); min-height:200px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
        .lb-sym-center { position:absolute; left:50%; top:0; bottom:0; width:0.5px; background:rgba(255,255,255,0.08); }
        .lb-sym-info { display:flex; flex-direction:column; justify-content:center; }
        .lb-sym-title { font-family:'DM Serif Display',serif; font-size:22px; color:#fff; margin-bottom:8px; }
        .lb-sym-desc { font-size:13px; color:rgba(255,255,255,0.35); line-height:1.75; }

        /* RULE OF THIRDS */
        .lb-thirds { position:relative; border:0.5px solid rgba(255,255,255,0.08); border-radius:16px; overflow:hidden; height:240px; background:rgba(255,255,255,0.02); }
        .lb-third-line-v { position:absolute; top:0; bottom:0; width:0.5px; background:rgba(253,164,175,0.2); }
        .lb-third-line-h { position:absolute; left:0; right:0; height:0.5px; background:rgba(253,164,175,0.2); }
        .lb-third-dot { position:absolute; width:12px; height:12px; border-radius:50%; background:#fda4af; transform:translate(-50%,-50%); box-shadow:0 0 0 4px rgba(253,164,175,0.2); }
        .lb-thirds-label { position:absolute; bottom:12px; left:50%; transform:translateX(-50%); font-size:11px; color:rgba(255,255,255,0.2); letter-spacing:0.1em; text-transform:uppercase; white-space:nowrap; }

        /* RULES */
        .lb-rules { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        .lb-rule { border-radius:16px; padding:22px; border:1px solid; }
        .lb-rule-icon { font-size:24px; margin-bottom:12px; }
        .lb-rule-title { font-size:14px; font-weight:500; color:rgba(255,255,255,0.85); margin-bottom:7px; }
        .lb-rule-text { font-size:12px; color:rgba(255,255,255,0.35); line-height:1.7; }
      `}</style>

      <div className="lb-page">
        <nav className="lb-nav">
          <button className="lb-back" onClick={onBack}>
            ← Back
          </button>
          <span className="lb-nav-label">Visual Balance</span>
          <span className="lb-tag">Lesson 03</span>
        </nav>

        <div className="lb-hero">
          <div className="lb-hero-lines">
            {[25, 50, 75].map((p, i) => (
              <div key={i} className="lb-hl" style={{ top: `${p}%` }} />
            ))}
            {[20, 40, 60, 80].map((p, i) => (
              <div key={i} className="lb-vl" style={{ left: `${p}%` }} />
            ))}
          </div>
          <div className="lb-hero-inner">
            <div className="lb-eyebrow">Layout · Lesson 03</div>
            <h1 className="lb-hero-title">
              Visual
              <br />
              <em>Balance</em>
            </h1>
            <p className="lb-hero-sub">
              Symmetry is safe. Asymmetry is interesting. Learn to distribute
              visual weight deliberately to create tension, resolution, and
              meaning.
            </p>
          </div>
          <div className="lb-hero-num">03</div>
        </div>

        {/* BALANCE SCALE */}
        <div className="lb-section">
          <div className="lb-section-header">
            <div className="lb-section-title">Visual Weight</div>
            <div className="lb-section-line" />
          </div>
          <p className="lb-section-sub">
            Drag the slider to shift visual weight left or right. Notice how
            balance feels different from imbalance.
          </p>
          <div className="lb-scale-wrap">
            <div className="lb-scale-canvas">
              <div>
                <div className="lb-scale-bar">
                  <div
                    className="lb-scale-fill"
                    style={{ width: `${weight}%` }}
                  />
                  <div
                    className="lb-scale-pivot"
                    style={{ left: `${weight}%` }}
                  />
                </div>
                <div className="lb-elements">
                  {Array.from({ length: Math.round(weight / 12) + 1 }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className="lb-block"
                        style={{ width: 20 + i * 8, height: 20 + i * 6 }}
                      />
                    ),
                  )}
                </div>
              </div>
              <div className="lb-slider-wrap">
                <div className="lb-slider-label">
                  <span>Left heavy</span>
                  <span>Balanced</span>
                  <span>Right heavy</span>
                </div>
                <input
                  type="range"
                  className="lb-slider"
                  min={10}
                  max={90}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="lb-scale-info">
              <div className="lb-balance-status">
                {weight > 45 && weight < 55
                  ? "Balanced"
                  : weight < 35 || weight > 65
                    ? "Imbalanced"
                    : "Near balance"}
              </div>
              <div className="lb-balance-desc">
                {weight > 45 && weight < 55
                  ? "Visual weight is distributed evenly. The composition feels resolved and stable."
                  : weight < 35 || weight > 65
                    ? "The composition feels unstable. This can create urgency and movement — use deliberately."
                    : "Slight tension without discomfort. Often more interesting than perfect symmetry."}
              </div>
            </div>
          </div>
        </div>

        {/* SYMMETRY TYPES */}
        <div className="lb-section">
          <div className="lb-section-header">
            <div className="lb-section-title">Symmetry Types</div>
            <div className="lb-section-line" />
          </div>
          <p className="lb-section-sub">
            Not all balance is equal. Each type creates a different emotional
            response.
          </p>
          <div className="lb-sym-tabs">
            {["symmetric", "asymmetric", "radial"].map((s) => (
              <button
                key={s}
                className={`lb-sym-tab${symmetry === s ? " active" : ""}`}
                onClick={() => setSymmetry(s)}
                style={{ textTransform: "capitalize" }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="lb-sym-layout">
            <div className="lb-sym-canvas">
              <div className="lb-sym-center" />
              {symmetry === "symmetric" && (
                <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
                  {[1, 1].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: "rgba(253,164,175,0.2)",
                          border: "0.5px solid rgba(253,164,175,0.4)",
                        }}
                      />
                      <div
                        style={{
                          width: 32,
                          height: 8,
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.15)",
                        }}
                      />
                      <div
                        style={{
                          width: 24,
                          height: 6,
                          borderRadius: 3,
                          background: "rgba(255,255,255,0.08)",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
              {symmetry === "asymmetric" && (
                <div
                  style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 16,
                      background: "rgba(253,164,175,0.2)",
                      border: "0.5px solid rgba(253,164,175,0.4)",
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        height: 8,
                        background: "rgba(255,255,255,0.2)",
                        borderRadius: 4,
                        width: "90%",
                      }}
                    />
                    <div
                      style={{
                        height: 6,
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: 3,
                        width: "70%",
                      }}
                    />
                    <div
                      style={{
                        height: 6,
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 3,
                        width: "80%",
                      }}
                    />
                  </div>
                </div>
              )}
              {symmetry === "radial" && (
                <div style={{ position: "relative", width: 100, height: 100 }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "0.5px solid rgba(253,164,175,0.2)",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 16,
                      border: "0.5px solid rgba(253,164,175,0.15)",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 32,
                      background: "rgba(253,164,175,0.25)",
                      borderRadius: "50%",
                      border: "0.5px solid rgba(253,164,175,0.4)",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="lb-sym-info">
              <div
                className="lb-sym-title"
                style={{ textTransform: "capitalize" }}
              >
                {symmetry}
              </div>
              <div className="lb-sym-desc">
                {symmetry === "symmetric" &&
                  "Mirror balance across an axis. Creates stability, formality, and calm. Used in logos, luxury brands, and institutional design."}
                {symmetry === "asymmetric" &&
                  "Unequal elements balanced by visual weight. A large simple shape balances multiple small complex ones. Creates dynamism and interest."}
                {symmetry === "radial" &&
                  "Elements arranged around a central point. Creates focus, unity, and a sense of energy emanating from centre. Used in logos and icons."}
              </div>
            </div>
          </div>
        </div>

        {/* RULE OF THIRDS */}
        <div className="lb-section">
          <div className="lb-section-header">
            <div className="lb-section-title">Rule of Thirds</div>
            <div className="lb-section-line" />
          </div>
          <p className="lb-section-sub">
            Divide your canvas into 9 equal parts. Place key elements at the
            intersections — called power points.
          </p>
          <div className="lb-thirds">
            <div className="lb-third-line-v" style={{ left: "33.33%" }} />
            <div className="lb-third-line-v" style={{ left: "66.66%" }} />
            <div className="lb-third-line-h" style={{ top: "33.33%" }} />
            <div className="lb-third-line-h" style={{ top: "66.66%" }} />
            {[
              [33.33, 33.33],
              [66.66, 33.33],
              [33.33, 66.66],
              [66.66, 66.66],
            ].map(([x, y], i) => (
              <div
                key={i}
                className="lb-third-dot"
                style={{ left: `${x}%`, top: `${y}%` }}
              />
            ))}
            <div className="lb-thirds-label">
              4 power points · place focal elements here
            </div>
          </div>
        </div>

        {/* RULES */}
        <div className="lb-section" style={{ borderBottom: "none" }}>
          <div className="lb-section-header">
            <div className="lb-section-title">Key Rules</div>
            <div className="lb-section-line" />
          </div>
          <div className="lb-rules">
            {[
              {
                icon: "⚖️",
                title: "Size vs quantity",
                text: "One large element can balance many small ones. Visual weight comes from size, colour, contrast, and complexity — not just area.",
                bg: "rgba(253,164,175,0.07)",
                border: "rgba(253,164,175,0.2)",
              },
              {
                icon: "🎨",
                title: "Colour has weight",
                text: "Dark and saturated colours are visually heavier than light, desaturated ones. A small red dot can balance a large grey block.",
                bg: "rgba(165,243,252,0.07)",
                border: "rgba(165,243,252,0.2)",
              },
              {
                icon: "↗️",
                title: "Tension is intentional",
                text: "Imbalance isn't always wrong. Deliberate tension creates movement and energy. Posters, editorial spreads, and editorial design use this constantly.",
                bg: "rgba(134,239,172,0.07)",
                border: "rgba(134,239,172,0.2)",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="lb-rule"
                style={{ background: r.bg, borderColor: r.border }}
              >
                <div className="lb-rule-icon">{r.icon}</div>
                <div className="lb-rule-title">{r.title}</div>
                <div className="lb-rule-text">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
