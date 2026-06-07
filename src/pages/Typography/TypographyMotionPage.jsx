import { useState, useEffect, useRef } from "react";

const ANIMATIONS = [
  {
    name: "Fade Up",
    desc: "The classic entrance. Text rises from below while fading in. Works universally — headlines, cards, sections.",
    css: `@keyframes fadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

.text {
  animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}`,
    accent: "#c4b5fd",
  },
  {
    name: "Letter Reveal",
    desc: "Each letter drops in with a staggered delay. Creates drama and forces the reader to watch the word form.",
    css: `.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(40px) rotateX(40deg);
  animation: letterIn 0.6s ease forwards;
}

.letter:nth-child(n) {
  animation-delay: calc(n * 55ms);
}`,
    accent: "#f9a8d4",
  },
  {
    name: "Slide In",
    desc: "Text slides from outside the viewport. Directional — left entry suggests arrival, right entry suggests departure.",
    css: `@keyframes slideIn {
  from { opacity: 0; transform: translateX(-48px); }
  to   { opacity: 1; transform: translateX(0); }
}

.text {
  animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}`,
    accent: "#fdba74",
  },
  {
    name: "Scale Reveal",
    desc: "Text scales from slightly below 1 while fading in. Subtle but adds weight and presence to display headings.",
    css: `@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
}

.text {
  animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}`,
    accent: "#6ee7b7",
  },
  {
    name: "Blur Reveal",
    desc: "Text snaps into focus from a blurred state. Cinematic feel — used in film titles and high-end brand intros.",
    css: `@keyframes blurIn {
  from { opacity: 0; filter: blur(12px); }
  to   { opacity: 1; filter: blur(0); }
}

.text {
  animation: blurIn 0.8s ease forwards;
}`,
    accent: "#a5f3fc",
  },
];

