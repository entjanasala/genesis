import { useRef, useEffect, useCallback, useState } from "react";
import { useProgress } from "../../context/ProgressContext";
const lessons = [
  {
    id: 1,
    number: "01",
    title: "Colour Basics",
    duration: "8 min",
    description:
      "Understand the science behind colour — light, wavelengths, and how the human eye perceives the visible spectrum.",
    topics: [
      "Light & wavelengths",
      "The visible spectrum",
      "How eyes detect colour",
    ],
    route: "colour-basics",
  },
  {
    id: 2,
    number: "02",
    title: "60–30–10 Rule",
    duration: "10 min",
    description:
      "Master the timeless colour proportion rule used by interior designers and UI designers to create perfectly balanced compositions.",
    topics: ["Dominant colour", "Secondary colour", "Accent colour"],
    route: "rule-60-30-10",
  },
  {
    id: 3,
    number: "03",
    title: "Colour Psychology",
    duration: "12 min",
    description:
      "Understand how colours trigger emotional and psychological responses and how brands use this strategically.",
    topics: [
      "Emotion & colour",
      "Brand colour strategy",
      "Cultural differences",
    ],
    route: "colour-psychology",
  },
];

const LESSON_STYLES = [
  {
    cardBg: "rgba(196,181,253,0.08)",
    cardBorder: "rgba(196,181,253,0.28)",
    hoverBorder: "rgba(196,181,253,0.6)",
    hoverBg: "rgba(196,181,253,0.14)",
    accent: "#c4b5fd",
    activeBorder: "rgba(196,181,253,0.55)",
    activeBg: "rgba(196,181,253,0.13)",
  },
  {
    cardBg: "rgba(125,211,252,0.07)",
    cardBorder: "rgba(125,211,252,0.25)",
    hoverBorder: "rgba(125,211,252,0.52)",
    hoverBg: "rgba(125,211,252,0.12)",
    accent: "#7dd3fc",
    activeBorder: "rgba(125,211,252,0.5)",
    activeBg: "rgba(125,211,252,0.12)",
  },
  {
    cardBg: "rgba(249,168,212,0.07)",
    cardBorder: "rgba(249,168,212,0.25)",
    hoverBorder: "rgba(249,168,212,0.52)",
    hoverBg: "rgba(249,168,212,0.12)",
    accent: "#f9a8d4",
    activeBorder: "rgba(249,168,212,0.5)",
    activeBg: "rgba(249,168,212,0.12)",
  },
];

