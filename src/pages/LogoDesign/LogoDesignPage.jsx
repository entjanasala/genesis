import { useState, useEffect, useRef } from "react";
import { useProgress } from "../../context/ProgressContext";

const lessons = [
  {
    id: 1,
    number: "01",
    title: "What Makes a Logo Great",
    duration: "8 min",
    description: "Five principles. Every great logo in history obeys all five.",
    topics: ["Simplicity", "Memorability", "Versatility"],
    route: "logo-what-makes",
    accent: "#c4b5fd",
    bg: "rgba(196,181,253,0.07)",
    border: "rgba(196,181,253,0.22)",
  },
  {
    id: 2,
    number: "02",
    title: "Logo Types",
    duration: "10 min",
    description:
      "Wordmark, lettermark, pictorial, abstract — each communicates differently.",
    topics: ["Wordmarks", "Pictorial marks", "Abstract marks"],
    route: "logo-types",
    accent: "#f9a8d4",
    bg: "rgba(249,168,212,0.07)",
    border: "rgba(249,168,212,0.22)",
  },
  {
    id: 3,
    number: "03",
    title: "Geometry & Shape Language",
    duration: "11 min",
    description: "Every shape carries meaning before a word is read.",
    topics: ["Circle psychology", "Triangle energy", "Negative space"],
    route: "logo-geometry",
    accent: "#fdba74",
    bg: "rgba(253,186,116,0.07)",
    border: "rgba(253,186,116,0.22)",
  },
  {
    id: 4,
    number: "04",
    title: "Colour in Logo Design",
    duration: "9 min",
    description: "Why every logo must work in black and white first.",
    topics: ["B&W first rule", "Colour psychology", "Colour consistency"],
    route: "logo-colour",
    accent: "#6ee7b7",
    bg: "rgba(110,231,183,0.07)",
    border: "rgba(110,231,183,0.22)",
  },
  {
    id: 5,
    number: "05",
    title: "Logo Evolution",
    duration: "12 min",
    description: "How the world's most iconic logos changed over decades.",
    topics: ["Simplification over time", "Modernisation", "Brand consistency"],
    route: "logo-evolution",
    accent: "#a5f3fc",
    bg: "rgba(165,243,252,0.07)",
    border: "rgba(165,243,252,0.22)",
  },
];