function AnimationPreview({ type, accent, key: triggerKey }) {
  const [playing, setPlaying] = useState(true);
  const [key, setKey] = useState(0);

  const replay = () => {
    setPlaying(false);
    setTimeout(() => {
      setPlaying(true);
      setKey((k) => k + 1);
    }, 50);
  };

  const word = "Typography";
  const letters = word.split("");

  const getStyle = () => {
    if (!playing) return { opacity: 0 };
    const base = {
      animationFillMode: "forwards",
      animationDuration: "0.7s",
      animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
    };
    switch (type) {
      case "Fade Up":
        return {
          ...base,
          animation: `tg-fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards`,
        };
      case "Slide In":
        return {
          ...base,
          animation: `tg-slideIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards`,
        };
      case "Scale Reveal":
        return {
          ...base,
          animation: `tg-scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards`,
        };
      case "Blur Reveal":
        return { ...base, animation: `tg-blurIn 0.8s ease forwards` };
      default:
        return {};
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      style={{
        border: "0.5px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: "48px 36px",
        background: "rgba(255,255,255,0.02)",
        minHeight: 180,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes tg-fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes tg-slideIn { from { opacity:0; transform:translateX(-48px); } to { opacity:1; transform:translateX(0); } }
        @keyframes tg-scaleIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
        @keyframes tg-blurIn { from { opacity:0; filter:blur(12px); } to { opacity:1; filter:blur(0); } }
        @keyframes tg-letterIn { from { opacity:0; transform:translateY(36px) rotateX(40deg); } to { opacity:1; transform:translateY(0) rotateX(0); } }
      `}</style>

      {type === "Letter Reveal" ? (
        <div
          key={key}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2rem,4vw,3.5rem)",
            color: accent,
            letterSpacing: "-0.02em",
            perspective: 400,
            display: "flex",
          }}
        >
          {letters.map((l, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: 0,
                animation: playing
                  ? `tg-letterIn 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 55}ms forwards`
                  : "none",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      ) : (
        <div
          key={key}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2rem,4vw,3.5rem)",
            color: accent,
            letterSpacing: "-0.02em",
            opacity: 0,
            ...getStyle(),
          }}
        >
          {word}
        </div>
      )}

      <button
        onClick={replay}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "0.5px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.4)",
          padding: "6px 16px",
          borderRadius: "999px",
          fontSize: 11,
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
        }
      >
        ↺ Replay
      </button>
    </div>
  );
}

export default function TypographyMotionPage({ onBack }) {
  const [activeAnim, setActiveAnim] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);
  const anim = ANIMATIONS[activeAnim];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setScrollProgress(scrollTop / (scrollHeight - clientHeight));
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const PRINCIPLES = [
    {
      icon: "⏱",
      title: "Duration & Easing",
      desc: "Headlines: 0.5–0.8s with ease-out. Body text: 0.3–0.5s. Never use linear easing — it feels mechanical.",
      accent: "#c4b5fd",
      bg: "rgba(196,181,253,0.08)",
      border: "rgba(196,181,253,0.2)",
    },
    {
      icon: "⏳",
      title: "Staggered delay",
      desc: "Offset multiple elements by 80–120ms each. This creates a cascade that feels natural, not simultaneous.",
      accent: "#f9a8d4",
      bg: "rgba(249,168,212,0.08)",
      border: "rgba(249,168,212,0.2)",
    },
    {
      icon: "👁",
      title: "Scroll triggers",
      desc: "Animate on enter, not on load. Use IntersectionObserver to trigger animations as the user scrolls into each section.",
      accent: "#fdba74",
      bg: "rgba(253,186,116,0.08)",
      border: "rgba(253,186,116,0.2)",
    },
    {
      icon: "🎭",
      title: "Exit animations",
      desc: "Elements leaving the viewport should animate out (fade down, slide out). Entry without exit feels incomplete.",
      accent: "#6ee7b7",
      bg: "rgba(110,231,183,0.07)",
      border: "rgba(110,231,183,0.2)",
    },
    {
      icon: "⚡",
      title: "Performance",
      desc: "Animate only opacity and transform — these run on the GPU. Never animate width, height, or layout properties.",
      accent: "#a5f3fc",
      bg: "rgba(165,243,252,0.07)",
      border: "rgba(165,243,252,0.2)",
    },
    {
      icon: "♿",
      title: "Accessibility",
      desc: "Respect prefers-reduced-motion. Always provide a static fallback for users who need reduced motion.",
      accent: "#fda4af",
      bg: "rgba(253,164,175,0.07)",
      border: "rgba(253,164,175,0.2)",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&family=Playfair+Display:wght@700&display=swap');
        .tm-page { min-height:100vh; background:#06080f; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.85); overflow-x:hidden; }
        .tm-nav { display:flex; align-items:center; justify-content:space-between; padding:18px 48px; position:sticky; top:0; background:rgba(6,8,15,0.9); backdrop-filter:blur(24px); border-bottom:0.5px solid rgba(255,255,255,0.06); z-index:100; }
        .tm-back { background:none; border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.45); padding:8px 20px; border-radius:999px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .tm-back:hover { color:#fff; border-color:rgba(255,255,255,0.25); }
        .tm-nav-label { font-family:'DM Serif Display',serif; font-size:16px; color:rgba(255,255,255,0.6); }
        .tm-tag { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.2); }

        /* HERO */
        .tm-hero { position:relative; padding:80px 48px 60px; border-bottom:0.5px solid rgba(255,255,255,0.06); overflow:hidden; }
        .tm-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 30% 50%, rgba(251,113,133,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(196,181,253,0.05) 0%, transparent 50%); pointer-events:none; }
        .tm-hero-lines { position:absolute; inset:0; pointer-events:none; }
        .tm-hl { position:absolute; left:0; right:0; height:0.5px; background:linear-gradient(to right, transparent 5%, rgba(251,113,133,0.07) 40%, rgba(251,113,133,0.07) 60%, transparent 95%); }
        .tm-vl { position:absolute; top:0; bottom:0; width:0.5px; background:linear-gradient(to bottom, transparent 10%, rgba(251,113,133,0.05) 50%, transparent 90%); }
        .tm-hero-inner { position:relative; z-index:1; max-width:640px; }
        .tm-eyebrow { font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:16px; display:flex; align-items:center; gap:12px; }
        .tm-eyebrow::after { content:''; flex:0 0 40px; height:0.5px; background:rgba(255,255,255,0.2); }
        .tm-hero-title { font-family:'DM Serif Display',serif; font-size:clamp(3rem,7vw,6rem); font-weight:400; line-height:0.95; letter-spacing:-0.03em; color:#fff; margin-bottom:24px; }
        .tm-hero-title em { font-style:italic; color:#fb7185; display:block; }
        .tm-hero-sub { font-size:15px; color:rgba(255,255,255,0.32); line-height:1.8; max-width:480px; }
        .tm-hero-num { position:absolute; right:48px; bottom:-20px; font-family:'DM Serif Display',serif; font-size:clamp(6rem,15vw,14rem); color:transparent; -webkit-text-stroke:0.5px rgba(251,113,133,0.08); line-height:1; pointer-events:none; user-select:none; }

        .tm-section { padding:72px 48px; border-bottom:0.5px solid rgba(255,255,255,0.06); }
        .tm-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .tm-section-title { font-family:'DM Serif Display',serif; font-size:clamp(1.6rem,3vw,2.2rem); color:#fff; letter-spacing:-0.02em; }
        .tm-section-line { flex:1; height:0.5px; background:rgba(255,255,255,0.07); }
        .tm-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:40px; max-width:520px; line-height:1.7; }

        /* ANIM TABS */
        .tm-anim-tabs { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:32px; }
        .tm-anim-tab { padding:8px 20px; border-radius:999px; font-size:12px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:0.5px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.38); }
        .tm-anim-tab.active { background:rgba(251,113,133,0.1); border-color:rgba(251,113,133,0.3); color:#fb7185; }

        /* ANIM LAYOUT */
        .tm-anim-layout { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .tm-anim-info { display:flex; flex-direction:column; gap:16px; justify-content:center; }
        .tm-anim-name { font-family:'DM Serif Display',serif; font-size:26px; color:#fff; margin-bottom:6px; }
        .tm-anim-desc { font-size:13px; color:rgba(255,255,255,0.38); line-height:1.75; margin-bottom:12px; }
        .tm-code { background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.08); border-radius:12px; padding:18px 20px; }
        .tm-code pre { font-family:'Courier New',monospace; font-size:11px; color:rgba(255,255,255,0.45); line-height:1.7; margin:0; white-space:pre-wrap; }

        /* SCROLL DEMO */
        .tm-scroll-demo { display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:start; }
        .tm-scroll-area { height:300px; overflow-y:auto; border:0.5px solid rgba(255,255,255,0.07); border-radius:16px; padding:24px; background:rgba(255,255,255,0.02); scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.1) transparent; }
        .tm-scroll-item { padding:20px 0; border-bottom:0.5px solid rgba(255,255,255,0.05); }
        .tm-scroll-item:last-child { border-bottom:none; }
        .tm-scroll-headline { font-family:'DM Serif Display',serif; font-size:20px; color:#fff; margin-bottom:6px; }
        .tm-scroll-body { font-size:12px; color:rgba(255,255,255,0.3); line-height:1.7; }
        .tm-scroll-info { display:flex; flex-direction:column; gap:12px; justify-content:center; }
        .tm-scroll-progress-wrap { background:rgba(255,255,255,0.04); border:0.5px solid rgba(255,255,255,0.08); border-radius:14px; padding:18px 20px; }
        .tm-scroll-pct { font-family:'DM Serif Display',serif; font-size:40px; color:#fb7185; margin-bottom:6px; }
        .tm-scroll-bar { height:3px; background:rgba(255,255,255,0.07); border-radius:2px; overflow:hidden; margin-bottom:8px; }
        .tm-scroll-bar-fill { height:100%; background:linear-gradient(to right,#fb7185,#c4b5fd); border-radius:2px; transition:width 0.1s; }
        .tm-scroll-desc { font-size:12px; color:rgba(255,255,255,0.3); line-height:1.7; }

        /* PRINCIPLES GRID */
        .tm-principles { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        .tm-principle { border-radius:16px; padding:22px; border:1px solid; }
        .tm-principle-icon { font-size:22px; margin-bottom:12px; }
        .tm-principle-title { font-size:14px; font-weight:500; color:rgba(255,255,255,0.85); margin-bottom:7px; }
        .tm-principle-text { font-size:12px; color:rgba(255,255,255,0.35); line-height:1.7; }

        @media (max-width:768px) {
          .tm-anim-layout,.tm-scroll-demo { grid-template-columns:1fr; }
          .tm-principles { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>

      <div className="tm-page">
        <nav className="tm-nav">
          <button className="tm-back" onClick={onBack}>
            ← Back
          </button>
          <span className="tm-nav-label">Motion & Type Impact</span>
          <span className="tm-tag">Lesson 07</span>
        </nav>

        {/* HERO */}
        <div className="tm-hero">
          <div className="tm-hero-bg" />
          <div className="tm-hero-lines">
            {[25, 50, 75].map((p, i) => (
              <div key={i} className="tm-hl" style={{ top: `${p}%` }} />
            ))}
            {[20, 40, 60, 80].map((p, i) => (
              <div key={i} className="tm-vl" style={{ left: `${p}%` }} />
            ))}
          </div>
          <div className="tm-hero-inner">
            <div className="tm-eyebrow">Typography · Lesson 07</div>
            <h1 className="tm-hero-title">
              Motion &<br />
              <em>Type Impact</em>
            </h1>
            <p className="tm-hero-sub">
              Static text informs. Moving text commands attention. Learn how to
              animate type without destroying readability.
            </p>
          </div>
          <div className="tm-hero-num">07</div>
        </div>

        {/* ANIMATION EXPLORER */}
        <div className="tm-section">
          <div className="tm-section-header">
            <div className="tm-section-title">Animation Types</div>
            <div className="tm-section-line" />
          </div>
          <p className="tm-section-sub">
            Click a type then hit Replay to watch it live. Each creates a
            different emotional response.
          </p>
          <div className="tm-anim-tabs">
            {ANIMATIONS.map((a, i) => (
              <button
                key={i}
                className={`tm-anim-tab${activeAnim === i ? " active" : ""}`}
                onClick={() => setActiveAnim(i)}
              >
                {a.name}
              </button>
            ))}
          </div>
          <div className="tm-anim-layout">
            <AnimationPreview
              type={anim.name}
              accent={anim.accent}
              key={activeAnim}
            />
            <div className="tm-anim-info">
              <div>
                <div className="tm-anim-name">{anim.name}</div>
                <div className="tm-anim-desc">{anim.desc}</div>
              </div>
              <div className="tm-code">
                <pre>{anim.css}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL DEMO */}
        <div className="tm-section">
          <div className="tm-section-header">
            <div className="tm-section-title">Scroll-Triggered Type</div>
            <div className="tm-section-line" />
          </div>
          <p className="tm-section-sub">
            Scroll inside the box to see progress tracking — the foundation of
            scroll-triggered animations.
          </p>
          <div className="tm-scroll-demo">
            <div className="tm-scroll-area" ref={scrollRef}>
              {[
                "The Grid",
                "Proximity",
                "Visual Balance",
                "Hierarchy",
                "Contrast",
                "White Space",
              ].map((t, i) => (
                <div key={i} className="tm-scroll-item">
                  <div className="tm-scroll-headline">{t}</div>
                  <div className="tm-scroll-body">
                    Scroll position determines when this element animates into
                    view. IntersectionObserver fires at threshold 0.15.
                  </div>
                </div>
              ))}
            </div>
            <div className="tm-scroll-info">
              <div className="tm-scroll-progress-wrap">
                <div className="tm-scroll-pct">
                  {Math.round(scrollProgress * 100)}%
                </div>
                <div className="tm-scroll-bar">
                  <div
                    className="tm-scroll-bar-fill"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
                <div className="tm-scroll-desc">
                  This percentage is what IntersectionObserver gives you. Map it
                  to opacity, translateY, or scale.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRINCIPLES */}
        <div className="tm-section" style={{ borderBottom: "none" }}>
          <div className="tm-section-header">
            <div className="tm-section-title">Motion Principles</div>
            <div className="tm-section-line" />
          </div>
          <div className="tm-principles">
            {PRINCIPLES.map((p, i) => (
              <div
                key={i}
                className="tm-principle"
                style={{ background: p.bg, borderColor: p.border }}
              >
                <div className="tm-principle-icon">{p.icon}</div>
                <div className="tm-principle-title">{p.title}</div>
                <div className="tm-principle-text">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
