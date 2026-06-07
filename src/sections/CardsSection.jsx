import { useState } from "react";

const PILLARS = [
  {
    icon: "◐",
    title: "Learn the rules",
    text: "Colour, type, layout, hierarchy. The fundamentals that every designer — good or bad — either knows or doesn't.",
    accent: "#c4b5fd",
  },
  {
    icon: "◉",
    title: "Build real things",
    text: "Logos. Posters. Brand identities. Not exercises — actual deliverables you'd put in a portfolio.",
    accent: "#f9a8d4",
  },
  {
    icon: "✒",
    title: "Learn the software",
    text: "Adobe Illustrator from blank document to export-ready file. Shortcuts, tools, and the pen tool — for real this time.",
    accent: "#4ade80",
  },
  {
    icon: "★",
    title: "Show your work",
    text: "Submit projects. Get seen. Your work lives in a gallery alongside everyone else taking this course.",
    accent: "#fb7185",
  },
];

const CardsSection = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="services"
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 48px",
      }}
    >
      {/* HEADING */}
      <div style={{ textAlign: "center", marginBottom: 64, maxWidth: 640 }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)",
            fontFamily: "Tahoma,sans-serif",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        ></div>
        <div
          style={{
            fontFamily: "'Trebuchet MS',sans-serif",
            fontWeight: "bold",
            fontSize: "clamp(28px,5vw,50px)",
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Not just theory.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#b19eef,#ff9ffc,#5227ff)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Things you actually make.
          </span>
        </div>
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.25)",
            fontFamily: "Tahoma,sans-serif",
            lineHeight: 1.8,
          }}
        >
          Most design courses teach you to click buttons.
          <br />
          This one teaches you to think like a designer.
        </div>
      </div>

      {/* 2x2 GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          width: "100%",
          maxWidth: 860,
        }}
      >
        {PILLARS.map((p, i) => {
          const isHov = hovered === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "36px 32px",
                borderRadius: 20,
                border: `1px solid ${isHov ? `${p.accent}40` : "rgba(255,255,255,0.07)"}`,
                background: isHov ? `${p.accent}08` : "rgba(255,255,255,0.02)",
                transition: "all 0.25s",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
                minHeight: 180,
              }}
            >
              {/* subtle glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse at 90% 10%, ${p.accent}15 0%, transparent 55%)`,
                  opacity: isHov ? 1 : 0,
                  transition: "opacity 0.3s",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  fontSize: 28,
                  marginBottom: 16,
                  color: isHov ? p.accent : "rgba(255,255,255,0.2)",
                  transition: "color 0.25s",
                }}
              >
                {p.icon}
              </div>
              <div
                style={{
                  fontFamily: "'Trebuchet MS',sans-serif",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#fff",
                  marginBottom: 10,
                  lineHeight: 1.1,
                }}
              >
                {p.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.32)",
                  fontFamily: "Tahoma,sans-serif",
                  lineHeight: 1.75,
                }}
              >
                {p.text}
              </div>

              {/* bottom line */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "10%",
                  right: "10%",
                  height: "1px",
                  background: `linear-gradient(to right, transparent, ${p.accent}50, transparent)`,
                  opacity: isHov ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ONE-LINER */}
      <div
        style={{
          marginTop: 52,
          padding: "18px 32px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          fontSize: 13,
          color: "rgba(255,255,255,0.28)",
          fontFamily: "Tahoma,sans-serif",
          letterSpacing: "0.04em",
          textAlign: "center",
        }}
      >
        10 modules · real projects · community gallery · self-paced
      </div>
    </section>
  );
};

export default CardsSection;