export default function LogoDesignPage({ onBack, onNavigate }) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const { getCompleted, toggleComplete: toggleCtx } = useProgress();
  const completed = getCompleted("logo-design");
  const toggleComplete = (id, e) => {
    e.stopPropagation();
    toggleCtx("logo-design", id);
  };
  const progress = Math.round((completed.length / lessons.length) * 100);
  const active = lessons[activeLesson];
  const isDone = completed.includes(active.id);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');

        .ld-page { min-height:100vh; background:#0a0a0a; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }

        /* NAV */
        .ld-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(10,10,10,0.92); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.06); z-index:200; }
        .ld-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:12px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.06em; text-transform:uppercase; }
        .ld-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .ld-nav-center { font-family:'Bebas Neue',sans-serif; font-size:20px; letter-spacing:0.1em; color:rgba(255,255,255,0.7); }
        .ld-prog-pill { display:flex; align-items:center; gap:10px; font-size:11px; color:rgba(255,255,255,0.3); letter-spacing:0.08em; }
        .ld-prog-bar { width:60px; height:1px; background:rgba(255,255,255,0.1); }
        .ld-prog-fill { height:100%; background:#fff; transition:width 0.5s ease; }

        /* HERO — full cinematic */
        .ld-hero { position:relative; height:100vh; display:flex; overflow:hidden; }
        .ld-hero-left { flex:1; display:flex; flex-direction:column; justify-content:flex-end; padding:60px 48px; position:relative; z-index:2; border-right:1px solid rgba(255,255,255,0.06); }
        .ld-hero-right { width:45%; display:flex; flex-direction:column; justify-content:center; padding:60px 48px; position:relative; z-index:2; }
        .ld-hero-bg { position:absolute; inset:0; z-index:0; }
        .ld-hero-grain { position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); opacity:0.4; pointer-events:none; z-index:1; }
        .ld-hero-num-bg { position:absolute; right:-20px; bottom:-60px; font-family:'Bebas Neue',sans-serif; font-size:40vw; color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.03); line-height:1; pointer-events:none; z-index:0; user-select:none; }
        .ld-issue-tag { font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:24px; display:flex; align-items:center; gap:12px; }
        .ld-issue-tag::before { content:''; width:32px; height:1px; background:rgba(255,255,255,0.3); }
        .ld-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(5rem,12vw,11rem); line-height:0.88; letter-spacing:0.02em; color:#fff; margin-bottom:32px; }
        .ld-hero-title span { display:block; color:rgba(255,255,255,0.15); }
        .ld-hero-tagline { font-size:14px; color:rgba(255,255,255,0.35); line-height:1.8; max-width:360px; border-top:1px solid rgba(255,255,255,0.08); padding-top:24px; }
        .ld-hero-right-label { font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:32px; }
        .ld-hero-stat { margin-bottom:28px; }
        .ld-hero-stat-num { font-family:'Bebas Neue',sans-serif; font-size:56px; color:#fff; line-height:1; margin-bottom:4px; }
        .ld-hero-stat-label { font-size:11px; color:rgba(255,255,255,0.28); letter-spacing:0.1em; text-transform:uppercase; }
        .ld-hero-scroll { display:flex; align-items:center; gap:10px; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-top:auto; }
        .ld-scroll-line { width:40px; height:1px; background:rgba(255,255,255,0.2); }

        /* FULL WIDTH DIVIDER */
        .ld-divider { height:1px; background:linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent); }

        /* MAGAZINE SECTION — alternating */
        .ld-mag-section { display:grid; grid-template-columns:1fr 1fr; min-height:60vh; border-bottom:1px solid rgba(255,255,255,0.06); }
        .ld-mag-section.reverse { direction:rtl; }
        .ld-mag-section.reverse > * { direction:ltr; }
        .ld-mag-col { padding:72px 56px; display:flex; flex-direction:column; justify-content:center; }
        .ld-mag-col.dark { background:#0a0a0a; }
        .ld-mag-col.light { background:#111; border-left:1px solid rgba(255,255,255,0.06); }
        .ld-mag-issue { font-size:9px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:20px; }
        .ld-mag-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(3rem,6vw,5.5rem); line-height:0.9; letter-spacing:0.03em; color:#fff; margin-bottom:24px; }
        .ld-mag-body { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.85; }
        .ld-mag-body strong { color:rgba(255,255,255,0.75); font-weight:500; }
        .ld-mag-visual { display:flex; align-items:center; justify-content:center; padding:60px; background:#0d0d0d; min-height:300px; }

        /* BEFORE/AFTER */
        .ld-ba-wrap { position:relative; border-radius:12px; overflow:hidden; cursor:ew-resize; user-select:none; }
        .ld-ba-before { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
        .ld-ba-after { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; clip-path:inset(0 0 0 50%); transition:clip-path 0s; }
        .ld-ba-handle { position:absolute; top:0; bottom:0; width:2px; background:#fff; left:50%; transform:translateX(-50%); }
        .ld-ba-handle-dot { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:32px; height:32px; border-radius:50%; background:#fff; display:flex; align-items:center; justify-content:center; font-size:12px; color:#000; font-weight:600; }
        .ld-ba-label { position:absolute; bottom:16px; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.5); }
        .ld-ba-label.left { left:20px; }
        .ld-ba-label.right { right:20px; }

        /* LESSONS */
        .ld-lessons-section { border-top:1px solid rgba(255,255,255,0.06); }
        .ld-lessons-header { padding:40px 56px 0; display:flex; align-items:baseline; justify-content:space-between; }
        .ld-lessons-big-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; letter-spacing:0.03em; }
        .ld-prog-text { font-size:11px; color:rgba(255,255,255,0.22); letter-spacing:0.08em; }
        .ld-prog-track { height:1px; background:rgba(255,255,255,0.08); margin:24px 56px 0; }
        .ld-prog-track-fill { height:100%; background:#fff; transition:width 0.6s ease; }

        .ld-lessons-grid { display:grid; grid-template-columns:repeat(5,1fr); border-top:1px solid rgba(255,255,255,0.06); margin-top:0; }
        .ld-lesson-col { border-right:1px solid rgba(255,255,255,0.06); padding:32px 28px; cursor:pointer; transition:background 0.2s; position:relative; overflow:hidden; min-height:280px; display:flex; flex-direction:column; }
        .ld-lesson-col:last-child { border-right:none; }
        .ld-lesson-col:hover { background:rgba(255,255,255,0.02); }
        .ld-lesson-col.active-col { background:rgba(255,255,255,0.03); }
        .ld-lesson-col-num { font-family:'Bebas Neue',sans-serif; font-size:52px; color:rgba(255,255,255,0.05); line-height:1; margin-bottom:20px; }
        .ld-lesson-col.active-col .ld-lesson-col-num { color:rgba(255,255,255,0.12); }
        .ld-lesson-col-title { font-size:13px; font-weight:500; color:rgba(255,255,255,0.75); line-height:1.4; margin-bottom:8px; flex:1; }
        .ld-lesson-col.active-col .ld-lesson-col-title { color:#fff; }
        .ld-lesson-col-dur { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:16px; }
        .ld-check { width:20px; height:20px; border-radius:50%; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:9px; color:#fff; transition:all 0.2s; border:1px solid rgba(255,255,255,0.15); margin-top:auto; }
        .ld-check.done { background:#fff; color:#0a0a0a; border-color:transparent; }
        .ld-lesson-col-line { position:absolute; bottom:0; left:0; height:2px; width:0; transition:width 0.3s; }
        .ld-lesson-col:hover .ld-lesson-col-line, .ld-lesson-col.active-col .ld-lesson-col-line { width:100%; }

        /* DETAIL PANEL */
        .ld-detail { border-top:1px solid rgba(255,255,255,0.06); display:grid; grid-template-columns:1fr 1fr; }
        .ld-detail-left { padding:48px 56px; border-right:1px solid rgba(255,255,255,0.06); }
        .ld-detail-num { font-family:'Bebas Neue',sans-serif; font-size:11px; letter-spacing:0.2em; color:rgba(255,255,255,0.2); margin-bottom:10px; }
        .ld-detail-title { font-family:'DM Serif Display',serif; font-size:clamp(1.6rem,3vw,2.4rem); color:#fff; margin-bottom:16px; letter-spacing:-0.01em; }
        .ld-detail-desc { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.85; margin-bottom:24px; }
        .ld-topics { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
        .ld-topic { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; padding:5px 12px; border-radius:2px; border:1px solid; }
        .ld-detail-right { padding:48px 56px; display:flex; flex-direction:column; justify-content:center; gap:16px; }
        .ld-actions { display:flex; gap:10px; }
        .ld-btn-start { padding:10px 24px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; border:1px solid; }
        .ld-btn-done { background:none; border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.3); padding:10px 18px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .ld-btn-done:hover { color:rgba(255,255,255,0.7); }
        .ld-btn-done.done { color:#86efac; border-color:rgba(134,239,172,0.3); }
      `}</style>

      <div className="ld-page">
        <nav className="ld-nav">
          <button className="ld-back" onClick={onBack}>
            ← Back
          </button>
          <span className="ld-nav-center">Logo Design</span>
          <div className="ld-prog-pill">
            <div className="ld-prog-bar">
              <div className="ld-prog-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>
              {completed.length}/{lessons.length}
            </span>
          </div>
        </nav>

        {/* CINEMATIC HERO */}
        <div className="ld-hero">
          <div className="ld-hero-bg">
            <div className="ld-hero-grain" />
          </div>
          <div className="ld-hero-left">
            <div className="ld-issue-tag">Module 04 · Skills</div>
            <div className="ld-hero-title">
              LOGO
              <br />
              <span>DESIGN</span>
            </div>
            <p className="ld-hero-tagline">
              A great logo isn't decoration — it's a promise. One mark. Every
              surface. Forever.
            </p>
          </div>
          <div className="ld-hero-right">
            <div className="ld-hero-right-label">By the numbers</div>
            <div className="ld-hero-stat">
              <div className="ld-hero-stat-num">7</div>
              <div className="ld-hero-stat-label">Seconds to judge a brand</div>
            </div>
            <div className="ld-hero-stat">
              <div className="ld-hero-stat-num">$35</div>
              <div className="ld-hero-stat-label">
                Nike paid for the Swoosh in 1971
              </div>
            </div>
            <div className="ld-hero-stat">
              <div className="ld-hero-stat-num">5</div>
              <div className="ld-hero-stat-label">
                Principles every great logo shares
              </div>
            </div>
            <div className="ld-hero-scroll">
              <div className="ld-scroll-line" /> scroll to read
            </div>
          </div>
          <div className="ld-hero-num-bg">04</div>
        </div>

        {/* MAGAZINE SECTION 1 */}
        <div className="ld-mag-section">
          <div className="ld-mag-col dark">
            <div className="ld-mag-issue">The first rule</div>
            <div className="ld-mag-title">
              IF YOU CAN'T DRAW IT IN 10 SECONDS, SIMPLIFY IT.
            </div>
            <p className="ld-mag-body">
              The FedEx arrow. The Nike tick. The Apple bite.{" "}
              <strong>You can sketch all three from memory right now.</strong>{" "}
              That's the test. Not "does it look good on a business card" — can
              a stranger reconstruct it from memory an hour after seeing it
              once?
              <br />
              <br />
              Complexity is the enemy of memory. Every element you add divides
              the brain's attention. Every element you remove concentrates it.
            </p>
          </div>
          <div
            className="ld-mag-col light"
            style={{
              background: "#0d0d0d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BeforeAfterSlider />
          </div>
        </div>

        {/* MAGAZINE SECTION 2 — reverse */}
        <div className="ld-mag-section reverse">
          <div className="ld-mag-col dark">
            <div className="ld-mag-issue">Shape psychology</div>
            <div className="ld-mag-title">SHAPES SPEAK BEFORE WORDS DO.</div>
            <p className="ld-mag-body">
              <strong>Circles:</strong> unity, infinity, warmth. BMW, Olympics,
              Target.
              <br />
              <strong>Triangles:</strong> direction, power, energy. Adidas,
              Delta, Google Play.
              <br />
              <strong>Squares:</strong> stability, trust, order. Microsoft,
              American Express.
              <br />
              <br />
              Your logo communicates its personality before the reader has
              processed a single letter. Choose shapes that match the brand's
              emotional territory.
            </p>
          </div>
          <div
            className="ld-mag-col"
            style={{
              background: "#0d0d0d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShapeDemo />
          </div>
        </div>

        {/* LESSONS */}
        <div className="ld-lessons-section">
          <div className="ld-lessons-header">
            <div className="ld-lessons-big-title">LESSONS</div>
            <div className="ld-prog-text">
              {completed.length} of {lessons.length} complete
            </div>
          </div>
          <div className="ld-prog-track">
            <div
              className="ld-prog-track-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="ld-lessons-grid">
            {lessons.map((lesson, i) => {
              const isDoneCard = completed.includes(lesson.id);
              const isActive = activeLesson === i;
              return (
                <div
                  key={lesson.id}
                  className={`ld-lesson-col${isActive ? " active-col" : ""}`}
                  onClick={() => setActiveLesson(i)}
                >
                  <div className="ld-lesson-col-num">{lesson.number}</div>
                  <div className="ld-lesson-col-title">{lesson.title}</div>
                  <div className="ld-lesson-col-dur">{lesson.duration}</div>
                  <button
                    className={`ld-check${isDoneCard ? " done" : ""}`}
                    onClick={(e) => toggleComplete(lesson.id, e)}
                  >
                    {isDoneCard ? "✓" : ""}
                  </button>
                  <div
                    className="ld-lesson-col-line"
                    style={{ background: lesson.accent }}
                  />
                </div>
              );
            })}
          </div>
          <div className="ld-detail">
            <div className="ld-detail-left">
              <div className="ld-detail-num">
                {active.number} — {active.duration}
              </div>
              <div className="ld-detail-title">{active.title}</div>
              <p className="ld-detail-desc">{active.description}</p>
              <div className="ld-topics">
                {active.topics.map((t, i) => (
                  <span
                    key={i}
                    className="ld-topic"
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
            <div className="ld-detail-right">
              <div className="ld-actions">
                <button
                  className="ld-btn-start"
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
                  className={`ld-btn-done${isDone ? " done" : ""}`}
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

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const move = (e) => {
    if (!dragging.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    setPos(Math.max(5, Math.min(95, (x / rect.width) * 100)));
  };

  return (
    <div style={{ width: "100%", maxWidth: 380 }}>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.2)",
          marginBottom: 16,
        }}
      >
        Drag to compare
      </div>
      <div
        ref={ref}
        className="ld-ba-wrap"
        style={{ height: 200, background: "#111" }}
        onMouseDown={() => (dragging.current = true)}
        onMouseMove={move}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchStart={() => (dragging.current = true)}
        onTouchMove={move}
        onTouchEnd={() => (dragging.current = false)}
      >
        {/* BEFORE — complex */}
        <div className="ld-ba-before" style={{ background: "#111" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "serif",
                fontSize: 28,
                color: "#fff",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                letterSpacing: 2,
              }}
            >
              GENESIS
            </div>
            <div
              style={{
                fontSize: 9,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: 4,
              }}
            >
              ◆ DESIGN STUDIO ◆
            </div>
            <div
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: 2,
              }}
            >
              EST. 2024 · CREATIVITY · EXCELLENCE
            </div>
            <div
              style={{
                width: 80,
                height: 1,
                background: "rgba(255,255,255,0.3)",
                margin: "4px auto",
              }}
            />
          </div>
        </div>
        {/* AFTER — simple */}
        <div
          className="ld-ba-after"
          style={{ background: "#111", clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <div
            style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: 42,
              color: "#fff",
              letterSpacing: -1,
            }}
          >
            G.
          </div>
        </div>
        <div className="ld-ba-handle" style={{ left: `${pos}%` }}>
          <div className="ld-ba-handle-dot">↔</div>
        </div>
        <span className="ld-ba-label left">Complex</span>
        <span className="ld-ba-label right">Simple</span>
      </div>
      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.25)",
          marginTop: 14,
          lineHeight: 1.7,
        }}
      >
        Both say "Genesis Design Studio." One is forgotten in seconds. One
        isn't.
      </div>
    </div>
  );
}

function ShapeDemo() {
  const [active, setActive] = useState(0);
  const shapes = [
    {
      symbol: "●",
      name: "Circle",
      feel: "Warm · Infinite · United",
      color: "#c4b5fd",
    },
    {
      symbol: "▲",
      name: "Triangle",
      feel: "Bold · Directional · Energetic",
      color: "#f9a8d4",
    },
    {
      symbol: "■",
      name: "Square",
      feel: "Stable · Trustworthy · Ordered",
      color: "#fdba74",
    },
    {
      symbol: "⬡",
      name: "Hexagon",
      feel: "Precise · Connected · Natural",
      color: "#6ee7b7",
    },
  ];
  const s = shapes[active];
  return (
    <div style={{ width: "100%", maxWidth: 320 }}>
      <div
        style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}
      >
        {shapes.map((sh, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "6px 14px",
              border: `1px solid ${active === i ? sh.color : "rgba(255,255,255,0.1)"}`,
              background: active === i ? `${sh.color}15` : "transparent",
              color: active === i ? sh.color : "rgba(255,255,255,0.35)",
              borderRadius: 2,
              cursor: "pointer",
              fontSize: 11,
              fontFamily: "'DM Sans',sans-serif",
              letterSpacing: "0.08em",
              transition: "all 0.2s",
            }}
          >
            {sh.name}
          </button>
        ))}
      </div>
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div
          style={{
            fontSize: 100,
            color: s.color,
            lineHeight: 1,
            marginBottom: 16,
            transition: "all 0.3s",
          }}
        >
          {s.symbol}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {s.feel}
        </div>
      </div>
    </div>
  );
}
