import { useState, useRef, useEffect } from "react";

const EMOTIONS = [
  {
    color: "#E63946",
    name: "Red",
    emotion: "Passion & Urgency",
    keywords: ["Energy", "Danger", "Love", "Power", "Excitement"],
    desc: "Red is the most emotionally intense colour. It physically raises heart rate and blood pressure. Used in clearance sales, stop signs, and love stories alike.",
    brands: ["Coca-Cola", "Netflix", "YouTube", "Ferrari"],
    bg: "rgba(230,57,70,0.08)",
    border: "rgba(230,57,70,0.25)",
  },
  {
    color: "#F4A261",
    name: "Orange",
    emotion: "Energy & Optimism",
    keywords: ["Warmth", "Creativity", "Fun", "Adventure", "Confidence"],
    desc: "Orange combines red's intensity with yellow's positivity. It's approachable and stimulating without being aggressive. Great for CTAs that need to feel friendly.",
    brands: ["Amazon", "Fanta", "Harley-Davidson", "Nickelodeon"],
    bg: "rgba(244,162,97,0.08)",
    border: "rgba(244,162,97,0.25)",
  },
  {
    color: "#FFD166",
    name: "Yellow",
    emotion: "Joy & Intellect",
    keywords: ["Happiness", "Optimism", "Clarity", "Warning", "Youth"],
    desc: "The most visible colour to the human eye. Yellow triggers dopamine release and creates instant attention. Overuse can cause anxiety — use it as an accent.",
    brands: ["McDonald's", "IKEA", "Snapchat", "DHL"],
    bg: "rgba(255,209,102,0.08)",
    border: "rgba(255,209,102,0.25)",
  },
  {
    color: "#06D6A0",
    name: "Green",
    emotion: "Growth & Balance",
    keywords: ["Nature", "Health", "Money", "Calm", "Freshness"],
    desc: "Green sits at the centre of the visible spectrum requiring no adjustment by the eye — making it the most restful colour. Universally associated with safety and permission.",
    brands: ["Whole Foods", "Spotify", "John Deere", "Animal Planet"],
    bg: "rgba(6,214,160,0.07)",
    border: "rgba(6,214,160,0.22)",
  },
  {
    color: "#118AB2",
    name: "Blue",
    emotion: "Trust & Calm",
    keywords: ["Loyalty", "Intelligence", "Stability", "Peace", "Professional"],
    desc: "The world's most universally preferred colour. Blue slows the heart rate and reduces appetite. No other colour signals trustworthiness as effectively.",
    brands: ["Facebook", "Samsung", "Ford", "PayPal"],
    bg: "rgba(17,138,178,0.08)",
    border: "rgba(17,138,178,0.22)",
  },
  {
    color: "#9B5DE5",
    name: "Purple",
    emotion: "Luxury & Mystery",
    keywords: ["Royalty", "Wisdom", "Magic", "Ambition", "Spirituality"],
    desc: "Historically the most expensive pigment to produce — reserved for royalty. Purple blends blue's stability with red's energy, suggesting power without aggression.",
    brands: ["Cadbury", "Hallmark", "FedEx", "Twitch"],
    bg: "rgba(155,93,229,0.08)",
    border: "rgba(155,93,229,0.25)",
  },
  {
    color: "#F72585",
    name: "Pink",
    emotion: "Romance & Playfulness",
    keywords: ["Love", "Sweetness", "Sensitivity", "Femininity", "Modern"],
    desc: "Pink has evolved from purely feminine associations to a bold, modern statement colour. Hot pink demands attention; soft pink soothes. Barbie proved both at once.",
    brands: ["Barbie", "T-Mobile", "Cosmopolitan", "Victoria's Secret"],
    bg: "rgba(247,37,133,0.08)",
    border: "rgba(247,37,133,0.25)",
  },
  {
    color: "#8D99AE",
    name: "Grey",
    emotion: "Sophistication & Neutrality",
    keywords: ["Balance", "Timeless", "Professional", "Subtle", "Elegant"],
    desc: "Grey carries no emotional baggage — it simply lets other colours speak. The backbone of premium design systems. Too much creates coldness; too little loses polish.",
    brands: ["Apple", "Mercedes", "Wikipedia", "Audi"],
    bg: "rgba(141,153,174,0.07)",
    border: "rgba(141,153,174,0.2)",
  },
];

