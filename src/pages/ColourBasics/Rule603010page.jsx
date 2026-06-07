import { useState, useRef, useEffect } from "react";

const SCHEMES = [
  {
    name: "Ocean Calm",
    colors: { dominant: "#1B3A6B", secondary: "#4A90D9", accent: "#F4C430" },
    desc: "Deep navy anchors the layout. Sky blue supports navigation and cards. Gold draws the eye to key actions.",
  },
  {
    name: "Forest Studio",
    colors: { dominant: "#1A2E1A", secondary: "#4CAF50", accent: "#FF6B35" },
    desc: "Dark forest green sets a grounded base. Mid green fills mid-level UI. Orange pops for CTAs and alerts.",
  },
  {
    name: "Midnight Rose",
    colors: { dominant: "#1A0A2E", secondary: "#9333EA", accent: "#F472B6" },
    desc: "Deep purple creates luxury depth. Violet builds the secondary language. Pink highlights interactions.",
  },
  {
    name: "Sand & Stone",
    colors: { dominant: "#2C2416", secondary: "#C4A882", accent: "#E74C3C" },
    desc: "Warm dark brown grounds the palette. Sandy beige fills textures and cards. Red commands attention.",
  },
  {
    name: "Arctic",
    colors: { dominant: "#0A1628", secondary: "#4FC3F7", accent: "#00E5FF" },
    desc: "Near-black navy dominates. Ice blue cools the secondary elements. Cyan glows on key touchpoints.",
  },
];

