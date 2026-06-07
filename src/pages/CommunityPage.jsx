import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const PROJECT_FILTERS = [
  { id: null, label: "All" },
  { id: 1, label: "Colour Palette" },
  { id: 2, label: "Logo Design" },
  { id: 3, label: "Event Poster" },
  { id: 4, label: "Typography" },
  { id: 5, label: "Rebrand" },
  { id: 6, label: "Self-Directed" },
];

export default function CommunityPage({ onBack }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let query = supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (filter !== null) query = query.eq("project_id", filter);
      const { data, error } = await query;
      console.log("submissions:", data, error);
      if (!error) setSubmissions(data || []);
      setLoading(false);
    };
    fetch();
  }, [filter]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // check if URL is an image regardless of extension
  const isImage = (url) => {
    if (!url) return false;
    // supabase storage URLs always serve the file directly
    return true;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .cm-page { min-height:100vh; background:#09090f; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .cm-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(9,9,15,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.07); z-index:200; }
        .cm-back { background:none; border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .cm-back:hover { color:#fff; border-color:rgba(255,255,255,0.35); }
        .cm-nav-center { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .cm-count { font-size:11px; color:rgba(255,255,255,0.3); }
        .cm-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(255,255,255,0.07); position:relative; overflow:hidden; }
        .cm-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 20% 60%, rgba(167,139,250,0.08) 0%, transparent 55%); pointer-events:none; }
        .cm-hero-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(167,139,250,0.5); margin-bottom:14px; position:relative; z-index:1; }
        .cm-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,10vw,9rem); line-height:0.88; color:#fff; margin-bottom:20px; position:relative; z-index:1; }
        .cm-hero-title em { color:#a78bfa; font-style:normal; }
        .cm-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; position:relative; z-index:1; }
        .cm-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(167,139,250,0.05); line-height:1; pointer-events:none; user-select:none; }
        .cm-filters { padding:28px 56px; border-bottom:1px solid rgba(255,255,255,0.07); display:flex; gap:8px; flex-wrap:wrap; }
        .cm-filter { padding:7px 16px; border-radius:3px; font-size:11px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.38); letter-spacing:0.06em; }
        .cm-filter.active { border-color:rgba(167,139,250,0.4); color:#a78bfa; background:rgba(167,139,250,0.08); }
        .cm-gallery { padding:56px; }
        .cm-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:16px; }
        .cm-card { border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); cursor:pointer; transition:all 0.25s; }
        .cm-card:hover { transform:translateY(-4px); border-color:rgba(167,139,250,0.3); box-shadow:0 12px 40px rgba(167,139,250,0.1); }
        .cm-card-img-wrap { width:100%; height:200px; background:#111; overflow:hidden; }
        .cm-card-img { width:100%; height:100%; object-fit:cover; display:block; }
        .cm-card-footer { padding:14px 16px; display:flex; align-items:center; justify-content:space-between; }
        .cm-card-user { font-size:13px; font-weight:500; color:rgba(255,255,255,0.75); }
        .cm-card-project { font-size:10px; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-top:2px; }
        .cm-card-date { font-size:10px; color:rgba(255,255,255,0.2); }
        .cm-empty { padding:80px 56px; text-align:center; }
        .cm-empty-icon { font-size:48px; margin-bottom:16px; opacity:0.3; }
        .cm-empty-title { font-family:'Bebas Neue',sans-serif; font-size:28px; color:rgba(255,255,255,0.4); margin-bottom:8px; }
        .cm-empty-sub { font-size:13px; color:rgba(255,255,255,0.25); }
        .cm-loading { padding:80px 56px; text-align:center; font-size:13px; color:rgba(255,255,255,0.25); }
        .cm-lightbox { position:fixed; inset:0; background:rgba(0,0,0,0.92); z-index:1000; display:flex; align-items:center; justify-content:center; padding:40px; cursor:pointer; }
        .cm-lightbox-inner { max-width:800px; width:100%; cursor:default; }
        .cm-lightbox-img { width:100%; border-radius:8px; object-fit:contain; max-height:70vh; display:block; }
        .cm-lightbox-info { display:flex; align-items:center; justify-content:space-between; margin-top:16px; }
        .cm-lightbox-user { font-size:16px; font-weight:500; color:#fff; }
        .cm-lightbox-project { font-size:11px; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-top:2px; }
        .cm-lightbox-close { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.5); padding:8px 16px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .cm-lightbox-close:hover { color:#fff; }
      `}</style>

      <div className="cm-page">
        <nav className="cm-nav">
          <button className="cm-back" onClick={onBack}>
            ← Back
          </button>
          <span className="cm-nav-center">Community Gallery</span>
          <span className="cm-count">{submissions.length} works</span>
        </nav>

        <div className="cm-hero">
          <div className="cm-hero-bg" />
          <div className="cm-hero-eyebrow">Genesis Community</div>
          <div className="cm-hero-title">
            STUDENT
            <br />
            <em>WORK</em>
          </div>
          <p className="cm-hero-sub">
            Real work from real students. Browse for inspiration, see how others
            tackled the same brief, and get motivated to submit your own.
          </p>
          <div className="cm-hero-num">★</div>
        </div>

        <div className="cm-filters">
          {PROJECT_FILTERS.map((f, i) => (
            <button
              key={i}
              className={`cm-filter${filter === f.id ? " active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="cm-gallery">
          {loading ? (
            <div className="cm-loading">Loading works...</div>
          ) : submissions.length === 0 ? (
            <div className="cm-empty">
              <div className="cm-empty-icon">🎨</div>
              <div className="cm-empty-title">No submissions yet</div>
              <div className="cm-empty-sub">
                {filter !== null
                  ? "No work submitted for this project yet. Be the first!"
                  : "Be the first to submit your work!"}
              </div>
            </div>
          ) : (
            <div className="cm-grid">
              {submissions.map((sub, i) => (
                <div
                  key={i}
                  className="cm-card"
                  onClick={() => setLightbox(sub)}
                >
                  <div className="cm-card-img-wrap">
                    <img
                      className="cm-card-img"
                      src={sub.image_url}
                      alt={sub.project_title}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;opacity:0.2">🖼</div>';
                      }}
                    />
                  </div>
                  <div className="cm-card-footer">
                    <div>
                      <div className="cm-card-user">{sub.username}</div>
                      <div className="cm-card-project">{sub.project_title}</div>
                    </div>
                    <div className="cm-card-date">
                      {formatDate(sub.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {lightbox && (
          <div className="cm-lightbox" onClick={() => setLightbox(null)}>
            <div
              className="cm-lightbox-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="cm-lightbox-img"
                src={lightbox.image_url}
                alt={lightbox.project_title}
              />
              <div className="cm-lightbox-info">
                <div>
                  <div className="cm-lightbox-user">{lightbox.username}</div>
                  <div className="cm-lightbox-project">
                    {lightbox.project_title} · {formatDate(lightbox.created_at)}
                  </div>
                </div>
                <button
                  className="cm-lightbox-close"
                  onClick={() => setLightbox(null)}
                >
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
