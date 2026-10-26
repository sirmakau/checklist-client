import { useEffect, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(ellipse at top left, #24204b 0%, transparent 42%), radial-gradient(ellipse at top right, #123746 0%, transparent 35%), #0b1020",
    color: "#edf1fa",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
    padding: "32px 20px 48px",
    boxSizing: "border-box",
  },
  container: { maxWidth: "1120px", margin: "0 auto" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "18px",
    marginBottom: "34px",
  },
  brand: { display: "flex", alignItems: "center", gap: "12px" },
  brandIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg, #a78bfa, #6366f1)",
    fontSize: "23px",
    boxShadow: "0 8px 28px rgba(99,102,241,0.3)",
  },
  brandName: { fontSize: "15px", fontWeight: 800, letterSpacing: "1.5px" },
  brandSubtitle: { color: "#929bb3", fontSize: "12px", marginTop: "4px" },
  connectionBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid rgba(52,211,153,0.2)",
    borderRadius: "30px",
    padding: "9px 14px",
    background: "rgba(16,185,129,0.08)",
    color: "#86efc4",
    fontSize: "12px",
    fontWeight: 600,
  },
  dot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#34d399",
    boxShadow: "0 0 12px #34d399",
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "30px",
    padding: "clamp(24px, 5vw, 46px)",
    borderRadius: "28px",
    border: "1px solid rgba(255,255,255,0.1)",
    background:
      "linear-gradient(120deg, rgba(38,42,76,0.93), rgba(20,39,57,0.85))",
    boxShadow: "0 24px 70px rgba(0,0,0,0.18)",
    marginBottom: "24px",
  },
  eyebrow: {
    color: "#b9a5ff",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "17px",
  },
  title: {
    fontSize: "clamp(34px, 5vw, 54px)",
    lineHeight: 1.1,
    letterSpacing: "-2px",
    margin: "0 0 18px",
    maxWidth: "600px",
  },
  accent: { color: "#b7a4ff" },
  subtitle: {
    color: "#a6b0c5",
    fontSize: "14px",
    lineHeight: 1.8,
    maxWidth: "510px",
    margin: 0,
  },
  heroIcon: {
    width: "145px",
    height: "145px",
    borderRadius: "36px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    background:
      "linear-gradient(145deg, rgba(167,139,250,0.19), rgba(52,211,153,0.08))",
    border: "1px solid rgba(196,181,253,0.2)",
    fontSize: "66px",
    transform: "rotate(3deg)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "30px",
  },
  statCard: {
    padding: "22px",
    background: "rgba(19,27,46,0.8)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
  },
  statLabel: { color: "#98a3bb", fontSize: "12px", marginBottom: "15px" },
  statNumber: { fontSize: "32px", fontWeight: 800, letterSpacing: "-1px" },
  statHint: { color: "#8792ab", fontSize: "12px", marginTop: "8px" },
  contentGrid: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "22px",
  },
  panel: {
    flex: "2 1 560px",
    minWidth: 0,
    padding: "26px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(19,27,46,0.85)",
    boxSizing: "border-box",
  },
  sidePanel: {
    flex: "1 1 240px",
    minWidth: 0,
    padding: "25px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(19,27,46,0.72)",
    boxSizing: "border-box",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "23px",
  },
  sectionTitle: { fontSize: "19px", fontWeight: 750, margin: 0 },
  sectionSubtitle: { color: "#8f9ab3", fontSize: "12px", marginTop: "7px" },
  taskList: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "12px" },
  taskCard: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "19px",
    borderRadius: "17px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.025)",
  },
  taskTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "12px",
  },
  taskMain: { display: "flex", alignItems: "flex-start", gap: "13px", flex: "1 1 220px", minWidth: 0 },
  taskMark: {
    width: "32px",
    height: "32px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: "11px",
    fontSize: "15px",
    fontWeight: 800,
  },
  taskTitle: { fontSize: "14px", fontWeight: 700, lineHeight: 1.6, overflowWrap: "anywhere" },
  taskMeta: { color: "#8d9ab3", fontSize: "12px", marginTop: "7px", lineHeight: 1.6 },
  statusBadge: {
    borderRadius: "9px",
    padding: "7px 10px",
    fontSize: "10px",
    fontWeight: 800,
    whiteSpace: "nowrap",
    letterSpacing: "0.3px",
  },
  taskActions: { display: "flex", flexWrap: "wrap", gap: "8px" },
  button: {
    padding: "9px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: "#dce3f4",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
  primaryButton: {
    padding: "12px 16px",
    borderRadius: "11px",
    border: "none",
    background: "linear-gradient(135deg, #a78bfa, #7c6cf0)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 750,
    cursor: "pointer",
  },
  dangerButton: {
    padding: "9px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(248,113,113,0.23)",
    background: "rgba(248,113,113,0.08)",
    color: "#fca5a5",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
  field: {
    width: "100%",
    minWidth: 0,
    padding: "12px 13px",
    borderRadius: "11px",
    border: "1px solid rgba(255,255,255,0.13)",
    background: "rgba(7,12,26,0.7)",
    color: "#edf1fa",
    fontSize: "13px",
    boxSizing: "border-box",
  },
  formGrid: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(150px, 190px) auto", gap: "10px", marginBottom: "22px", alignItems: "center" },
  editGrid: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(140px, 190px)", gap: "10px" },
  emptyState: {
    padding: "42px 16px",
    textAlign: "center",
    borderRadius: "17px",
    border: "1px dashed rgba(255,255,255,0.13)",
    color: "#9ba7bd",
  },
  emptyIcon: { fontSize: "35px", marginBottom: "14px" },
  progressTrack: { height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden", margin: "17px 0 10px" },
  progressFill: { height: "100%", borderRadius: "10px", background: "linear-gradient(90deg, #a78bfa, #34d399)", transition: "width 300ms ease" },
  note: {
    marginTop: "22px",
    padding: "17px",
    borderRadius: "15px",
    background: "rgba(167,139,250,0.07)",
    border: "1px solid rgba(167,139,250,0.12)",
    color: "#b2bad0",
    fontSize: "12px",
    lineHeight: 1.8,
  },
  refreshButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "11px",
    padding: "10px 13px",
    background: "rgba(255,255,255,0.05)",
    color: "#dce3f4",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
  },
  message: { textAlign: "center", color: "#b4bfd3", padding: "25px 10px", fontSize: "13px" },
  error: {
    padding: "13px 15px",
    marginBottom: "15px",
    borderRadius: "12px",
    background: "rgba(248,113,113,0.08)",
    border: "1px solid rgba(248,113,113,0.2)",
    color: "#fca5a5",
    fontSize: "13px",
    lineHeight: 1.6,
  },
  success: {
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "12px",
    background: "rgba(52,211,153,0.08)",
    border: "1px solid rgba(52,211,153,0.18)",
    color: "#86efc4",
    fontSize: "13px",
  },
  footer: { textAlign: "center", paddingTop: "35px", color: "#6f7b94", fontSize: "11px", letterSpacing: "0.4px" },
};

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || `Request failed (${response.status})`);
  }
  return result;
}

