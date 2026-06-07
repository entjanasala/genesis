import { useState, useRef } from "react";
import { supabase } from "../lib/supabase";

export default function UploadArea({ projectId, projectTitle, accent }) {
  const [status, setStatus] = useState("idle"); // idle | uploading | done | error
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef(null);

  const BUCKET = "Submissions"; // ← një emër везде, konsistent

  const processFile = async (file) => {
    if (!file) return;

    // show preview immediately
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }

    setStatus("uploading");
    setErrorMsg("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("You must be logged in.");

      const ext = file.name.split(".").pop();
      const path = `${user.id}/${projectId}_${Date.now()}.${ext}`;

      // 1. Upload file në storage
      const { error: storageError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: true });

      if (storageError) throw storageError;

      // 2. Merr public URL — i njëjti bucket si upload
      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(path);

      const publicUrl = urlData.publicUrl;

      if (!publicUrl) throw new Error("Could not generate public URL.");

      // 3. Ruaj në databazë
      const { error: dbError } = await supabase.from("submissions").upsert(
        {
          user_id: user.id,
          project_id: projectId,
          project_title: projectTitle,
          image_url: publicUrl,
          username:
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            "Designer",
        },
        { onConflict: "user_id,project_id" },
      );

      if (dbError) throw dbError;

      setStatus("done");
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg(err.message || "Upload failed. Check console.");
      setStatus("error");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const borderColor = dragging
    ? accent
    : status === "done"
      ? `${accent}70`
      : status === "error"
        ? "#fda4af"
        : "rgba(255,255,255,0.12)";

  const bgColor = dragging
    ? `${accent}10`
    : status === "done"
      ? `${accent}07`
      : "rgba(255,255,255,0.02)";

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
        style={{ display: "none" }}
        onChange={handleInputChange}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(false);
        }}
        onDrop={handleDrop}
        style={{
          border: `1.5px dashed ${borderColor}`,
          borderRadius: 10,
          background: bgColor,
          transition: "all 0.2s",
          overflow: "hidden",
          minHeight: 120,
        }}
      >
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              maxHeight: 200,
              objectFit: "cover",
              display: "block",
            }}
          />
        )}

        <div style={{ padding: "20px 16px", textAlign: "center" }}>
          {status === "uploading" && (
            <div>
              <div style={{ fontSize: 22, marginBottom: 8, opacity: 0.6 }}>
                ⟳
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
                Uploading...
              </div>
            </div>
          )}
          {status === "done" && (
            <div>
              <div style={{ fontSize: 22, marginBottom: 6, color: accent }}>
                ✓
              </div>
              <div style={{ fontSize: 12, color: accent }}>Submitted!</div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.25)",
                  marginTop: 4,
                }}
              >
                Visible in community gallery
              </div>
              <button
                onClick={() => inputRef.current?.click()}
                style={{
                  marginTop: 10,
                  background: "none",
                  border: `1px solid rgba(255,255,255,0.1)`,
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 10,
                  padding: "4px 12px",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  letterSpacing: "0.08em",
                }}
              >
                Replace file
              </button>
            </div>
          )}
          {(status === "idle" || status === "error") && (
            <div>
              <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.25 }}>
                ↑
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: 4,
                }}
              >
                Drag & drop here
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.2)",
                  marginBottom: 14,
                }}
              >
                PNG · JPG · PDF
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                style={{
                  padding: "8px 20px",
                  border: `1px solid ${accent}50`,
                  background: `${accent}10`,
                  color: accent,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: 4,
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = `${accent}20`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = `${accent}10`)
                }
              >
                Browse file
              </button>
            </div>
          )}
        </div>
      </div>

      {status === "error" && errorMsg && (
        <div
          style={{
            marginTop: 8,
            fontSize: 11,
            color: "#fda4af",
            padding: "8px 12px",
            background: "rgba(253,164,175,0.08)",
            borderRadius: 4,
            border: "1px solid rgba(253,164,175,0.2)",
          }}
        >
          ✗ {errorMsg}
        </div>
      )}
    </div>
  );
}
