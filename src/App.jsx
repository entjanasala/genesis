import { Routes, Route, useNavigate } from "react-router-dom";
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/700.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ProgressProvider } from "./context/ProgressContext";

import HeroSection from "./sections/HeroSection";
import WhatsInItSection from "./sections/WhatsInItSection";
import CardsSection from "./sections/CardsSection";
import Footer from "./components/layout/Footer";

import ModulesPage from "./pages/ModulesPage";

import ColourTheoryPage from "./pages/ColourBasics/ColourTheoryPage";
import ColourBasicsPage from "./pages/ColourBasics/ColourBasicsPage";
import Rule603010Page from "./pages/ColourBasics/Rule603010page";
import ColourPsychologyPage from "./pages/ColourBasics/ColourPsychologyPage";

import TypographyPage from "./pages/Typography/TypographyPage";
import TypographyRulesPage from "./pages/Typography/TypographyRulesPage";
import TypographyPairingPage from "./pages/Typography/TypographyPairingPage";
import TypographySpacingPage from "./pages/Typography/TypographySpacingPage";
import TypographyContrastPage from "./pages/Typography/TypographyContrastPage";
import TypographyCategoriePage from "./pages/Typography/TypographyCategoriePage";
import TypographyGradientPage from "./pages/Typography/TypographyGradientPage";
import TypographyMotionPage from "./pages/Typography/TypographyMotionPage";
import LayoutCompositionPage from "./pages/Layout/LayoutCompositionPage";
import LayoutGridPage from "./pages/Layout/LayoutGridPage";
import LayoutProximityPage from "./pages/Layout/LayoutProximityPage";
import LayoutBalancePage from "./pages/Layout/LayoutBalancePage";

import LogoDesignPage from "./pages/LogoDesign/LogoDesignPage";
import LogoWhatMakesPage from "./pages/LogoDesign/LogoWhatMakesPage";
import LogoEvolutionPage from "./pages/LogoDesign/LogoEvolutionPage";
import LogoTypesPage from "./pages/LogoDesign/LogoTypesPage";
import LogoGeometryPage from "./pages/LogoDesign/LogoGeometryPage";
import LogoColourPage from "./pages/LogoDesign/LogoColourPage";

import PosterCreationPage from "./pages/PosterDesign/PosterCreationPage";
import PosterLayoutPage from "./pages/PosterDesign/PosterLayoutPage";
import PosterColourPage from "./pages/PosterDesign/PosterColourPage";
import PosterTypePage from "./pages/PosterDesign/PosterTypePage";

import DesignStylesPage from "./pages/Moodboard/DesignStylesPage";
import StyleAestheticsPage from "./pages/Moodboard/StylesAestheticsPage";
import StyleLayersPage from "./pages/Moodboard/StyleLayersPage";
import StyleBuildPage from "./pages/Moodboard/StyleBuildPage";

import IllustratorBasicsPage from "./pages/IllustratorBasics/IllustratorBasicsPage";
import AISetupPage from "./pages/IllustratorBasics/AiSetupPage";
import AIShortcutsPage from "./pages/IllustratorBasics/AiShortcutsPage";
import AIToolsPage from "./pages/IllustratorBasics/AiToolsPage";
import AIExportPage from "./pages/IllustratorBasics/AiExportPage";
import IllustratorIntermediatePage from "./pages/IllustratorIntermediatePage";

import ProjectsPage from "./pages/ProjectsPage";
import CommunityPage from "./pages/CommunityPage";
import { TypographyBackgroundsPage } from "./pages/Typography/TypographyBackgroundsPage";

const HomePage = () => (
  <>
    <HeroSection />
    <WhatsInItSection />
    <CardsSection />
    <Footer />
  </>
);

const ColourTheoryWrapper = () => {
  const navigate = useNavigate();
  return (
    <ColourTheoryPage
      onBack={() => window.history.back()}
      onNavigate={(r) => navigate(`/${r}`)}
    />
  );
};

const TypographyWrapper = () => {
  const navigate = useNavigate();
  return (
    <TypographyPage
      onBack={() => window.history.back()}
      onNavigate={(r) => navigate(`/${r}`)}
    />
  );
};

const LayoutCompositionPageWrapper = () => {
  const navigate = useNavigate();
  return (
    <LayoutCompositionPage
      onBack={() => window.history.back()}
      onNavigate={(r) => navigate(`/${r}`)}
    />
  );
};

const LogoDesignWrapper = () => {
  const navigate = useNavigate();
  return (
    <LogoDesignPage
      onBack={() => window.history.back()}
      onNavigate={(r) => navigate(`/${r}`)}
    />
  );
};

const PosterCreationWrapper = () => {
  const navigate = useNavigate();
  return (
    <PosterCreationPage
      onBack={() => window.history.back()}
      onNavigate={(r) => navigate(`/${r}`)}
    />
  );
};