function formatDueDate(value) {
  if (!value) return "No deadline set";
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  const date = new Date(year, month - 1, day, 12);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [creating, setCreating] = useState(false);
  const [busyTaskId, setBusyTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTasks() {
      setLoading(true);
      setLoadError("");
      try {
        const result = await apiRequest("/api/tasks", { signal: controller.signal });
        if (!Array.isArray(result.data)) {
          throw new Error("The API returned an unexpected response.");
        }
        setTasks(result.data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Could not load tasks:", error);
          setLoadError("We couldn't load your tasks. Check your backend URL and connection.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchTasks();
    return () => controller.abort();
  }, [refreshKey]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;
  const progress = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  async function handleCreateTask(event) {
    event.preventDefault();
    const title = newTitle.trim();
    if (!title || creating) return;

    setCreating(true);
    setActionError("");
    setNotice("");
    try {
      const result = await apiRequest("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title, due_date: newDueDate || null }),
      });
      setTasks((current) => [result.data, ...current]);
      setNewTitle("");
      setNewDueDate("");
      setNotice("Task created successfully.");
    } catch (error) {
      console.error("Task creation failed:", error);
      setActionError(error.message || "Could not create the task.");
    } finally {
      setCreating(false);
    }
  }

  async function handleToggleComplete(task) {
    setBusyTaskId(String(task.id));
    setActionError("");
    setNotice("");
    try {
      const result = await apiRequest(`/api/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !task.completed }),
      });
      setTasks((current) => current.map((item) =>
        String(item.id) === String(task.id) ? result.data : item
      ));
      setNotice(result.data.completed ? "Task marked complete." : "Task marked incomplete.");
    } catch (error) {
      console.error("Task status update failed:", error);
      setActionError(error.message || "Could not update task status.");
    } finally {
      setBusyTaskId(null);
    }
  }

  function beginEditing(task) {
    setEditingTaskId(String(task.id));
    setEditTitle(task.title);
    setEditDueDate(task.due_date ? task.due_date.slice(0, 10) : "");
    setActionError("");
    setNotice("");
  }

  function cancelEditing() {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDueDate("");
  }

  async function handleSaveTask(event, task) {
    event.preventDefault();
    const title = editTitle.trim();
    if (!title) {
      setActionError("Task title cannot be empty.");
      return;
    }

    setBusyTaskId(String(task.id));
    setActionError("");
    setNotice("");
    try {
      const result = await apiRequest(`/api/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ title, due_date: editDueDate || null }),
      });
      setTasks((current) => current.map((item) =>
        String(item.id) === String(task.id) ? result.data : item
      ));
      cancelEditing();
      setNotice("Task updated successfully.");
    } catch (error) {
      console.error("Task update failed:", error);
      setActionError(error.message || "Could not save task changes.");
    } finally {
      setBusyTaskId(null);
    }
  }

  async function handleDeleteTask(task) {
    const confirmed = window.confirm(`Delete "${task.title}" permanently?`);
    if (!confirmed) return;

    setBusyTaskId(String(task.id));
    setActionError("");
    setNotice("");
    try {
      await apiRequest(`/api/tasks/${task.id}`, { method: "DELETE" });
      setTasks((current) => current.filter((item) => String(item.id) !== String(task.id)));
      if (editingTaskId === String(task.id)) cancelEditing();
      setNotice("Task deleted successfully.");
    } catch (error) {
      console.error("Task deletion failed:", error);
      setActionError(error.message || "Could not delete task.");
    } finally {
      setBusyTaskId(null);
    }
  }

  const disabledButton = { opacity: 0.55, cursor: "not-allowed" };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.brand}>
            <div style={styles.brandIcon}>✓</div>
            <div>
              <div style={styles.brandName}>CHECKLIST</div>
              <div style={styles.brandSubtitle}>Your personal workspace</div>
            </div>
          </div>
          <div style={styles.connectionBadge}>
            <span style={styles.dot} />
            {!loading && !loadError ? "API responding" : loading ? "Connecting..." : "Connection issue"}
          </div>
        </header>

        <section style={styles.hero}>
          <div>
            <div style={styles.eyebrow}>YOUR SPACE. YOUR PACE.</div>
            <h1 style={styles.title}>Make room for<br /><span style={styles.accent}>what matters.</span></h1>
            <p style={styles.subtitle}>Every big achievement starts with a small task. Keep your priorities visible and your next step clear.</p>
          </div>
          <div style={styles.heroIcon}>✦</div>
        </section>

        <section style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>ALL TASKS</div>
            <div style={styles.statNumber}>{tasks.length}</div>
            <div style={styles.statHint}>Tasks in your checklist</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>IN PROGRESS</div>
            <div style={{ ...styles.statNumber, color: "#fbbf24" }}>{activeCount}</div>
            <div style={styles.statHint}>Still on your list</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>COMPLETED</div>
            <div style={{ ...styles.statNumber, color: "#6ee7b7" }}>{completedCount}</div>
            <div style={styles.statHint}>Tasks you've finished</div>
          </div>
        </section>

        <div style={styles.contentGrid}>
          <section style={styles.panel}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Your tasks</h2>
                <div style={styles.sectionSubtitle}>Create, edit, complete, reschedule, or delete tasks.</div>
              </div>
              <button type="button" style={{ ...styles.refreshButton, ...(loading ? disabledButton : {}) }} onClick={() => setRefreshKey((value) => value + 1)} disabled={loading}>
                ↻ &nbsp; Refresh
              </button>
            </div>

            {loadError && <div role="alert" style={styles.error}>{loadError}<div style={{ marginTop: 8 }}>API: {API_URL}</div></div>}
            {actionError && <div role="alert" style={styles.error}>{actionError}</div>}
            {notice && !actionError && <div role="status" style={styles.success}>{notice}</div>}

            <form onSubmit={handleCreateTask} style={styles.formGrid}>
              <input
                type="text"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="What needs to get done?"
                aria-label="New task title"
                maxLength={200}
                required
                disabled={creating}
                style={styles.field}
              />
              <input
                type="date"
                value={newDueDate}
                onChange={(event) => setNewDueDate(event.target.value)}
                aria-label="Optional due date"
                title="Optional due date"
                disabled={creating}
                style={styles.field}
              />
              <button type="submit" style={{ ...styles.primaryButton, ...(creating || !newTitle.trim() ? disabledButton : {}) }} disabled={creating || !newTitle.trim()}>
                {creating ? "Adding..." : "+ Add task"}
              </button>
            </form>

            {loading ? (
              <div style={styles.message}>◌<br />Loading your tasks...</div>
            ) : loadError ? null : tasks.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>✧</div>
                <div style={{ color: "#e2e8f0", fontSize: "15px", fontWeight: 700, marginBottom: 8 }}>A fresh start</div>
                <div style={{ fontSize: "12px", lineHeight: 1.8 }}>Your checklist is empty right now.<br />Add a task to get started.</div>
              </div>
            ) : (
              <ul style={styles.taskList}>
                {tasks.map((task) => {
                  const isEditing = editingTaskId === String(task.id);
                  const isBusy = busyTaskId === String(task.id);
                  return (
                    <li key={task.id} style={{ ...styles.taskCard, borderColor: task.completed ? "rgba(52,211,153,0.18)" : "rgba(255,255,255,0.08)" }}>
                      <div style={styles.taskTop}>
                        <div style={styles.taskMain}>
                          <button
                            type="button"
                            title={task.completed ? "Mark incomplete" : "Mark complete"}
                            aria-label={task.completed ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}
                            onClick={() => handleToggleComplete(task)}
                            disabled={isBusy}
                            style={{ ...styles.taskMark, border: "none", cursor: isBusy ? "not-allowed" : "pointer", background: task.completed ? "rgba(52,211,153,0.12)" : "rgba(167,139,250,0.12)", color: task.completed ? "#6ee7b7" : "#c4b5fd" }}
                          >
                            {isBusy ? "…" : task.completed ? "✓" : "○"}
                          </button>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ ...styles.taskTitle, color: task.completed ? "#91a09f" : "#edf1fa", textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</div>
                            <div style={styles.taskMeta}>ID #{task.id} · Due {formatDueDate(task.due_date)}</div>
                          </div>
                        </div>
                        <span style={{ ...styles.statusBadge, background: task.completed ? "rgba(52,211,153,0.10)" : "rgba(251,191,36,0.09)", color: task.completed ? "#6ee7b7" : "#fcd34d", border: `1px solid ${task.completed ? "rgba(52,211,153,0.16)" : "rgba(251,191,36,0.16)"}` }}>
                          {task.completed ? "COMPLETED" : "IN PROGRESS"}
                        </span>
                      </div>

                      {isEditing && (
                        <form onSubmit={(event) => handleSaveTask(event, task)} style={{ display: "grid", gap: 12 }}>
                          <div style={styles.editGrid}>
                            <input type="text" value={editTitle} onChange={(event) => setEditTitle(event.target.value)} maxLength={200} required aria-label={`Edit title for task ${task.id}`} style={styles.field} disabled={isBusy} />
                            <input type="date" value={editDueDate} onChange={(event) => setEditDueDate(event.target.value)} aria-label={`Edit due date for task ${task.id}`} style={styles.field} disabled={isBusy} />
                          </div>
                          <div style={{ color: "#8d9ab3", fontSize: 11 }}>Leave the date empty to clear the current deadline.</div>
                          <div style={styles.taskActions}>
                            <button type="submit" style={{ ...styles.primaryButton, ...(isBusy ? disabledButton : {}) }} disabled={isBusy}>{isBusy ? "Saving..." : "Save changes"}</button>
                            <button type="button" style={styles.button} onClick={cancelEditing} disabled={isBusy}>Cancel</button>
                          </div>
                        </form>
                      )}

                      {!isEditing && (
                        <div style={styles.taskActions}>
                          <button type="button" style={{ ...styles.button, ...(isBusy ? disabledButton : {}) }} onClick={() => handleToggleComplete(task)} disabled={isBusy}>
                            {task.completed ? "Mark incomplete" : "Mark complete"}
                          </button>
                          <button type="button" style={{ ...styles.button, ...(isBusy ? disabledButton : {}) }} onClick={() => beginEditing(task)} disabled={isBusy}>Edit task</button>
                          <button type="button" style={{ ...styles.dangerButton, ...(isBusy ? disabledButton : {}) }} onClick={() => handleDeleteTask(task)} disabled={isBusy}>{isBusy ? "Working..." : "Delete"}</button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <aside style={styles.sidePanel}>
            <div style={styles.eyebrow}>YOUR OVERVIEW</div>
            <h2 style={{ fontSize: "21px", lineHeight: 1.4, letterSpacing: "-0.5px", margin: "0 0 8px" }}>Progress, not perfection.</h2>
            <p style={{ color: "#96a2bb", fontSize: "12px", lineHeight: 1.8, margin: 0 }}>Every completed task is a little momentum gained. Keep showing up.</p>
            <div style={styles.progressTrack}><div style={{ ...styles.progressFill, width: `${progress}%` }} /></div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", color: "#aab5cb", fontSize: "12px" }}>
              <span>Completion rate</span><strong style={{ color: "#c4b5fd" }}>{progress}%</strong>
            </div>
            <div style={styles.note}>
              <div style={{ color: "#c4b5fd", fontWeight: 800, marginBottom: "7px" }}>✦ Behind the scenes</div>
              Your tasks are managed through your Express API and stored in Neon PostgreSQL. Changes remain after a page refresh.
            </div>
          </aside>
        </div>

        <footer style={styles.footer}>BUILT WITH REACT · EXPRESS · NEON POSTGRESQL</footer>
      </div>
    </div>
  );
}

export default App;
