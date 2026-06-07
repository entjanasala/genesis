import { useState, useEffect, useRef } from "react";

const LAYER_DEFINITIONS = [
  {
    id: "bg",
    label: "Background",
    z: 1,
    icon: "▬",
    desc: "Sets the mood. The furthest thing from the viewer. Everything sits on top of this.",
    color: "#1a0a2e",
    accent: "#c4b5fd",
  },
  {
    id: "texture",
    label: "Texture / Grain",
    z: 2,
    icon: "░",
    desc: "Adds depth without distraction. Invisible when done well — obvious when missing.",
    color: "rgba(255,255,255,0.04)",
    accent: "#a5f3fc",
  },
  {
    id: "gradient",
    label: "Colour Overlay",
    z: 3,
    icon: "◑",
    desc: "Unifies everything. A translucent colour wash that makes all elements feel like they belong together.",
    color: "rgba(244,114,182,0.15)",
    accent: "#f472b6",
  },
  {
    id: "image",
    label: "Graphic Element",
    z: 4,
    icon: "◈",
    desc: "The visual centrepiece. Shape, photo, illustration — the thing that gives the eye somewhere to land.",
    color: "rgba(167,139,250,0.3)",
    accent: "#a78bfa",
  },
  {
    id: "type",
    label: "Typography",
    z: 5,
    icon: "T",
    desc: "The message. Always the top layer. Type on top of everything — never buried.",
    color: "rgba(255,255,255,0.95)",
    accent: "#fff",
  },
];

const DEPTH_EXAMPLES = [
  {
    name: "Flat",
    desc: "Everything at the same depth. No hierarchy. The eye doesn't know where to go.",
    layers: ["bg", "type"],
  },
  {
    name: "Basic depth",
    desc: "Background, graphic, text. Three distinct planes. The eye flows naturally.",
    layers: ["bg", "image", "type"],
  },
  {
    name: "Full depth",
    desc: "All five layers. Maximum atmosphere. Nothing feels accidental.",
    layers: ["bg", "texture", "gradient", "image", "type"],
  },
];