export default function ColourPsychologyPage({ onBack }) {
  const [active, setActive] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const current = EMOTIONS[active];

  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }, 0);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&display=swap');

        .cp-page { height:100vh; background:#080010; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.85); display:flex; flex-direction:column; overflow:hidden; }
        .cp-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 36px; background:rgba(8,0,16,0.88); backdrop-filter:blur(20px); border-bottom:0.5px solid rgba(255,255,255,0.07); z-index:100; flex-shrink:0; }
        .cp-back { display:flex; align-items:center; gap:7px; background:rgba(255,255,255,0.05); border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:999px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .cp-back:hover { background:rgba(255,255,255,0.09); color:#fff; }
        .cp-nav-label { font-family:'DM Serif Display',serif; font-size:16px; color:rgba(255,255,255,0.7); }

        .cp-body { display:flex; flex:1; overflow:hidden; }

        /* LEFT SIDEBAR — colour strip */
        .cp-strip { width:72px; display:flex; flex-direction:column; flex-shrink:0; overflow-y:auto; scrollbar-width:none; }
        .cp-strip::-webkit-scrollbar { display:none; }
        .cp-strip-item { flex:1; min-height:60px; cursor:pointer; transition:all 0.2s; position:relative; display:flex; align-items:center; justify-content:center; }
        .cp-strip-item:hover { filter:brightness(1.2); }
        .cp-strip-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.4); transition:all 0.2s; }
        .cp-strip-item.active-strip .cp-strip-dot { width:12px; height:12px; background:#fff; }

        /* MAIN SCROLL AREA */
        .cp-main { flex:1; overflow-y:auto; scroll-behavior:smooth; }
        .cp-main::-webkit-scrollbar { display:none; }

        /* HERO */
        .cp-hero { min-height:100vh; display:flex; flex-direction:column; justify-content:center; padding:80px 52px; position:relative; transition:background 0.5s ease; }
        .cp-hero-eyebrow { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:16px; }
        .cp-hero-colour { font-size:11px; letter-spacing:0.15em; text-transform:uppercase; margin-bottom:12px; font-weight:500; }
        .cp-hero-title { font-family:'DM Serif Display',serif; font-size:clamp(2.8rem,6vw,5rem); font-weight:400; line-height:1.05; letter-spacing:-0.02em; color:#fff; margin-bottom:12px; }
        .cp-hero-emotion { font-size:14px; color:rgba(255,255,255,0.4); margin-bottom:32px; letter-spacing:0.04em; }
        .cp-keywords { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:36px; }
        .cp-kw { font-size:12px; padding:6px 16px; border-radius:999px; border:1px solid; font-weight:400; }
        .cp-desc { font-size:14px; color:rgba(255,255,255,0.45); line-height:1.85; max-width:480px; margin-bottom:32px; }
        .cp-brands { display:flex; gap:10px; flex-wrap:wrap; }
        .cp-brand { font-size:11px; padding:5px 14px; border-radius:8px; background:rgba(255,255,255,0.05); border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.5); }

        /* EMOTION GRID below hero */
        .cp-grid-section { padding:60px 52px 80px; }
        .cp-grid-title { font-family:'DM Serif Display',serif; font-size:28px; color:#fff; margin-bottom:28px; }
        .cp-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; }
        .cp-grid-card { border-radius:16px; padding:20px; cursor:pointer; transition:all 0.2s; }
        .cp-grid-card:hover { transform:translateY(-2px); filter:brightness(1.1); }
        .cp-grid-swatch { width:40px; height:40px; border-radius:10px; margin-bottom:12px; }
        .cp-grid-name { font-family:'DM Serif Display',serif; font-size:16px; color:#fff; margin-bottom:4px; }
        .cp-grid-emo { font-size:11px; color:rgba(255,255,255,0.35); line-height:1.5; }

        /* scroll indicator */
        .cp-scroll-hint { position:absolute; bottom:32px; left:52px; display:flex; align-items:center; gap:10px; }
        .cp-scroll-line { width:32px; height:0.5px; background:rgba(255,255,255,0.2); }
        .cp-scroll-text { font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.2); }
      `}</style>

      <div className="cp-page">
        <nav className="cp-nav">
          <button className="cp-back" onClick={onBack}>
            ← Back
          </button>
          <span className="cp-nav-label">Colour Psychology</span>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            LESSON 03
          </span>
        </nav>

        <div className="cp-body">
          {/* COLOUR STRIP */}
          <div className="cp-strip">
            {EMOTIONS.map((e, i) => (
              <div
                key={i}
                className={`cp-strip-item${active === i ? " active-strip" : ""}`}
                style={{ background: e.color + "33" }}
                onClick={() => {
                  setActive(i);
                  containerRef.current.scrollTop = 0;
                }}
                title={e.name}
              >
                <div
                  className="cp-strip-dot"
                  style={{ background: active === i ? "#fff" : e.color + "99" }}
                />
              </div>
            ))}
          </div>

          {/* MAIN */}
          <div className="cp-main" ref={containerRef}>
            {/* HERO for active colour */}
            <div
              className="cp-hero"
              style={{
                background: `linear-gradient(135deg, ${current.color}18 0%, #080010 60%)`,
              }}
            >
              <div className="cp-hero-eyebrow">Colour Theory · Lesson 03</div>
              <div className="cp-hero-colour" style={{ color: current.color }}>
                ● {current.name}
              </div>
              <div className="cp-hero-title">{current.emotion}</div>
              <div className="cp-keywords">
                {current.keywords.map((k, i) => (
                  <span
                    key={i}
                    className="cp-kw"
                    style={{
                      color: current.color,
                      borderColor: current.color + "55",
                      background: current.color + "12",
                    }}
                  >
                    {k}
                  </span>
                ))}
              </div>
              <p className="cp-desc">{current.desc}</p>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.2)",
                    marginBottom: 10,
                  }}
                >
                  Used by
                </div>
                <div className="cp-brands">
                  {current.brands.map((b, i) => (
                    <div key={i} className="cp-brand">
                      {b}
                    </div>
                  ))}
                </div>
              </div>
              <div className="cp-scroll-hint">
                <div className="cp-scroll-line" />
                <div className="cp-scroll-text">Scroll to explore all</div>
              </div>
            </div>

            {/* ALL EMOTIONS GRID */}
            <div className="cp-grid-section">
              <div className="cp-grid-title">All Colour Emotions</div>
              <div className="cp-grid">
                {EMOTIONS.map((e, i) => (
                  <div
                    key={i}
                    className="cp-grid-card"
                    style={{
                      background: e.bg,
                      border: `1px solid ${e.border}`,
                    }}
                    onClick={() => {
                      setActive(i);
                      containerRef.current.scrollTop = 0;
                    }}
                  >
                    <div
                      className="cp-grid-swatch"
                      style={{ background: e.color }}
                    />
                    <div className="cp-grid-name">{e.name}</div>
                    <div className="cp-grid-emo">{e.emotion}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
