const CAROUSEL_ITEMS = [
  "Colors",
  "Typography",
  "Shapes",
  "Lines",
  "Textures",
  "Space",
  "Layers",
  "Alignment",
];

const WhatsInItSection = () => {
  return (
    <section
      id="about"
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden pt-0 pb-0"
    >
      <div className="flex flex-col items-start justify-center">
        <div className="text-wrapper">WHAT'S IN IT FOR YOU?</div>
        <div className="scroll-indicator">
          <span>scroll</span>
          <div className="scroll-line"></div>
        </div>
      </div>

      <div
        className="carousel-container"
        style={{ position: "absolute", top: "0", marginTop: "0" }}
      >
        <div className="carousel-track">
          {[...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS].map((item, i) => (
            <div key={i} className="card">
              - {item} -
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsInItSection;
