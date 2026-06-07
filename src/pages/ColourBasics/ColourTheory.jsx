import { useState, useRef, useEffect, useCallback } from "react";

export default function ColourTheory() {
  const canvasRef = useRef(null);
  const sliderRef = useRef(null);
  const [hue, setHue] = useState(210);
  const [pos, setPos] = useState({ x: 0.7, y: 0.3 });
  const [hex, setHex] = useState("#4d9fff");
  const [rgb, setRgb] = useState({ r: 77, g: 159, b: 255 });
  const [hsl, setHsl] = useState({ h: 210, s: 100, l: 65 });
  const [cmyk, setCmyk] = useState({ c: 70, m: 38, y: 0, k: 0 });
  const [copied, setCopied] = useState("");
  const dragging = useRef(false);
  const draggingSlider = useRef(false);

  const hslToRgb = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
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
    let h,
      s,
      l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgbToCmyk = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const k = 1 - Math.max(r, g, b);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    return {
      c: Math.round(((1 - r - k) / (1 - k)) * 100),
      m: Math.round(((1 - g - k) / (1 - k)) * 100),
      y: Math.round(((1 - b - k) / (1 - k)) * 100),
      k: Math.round(k * 100),
    };
  };

  const updateFromPos = useCallback((x, y, h) => {
    const clampX = Math.max(0, Math.min(1, x));
    const clampY = Math.max(0, Math.min(1, y));
    const s = clampX * 100;
    const l = (1 - clampY) * (100 - s / 2);
    const newRgb = hslToRgb(h, s, l);
    const newHex = rgbToHex(newRgb);
    const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
    const newCmyk = rgbToCmyk(newRgb.r, newRgb.g, newRgb.b);
    setPos({ x: clampX, y: clampY });
    setRgb(newRgb);
    setHex(newHex);
    setHsl(newHsl);
    setCmyk(newCmyk);
  }, []);

  const drawPicker = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    ctx.clearRect(0, 0, W, H);
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

  useEffect(() => {
    drawPicker();
  }, [drawPicker]);

  const getXY = (e, el) => {
    const rect = el.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) / rect.width,
      y: (clientY - rect.top) / rect.height,
    };
  };

  const onPickerDown = (e) => {
    dragging.current = true;
    const { x, y } = getXY(e, canvasRef.current);
    updateFromPos(x, y, hue);
  };

  const onPickerMove = (e) => {
    if (!dragging.current) return;
    const { x, y } = getXY(e, canvasRef.current);
    updateFromPos(x, y, hue);
  };

  const onSliderDown = (e) => {
    draggingSlider.current = true;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const newHue = Math.round(((clientX - rect.left) / rect.width) * 360);
    setHue(newHue);
    updateFromPos(pos.x, pos.y, newHue);
  };

  const onSliderMove = (e) => {
    if (!draggingSlider.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const newHue = Math.max(
      0,
      Math.min(360, Math.round(((clientX - rect.left) / rect.width) * 360)),
    );
    setHue(newHue);
    updateFromPos(pos.x, pos.y, newHue);
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
    setTimeout(() => setCopied(""), 1500);
  };

  const harmony = [0, 30, 60, 120, 180, 210, 240, 300].map((offset) => {
    const h = (hue + offset) % 360;
    return `hsl(${h},${Math.round(pos.x * 100)}%,${Math.round((1 - pos.y) * 50 + 10)}%)`;
  });

  return (
    <>
      <style>{`
        .ct-page {
          min-height: 100vh;
          background: #07050d;
          font-family: 'Trebuchet MS', sans-serif;
          color: #fff;
          padding: 40px 0 80px;
        }
        .ct-header {
          text-align: center;
          padding: 0 24px 48px;
        }
        .ct-header h1 {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #b19eef, #ff9ffc, #5227ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 10px;
        }
        .ct-header p {
          font-size: 14px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.08em;
        }
        .ct-layout {
          display: flex;
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px;
          flex-wrap: wrap;
        }
        .ct-picker-col {
          flex: 1;
          min-width: 280px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ct-info-col {
          width: 280px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ct-canvas-wrap {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          border: 0.5px solid rgba(255,255,255,0.1);
          cursor: crosshair;
          aspect-ratio: 1 / 0.75;
        }
        .ct-canvas-wrap canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
        .ct-cursor {
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.5);
          pointer-events: none;
          transform: translate(-50%, -50%);
        }
        .ct-hue-slider {
          width: 100%;
          height: 18px;
          border-radius: 9px;
          background: linear-gradient(to right,
            hsl(0,100%,50%),hsl(30,100%,50%),hsl(60,100%,50%),
            hsl(90,100%,50%),hsl(120,100%,50%),hsl(150,100%,50%),
            hsl(180,100%,50%),hsl(210,100%,50%),hsl(240,100%,50%),
            hsl(270,100%,50%),hsl(300,100%,50%),hsl(330,100%,50%),
            hsl(360,100%,50%));
          position: relative;
          cursor: pointer;
          border: 0.5px solid rgba(255,255,255,0.1);
        }
        .ct-hue-thumb {
          position: absolute;
          top: 50%;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2.5px solid #fff;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.5);
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .ct-preview {
          height: 80px;
          border-radius: 14px;
          border: 0.5px solid rgba(255,255,255,0.1);
          transition: background 0.1s;
        }
        .ct-card {
          background: rgba(255,255,255,0.04);
          border: 0.5px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 18px;
        }
        .ct-card-title {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 14px;
        }
        .ct-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 0.5px solid rgba(255,255,255,0.05);
          cursor: pointer;
          transition: background 0.15s;
          border-radius: 6px;
          padding: 8px 6px;
        }
        .ct-row:last-child { border-bottom: none; }
        .ct-row:hover { background: rgba(255,255,255,0.05); }
        .ct-row-label {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          width: 40px;
        }
        .ct-row-value {
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          flex: 1;
          text-align: right;
          letter-spacing: 0.03em;
        }
        .ct-copy-hint {
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          margin-left: 8px;
        }
        .ct-copied {
          font-size: 10px;
          color: #b19eef;
          margin-left: 8px;
        }
        .ct-harmony {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .ct-swatch {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 0.5px solid rgba(255,255,255,0.15);
          cursor: pointer;
          transition: transform 0.15s;
          flex-shrink: 0;
        }
        .ct-swatch:hover { transform: scale(1.15); }
        .ct-hex-big {
          font-size: 28px;
          font-weight: 300;
          letter-spacing: 0.05em;
          color: #fff;
          text-align: center;
          padding: 12px 0 4px;
          cursor: pointer;
        }
        .ct-hex-big:hover { color: #b19eef; }
        @media (max-width: 640px) {
          .ct-info-col { width: 100%; }
        }
      `}</style>

      <div className="ct-page">
        <div className="ct-header">
          <h1>Colour Theory</h1>
          <p>pick · explore · copy</p>
        </div>

        <div className="ct-layout">
          {/* LEFT — picker */}
          <div className="ct-picker-col">
            <div
              className="ct-canvas-wrap"
              onMouseDown={onPickerDown}
              onMouseMove={onPickerMove}
              onTouchStart={onPickerDown}
              onTouchMove={onPickerMove}
            >
              <canvas ref={canvasRef} width={600} height={450} />
              <div
                className="ct-cursor"
                style={{
                  left: `${pos.x * 100}%`,
                  top: `${pos.y * 100}%`,
                  background: hex,
                }}
              />
            </div>

            {/* Hue slider */}
            <div
              ref={sliderRef}
              className="ct-hue-slider"
              onMouseDown={onSliderDown}
              onMouseMove={onSliderMove}
              onTouchStart={onSliderDown}
              onTouchMove={onSliderMove}
            >
              <div
                className="ct-hue-thumb"
                style={{
                  left: `${(hue / 360) * 100}%`,
                  background: `hsl(${hue},100%,50%)`,
                }}
              />
            </div>

            {/* Preview */}
            <div className="ct-preview" style={{ background: hex }} />

            {/* HEX big */}
            <div className="ct-hex-big" onClick={() => copy(hex, "hex")}>
              {copied === "hex" ? "copied!" : hex.toUpperCase()}
            </div>
          </div>

          {/* RIGHT — info */}
          <div className="ct-info-col">
            {/* Colour values */}
            <div className="ct-card">
              <div className="ct-card-title">Colour Values</div>

              <div className="ct-row" onClick={() => copy(hex, "hex")}>
                <span className="ct-row-label">HEX</span>
                <span className="ct-row-value">{hex.toUpperCase()}</span>
                <span
                  className={copied === "hex" ? "ct-copied" : "ct-copy-hint"}
                >
                  {copied === "hex" ? "✓" : "copy"}
                </span>
              </div>

              <div
                className="ct-row"
                onClick={() => copy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "rgb")}
              >
                <span className="ct-row-label">RGB</span>
                <span className="ct-row-value">
                  {rgb.r}, {rgb.g}, {rgb.b}
                </span>
                <span
                  className={copied === "rgb" ? "ct-copied" : "ct-copy-hint"}
                >
                  {copied === "rgb" ? "✓" : "copy"}
                </span>
              </div>

              <div
                className="ct-row"
                onClick={() =>
                  copy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "hsl")
                }
              >
                <span className="ct-row-label">HSL</span>
                <span className="ct-row-value">
                  {hsl.h}°, {hsl.s}%, {hsl.l}%
                </span>
                <span
                  className={copied === "hsl" ? "ct-copied" : "ct-copy-hint"}
                >
                  {copied === "hsl" ? "✓" : "copy"}
                </span>
              </div>

              <div
                className="ct-row"
                onClick={() =>
                  copy(
                    `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
                    "cmyk",
                  )
                }
              >
                <span className="ct-row-label">CMYK</span>
                <span className="ct-row-value">
                  {cmyk.c}, {cmyk.m}, {cmyk.y}, {cmyk.k}
                </span>
                <span
                  className={copied === "cmyk" ? "ct-copied" : "ct-copy-hint"}
                >
                  {copied === "cmyk" ? "✓" : "copy"}
                </span>
              </div>
            </div>

            {/* RGB breakdown */}
            <div className="ct-card">
              <div className="ct-card-title">RGB Channels</div>
              {[
                { label: "R", value: rgb.r, color: "#ff5555" },
                { label: "G", value: rgb.g, color: "#55ff88" },
                { label: "B", value: rgb.b, color: "#5599ff" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {label}
                    </span>
                    <span style={{ fontSize: "12px", color: "#fff" }}>
                      {value}
                    </span>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      borderRadius: "2px",
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: "2px",
                        width: `${(value / 255) * 100}%`,
                        background: color,
                        transition: "width 0.1s",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Harmony swatches */}
            <div className="ct-card">
              <div className="ct-card-title">Colour Harmony</div>
              <div className="ct-harmony">
                {harmony.map((color, i) => (
                  <div
                    key={i}
                    className="ct-swatch"
                    style={{ background: color }}
                    title={color}
                    onClick={() => copy(color, `swatch-${i}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