export default function Rule601030Page({ onBack }) {
  const [activeScheme, setActiveScheme] = useState(0);
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const scheme = SCHEMES[activeScheme];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slices = [
    {
      label: "60%",
      pct: 60,
      color: scheme.colors.dominant,
      role: "Dominant",
      tip: "Walls, backgrounds, large sections",
    },
    {
      label: "30%",
      pct: 30,
      color: scheme.colors.secondary,
      role: "Secondary",
      tip: "Furniture, cards, sidebar, nav",
    },
    {
      label: "10%",
      pct: 10,
      color: scheme.colors.accent,
      role: "Accent",
      tip: "Buttons, links, highlights, icons",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&display=swap');
        .r-page { min-height:100vh; background:#080010; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.85); overflow-x:hidden; }
        .r-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 36px; position:sticky; top:0; background:rgba(8,0,16,0.88); backdrop-filter:blur(20px); border-bottom:0.5px solid rgba(255,255,255,0.07); z-index:100; }
        .r-back { display:flex; align-items:center; gap:7px; background:rgba(255,255,255,0.05); border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:999px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .r-back:hover { background:rgba(255,255,255,0.09); color:#fff; }
        .r-nav-label { font-family:'DM Serif Display',serif; font-size:16px; color:rgba(255,255,255,0.7); }
        .r-inner { max-width:860px; margin:0 auto; padding:60px 36px 80px; }
        .r-eyebrow { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:10px; }
        .r-title { font-family:'DM Serif Display',serif; font-size:clamp(2.4rem,5vw,4rem); font-weight:400; color:#fff; letter-spacing:-0.02em; line-height:1.08; margin-bottom:16px; }
        .r-subtitle { font-size:14px; color:rgba(255,255,255,0.35); line-height:1.8; max-width:460px; margin-bottom:52px; }
        .r-section-title { font-family:'DM Serif Display',serif; font-size:22px; color:rgba(255,255,255,0.88); margin-bottom:22px; }
        .r-divider { height:0.5px; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent); margin:48px 0; }

        /* PIE + LEGEND */
        .r-chart-wrap { display:flex; gap:40px; align-items:center; flex-wrap:wrap; margin-bottom:52px; }
        .r-pie-container { position:relative; width:220px; height:220px; flex-shrink:0; }
        .r-pie-label { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; pointer-events:none; }
        .r-pie-pct { font-family:'DM Serif Display',serif; font-size:32px; color:#fff; line-height:1; }
        .r-pie-role { font-size:11px; color:rgba(255,255,255,0.35); letter-spacing:0.08em; text-transform:uppercase; margin-top:4px; }
        .r-legend { flex:1; min-width:200px; display:flex; flex-direction:column; gap:14px; }
        .r-legend-item { display:flex; align-items:center; gap:14px; padding:14px 16px; border-radius:14px; cursor:pointer; border:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); transition:all 0.2s; }
        .r-legend-item:hover, .r-legend-item.active { background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.14); }
        .r-legend-dot { width:36px; height:36px; border-radius:10px; flex-shrink:0; }
        .r-legend-pct { font-family:'DM Serif Display',serif; font-size:22px; color:#fff; line-height:1; }
        .r-legend-role { font-size:11px; color:rgba(255,255,255,0.3); letter-spacing:0.06em; text-transform:uppercase; }
        .r-legend-tip { font-size:11px; color:rgba(255,255,255,0.22); margin-top:2px; }

        /* SCHEME PICKER */
        .r-schemes { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:28px; }
        .r-scheme-btn { padding:8px 18px; border-radius:999px; font-size:12px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.03); color:rgba(255,255,255,0.45); }
        .r-scheme-btn.active { background:rgba(255,255,255,0.09); border-color:rgba(255,255,255,0.22); color:#fff; }

        /* SCHEME PREVIEW */
        .r-preview { border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); margin-bottom:14px; }
        .r-preview-top { height:14px; }
        .r-preview-body { display:flex; gap:0; }
        .r-preview-sidebar { width:28%; padding:20px 16px; display:flex; flex-direction:column; gap:10px; }
        .r-preview-main { flex:1; padding:20px; display:flex; flex-direction:column; gap:12px; }
        .r-preview-bar { height:8px; border-radius:4px; opacity:0.5; }
        .r-preview-card { border-radius:10px; padding:14px; }
        .r-preview-btn { height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:11px; font-family:'DM Sans',sans-serif; font-weight:500; width:fit-content; padding:0 16px; cursor:default; }
        .r-preview-desc { font-size:12px; color:rgba(255,255,255,0.35); line-height:1.7; }

        /* RULE EXPLAINER */
        .r-rule-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:52px; }
        .r-rule-card { border-radius:16px; padding:22px; }
        .r-rule-num { font-family:'DM Serif Display',serif; font-size:36px; font-weight:400; margin-bottom:8px; }
        .r-rule-title { font-size:13px; font-weight:500; margin-bottom:8px; color:rgba(255,255,255,0.8); }
        .r-rule-text { font-size:12px; color:rgba(255,255,255,0.4); line-height:1.7; }
      `}</style>

      <div className="r-page">
        <nav className="r-nav">
          <button className="r-back" onClick={onBack}>
            ← Back
          </button>
          <span className="r-nav-label">60–30–10 Rule</span>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            LESSON 02
          </span>
        </nav>

        <div className="r-inner">
          <div className="r-eyebrow">Colour Theory · Lesson 02</div>
          <div className="r-title">
            The 60–30–10
            <br />
            Colour Rule
          </div>
          <p className="r-subtitle">
            A timeless interior design principle adopted by UI and graphic
            designers worldwide to create visually balanced compositions.
          </p>

          {/* Rule cards */}
          <div className="r-section-title">The Formula</div>
          <div className="r-rule-cards">
            {[
              {
                n: "60%",
                title: "Dominant Colour",
                text: "Your primary background — sets the overall mood and tone. Neutral or deeply saturated.",
                bg: "rgba(196,181,253,0.09)",
                border: "rgba(196,181,253,0.25)",
                numColor: "#c4b5fd",
              },
              {
                n: "30%",
                title: "Secondary Colour",
                text: "Supports and complements the dominant. Used in sidebars, cards, and secondary elements.",
                bg: "rgba(125,211,252,0.08)",
                border: "rgba(125,211,252,0.22)",
                numColor: "#7dd3fc",
              },
              {
                n: "10%",
                title: "Accent Colour",
                text: "The pop of energy. Buttons, highlights, links. Should contrast strongly with both other colours.",
                bg: "rgba(249,168,212,0.08)",
                border: "rgba(249,168,212,0.22)",
                numColor: "#f9a8d4",
              },
            ].map((r) => (
              <div
                key={r.n}
                className="r-rule-card"
                style={{ background: r.bg, border: `1px solid ${r.border}` }}
              >
                <div className="r-rule-num" style={{ color: r.numColor }}>
                  {r.n}
                </div>
                <div className="r-rule-title">{r.title}</div>
                <div className="r-rule-text">{r.text}</div>
              </div>
            ))}
          </div>

          <div className="r-divider" />

          {/* Pie chart */}
          <div className="r-section-title">Visualised</div>
          <div className="r-chart-wrap">
            <div className="r-pie-container">
              <PieChart
                slices={slices}
                hovered={hoveredSlice}
                onHover={setHoveredSlice}
              />
              <div className="r-pie-label">
                {hoveredSlice !== null ? (
                  <>
                    <div className="r-pie-pct">
                      {slices[hoveredSlice].label}
                    </div>
                    <div className="r-pie-role">
                      {slices[hoveredSlice].role}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="r-pie-pct"
                      style={{ fontSize: 18, color: "rgba(255,255,255,0.35)" }}
                    >
                      hover
                    </div>
                    <div className="r-pie-role">a slice</div>
                  </>
                )}
              </div>
            </div>
            <div className="r-legend">
              {slices.map((s, i) => (
                <div
                  key={i}
                  className={`r-legend-item${hoveredSlice === i ? " active" : ""}`}
                  onMouseEnter={() => setHoveredSlice(i)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <div
                    className="r-legend-dot"
                    style={{ background: s.color }}
                  />
                  <div>
                    <div className="r-legend-pct">{s.label}</div>
                    <div className="r-legend-role">{s.role}</div>
                    <div className="r-legend-tip">{s.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="r-divider" />

          {/* Scheme picker */}
          <div className="r-section-title">Live Colour Schemes</div>
          <div className="r-schemes">
            {SCHEMES.map((s, i) => (
              <button
                key={i}
                className={`r-scheme-btn${activeScheme === i ? " active" : ""}`}
                onClick={() => setActiveScheme(i)}
              >
                {s.name}
              </button>
            ))}
          </div>
          <SchemePreview scheme={scheme} />
          <p className="r-preview-desc">{scheme.desc}</p>
        </div>
      </div>
    </>
  );
}

function PieChart({ slices, hovered, onHover }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    const cx = W / 2,
      cy = H / 2,
      r = W * 0.42,
      innerR = W * 0.26;
    ctx.clearRect(0, 0, W, H);
    let start = -Math.PI / 2;
    slices.forEach((s, i) => {
      const angle = (s.pct / 100) * Math.PI * 2;
      const isHov = hovered === i;
      const offset = isHov ? 8 : 0;
      const midAngle = start + angle / 2;
      const ox = Math.cos(midAngle) * offset,
        oy = Math.sin(midAngle) * offset;
      ctx.beginPath();
      ctx.moveTo(cx + ox, cy + oy);
      ctx.arc(cx + ox, cy + oy, r, start, start + angle);
      ctx.lineTo(cx + ox, cy + oy);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.globalAlpha = isHov ? 1 : 0.82;
      ctx.fill();
      ctx.globalAlpha = 1;
      // gap
      ctx.beginPath();
      ctx.moveTo(cx + ox, cy + oy);
      ctx.arc(cx + ox, cy + oy, innerR, start, start + angle);
      ctx.lineTo(cx + ox, cy + oy);
      ctx.closePath();
      ctx.fillStyle = "#080010";
      ctx.fill();
      start += angle;
    });
    // inner circle
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fillStyle = "#080010";
    ctx.fill();
  }, [slices, hovered]);

  const handleMouse = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x =
      (e.clientX - rect.left) * (canvas.width / rect.width) - canvas.width / 2;
    const y =
      (e.clientY - rect.top) * (canvas.height / rect.height) -
      canvas.height / 2;
    const dist = Math.sqrt(x * x + y * y);
    const W = canvas.width;
    if (dist < W * 0.26 || dist > W * 0.44) {
      onHover(null);
      return;
    }
    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2;
    let cum = 0;
    for (let i = 0; i < slices.length; i++) {
      cum += (slices[i].pct / 100) * Math.PI * 2;
      if (angle <= cum) {
        onHover(i);
        return;
      }
    }
    onHover(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={220}
      height={220}
      style={{ width: "100%", height: "100%", cursor: "pointer" }}
      onMouseMove={handleMouse}
      onMouseLeave={() => onHover(null)}
    />
  );
}

function SchemePreview({ scheme }) {
  const { dominant, secondary, accent } = scheme.colors;
  return (
    <div className="r-preview">
      <div className="r-preview-top" style={{ background: dominant }} />
      <div className="r-preview-body">
        <div className="r-preview-sidebar" style={{ background: secondary }}>
          {[80, 60, 90, 50].map((w, i) => (
            <div
              key={i}
              className="r-preview-bar"
              style={{ width: `${w}%`, background: dominant }}
            />
          ))}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: accent,
              marginTop: 6,
            }}
          />
        </div>
        <div className="r-preview-main" style={{ background: dominant }}>
          <div className="r-preview-card" style={{ background: secondary }}>
            {[100, 70].map((w, i) => (
              <div
                key={i}
                className="r-preview-bar"
                style={{
                  width: `${w}%`,
                  background: dominant,
                  marginBottom: 6,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div
              className="r-preview-btn"
              style={{ background: accent, color: dominant }}
            >
              Action
            </div>
            <div
              className="r-preview-btn"
              style={{
                background: "transparent",
                border: `1px solid ${accent}`,
                color: accent,
              }}
            >
              Learn more
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