function ColourPicker() {
  const canvasRef = useRef(null);
  const sliderRef = useRef(null);
  const [hue, setHue] = useState(210);
  const [pos, setPos] = useState({ x: 0.65, y: 0.3 });
  const [hex, setHex] = useState("#4d9fff");
  const [rgb, setRgb] = useState({ r: 77, g: 159, b: 255 });
  const [hsl, setHsl] = useState({ h: 210, s: 100, l: 65 });
  const [copied, setCopied] = useState("");
  const dragging = useRef(false);
  const draggingSlider = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hslToRgb = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12,
      a = s * Math.min(l, 1 - l);
    const f = (n) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255),
    };
  };
  const rgbToHex = ({ r, g, b }) =>
    "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h2,
      s,
      l = (max + min) / 2;
    if (max === min) {
      h2 = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h2 = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h2 = ((b - r) / d + 2) / 6;
          break;
        default:
          h2 = ((r - g) / d + 4) / 6;
      }
    }
    return {
      h: Math.round(h2 * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const updateFromPos = useCallback((x, y, h) => {
    const cx = Math.max(0, Math.min(1, x)),
      cy = Math.max(0, Math.min(1, y));
    const s = cx * 100,
      l = (1 - cy) * (100 - s / 2);
    const newRgb = hslToRgb(h, s, l);
    setPos({ x: cx, y: cy });
    setRgb(newRgb);
    setHex(rgbToHex(newRgb));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d"),
      W = canvas.width,
      H = canvas.height;
    const base = ctx.createLinearGradient(0, 0, W, 0);
    base.addColorStop(0, "#fff");
    base.addColorStop(1, `hsl(${hue},100%,50%)`);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, W, H);
    const dark = ctx.createLinearGradient(0, 0, 0, H);
    dark.addColorStop(0, "rgba(0,0,0,0)");
    dark.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = dark;
    ctx.fillRect(0, 0, W, H);
  }, [hue]);

  const getXY = (e, el) => {
    const rect = el.getBoundingClientRect(),
      cx = e.touches ? e.touches[0].clientX : e.clientX,
      cy = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (cx - rect.left) / rect.width,
      y: (cy - rect.top) / rect.height,
    };
  };
  useEffect(() => {
    const up = () => {
      dragging.current = false;
      draggingSlider.current = false;
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);
  const copy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1400);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: "0 0 260px",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            cursor: "crosshair",
            height: "180px",
          }}
          onMouseDown={(e) => {
            dragging.current = true;
            updateFromPos(...Object.values(getXY(e, canvasRef.current)), hue);
          }}
          onMouseMove={(e) => {
            if (!dragging.current) return;
            updateFromPos(...Object.values(getXY(e, canvasRef.current)), hue);
          }}
          onTouchStart={(e) => {
            dragging.current = true;
            updateFromPos(...Object.values(getXY(e, canvasRef.current)), hue);
          }}
          onTouchMove={(e) => {
            if (!dragging.current) return;
            updateFromPos(...Object.values(getXY(e, canvasRef.current)), hue);
          }}
        >
          <canvas
            ref={canvasRef}
            width={520}
            height={360}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              left: `${pos.x * 100}%`,
              top: `${pos.y * 100}%`,
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: "2px solid #fff",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.4)",
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
              background: hex,
            }}
          />
        </div>
        <div
          ref={sliderRef}
          style={{
            height: 12,
            borderRadius: 6,
            cursor: "pointer",
            position: "relative",
            background:
              "linear-gradient(to right,hsl(0,100%,50%),hsl(30,100%,50%),hsl(60,100%,50%),hsl(90,100%,50%),hsl(120,100%,50%),hsl(150,100%,50%),hsl(180,100%,50%),hsl(210,100%,50%),hsl(240,100%,50%),hsl(270,100%,50%),hsl(300,100%,50%),hsl(330,100%,50%),hsl(360,100%,50%))",
            border: "0.5px solid rgba(255,255,255,0.1)",
          }}
          onMouseDown={(e) => {
            draggingSlider.current = true;
            const r = sliderRef.current.getBoundingClientRect();
            const h = Math.round(((e.clientX - r.left) / r.width) * 360);
            setHue(h);
            updateFromPos(pos.x, pos.y, h);
          }}
          onMouseMove={(e) => {
            if (!draggingSlider.current) return;
            const r = sliderRef.current.getBoundingClientRect();
            const h = Math.max(
              0,
              Math.min(360, Math.round(((e.clientX - r.left) / r.width) * 360)),
            );
            setHue(h);
            updateFromPos(pos.x, pos.y, h);
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${(hue / 360) * 100}%`,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: `hsl(${hue},100%,50%)`,
              border: "2px solid #fff",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
            }}
          />
        </div>
        <div
          style={{
            height: 36,
            borderRadius: 10,
            background: hex,
            border: "0.5px solid rgba(255,255,255,0.1)",
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 160,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {[
          { label: "HEX", value: hex.toUpperCase(), copy: hex },
          {
            label: "RGB",
            value: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
            copy: `rgb(${rgb.r},${rgb.g},${rgb.b})`,
          },
          {
            label: "HSL",
            value: `${hsl.h}°  ${hsl.s}%  ${hsl.l}%`,
            copy: `hsl(${hsl.h},${hsl.s}%,${hsl.l}%)`,
          },
        ].map(({ label, value, copy: cv }) => (
          <div
            key={label}
            onClick={() => copy(cv, label)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(255,255,255,0.04)",
              border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: "10px 14px",
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
            }
          >
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                width: 32,
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
                flex: 1,
                textAlign: "center",
              }}
            >
              {value}
            </span>
            <span
              style={{
                fontSize: 10,
                color: copied === label ? "#a78bfa" : "rgba(255,255,255,0.18)",
              }}
            >
              {copied === label ? "✓" : "copy"}
            </span>
          </div>
        ))}
        {[
          { label: "R", value: rgb.r, color: "rgba(255,100,100,0.8)" },
          { label: "G", value: rgb.g, color: "rgba(100,220,140,0.8)" },
          { label: "B", value: rgb.b, color: "rgba(100,160,255,0.8)" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.25)",
                width: 12,
              }}
            >
              {label}
            </span>
            <div
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(value / 255) * 100}%`,
                  background: color,
                  borderRadius: 2,
                  transition: "width 0.1s",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.3)",
                width: 24,
                textAlign: "right",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ColourTheoryPage({ onBack, onNavigate }) {
  const [activeLesson, setActiveLesson] = useState(0);
  const { getCompleted, toggleComplete: toggleCtx } = useProgress();
  const completed = getCompleted("colour-theory");
  const toggleComplete = (id, e) => {
    e.stopPropagation();
    toggleCtx("colour-theory", id);
  };

  const progress = Math.round((completed.length / lessons.length) * 100);

  const active = lessons[activeLesson];
  const isDone = completed.includes(active.id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&display=swap');
        .ctp-page{min-height:100vh;background:#080010;font-family:'DM Sans',sans-serif;color:rgba(255,255,255,0.85);position:relative;overflow-x:hidden;}
        .ctp-blob{position:fixed;border-radius:50%;pointer-events:none;z-index:0;}
        .ctp-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 36px;position:sticky;top:0;background:rgba(8,0,16,0.85);backdrop-filter:blur(20px);border-bottom:0.5px solid rgba(255,255,255,0.07);z-index:100;}
        .ctp-back{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.05);border:0.5px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);padding:8px 18px;border-radius:999px;cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
        .ctp-back:hover{background:rgba(255,255,255,0.09);color:rgba(255,255,255,0.9);}
        .ctp-nav-title{font-family:'DM Serif Display',serif;font-size:17px;color:rgba(255,255,255,0.8);}
        .ctp-progress-pill{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.04);border:0.5px solid rgba(255,255,255,0.08);padding:8px 16px;border-radius:999px;font-size:12px;color:rgba(255,255,255,0.35);}
        .ctp-prog-track{width:70px;height:3px;background:rgba(255,255,255,0.07);border-radius:2px;overflow:hidden;}
        .ctp-prog-fill{height:100%;background:linear-gradient(90deg,#a78bfa,#f472b6);border-radius:2px;transition:width 0.4s ease;}
        .ctp-picker-section{position:relative;z-index:1;max-width:900px;margin:0 auto;padding:36px 36px 28px;}
        .ctp-section-eyebrow{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:6px;}
        .ctp-section-title{font-family:'DM Serif Display',serif;font-size:26px;font-weight:400;color:rgba(255,255,255,0.88);margin-bottom:22px;letter-spacing:-0.01em;}
        .ctp-picker-card{background:rgba(255,255,255,0.03);border:0.5px solid rgba(255,255,255,0.08);border-radius:20px;padding:22px;}
        .ctp-lessons-section{position:relative;z-index:1;max-width:900px;margin:0 auto;padding:0 36px 80px;}
        .ctp-prog-full{display:flex;align-items:center;gap:16px;margin-bottom:28px;}
        .ctp-prog-full-track{flex:1;height:3px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;}
        .ctp-prog-full-fill{height:100%;background:linear-gradient(90deg,#a78bfa,#f472b6);border-radius:2px;transition:width 0.5s cubic-bezier(0.16,1,0.3,1);}
        .ctp-prog-label{font-size:11px;color:rgba(255,255,255,0.22);white-space:nowrap;}
        .ctp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px;}
        .ctp-slide-card{border-radius:16px;padding:20px 18px;cursor:pointer;transition:all 0.25s ease;position:relative;}
        .ctp-slide-num{font-size:10px;letter-spacing:0.1em;margin-bottom:28px;}
        .ctp-slide-title{font-family:'DM Serif Display',serif;font-size:15px;font-weight:400;color:rgba(255,255,255,0.88);line-height:1.3;margin-bottom:12px;}
        .ctp-slide-duration{font-size:10px;letter-spacing:0.05em;opacity:0.7;}
        .ctp-slide-check{position:absolute;top:14px;right:14px;width:20px;height:20px;border-radius:50%;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;transition:all 0.2s;border:1px solid rgba(255,255,255,0.15);}
        .ctp-slide-check.done{background:linear-gradient(135deg,#a78bfa,#f472b6);border-color:transparent;}
        .ctp-lesson-detail{background:rgba(255,255,255,0.03);border:0.5px solid rgba(167,139,250,0.2);border-radius:20px;padding:28px;transition:all 0.3s ease;}
        .ctp-detail-top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:16px;flex-wrap:wrap;}
        .ctp-detail-num{font-size:11px;color:rgba(255,255,255,0.2);letter-spacing:0.1em;margin-bottom:6px;}
        .ctp-detail-title{font-family:'DM Serif Display',serif;font-size:24px;color:rgba(255,255,255,0.92);letter-spacing:-0.01em;}
        .ctp-detail-desc{font-size:13px;color:rgba(255,255,255,0.4);line-height:1.75;margin-bottom:20px;}
        .ctp-detail-topics{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;}
        .ctp-topic-pill{font-size:11px;color:#a78bfa;background:rgba(167,139,250,0.1);border:0.5px solid rgba(167,139,250,0.22);padding:4px 12px;border-radius:999px;}
        .ctp-detail-actions{display:flex;gap:10px;align-items:center;}
        .ctp-btn-start{background:rgba(167,139,250,0.15);border:0.5px solid rgba(167,139,250,0.35);color:#c4b5fd;padding:9px 22px;border-radius:999px;font-size:13px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
        .ctp-btn-start:hover{background:rgba(167,139,250,0.25);color:#fff;}
        .ctp-btn-done{background:none;border:0.5px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.35);padding:9px 18px;border-radius:999px;font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
        .ctp-btn-done:hover{color:rgba(255,255,255,0.7);border-color:rgba(255,255,255,0.2);}
        .ctp-btn-done.done{color:#6ee7b7;border-color:rgba(110,231,183,0.3);}
        .ctp-nav-dots{display:flex;gap:6px;margin-bottom:24px;justify-content:center;}
        .ctp-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.12);cursor:pointer;transition:all 0.2s;border:none;padding:0;}
        .ctp-dot.active-dot{background:#a78bfa;transform:scale(1.3);}
        .ctp-dot.done-dot{background:#6ee7b7;}
      `}</style>

      <div className="ctp-page">
        <div
          className="ctp-blob"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
            top: -150,
            left: -150,
          }}
        />
        <div
          className="ctp-blob"
          style={{
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 70%)",
            bottom: 0,
            right: -80,
          }}
        />

        <nav className="ctp-nav">
          <button className="ctp-back" onClick={onBack}>
            ← Back
          </button>
          <span className="ctp-nav-title">Colour Theory</span>
          <div className="ctp-progress-pill">
            <div className="ctp-prog-track">
              <div
                className="ctp-prog-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>
              {completed.length}/{lessons.length}
            </span>
          </div>
        </nav>

        <div className="ctp-picker-section">
          <div className="ctp-section-eyebrow">Tool</div>
          <div className="ctp-section-title">Colour Picker</div>
          <div className="ctp-picker-card">
            <ColourPicker />
          </div>
        </div>

        <div className="ctp-lessons-section">
          <div className="ctp-section-eyebrow">Module 01</div>
          <div className="ctp-section-title">Lessons</div>
          <div className="ctp-prog-full">
            <div className="ctp-prog-full-track">
              <div
                className="ctp-prog-full-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="ctp-prog-label">
              {completed.length} of {lessons.length} done
            </span>
          </div>

          <div className="ctp-grid">
            {lessons.map((lesson, i) => {
              const isDoneCard = completed.includes(lesson.id);
              const st = LESSON_STYLES[i];
              const isActive = activeLesson === i;
              return (
                <div
                  key={lesson.id}
                  className="ctp-slide-card"
                  onClick={() => setActiveLesson(i)}
                  style={{
                    background: isActive ? st.activeBg : st.cardBg,
                    border: `1px solid ${isActive ? st.activeBorder : st.cardBorder}`,
                    boxShadow: isActive ? `0 8px 28px ${st.cardBg}` : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = st.hoverBg;
                      e.currentTarget.style.borderColor = st.hoverBorder;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = st.cardBg;
                      e.currentTarget.style.borderColor = st.cardBorder;
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  <button
                    className={`ctp-slide-check${isDoneCard ? " done" : ""}`}
                    onClick={(e) => toggleComplete(lesson.id, e)}
                    style={{
                      borderColor: isDoneCard
                        ? "transparent"
                        : `${st.accent}44`,
                    }}
                  >
                    {isDoneCard ? "✓" : ""}
                  </button>
                  <div className="ctp-slide-num" style={{ color: st.accent }}>
                    {lesson.number}
                  </div>
                  <div className="ctp-slide-title">{lesson.title}</div>
                  <div
                    className="ctp-slide-duration"
                    style={{ color: st.accent }}
                  >
                    {lesson.duration} read
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ctp-nav-dots">
            {lessons.map((lesson, i) => (
              <button
                key={i}
                className={`ctp-dot${activeLesson === i ? " active-dot" : ""}${completed.includes(lesson.id) ? " done-dot" : ""}`}
                onClick={() => setActiveLesson(i)}
              />
            ))}
          </div>

          <div className="ctp-lesson-detail">
            <div className="ctp-detail-top">
              <div>
                <div className="ctp-detail-num">{active.number}</div>
                <div className="ctp-detail-title">{active.title}</div>
              </div>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.22)" }}>
                {active.duration} read
              </span>
            </div>
            <p className="ctp-detail-desc">{active.description}</p>
            <div className="ctp-detail-topics">
              {active.topics.map((t, i) => (
                <span key={i} className="ctp-topic-pill">
                  {t}
                </span>
              ))}
            </div>
            <div className="ctp-detail-actions">
              <button
                className="ctp-btn-start"
                onClick={() => onNavigate && onNavigate(active.route)}
              >
                {isDone ? "Review →" : "Start lesson →"}
              </button>
              <button
                className={`ctp-btn-done${isDone ? " done" : ""}`}
                onClick={(e) => toggleComplete(active.id, e)}
              >
                {isDone ? "✓ Completed" : "Mark complete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
