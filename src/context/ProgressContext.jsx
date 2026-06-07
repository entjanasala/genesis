import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [completed, setCompleted] = useState({});
  const [synced, setSynced] = useState(false);

  // ── Ngarko progresin nga Supabase kur useri logohet ──────────────────
  useEffect(() => {
    if (!user) {
      setCompleted({});
      setSynced(false);
      return;
    }

    const loadProgress = async () => {
      const { data, error } = await supabase
        .from("user_progress")
        .select("module_key, lesson_ids")
        .eq("user_id", user.id);

      if (!error && data) {
        const rebuilt = {};
        data.forEach((row) => {
          rebuilt[row.module_key] = row.lesson_ids;
        });
        setCompleted(rebuilt);
      }
      setSynced(true);
    };

    loadProgress();
  }, [user]);

  // ── Ruaj në Supabase çdo herë që ndryshon completed ─────────────────
  const saveModuleToDb = async (moduleKey, lessonIds) => {
    if (!user) return;
    await supabase
      .from("user_progress")
      .upsert(
        { user_id: user.id, module_key: moduleKey, lesson_ids: lessonIds },
        { onConflict: "user_id,module_key" },
      );
  };

  // ── Toggle lesson si më parë, por tani edhe save ─────────────────────
  const toggleComplete = (moduleKey, lessonId) => {
    setCompleted((prev) => {
      const current = prev[moduleKey] || [];
      const already = current.includes(lessonId);
      const updated = already
        ? current.filter((x) => x !== lessonId)
        : [...current, lessonId];
      const newState = { ...prev, [moduleKey]: updated };
      saveModuleToDb(moduleKey, updated);
      return newState;
    });
  };

  const getCompleted = (moduleKey) => completed[moduleKey] || [];

  const isCompleted = (moduleKey, lessonId) =>
    (completed[moduleKey] || []).includes(lessonId);

  const getModuleProgress = (moduleKey, total) => {
    const done = (completed[moduleKey] || []).length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  return (
    <ProgressContext.Provider
      value={{
        toggleComplete,
        getCompleted,
        isCompleted,
        getModuleProgress,
        synced,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
