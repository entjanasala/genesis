import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import LoginModal from "../modals/LoginModal";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const rawName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Designer";

  const firstName = rawName.split(" ")[0];

  return (
    <>
      <div className="top-line">
        <img src={logo} alt="logo" />
      </div>

      <nav className="navbar">
        <ul className="links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <a
              href="#"
              className={location.pathname === "/lectures" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                if (user) {
                  window.location.href = "/lectures";
                } else {
                  setLoginOpen(true);
                }
              }}
              style={{ cursor: "pointer" }}
            >
              Modules
            </a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <Link
              to="/community"
              className={location.pathname === "/community" ? "active" : ""}
            >
              Community
            </Link>
          </li>
        </ul>

        {user ? (
          <div
            ref={dropdownRef}
            style={{ position: "relative", marginLeft: "auto", flexShrink: 0 }}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                padding: "8px 10px",
                borderRadius: "999px",
                fontSize: "8px",
                fontWeight: "600",
                color: "#fff",
                cursor: "pointer",
                background: "rgba(130,80,255,0.2)",
                border: "1px solid rgba(180,140,255,0.35)",
                fontFamily: "Tahoma, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                maxWidth: "100px",
                minWidth: 0,
                transition: "all 0.2s",
                overflow: "hidden",
              }}
            >
              {/* avatar dot */}
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #5227FF, #ff9ffc)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  fontWeight: "700",
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {firstName[0].toUpperCase()}
              </span>

              {/* name — truncated */}
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  minWidth: 0,
                  flex: 1,
                }}
              >
                {firstName}
              </span>

              <span style={{ fontSize: "8px", opacity: 0.5, flexShrink: 0 }}>
                ▾
              </span>
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  background: "rgba(12,5,28,0.98)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "14px",
                  padding: "8px",
                  minWidth: "160px",
                  zIndex: 3000,
                  backdropFilter: "blur(20px)",
                }}
              >
                <div
                  style={{
                    padding: "10px 14px 12px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    marginBottom: "6px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.3)",
                      margin: 0,
                      fontFamily: "Tahoma",
                    }}
                  >
                    logged in as
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#fff",
                      margin: "2px 0 0",
                      fontFamily: "Tahoma",
                      fontWeight: "600",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {firstName}
                  </p>
                </div>
                <button
                  onClick={async () => {
                    await signOut();
                    setDropdownOpen(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "rgba(255,80,80,0.08)",
                    border: "1px solid rgba(255,80,80,0.15)",
                    borderRadius: "10px",
                    color: "#ff8080",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontFamily: "Tahoma, sans-serif",
                    textAlign: "left",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,80,80,0.15)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(255,80,80,0.08)")
                  }
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <a
            href="#"
            className="action_btn"
            onClick={(e) => {
              e.preventDefault();
              setLoginOpen(true);
            }}
          >
            Log In
          </a>
        )}

        <div className="toggle_btn" />
      </nav>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Navbar;