export default function StyleLayersPage({ onBack }) {
  const [enabledLayers, setEnabledLayers] = useState({
    bg: true,
    texture: true,
    gradient: true,
    image: true,
    type: true,
  });
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeDepth, setActiveDepth] = useState(2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleLayer = (id) => setEnabledLayers((p) => ({ ...p, [id]: !p[id] }));
  const depthExample = DEPTH_EXAMPLES[activeDepth];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .sl-page { min-height:100vh; background:#080810; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .sl-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(8,8,16,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:100; }
        .sl-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .sl-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .sl-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .sl-tag { font-size:10px; letter-spacing:0.15em; color:rgba(255,255,255,0.2); text-transform:uppercase; }

        .sl-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(255,255,255,0.08); position:relative; overflow:hidden; }
        .sl-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 30% 50%, rgba(167,139,250,0.08) 0%, transparent 55%); }
        .sl-hero-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-bottom:14px; position:relative; z-index:1; }
        .sl-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,10vw,9rem); line-height:0.88; color:#fff; margin-bottom:20px; position:relative; z-index:1; }
        .sl-hero-title em { color:#a78bfa; font-style:normal; }
        .sl-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; position:relative; z-index:1; }
        .sl-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04); line-height:1; pointer-events:none; user-select:none; }

        .sl-section { padding:72px 56px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .sl-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .sl-section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; }
        .sl-section-line { flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .sl-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:40px; max-width:520px; line-height:1.7; }

        /* LAYER BUILDER */
        .sl-builder { display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:start; }

        /* LAYER ROWS */
        .sl-layers-list { display:flex; flex-direction:column; }
        .sl-layer-row { display:flex; align-items:center; gap:12px; padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; transition:padding-left 0.2s; }
        .sl-layer-row:last-child { border-bottom:none; }
        .sl-layer-row:hover { padding-left:6px; }
        .sl-layer-row.active-l { padding-left:6px; }

        .sl-layer-icon { width:34px; height:34px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; border:1px solid; transition:all 0.2s; }
        .sl-layer-body { flex:1; min-width:0; }
        .sl-layer-name { font-size:14px; color:rgba(255,255,255,0.7); transition:color 0.2s; line-height:1.3; }
        .sl-layer-row:hover .sl-layer-name, .sl-layer-row.active-l .sl-layer-name { color:#fff; }
        .sl-layer-desc { font-size:11px; color:rgba(255,255,255,0.28); line-height:1.5; max-height:0; overflow:hidden; transition:max-height 0.3s ease; }
        .sl-layer-row.active-l .sl-layer-desc { max-height:48px; }

        .sl-layer-z { font-size:9px; color:rgba(255,255,255,0.18); letter-spacing:0.1em; flex-shrink:0; width:28px; text-align:right; }

        /* TOGGLE */
        .sl-toggle { width:34px; height:20px; border-radius:10px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.06); position:relative; cursor:pointer; transition:all 0.2s; flex-shrink:0; }
        .sl-toggle.on { background:rgba(167,139,250,0.25); border-color:rgba(167,139,250,0.5); }
        .sl-toggle-thumb { width:14px; height:14px; border-radius:50%; background:rgba(255,255,255,0.35); position:absolute; top:2px; left:2px; transition:all 0.22s; }
        .sl-toggle.on .sl-toggle-thumb { left:16px; background:#a78bfa; }

        /* LIVE CANVAS */
        .sl-live-canvas { height:380px; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); position:relative; background:#080810; }
        .sl-canvas-layer { position:absolute; inset:0; transition:opacity 0.3s; }

        /* DEPTH */
        .sl-depth-tabs { display:flex; gap:8px; margin-bottom:24px; }
        .sl-depth-tab { padding:8px 18px; border-radius:3px; font-size:11px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.38); letter-spacing:0.06em; }
        .sl-depth-tab.active { border-color:rgba(167,139,250,0.4); color:#a78bfa; background:rgba(167,139,250,0.08); }
        .sl-depth-demo { display:grid; grid-template-columns:1fr 1fr; gap:28px; }
        .sl-depth-canvas { aspect-ratio:3/2; border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.07); background:#1a0a2e; position:relative; display:flex; align-items:center; justify-content:center; }
        .sl-depth-info { display:flex; flex-direction:column; justify-content:center; gap:12px; }
        .sl-depth-name { font-family:'Bebas Neue',sans-serif; font-size:28px; color:#fff; }
        .sl-depth-desc { font-size:13px; color:rgba(255,255,255,0.38); line-height:1.7; }
        .sl-depth-layers { display:flex; flex-direction:column; gap:5px; }
        .sl-depth-layer-item { font-size:11px; color:rgba(255,255,255,0.3); display:flex; align-items:center; gap:8px; }
        .sl-depth-layer-item.active-depth-l { color:#a78bfa; }
        .sl-depth-dot { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,0.15); flex-shrink:0; }
        .sl-depth-layer-item.active-depth-l .sl-depth-dot { background:#a78bfa; }

        /* Z-AXIS */
        .sl-z-section { padding:72px 56px; }
        .sl-z-stack { display:flex; flex-direction:column; border:1px solid rgba(255,255,255,0.07); border-radius:12px; overflow:hidden; }
        .sl-z-row { display:flex; align-items:center; gap:20px; padding:18px 24px; border-bottom:1px solid rgba(255,255,255,0.05); transition:background 0.2s; }
        .sl-z-row:last-child { border-bottom:none; }
        .sl-z-row:hover { background:rgba(255,255,255,0.02); }
        .sl-z-num { font-family:'Bebas Neue',sans-serif; font-size:28px; color:rgba(255,255,255,0.08); width:32px; flex-shrink:0; }
        .sl-z-bar { height:24px; border-radius:4px; flex-shrink:0; }
        .sl-z-label { font-size:13px; flex:1; }
        .sl-z-tip { font-size:11px; color:rgba(255,255,255,0.25); font-style:italic; }
      `}</style>

      <div className="sl-page">
        <nav className="sl-nav">
          <button className="sl-back" onClick={onBack}>
            ← Back
          </button>
          <span className="sl-nav-title">Layers & Depth</span>
          <span className="sl-tag">Lesson 02</span>
        </nav>

        <div className="sl-hero">
          <div className="sl-hero-bg" />
          <div className="sl-hero-eyebrow">Design Styles · Lesson 02</div>
          <div className="sl-hero-title">
            GREAT DESIGN
            <br />
            IS NEVER <em>FLAT</em>
          </div>
          <p className="sl-hero-sub">
            Every compelling design is built in layers. Toggle them on and off —
            feel what each one contributes and what breaks without it.
          </p>
          <div className="sl-hero-num">02</div>
        </div>

        {/* LAYER BUILDER */}
        <div className="sl-section">
          <div className="sl-section-header">
            <div className="sl-section-title">THE LAYER STACK</div>
            <div className="sl-section-line" />
          </div>
          <p className="sl-section-sub">
            Click a layer to learn what it does. Toggle it off to see what
            breaks.
          </p>
          <div className="sl-builder">
            {/* LEFT — layer list */}
            <div className="sl-layers-list">
              {LAYER_DEFINITIONS.map((layer, i) => (
                <div
                  key={layer.id}
                  className={`sl-layer-row${activeLayer === i ? " active-l" : ""}`}
                  onClick={() => setActiveLayer(activeLayer === i ? null : i)}
                >
                  <div
                    className="sl-layer-icon"
                    style={{
                      color: enabledLayers[layer.id]
                        ? layer.accent
                        : "rgba(255,255,255,0.2)",
                      borderColor: enabledLayers[layer.id]
                        ? `${layer.accent}40`
                        : "rgba(255,255,255,0.08)",
                      background: enabledLayers[layer.id]
                        ? `${layer.accent}0d`
                        : "rgba(255,255,255,0.02)",
                    }}
                  >
                    {layer.icon}
                  </div>
                  <div className="sl-layer-body">
                    <div className="sl-layer-name">{layer.label}</div>
                    <div className="sl-layer-desc">{layer.desc}</div>
                  </div>
                  <div className="sl-layer-z">Z·{layer.z}</div>
                  <div
                    className={`sl-toggle${enabledLayers[layer.id] ? " on" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLayer(layer.id);
                    }}
                  >
                    <div className="sl-toggle-thumb" />
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — live canvas */}
            <div className="sl-live-canvas">
              <div
                className="sl-canvas-layer"
                style={{
                  background: "linear-gradient(135deg,#1a0a2e,#0a1a2e)",
                  opacity: enabledLayers.bg ? 1 : 0,
                }}
              />
              <div
                className="sl-canvas-layer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E")`,
                  opacity: enabledLayers.texture ? 0.7 : 0,
                }}
              />
              <div
                className="sl-canvas-layer"
                style={{
                  background:
                    "radial-gradient(ellipse at 65% 30%, rgba(244,114,182,0.25) 0%, transparent 60%)",
                  opacity: enabledLayers.gradient ? 1 : 0,
                }}
              />
              <div
                className="sl-canvas-layer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: enabledLayers.image ? 1 : 0,
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "0.5px solid rgba(167,139,250,0.3)",
                    background: "rgba(167,139,250,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      border: "0.5px solid rgba(167,139,250,0.2)",
                      background: "rgba(167,139,250,0.06)",
                    }}
                  />
                </div>
              </div>
              <div
                className="sl-canvas-layer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: 24,
                  opacity: enabledLayers.type ? 1 : 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 32,
                    color: "#fff",
                    letterSpacing: "0.04em",
                    marginBottom: 6,
                  }}
                >
                  DEPTH
                </div>
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: "rgba(255,255,255,0.4)",
                    marginBottom: 8,
                  }}
                />
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.2em",
                  }}
                >
                  STUDIO 2024
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DEPTH LEVELS */}
        <div className="sl-section">
          <div className="sl-section-header">
            <div className="sl-section-title">DEPTH LEVELS</div>
            <div className="sl-section-line" />
          </div>
          <p className="sl-section-sub">
            More layers ≠ better. But knowing when to add depth changes
            everything.
          </p>
          <div className="sl-depth-tabs">
            {DEPTH_EXAMPLES.map((d, i) => (
              <button
                key={i}
                className={`sl-depth-tab${activeDepth === i ? " active" : ""}`}
                onClick={() => setActiveDepth(i)}
              >
                {d.name}
              </button>
            ))}
          </div>
          <div className="sl-depth-demo">
            <div className="sl-depth-canvas">
              {activeDepth >= 0 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg,#1a0a2e,#0a1a2e)",
                  }}
                />
              )}
              {activeDepth >= 2 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E")`,
                    opacity: 0.6,
                  }}
                />
              )}
              {activeDepth >= 2 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at 65% 30%, rgba(244,114,182,0.2) 0%, transparent 55%)",
                  }}
                />
              )}
              {activeDepth >= 1 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      border: "0.5px solid rgba(167,139,250,0.3)",
                      background: "rgba(167,139,250,0.08)",
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 20,
                    color: "#fff",
                  }}
                >
                  GENESIS
                </div>
              </div>
            </div>
            <div className="sl-depth-info">
              <div className="sl-depth-name">{depthExample.name}</div>
              <div className="sl-depth-desc">{depthExample.desc}</div>
              <div className="sl-depth-layers">
                {LAYER_DEFINITIONS.map((l, i) => {
                  const isActive = depthExample.layers.includes(l.id);
                  return (
                    <div
                      key={i}
                      className={`sl-depth-layer-item${isActive ? " active-depth-l" : ""}`}
                    >
                      <div className="sl-depth-dot" />
                      {l.label}
                      {!isActive && " — missing"}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Z-AXIS */}
        <div className="sl-z-section">
          <div className="sl-section-header">
            <div className="sl-section-title">THE Z-AXIS</div>
            <div className="sl-section-line" />
          </div>
          <p className="sl-section-sub" style={{ marginBottom: 28 }}>
            Think of your design as looking at it from the side. Each layer sits
            at a different depth.
          </p>
          <div className="sl-z-stack">
            {[...LAYER_DEFINITIONS].reverse().map((layer, i) => (
              <div key={layer.id} className="sl-z-row">
                <div className="sl-z-num">{layer.z}</div>
                <div
                  className="sl-z-bar"
                  style={{
                    width: `${layer.z * 18}%`,
                    background: `${layer.accent}30`,
                    border: `0.5px solid ${layer.accent}50`,
                    minWidth: 32,
                  }}
                />
                <div className="sl-z-label" style={{ color: layer.accent }}>
                  {layer.label}
                </div>
                <div className="sl-z-tip">{layer.desc.split(".")[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