const DesignStylesWrapper = () => {
  const navigate = useNavigate();
  return (
    <DesignStylesPage
      onBack={() => window.history.back()}
      onNavigate={(r) => navigate(`/${r}`)}
    />
  );
};
const IllustratorBasicsWrapper = () => {
  const navigate = useNavigate();
  return (
    <IllustratorBasicsPage
      onBack={() => window.history.back()}
      onNavigate={(r) => navigate(`/${r}`)}
    />
  );
};
const IllustratorIntermediateWrapper = () => {
  const navigate = useNavigate();
  return (
    <IllustratorIntermediatePage
      onBack={() => window.history.back()}
      onNavigate={(r) => navigate(`/${r}`)}
    />
  );
};
const ProjectsWrapper = () => {
  const navigate = useNavigate();
  return (
    <ProjectsPage
      onBack={() => window.history.back()}
      onNavigate={(r) => navigate(`/${r}`)}
    />
  );
};

const CommunityWrapper = () => {
  return <CommunityPage onBack={() => window.history.back()} />;
};

const App = () => {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* COLOUR THEORY */}
          <Route
            path="/lectures"
            element={
              <ProtectedRoute>
                <ModulesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/colour-theory"
            element={
              <ProtectedRoute>
                <ColourTheoryWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/colour-basics"
            element={
              <ProtectedRoute>
                <ColourBasicsPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rule-60-30-10"
            element={
              <ProtectedRoute>
                <Rule603010Page onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/colour-psychology"
            element={
              <ProtectedRoute>
                <ColourPsychologyPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />

          {/* TYPOGRAPHY */}
          <Route
            path="/typography"
            element={
              <ProtectedRoute>
                <TypographyWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/typography-rules"
            element={
              <ProtectedRoute>
                <TypographyRulesPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/typography-pairing"
            element={
              <ProtectedRoute>
                <TypographyPairingPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/typography-spacing"
            element={
              <ProtectedRoute>
                <TypographySpacingPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/typography-contrast"
            element={
              <ProtectedRoute>
                <TypographyContrastPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/typography-categories"
            element={
              <ProtectedRoute>
                <TypographyCategoriePage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/typography-backgrounds"
            element={
              <ProtectedRoute>
                <TypographyBackgroundsPage
                  onBack={() => window.history.back()}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/typography-gradient"
            element={
              <ProtectedRoute>
                <TypographyGradientPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/typography-motion"
            element={
              <ProtectedRoute>
                <TypographyMotionPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />

          {/* LAYOUT */}
          <Route
            path="/layout-composition"
            element={
              <ProtectedRoute>
                <LayoutCompositionPageWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/layout-grid"
            element={
              <ProtectedRoute>
                <LayoutGridPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/layout-proximity"
            element={
              <ProtectedRoute>
                <LayoutProximityPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/layout-balance"
            element={
              <ProtectedRoute>
                <LayoutBalancePage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />

          {/* LOGO DESIGN */}
          <Route
            path="/logo-design"
            element={
              <ProtectedRoute>
                <LogoDesignWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logo-what-makes"
            element={
              <ProtectedRoute>
                <LogoWhatMakesPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logo-evolution"
            element={
              <ProtectedRoute>
                <LogoEvolutionPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logo-types"
            element={
              <ProtectedRoute>
                <LogoTypesPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logo-geometry"
            element={
              <ProtectedRoute>
                <LogoGeometryPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logo-colour"
            element={
              <ProtectedRoute>
                <LogoColourPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/poster-creation"
            element={
              <ProtectedRoute>
                <PosterCreationWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/poster-layout"
            element={
              <ProtectedRoute>
                <PosterLayoutPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/poster-colour"
            element={
              <ProtectedRoute>
                <PosterColourPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/poster-type"
            element={
              <ProtectedRoute>
                <PosterTypePage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/design-styles"
            element={
              <ProtectedRoute>
                <DesignStylesWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/style-aesthetics"
            element={
              <ProtectedRoute>
                <StyleAestheticsPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/style-layers"
            element={
              <ProtectedRoute>
                <StyleLayersPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/style-build"
            element={
              <ProtectedRoute>
                <StyleBuildPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/illustrator-basics"
            element={
              <ProtectedRoute>
                <IllustratorBasicsWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/illustrator-intermediate"
            element={
              <ProtectedRoute>
                <IllustratorIntermediateWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectsWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-setup"
            element={
              <ProtectedRoute>
                <AISetupPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-shortcuts"
            element={
              <ProtectedRoute>
                <AIShortcutsPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-tools"
            element={
              <ProtectedRoute>
                <AIToolsPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-export"
            element={
              <ProtectedRoute>
                <AIExportPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <CommunityWrapper />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ProgressProvider>
    </AuthProvider>
  );
};

export default App;
