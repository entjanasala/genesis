import React, { useState } from "react";
import "./LiquidGlassNav.css";

const LiquidGlassNav = () => {
  const [active, setActive] = useState("Home");
  const links = ["Home", "Lecture", "About", "Smth"];

  return (
    <nav className="glass-nav">
      <div className="nav-links">
        {links.map((link) => (
          <div
            key={link}
            onClick={() => setActive(link)}
            className={`nav-link ${active === link ? "active" : ""}`}
          >
            {link}
          </div>
        ))}
      </div>
      <div className="nav-login">Log in</div>
    </nav>
  );
};

export default LiquidGlassNav;
