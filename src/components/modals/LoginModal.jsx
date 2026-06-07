import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const { signIn, signUp } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (mode === "register") {
      if (form.password !== form.confirm) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      const { error } = await signUp(form.email, form.password, form.name);
      if (error) setError(error.message);
      else setSuccess("Account created! Check your email to confirm.");
    } else {
      const { error } = await signIn(form.email, form.password);
      if (error) setError(error.message);
      else onClose();
    }
    setLoading(false);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(15,10,30,0.95)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "24px",
          padding: "52px 48px",
          position: "relative",
          fontFamily: "Tahoma, sans-serif",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "24px",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.25)",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* Header */}
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "10px",
          }}
        >
          {mode === "register" ? "Start for free" : "Welcome back"}
        </p>
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 34px)",
            fontWeight: "700",
            color: "#fff",
            marginBottom: "6px",
            lineHeight: 1.2,
            fontFamily: "Tahoma, sans-serif",
          }}
        >
          {mode === "register" ? (
            <>
              Create new account<span style={{ color: "#5227FF" }}>.</span>
            </>
          ) : (
            <>
              Log in to your account<span style={{ color: "#5227FF" }}>.</span>
            </>
          )}
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "36px",
          }}
        >
          {mode === "register" ? (
            <>
              Already a member?{" "}
              <span
                onClick={() => {
                  setMode("login");
                  setError("");
                  setSuccess("");
                }}
                style={{ color: "#7c6aff", cursor: "pointer" }}
              >
                Log In
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setMode("register");
                  setError("");
                  setSuccess("");
                }}
                style={{ color: "#7c6aff", cursor: "pointer" }}
              >
                Register
              </span>
            </>
          )}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {mode === "register" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              <div style={fieldWrap}>
                <label style={labelStyle}>First name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  style={inputStyle}
                />
              </div>
              <div style={fieldWrap}>
                <label style={labelStyle}>Last name</label>
                <input
                  name="lastname"
                  placeholder="Last name"
                  style={inputStyle}
                />
              </div>
            </div>
          )}

          <div style={fieldWrap}>
            <label style={labelStyle}>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={fieldWrap}>
            <label style={labelStyle}>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          {mode === "register" && (
            <div style={fieldWrap}>
              <label style={labelStyle}>Confirm password</label>
              <input
                name="confirm"
                type="password"
                value={form.confirm}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={inputStyle}
              />
            </div>
          )}

          {error && (
            <p style={{ color: "#ff6b6b", fontSize: "12px", margin: 0 }}>
              {error}
            </p>
          )}
          {success && (
            <p style={{ color: "#6ee7b7", fontSize: "12px", margin: 0 }}>
              {success}
            </p>
          )}

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button type="button" onClick={onClose} style={secondaryBtn}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{ ...primaryBtn, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "..." : mode === "login" ? "Log In" : "Create account"}
            </button>
          </div>

          {mode === "login" && (
            <p
              style={{
                textAlign: "center",
                fontSize: "11px",
                color: "rgba(255,255,255,0.2)",
                marginTop: "4px",
              }}
            >
              Forgot password?{" "}
              <span style={{ color: "#7c6aff", cursor: "pointer" }}>Reset</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

const fieldWrap = { display: "flex", flexDirection: "column", gap: "6px" };
const labelStyle = {
  fontSize: "11px",
  color: "rgba(255,255,255,0.35)",
  letterSpacing: "0.05em",
};
const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  padding: "13px 16px",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  fontFamily: "Tahoma, sans-serif",
  width: "100%",
  transition: "border-color 0.2s",
};
const primaryBtn = {
  flex: 1,
  background: "linear-gradient(135deg, #5227FF, #7c6aff)",
  border: "none",
  borderRadius: "12px",
  padding: "14px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  fontFamily: "Tahoma, sans-serif",
  letterSpacing: "0.03em",
};
const secondaryBtn = {
  flex: 1,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "14px",
  color: "rgba(255,255,255,0.6)",
  fontSize: "14px",
  cursor: "pointer",
  fontFamily: "Tahoma, sans-serif",
};
