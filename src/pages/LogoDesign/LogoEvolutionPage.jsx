import { useState, useEffect } from "react";

const BRANDS = [
  {
    name: "Apple",
    emoji: "🍎",
    accent: "#c4b5fd",
    bg: "#1a0a3e",
    tagline: "From a painting to a silhouette",
    fun: "The original 1976 logo had Isaac Newton sitting under an apple tree. It was so detailed it was basically a painting. Can you imagine that on a phone?",
    lesson:
      "Every detail you add is a detail someone has to remember. Apple removed everything until only the essential shape remained.",
    steps: [
      {
        year: "1976",
        label: "Newton painting",
        complexity: 98,
        emoji: "🎨",
        note: "Basically a fine art illustration",
      },
      {
        year: "1977",
        label: "Rainbow apple",
        complexity: 65,
        emoji: "🌈",
        note: "Colourful, joyful, immediately iconic",
      },
      {
        year: "1998",
        label: "Monochrome",
        complexity: 25,
        emoji: "⚫",
        note: "Same shape, zero colour",
      },
      {
        year: "2001",
        label: "Chrome/glass",
        complexity: 30,
        emoji: "✨",
        note: "Brief trendy step — almost too shiny",
      },
      {
        year: "2013",
        label: "Flat forever",
        complexity: 8,
        emoji: "✅",
        note: "Perfect. Not changed since.",
      },
    ],
  },
  {
    name: "Nike",
    emoji: "✔️",
    accent: "#f9a8d4",
    bg: "#3a0a2e",
    tagline: "A $35 design worth billions",
    fun: "Designer Carolyn Davidson charged $35 for the Swoosh in 1971. Nike's founders weren't sure they liked it. Phil Knight said 'I don't love it, but it'll grow on me.' It grew on 8 billion people.",
    lesson:
      "Nike removed their own name in 1995 because the mark had become more powerful than the word. That's the goal.",
    steps: [
      {
        year: "1971",
        label: "Swoosh + Nike",
        complexity: 40,
        emoji: "✍️",
        note: "$35. One afternoon. Iconic forever.",
      },
      {
        year: "1978",
        label: "Bold wordmark",
        complexity: 45,
        emoji: "💪",
        note: "Bigger, bolder, more confident",
      },
      {
        year: "1985",
        label: "Nike in box",
        complexity: 55,
        emoji: "📦",
        note: "Over-designed — the box was a mistake",
      },
      {
        year: "1995",
        label: "Swoosh only",
        complexity: 10,
        emoji: "🎯",
        note: "Name removed. Mark strong enough.",
      },
      {
        year: "2024",
        label: "Unchanged",
        complexity: 10,
        emoji: "♾️",
        note: "29 years. Zero changes. Perfect.",
      },
    ],
  },
  {
    name: "Google",
    emoji: "🔍",
    accent: "#fdba74",
    bg: "#2a1a00",
    tagline: "Mobile killed the serif",
    fun: "Google used a serif font with drop shadows for 17 years. The 2015 redesign was triggered by one thing: the logo looked terrible at 24px on a phone keyboard. Mobile changed everything.",
    lesson:
      "Context is everything. The same logo that worked on a desktop in 2000 was failing on a smartphone in 2013. Design for where people actually see it.",
    steps: [
      {
        year: "1998",
        label: "Serif + shadow",
        complexity: 80,
        emoji: "🎭",
        note: "Classic 90s design — drop shadows on everything",
      },
      {
        year: "2010",
        label: "Cleaner serif",
        complexity: 50,
        emoji: "✏️",
        note: "Less shadow, more confidence",
      },
      {
        year: "2013",
        label: "Flat serif",
        complexity: 35,
        emoji: "📱",
        note: "Preparing for mobile — shadows gone",
      },
      {
        year: "2015",
        label: "Geometric sans",
        complexity: 20,
        emoji: "🚀",
        note: "Complete redesign for the phone era",
      },
      {
        year: "2024",
        label: "Unchanged",
        complexity: 20,
        emoji: "✅",
        note: "9 years stable — finally right",
      },
    ],
  },
];

const LESSONS = [
  {
    icon: "📉",
    title: "Simpler over time, always",
    text: "Every major rebrand moves toward simplicity. Complexity = uncertainty. Simplicity = conviction.",
    color: "#c4b5fd",
  },
  {
    icon: "📱",
    title: "Context forces change",
    text: "Mobile destroyed logos designed for print. The medium you design for matters as much as the mark.",
    color: "#f9a8d4",
  },
  {
    icon: "♾️",
    title: "Some marks never change",
    text: "The Nike Swoosh hasn't changed in 53 years. When you get it exactly right, there's nothing left to do.",
    color: "#fdba74",
  },
  {
    icon: "🔤",
    title: "Type ages faster than symbols",
    text: "Wordmarks look dated faster than icons. Updating the font while keeping the symbol is the most common evolution strategy.",
    color: "#6ee7b7",
  },
  {
    icon: "⚫",
    title: "Colour is the first to go",
    text: "Budget cuts, new media, new contexts — colour disappears first. The silhouette always survives.",
    color: "#a5f3fc",
  },
  {
    icon: "📅",
    title: "Every version was right for its time",
    text: "Don't mock old logos. They solved problems you don't have. The rainbow Apple was perfect for 1977.",
    color: "#fda4af",
  },
];

