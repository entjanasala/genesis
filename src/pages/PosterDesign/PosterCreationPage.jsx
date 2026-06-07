import { useState, useEffect, useRef } from "react";
import { useProgress } from "../../context/ProgressContext";

const lessons = [
  {
    id: 1,
    number: "01",
    title: "Layout & Visual Hierarchy",
    duration: "14 min",
    description:
      "Before you place a single element, you need a skeleton. Learn how to structure a poster so the eye knows exactly where to go — and in what order.",
    topics: ["Grid systems", "Focal points", "Eye flow"],
    route: "poster-layout",
    accent: "#f472b6",
    bg: "rgba(244,114,182,0.07)",
    border: "rgba(244,114,182,0.22)",
  },
  {
    id: 2,
    number: "02",
    title: "Colour, Texture & Layers",
    duration: "12 min",
    description:
      "Posters live and die by colour. Learn to build depth through layers, use texture as atmosphere, and create colour palettes that stop people mid-scroll.",
    topics: ["Layer theory", "Texture & noise", "Colour harmony"],
    route: "poster-colour",
    accent: "#34d399",
    bg: "rgba(52,211,153,0.07)",
    border: "rgba(52,211,153,0.22)",
  },
  {
    id: 3,
    number: "03",
    title: "Type on a Poster",
    duration: "11 min",
    description:
      "Typography on a poster is performance. It shouts, whispers, dances, and commands. Learn to treat type as a visual element, not just readable text.",
    topics: ["Display type", "Type as image", "Contrast & scale"],
    route: "poster-type",
    accent: "#fb923c",
    bg: "rgba(251,146,60,0.07)",
    border: "rgba(251,146,60,0.22)",
  },
];

