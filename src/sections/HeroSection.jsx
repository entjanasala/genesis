import { useState } from "react";
import LiquidEther from "../three/LiquidEther";
import GradientText from "../components/ui/GradientText";
import StarBorder from "../components/ui/StarBorder";
import Navbar from "../components/layout/NavBar";
import LoginModal from "../components/modals/LoginModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div
      id="hero"
      className="w-full h-screen relative bg-black flex justify-center items-center"
    >
      <LiquidEther
        colors={["#5227ff", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous
        viscous={50}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.55}
        autoResumeDelay={3000}
        autoRampDuration={0.8}
        color0="#5227FF"
        color1="#580c55"
        color2="#B19EEF"
      />

      <Navbar />

      <div className="hero-text absolute flex flex-col justify-center items-center bottom-60">
        <GradientText
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          animationSpeed={4}
          showBorder={false}
          className="custom-class"
        >
          Fundamentals of Design.
        </GradientText>
        <h1>
          Design starts with clarity — not tools. Everything else follows.
        </h1>
      </div>

      <div className="absolute left-1/2 bottom-15 transform -translate-x-1/2">
        <StarBorder
          as="button"
          className="relative px-15 py-5 text-2xl font-extrabold rounded-lg"
          color="magenta"
          speed="5s"
          onClick={() => (user ? navigate("/lectures") : setLoginOpen(true))}
        >
          Start Learning
        </StarBorder>
      </div>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default HeroSection;