export default function LogoEvolutionPage({ onBack }) {
  const [activeBrand, setActiveBrand] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const brand = BRANDS[activeBrand];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setVisibleSteps([]);
    brand.steps.forEach((_, i) => {
      setTimeout(() => setVisibleSteps((v) => [...v, i]), i * 150 + 100);
    });
  }, [activeBrand]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .le-page { min-height:100vh; background:#0f0f14; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }

        .le-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(15,15,20,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:100; }
        .le-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .le-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .le-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .le-tag { font-size:10px; letter-spacing:0.15em; color:rgba(255,255,255,0.25); text-transform:uppercase; }

        /* HERO */
        .le-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(255,255,255,0.08); position:relative; overflow:hidden; }
        .le-hero-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:14px; }
        .le-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,10vw,9rem); line-height:0.88; letter-spacing:0.02em; color:#fff; margin-bottom:20px; }
        .le-hero-title em { background:linear-gradient(135deg,#c4b5fd,#f9a8d4); -webkit-background-clip:text; background-clip:text; color:transparent; font-style:normal; display:block; }
        .le-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:500px; line-height:1.8; }
        .le-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04); line-height:1; pointer-events:none; user-select:none; }

        /* BRAND SELECTOR */
        .le-brand-sel { display:grid; grid-template-columns:repeat(3,1fr); border-bottom:1px solid rgba(255,255,255,0.08); }
        .le-brand-btn { padding:32px 40px; cursor:pointer; border:none; background:transparent; text-align:left; border-right:1px solid rgba(255,255,255,0.08); transition:all 0.2s; position:relative; overflow:hidden; }
        .le-brand-btn:last-child { border-right:none; }
        .le-brand-btn:hover { background:rgba(255,255,255,0.02); }
        .le-brand-btn.brand-active { background:rgba(255,255,255,0.03); }
        .le-brand-emoji { font-size:32px; margin-bottom:8px; display:block; transition:transform 0.3s; }
        .le-brand-btn:hover .le-brand-emoji, .le-brand-btn.brand-active .le-brand-emoji { transform:scale(1.2) rotate(-5deg); }
        .le-brand-name { font-family:'Bebas Neue',sans-serif; font-size:28px; color:rgba(255,255,255,0.5); letter-spacing:0.04em; transition:color 0.2s; }
        .le-brand-btn.brand-active .le-brand-name { color:#fff; }
        .le-brand-tagline { font-size:11px; color:rgba(255,255,255,0.22); margin-top:4px; }
        .le-brand-btn.brand-active .le-brand-tagline { color:rgba(255,255,255,0.4); }
        .le-brand-line { position:absolute; bottom:0; left:0; height:2px; width:0; transition:width 0.3s; }
        .le-brand-btn.brand-active .le-brand-line { width:100%; }

        /* MAIN */
        .le-main { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid rgba(255,255,255,0.08); }

        /* TIMELINE */
        .le-timeline-col { padding:60px 56px; border-right:1px solid rgba(255,255,255,0.08); }
        .le-col-label { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-bottom:32px; display:flex; align-items:center; gap:10px; }
        .le-col-label::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .le-timeline { position:relative; padding-left:24px; }
        .le-tl-spine { position:absolute; left:4px; top:8px; bottom:8px; width:1px; background:rgba(255,255,255,0.08); }
        .le-tl-item { position:relative; margin-bottom:28px; opacity:0; transform:translateX(-10px); transition:opacity 0.35s ease, transform 0.35s ease; }
        .le-tl-item.show { opacity:1; transform:translateX(0); }
        .le-tl-dot { position:absolute; left:-28px; top:7px; width:10px; height:10px; border-radius:50%; border:1.5px solid rgba(255,255,255,0.15); background:#0f0f14; transition:all 0.3s; }
        .le-tl-item.show .le-tl-dot { background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.3); }
        .le-tl-header { display:flex; align-items:center; gap:10px; margin-bottom:4px; }
        .le-tl-emoji { font-size:18px; }
        .le-tl-year { font-family:'Bebas Neue',sans-serif; font-size:15px; letter-spacing:0.1em; }
        .le-tl-label { font-size:14px; color:rgba(255,255,255,0.7); margin-bottom:4px; }
        .le-tl-note { font-size:11px; color:rgba(255,255,255,0.28); line-height:1.5; margin-bottom:8px; font-style:italic; }
        .le-complexity-wrap { display:flex; align-items:center; gap:10px; }
        .le-complexity-track { width:100px; height:3px; background:rgba(255,255,255,0.08); border-radius:999px; overflow:hidden; }
        .le-complexity-fill { height:100%; border-radius:999px; transition:width 0.6s ease; }
        .le-complexity-num { font-size:10px; color:rgba(255,255,255,0.2); }

        /* STORY */
        .le-story-col { padding:60px 56px; }
        .le-story-name { font-family:'Bebas Neue',sans-serif; font-size:52px; line-height:0.9; color:#fff; margin-bottom:6px; }
        .le-story-tagline { font-size:13px; font-style:italic; margin-bottom:24px; }
        .le-fun-card { border-radius:14px; padding:20px 22px; margin-bottom:20px; border:1px solid; }
        .le-fun-label { font-size:10px; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:8px; opacity:0.6; }
        .le-fun-text { font-size:13px; color:rgba(255,255,255,0.55); line-height:1.75; }
        .le-lesson-card { border-radius:14px; padding:20px 22px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.03); }
        .le-lesson-label { font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:8px; }
        .le-lesson-text { font-size:13px; color:rgba(255,255,255,0.45); line-height:1.75; font-style:italic; }

        /* LESSONS */
        .le-lessons { padding:60px 56px; border-top:1px solid rgba(255,255,255,0.08); }
        .le-lessons-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; margin-bottom:28px; }
        .le-lessons-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        .le-lesson-item { border-radius:14px; padding:24px; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); transition:all 0.2s; cursor:default; }
        .le-lesson-item:hover { background:rgba(255,255,255,0.04); transform:translateY(-2px); }
        .le-lesson-emoji { font-size:28px; margin-bottom:12px; display:block; }
        .le-lesson-title { font-size:14px; font-weight:500; margin-bottom:8px; }
        .le-lesson-text { font-size:12px; color:rgba(255,255,255,0.32); line-height:1.7; }
      `}</style>

      <div className="le-page">
        <nav className="le-nav">
          <button className="le-back" onClick={onBack}>
            ← Back
          </button>
          <span className="le-nav-title">Logo Evolution</span>
          <span className="le-tag">Lesson 05</span>
        </nav>

        <div className="le-hero">
          <div className="le-hero-eyebrow">Logo Design · Lesson 05</div>
          <div className="le-hero-title">
            LOGOS DON'T
            <br />
            <em>STAY STILL.</em>
          </div>
          <p className="le-hero-sub">
            The world's most iconic logos have changed dramatically over
            decades. Study what changed — and what never did.
          </p>
          <div className="le-hero-num">05</div>
        </div>

        {/* BRAND SELECTOR */}
        <div className="le-brand-sel">
          {BRANDS.map((b, i) => (
            <button
              key={i}
              className={`le-brand-btn${activeBrand === i ? " brand-active" : ""}`}
              onClick={() => setActiveBrand(i)}
            >
              <span className="le-brand-emoji">{b.emoji}</span>
              <div className="le-brand-name">{b.name}</div>
              <div className="le-brand-tagline">{b.tagline}</div>
              <div className="le-brand-line" style={{ background: b.accent }} />
            </button>
          ))}
        </div>

        {/* MAIN */}
        <div className="le-main">
          <div className="le-timeline-col">
            <div className="le-col-label">Timeline</div>
            <div className="le-timeline">
              <div className="le-tl-spine" />
              {brand.steps.map((s, i) => (
                <div
                  key={`${activeBrand}-${i}`}
                  className={`le-tl-item${visibleSteps.includes(i) ? " show" : ""}`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div
                    className="le-tl-dot"
                    style={{
                      borderColor: visibleSteps.includes(i)
                        ? brand.accent
                        : "rgba(255,255,255,0.15)",
                    }}
                  />
                  <div className="le-tl-header">
                    <span className="le-tl-emoji">{s.emoji}</span>
                    <span
                      className="le-tl-year"
                      style={{ color: brand.accent }}
                    >
                      {s.year}
                    </span>
                  </div>
                  <div className="le-tl-label">{s.label}</div>
                  <div className="le-tl-note">{s.note}</div>
                  <div className="le-complexity-wrap">
                    <div className="le-complexity-track">
                      <div
                        className="le-complexity-fill"
                        style={{
                          width: `${s.complexity}%`,
                          background: brand.accent,
                        }}
                      />
                    </div>
                    <span className="le-complexity-num">
                      complexity {s.complexity}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="le-story-col">
            <div className="le-story-name">{brand.name}</div>
            <div className="le-story-tagline" style={{ color: brand.accent }}>
              {brand.tagline}
            </div>
            <div
              className="le-fun-card"
              style={{
                borderColor: `${brand.accent}30`,
                background: `${brand.bg}cc`,
              }}
            >
              <div className="le-fun-label" style={{ color: brand.accent }}>
                🤯 Fun fact
              </div>
              <div className="le-fun-text">{brand.fun}</div>
            </div>
            <div className="le-lesson-card">
              <div className="le-lesson-label">💡 The lesson</div>
              <div className="le-lesson-text">{brand.lesson}</div>
            </div>
          </div>
        </div>

        {/* LESSONS */}
        <div className="le-lessons">
          <div className="le-lessons-title">
            6 THINGS LOGO EVOLUTION TEACHES
          </div>
          <div className="le-lessons-grid">
            {LESSONS.map((l, i) => (
              <div key={i} className="le-lesson-item">
                <span className="le-lesson-emoji">{l.icon}</span>
                <div className="le-lesson-title" style={{ color: l.color }}>
                  {l.title}
                </div>
                <div className="le-lesson-text">{l.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