// Live poster builder component
function MiniPosterBuilder() {
  const [bg, setBg] = useState("#1a0a2e");
  const [accent, setAccent] = useState("#f472b6");
  const [layout, setLayout] = useState("centered");
  const [showGrid, setShowGrid] = useState(false);
  const [hasTexture, setHasTexture] = useState(true);

  const bgs = [
    "#1a0a2e",
    "#0a1a2e",
    "#1a2a0a",
    "#2a0a0a",
    "#0a0a0a",
    "#1a1a2e",
  ];
  const accents = [
    "#f472b6",
    "#34d399",
    "#fb923c",
    "#c4b5fd",
    "#38bdf8",
    "#fde68a",
  ];

  const layouts = [
    { id: "centered", label: "Centred" },
    { id: "offset", label: "Offset" },
    { id: "editorial", label: "Editorial" },
  ];

  return (
    <div style={{ width: "100%", maxWidth: 520 }}>
      {/* controls */}
      <div
        style={{ display: "flex", gap: 24, marginBottom: 20, flexWrap: "wrap" }}
      >
        <div>
          <div
            style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 8,
            }}
          >
            Background
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {bgs.map((c) => (
              <div
                key={c}
                onClick={() => setBg(c)}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  background: c,
                  border: `2px solid ${bg === c ? "#fff" : "transparent"}`,
                  cursor: "pointer",
                  transition: "border 0.15s",
                }}
              />
            ))}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 8,
            }}
          >
            Accent
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {accents.map((c) => (
              <div
                key={c}
                onClick={() => setAccent(c)}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: c,
                  border: `2px solid ${accent === c ? "#fff" : "transparent"}`,
                  cursor: "pointer",
                  transition: "border 0.15s",
                }}
              />
            ))}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 8,
            }}
          >
            Layout
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {layouts.map((l) => (
              <button
                key={l.id}
                onClick={() => setLayout(l.id)}
                style={{
                  padding: "4px 10px",
                  border: `1px solid ${layout === l.id ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}`,
                  background:
                    layout === l.id ? "rgba(255,255,255,0.08)" : "transparent",
                  color: layout === l.id ? "#fff" : "rgba(255,255,255,0.35)",
                  fontSize: 10,
                  borderRadius: 3,
                  cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  letterSpacing: "0.06em",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* poster canvas */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "140%",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: bg,
            transition: "background 0.3s",
          }}
        >
          {/* texture overlay */}
          {hasTexture && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
                opacity: 0.6,
              }}
            />
          )}
          {/* gradient glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 70% 30%, ${accent}25 0%, transparent 60%)`,
              transition: "background 0.3s",
            }}
          />

          {/* grid overlay */}
          {showGrid && (
            <div
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              {[25, 50, 75].map((p) => (
                <div
                  key={p}
                  style={{
                    position: "absolute",
                    left: `${p}%`,
                    top: 0,
                    bottom: 0,
                    width: "0.5px",
                    background: "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
              {[25, 50, 75].map((p) => (
                <div
                  key={p}
                  style={{
                    position: "absolute",
                    top: `${p}%`,
                    left: 0,
                    right: 0,
                    height: "0.5px",
                    background: "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
          )}

          {/* CONTENT by layout */}
          {layout === "centered" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: `${accent}99`,
                  marginBottom: 12,
                }}
              >
                Genesis Design
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(2.5rem,8vw,4rem)",
                  lineHeight: 0.9,
                  color: "#fff",
                  marginBottom: 16,
                  letterSpacing: "0.02em",
                }}
              >
                THE ART OF
                <br />
                THE POSTER
              </div>
              <div
                style={{
                  width: 40,
                  height: "1.5px",
                  background: accent,
                  marginBottom: 16,
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.15em",
                }}
              >
                2024 COLLECTION
              </div>
            </div>
          )}
          {layout === "offset" && (
            <div style={{ position: "absolute", inset: 0, padding: 24 }}>
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(3rem,10vw,5rem)",
                  lineHeight: 0.85,
                  color: "#fff",
                  letterSpacing: "0.02em",
                  marginTop: 16,
                }}
              >
                THE
                <br />
                ART
                <br />
                OF
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  right: 24,
                  textAlign: "right",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "clamp(2rem,7vw,3.5rem)",
                    color: accent,
                    lineHeight: 0.9,
                  }}
                >
                  THE
                  <br />
                  POSTER
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  width: "40%",
                  height: "1.5px",
                  background: accent,
                }}
              />
            </div>
          )}
          {layout === "editorial" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                gridTemplateRows: "1fr auto",
                padding: 24,
              }}
            >
              <div
                style={{
                  borderBottom: `1px solid ${accent}44`,
                  display: "flex",
                  alignItems: "flex-end",
                  paddingBottom: 16,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "clamp(1.5rem,6vw,2.8rem)",
                    lineHeight: 0.9,
                    color: "#fff",
                    flex: 1,
                  }}
                >
                  THE ART
                  <br />
                  OF THE
                  <br />
                  POSTER
                </div>
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    textAlign: "right",
                    lineHeight: 1.6,
                  }}
                >
                  ISSUE
                  <br />
                  01
                  <br />
                  2024
                </div>
              </div>
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  {["Layout", "Colour", "Type"].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 8,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        padding: "3px 8px",
                        border: `0.5px solid ${accent}55`,
                        color: `${accent}cc`,
                        borderRadius: 2,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    height: "1.5px",
                    background: `linear-gradient(to right, ${accent}, transparent)`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* toggles */}
      <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
        {[
          { label: "Grid", val: showGrid, set: setShowGrid },
          { label: "Texture", val: hasTexture, set: setHasTexture },
        ].map((t) => (
          <div
            key={t.label}
            onClick={() => t.set(!t.val)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 28,
                height: 16,
                borderRadius: 8,
                background: t.val
                  ? "rgba(244,114,182,0.3)"
                  : "rgba(255,255,255,0.06)",
                border: `1px solid ${t.val ? "rgba(244,114,182,0.5)" : "rgba(255,255,255,0.12)"}`,
                position: "relative",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: t.val ? "#f472b6" : "rgba(255,255,255,0.3)",
                  position: "absolute",
                  top: 2,
                  left: t.val ? 15 : 2,
                  transition: "all 0.2s",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.06em",
              }}
            >
              {t.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PosterCreationPage({ onBack, onNavigate }) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const { getCompleted, toggleComplete: toggleCtx } = useProgress();
  const completed = getCompleted("poster-creation");
  const toggleComplete = (id, e) => {
    e.stopPropagation();
    toggleCtx("poster-creation", id);
  };
  const progress = Math.round((completed.length / lessons.length) * 100);
  const active = lessons[activeLesson];
  const isDone = completed.includes(active.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .pc-page { min-height:100vh; background:#0a0a0a; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }

        .pc-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(10,10,10,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:200; }
        .pc-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .pc-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .pc-nav-center { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .pc-prog-pill { display:flex; align-items:center; gap:10px; font-size:11px; color:rgba(255,255,255,0.3); }
        .pc-prog-bar { width:60px; height:1px; background:rgba(255,255,255,0.1); }
        .pc-prog-fill { height:100%; background:#f472b6; transition:width 0.5s ease; }

        /* HERO — full height split */
        .pc-hero { display:grid; grid-template-columns:1fr 1fr; min-height:100vh; border-bottom:1px solid rgba(255,255,255,0.08); }
        .pc-hero-left { padding:80px 56px; display:flex; flex-direction:column; justify-content:center; position:relative; overflow:hidden; border-right:1px solid rgba(255,255,255,0.08); }
        .pc-hero-left-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 20% 60%, rgba(244,114,182,0.08) 0%, transparent 55%); pointer-events:none; }
        .pc-hero-lines { position:absolute; inset:0; pointer-events:none; }
        .pc-hl { position:absolute; left:0; right:0; height:0.5px; background:linear-gradient(to right, transparent, rgba(244,114,182,0.07), transparent); }
        .pc-vl { position:absolute; top:0; bottom:0; width:0.5px; background:linear-gradient(to bottom, transparent, rgba(244,114,182,0.05), transparent); }
        .pc-hero-eyebrow { font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:20px; display:flex; align-items:center; gap:12px; position:relative; z-index:1; }
        .pc-hero-eyebrow::before { content:''; width:28px; height:1px; background:rgba(255,255,255,0.3); }
        .pc-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(5rem,10vw,9rem); line-height:0.85; letter-spacing:0.02em; color:#fff; margin-bottom:24px; position:relative; z-index:1; }
        .pc-hero-title span { display:block; background:linear-gradient(135deg,#f472b6,#fb923c,#fde68a); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .pc-hero-sub { font-size:15px; color:rgba(255,255,255,0.32); line-height:1.8; max-width:400px; position:relative; z-index:1; margin-bottom:40px; }
        .pc-hero-stats { display:flex; gap:32px; position:relative; z-index:1; }
        .pc-stat { }
        .pc-stat-num { font-family:'Bebas Neue',sans-serif; font-size:40px; color:#f472b6; line-height:1; }
        .pc-stat-label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-top:2px; }
        .pc-hero-right { display:flex; align-items:center; justify-content:center; padding:60px 56px; background:#0d0d12; }

        /* SCROLL STRIP */
        .pc-strip { height:48px; overflow:hidden; border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.01); }
        .pc-strip-track { display:flex; width:max-content; animation:pc-scroll 22s linear infinite; height:100%; align-items:center; }
        @keyframes pc-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .pc-strip-item { padding:0 24px; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.18); white-space:nowrap; border-right:0.5px solid rgba(255,255,255,0.05); height:100%; display:flex; align-items:center; gap:8px; }
        .pc-strip-dot { width:3px; height:3px; border-radius:50%; background:rgba(244,114,182,0.5); }

        /* MAGAZINE ROW */
        .pc-mag { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid rgba(255,255,255,0.08); }
        .pc-mag-col { padding:72px 56px; }
        .pc-mag-col.dark-col { background:#0a0a0a; border-right:1px solid rgba(255,255,255,0.08); }
        .pc-mag-col.mid-col { background:#0d0d12; }
        .pc-mag-label { font-size:9px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:20px; display:flex; align-items:center; gap:10px; }
        .pc-mag-label::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .pc-mag-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(3rem,6vw,5rem); line-height:0.88; letter-spacing:0.02em; color:#fff; margin-bottom:24px; }
        .pc-mag-title em { color:#f472b6; font-style:normal; }
        .pc-mag-body { font-size:14px; color:rgba(255,255,255,0.35); line-height:1.85; }
        .pc-mag-body strong { color:rgba(255,255,255,0.75); font-weight:500; }

        /* POSTER EXAMPLES ROW — 3 mini posters */
        .pc-posters-row { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(255,255,255,0.06); border-bottom:1px solid rgba(255,255,255,0.08); }
        .pc-poster-cell { padding:0; aspect-ratio:2/3; position:relative; overflow:hidden; cursor:pointer; }
        .pc-poster-cell:hover .pc-poster-overlay { opacity:1; }
        .pc-poster-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 0.3s; }
        .pc-poster-overlay-text { font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:#fff; }

        /* LESSONS */
        .pc-lessons-section { border-top:1px solid rgba(255,255,255,0.06); }
        .pc-lessons-header { padding:40px 56px 0; display:flex; align-items:baseline; justify-content:space-between; }
        .pc-lessons-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; letter-spacing:0.03em; }
        .pc-prog-text { font-size:11px; color:rgba(255,255,255,0.22); }
        .pc-prog-track { height:1px; background:rgba(255,255,255,0.08); margin:24px 56px 0; }
        .pc-prog-track-fill { height:100%; background:#f472b6; transition:width 0.6s ease; }
        .pc-lessons-grid { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid rgba(255,255,255,0.06); margin-top:0; }
        .pc-lesson-col { border-right:1px solid rgba(255,255,255,0.06); padding:40px 36px; cursor:pointer; transition:background 0.2s; position:relative; overflow:hidden; min-height:260px; display:flex; flex-direction:column; }
        .pc-lesson-col:last-child { border-right:none; }
        .pc-lesson-col:hover { background:rgba(255,255,255,0.02); }
        .pc-lesson-col.active-col { background:rgba(255,255,255,0.03); }
        .pc-lesson-col-num { font-family:'Bebas Neue',sans-serif; font-size:52px; color:rgba(255,255,255,0.05); line-height:1; margin-bottom:20px; }
        .pc-lesson-col.active-col .pc-lesson-col-num { color:rgba(255,255,255,0.12); }
        .pc-lesson-col-title { font-size:14px; font-weight:500; color:rgba(255,255,255,0.7); line-height:1.4; margin-bottom:8px; flex:1; }
        .pc-lesson-col.active-col .pc-lesson-col-title { color:#fff; }
        .pc-lesson-col-dur { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:16px; }
        .pc-check { width:20px; height:20px; border-radius:50%; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:9px; color:#fff; transition:all 0.2s; border:1px solid rgba(255,255,255,0.15); margin-top:auto; }
        .pc-check.done { background:#f472b6; border-color:transparent; color:#fff; }
        .pc-lesson-col-line { position:absolute; bottom:0; left:0; height:2px; width:0; transition:width 0.3s; }
        .pc-lesson-col:hover .pc-lesson-col-line, .pc-lesson-col.active-col .pc-lesson-col-line { width:100%; }
        .pc-detail { border-top:1px solid rgba(255,255,255,0.06); display:grid; grid-template-columns:1fr 1fr; }
        .pc-detail-left { padding:48px 56px; border-right:1px solid rgba(255,255,255,0.06); }
        .pc-detail-num { font-family:'Bebas Neue',sans-serif; font-size:11px; letter-spacing:0.2em; color:rgba(255,255,255,0.2); margin-bottom:10px; }
        .pc-detail-title { font-family:'DM Serif Display',serif; font-size:clamp(1.6rem,3vw,2.4rem); color:#fff; margin-bottom:16px; letter-spacing:-0.01em; }
        .pc-detail-desc { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.85; margin-bottom:24px; }
        .pc-topics { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
        .pc-topic { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; padding:5px 12px; border-radius:2px; border:1px solid; }
        .pc-detail-right { padding:48px 56px; display:flex; flex-direction:column; justify-content:center; }
        .pc-actions { display:flex; gap:10px; }
        .pc-btn-start { padding:10px 24px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; border:1px solid; }
        .pc-btn-done { background:none; border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.3); padding:10px 18px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .pc-btn-done:hover { color:rgba(255,255,255,0.7); }
        .pc-btn-done.done { color:#f472b6; border-color:rgba(244,114,182,0.3); }

        @media (max-width:768px) {
          .pc-hero { grid-template-columns:1fr; }
          .pc-hero-right { display:none; }
          .pc-mag { grid-template-columns:1fr; }
          .pc-lessons-grid { grid-template-columns:1fr; }
          .pc-detail { grid-template-columns:1fr; }
          .pc-posters-row { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="pc-page">
        <nav className="pc-nav">
          <button className="pc-back" onClick={onBack}>
            ← Back
          </button>
          <span className="pc-nav-center">Poster Creation</span>
          <div className="pc-prog-pill">
            <div className="pc-prog-bar">
              <div className="pc-prog-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>
              {completed.length}/{lessons.length}
            </span>
          </div>
        </nav>

        {/* HERO */}
        <div className="pc-hero">
          <div className="pc-hero-left">
            <div className="pc-hero-left-bg" />
            <div className="pc-hero-lines">
              {[20, 40, 60, 80].map((p, i) => (
                <div key={i} className="pc-hl" style={{ top: `${p}%` }} />
              ))}
              {[33, 66].map((p, i) => (
                <div key={i} className="pc-vl" style={{ left: `${p}%` }} />
              ))}
            </div>
            <div className="pc-hero-eyebrow">Module 05 · Skills</div>
            <div className="pc-hero-title">
              POSTER
              <br />
              <span>CREATION</span>
            </div>
            <p className="pc-hero-sub">
              A poster is a conversation with a stranger. You have two seconds.
              Three elements. One chance. Make it unforgettable.
            </p>
            <div className="pc-hero-stats">
              <div className="pc-stat">
                <div className="pc-stat-num">2s</div>
                <div className="pc-stat-label">Average attention</div>
              </div>
              <div className="pc-stat">
                <div className="pc-stat-num">3</div>
                <div className="pc-stat-label">Max elements</div>
              </div>
              <div className="pc-stat">
                <div className="pc-stat-num">∞</div>
                <div className="pc-stat-label">Combinations</div>
              </div>
            </div>
          </div>
          <div className="pc-hero-right">
            <MiniPosterBuilder />
          </div>
        </div>

        {/* SCROLL STRIP */}
        <div className="pc-strip">
          <div className="pc-strip-track">
            {[...Array(3)]
              .flatMap(() => [
                "Hierarchy",
                "Colour",
                "Texture",
                "Typography",
                "Layers",
                "Grid",
                "Contrast",
                "Balance",
                "Depth",
                "Focal Point",
                "White Space",
                "Emotion",
              ])
              .map((item, i) => (
                <div key={i} className="pc-strip-item">
                  <span className="pc-strip-dot" />
                  {item}
                </div>
              ))}
          </div>
        </div>

        {/* MAGAZINE ROW */}
        <div className="pc-mag">
          <div className="pc-mag-col dark-col">
            <div className="pc-mag-label">The poster principle</div>
            <div className="pc-mag-title">
              ONE FOCAL POINT.
              <br />
              <em>NOT TWO.</em>
            </div>
            <p className="pc-mag-body">
              The most common mistake in poster design:{" "}
              <strong>competing for attention with yourself.</strong> Two images
              of equal weight. Two headlines of equal size. Two colours of equal
              dominance.
              <br />
              <br />A poster works when one element is clearly in charge.
              Everything else exists to support it, not rival it.
            </p>
          </div>
          <div className="pc-mag-col mid-col">
            <div className="pc-mag-label">The layer stack</div>
            <div className="pc-mag-title">
              BUILD IT
              <br />
              IN <em>LAYERS.</em>
            </div>
            <p className="pc-mag-body">
              <strong>Layer 1:</strong> Background — the mood, the atmosphere.
              <br />
              <strong>Layer 2:</strong> Texture — grain, noise, depth.
              <br />
              <strong>Layer 3:</strong> Image or graphic element.
              <br />
              <strong>Layer 4:</strong> Colour overlay — unifies everything.
              <br />
              <strong>Layer 5:</strong> Typography — the final message.
              <br />
              <br />
              Each layer serves the one above it.
            </p>
          </div>
        </div>

        {/* 3 EXAMPLE POSTERS */}
        <div className="pc-posters-row">
          {[
            {
              bg: "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 100%)",
              accent: "#f472b6",
              style: "Centred — classical hierarchy",
              content: "centered",
            },
            {
              bg: "linear-gradient(160deg, #0a1a0a 0%, #064e3b 100%)",
              accent: "#34d399",
              style: "Offset — editorial tension",
              content: "offset",
            },
            {
              bg: "linear-gradient(120deg, #1a0505 0%, #7c2d12 100%)",
              accent: "#fb923c",
              style: "Full-bleed — raw energy",
              content: "fullbleed",
            },
          ].map((p, i) => (
            <div
              key={i}
              className="pc-poster-cell"
              style={{ background: p.bg }}
            >
              {/* texture */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse at 60% 30%, ${p.accent}20 0%, transparent 60%)`,
                }}
              />
              {p.content === "centered" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 8,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: `${p.accent}88`,
                      marginBottom: 10,
                    }}
                  >
                    Genesis
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: "clamp(1.8rem,5vw,3rem)",
                      lineHeight: 0.88,
                      color: "#fff",
                      marginBottom: 12,
                    }}
                  >
                    THE ART
                    <br />
                    OF NOW
                  </div>
                  <div
                    style={{
                      width: 28,
                      height: "1px",
                      background: p.accent,
                      marginBottom: 12,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 8,
                      letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    2024
                  </div>
                </div>
              )}
              {p.content === "offset" && (
                <div style={{ position: "absolute", inset: 0, padding: 20 }}>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: "clamp(2.5rem,8vw,4rem)",
                      lineHeight: 0.85,
                      color: "#fff",
                    }}
                  >
                    THE
                    <br />
                    NEW
                    <br />
                    NOW
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      right: 20,
                      textAlign: "right",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Serif Display',serif",
                        fontStyle: "italic",
                        fontSize: "clamp(1rem,3vw,1.6rem)",
                        color: p.accent,
                        lineHeight: 1.1,
                      }}
                    >
                      Genesis
                      <br />
                      Design
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                      width: "35%",
                      height: "1.5px",
                      background: p.accent,
                    }}
                  />
                </div>
              )}
              {p.content === "fullbleed" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      fontSize: 8,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: `${p.accent}88`,
                    }}
                  >
                    Genesis Studio
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: "clamp(3rem,9vw,5rem)",
                        lineHeight: 0.85,
                        color: "#fff",
                        marginBottom: 8,
                      }}
                    >
                      RAW
                      <br />
                      ENERGY
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {["Design", "2024", "Studio"].map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 7,
                            padding: "2px 6px",
                            border: `0.5px solid ${p.accent}55`,
                            color: `${p.accent}cc`,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="pc-poster-overlay">
                <div className="pc-poster-overlay-text">{p.style}</div>
              </div>
            </div>
          ))}
        </div>

        {/* LESSONS */}
        <div className="pc-lessons-section">
          <div className="pc-lessons-header">
            <div className="pc-lessons-title">LESSONS</div>
            <div className="pc-prog-text">
              {completed.length} of {lessons.length} complete
            </div>
          </div>
          <div className="pc-prog-track">
            <div
              className="pc-prog-track-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="pc-lessons-grid">
            {lessons.map((lesson, i) => {
              const isDoneCard = completed.includes(lesson.id);
              const isActive = activeLesson === i;
              return (
                <div
                  key={lesson.id}
                  className={`pc-lesson-col${isActive ? " active-col" : ""}`}
                  onClick={() => setActiveLesson(i)}
                >
                  <div className="pc-lesson-col-num">{lesson.number}</div>
                  <div className="pc-lesson-col-title">{lesson.title}</div>
                  <div className="pc-lesson-col-dur">{lesson.duration}</div>
                  <button
                    className={`pc-check${isDoneCard ? " done" : ""}`}
                    onClick={(e) => toggleComplete(lesson.id, e)}
                  >
                    {isDoneCard ? "✓" : ""}
                  </button>
                  <div
                    className="pc-lesson-col-line"
                    style={{ background: lesson.accent }}
                  />
                </div>
              );
            })}
          </div>
          <div className="pc-detail">
            <div className="pc-detail-left">
              <div className="pc-detail-num">
                {active.number} — {active.duration}
              </div>
              <div className="pc-detail-title">{active.title}</div>
              <p className="pc-detail-desc">{active.description}</p>
              <div className="pc-topics">
                {active.topics.map((t, i) => (
                  <span
                    key={i}
                    className="pc-topic"
                    style={{
                      color: active.accent,
                      borderColor: `${active.accent}33`,
                      background: `${active.accent}0d`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="pc-detail-right">
              <div className="pc-actions">
                <button
                  className="pc-btn-start"
                  onClick={() => onNavigate && onNavigate(active.route)}
                  style={{
                    background: `${active.accent}18`,
                    borderColor: `${active.accent}55`,
                    color: active.accent,
                  }}
                >
                  {isDone ? "Review →" : "Start lesson →"}
                </button>
                <button
                  className={`pc-btn-done${isDone ? " done" : ""}`}
                  onClick={(e) => toggleComplete(active.id, e)}
                >
                  {isDone ? "✓ Done" : "Mark done"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
