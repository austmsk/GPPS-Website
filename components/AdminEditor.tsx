"use client";

import React, { useEffect, useMemo, useState } from "react";

export type AdminEditorMeta = {
  title: string;
  slug: string;
  date?: string;
  author?: string;
  description?: string;
  image?: string;
};

export default function AdminEditor({ metas }: { metas: AdminEditorMeta[] }) {
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // Form fields
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<string>("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [mdxContent, setMdxContent] = useState("\n");

  const metasBySlug = useMemo(() => Object.fromEntries(metas.map(m => [m.slug, m])), [metas]);

  async function loadArticle(s: string) {
    if (!s) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/article/${encodeURIComponent(s)}`);
      const data = await res.json();
      if (!res.ok) {
        setStatus(`Error loading: ${data?.error || res.status}`);
        return;
      }
      const m = data.meta as AdminEditorMeta;
      setSlug(m.slug);
      setTitle(m.title || m.slug);
      setDate(m.date || "");
      setAuthor(m.author || "");
      setDescription(m.description || "");
      setImage(m.image || "");
      setMdxContent((data.mdxContent as string) || "\n");
    } catch (e) {
      setStatus("Network error while loading article");
    } finally {
      setLoading(false);
    }
  }

  function resetForCreate() {
    setMode("create");
    setSlug("");
    setTitle("");
    setDate("");
    setAuthor("");
    setDescription("");
    setImage("");
    setMdxContent("\n");
    setStatus(null);
  }

  async function handleSave() {
    setLoading(true);
    setStatus(null);
    try {
      const payload = {
        meta: { title, date: date || undefined, author: author || undefined, description: description || undefined, image: image || undefined },
        mdxContent,
      };

      let res: Response;
      if (mode === "create") {
        if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
          setStatus("Please provide a slug using lowercase letters, numbers, and dashes.");
          setLoading(false);
          return;
        }
        res = await fetch("/api/admin/article", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, ...payload }),
        });
      } else {
        res = await fetch(`/api/admin/article/${encodeURIComponent(slug)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        setStatus(`Error saving: ${data?.error || res.status}`);
      } else {
        setStatus(mode === "create" ? `Created '${slug}'. Revalidated.` : `Updated '${slug}'. Revalidated.`);
      }
    } catch (e) {
      setStatus("Network error while saving");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ margin: "0 0 8px 0" }}>Article Editor</h2>

      {/* Mode controls */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <button type="button" className={`btn ${mode === "create" ? "btn-primary" : "btn-outline"}`} onClick={resetForCreate}>New Article</button>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label htmlFor="editSelect" style={{ fontSize: 14 }}>Edit existing:</label>
          <select
            id="editSelect"
            onChange={(e) => { const s = e.target.value; if (s) { setMode("edit"); loadArticle(s); } }}
            defaultValue=""
            style={{ padding: "8px", borderRadius: 6 }}
          >
            <option value="" disabled>Select an article…</option>
            {metas.map((m) => (
              <option key={m.slug} value={m.slug}>{m.title} ({m.slug})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Form */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontSize: 14, marginBottom: 4 }}>Name {mode === "edit" && <em>(read-only)</em>}</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            disabled={mode === "edit"}
            placeholder="e.g. speech-day-2024"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 14, marginBottom: 4 }}>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 14, marginBottom: 4 }}>Date</label>
          <input type="date" value={date ? date.substring(0,10) : ""} onChange={(e) => setDate(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 14, marginBottom: 4 }}>Author</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 14, marginBottom: 4 }}>Description</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 14, marginBottom: 4 }}>Cover Image URL</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="/images/news/…/hero.jpeg" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label style={{ display: "block", fontSize: 14, marginBottom: 4 }}>Content (MD/MDX)</label>
        <textarea
          value={mdxContent}
          onChange={(e) => setMdxContent(e.target.value)}
          rows={16}
          style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
        />
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12 }}>
        <button type="button" className="btn btn-primary" onClick={handleSave} disabled={loading}>
          {loading ? (mode === "create" ? "Creating…" : "Saving…") : (mode === "create" ? "Create Article" : "Save Changes")}
        </button>
        {slug && (
          <a className="btn btn-outline" href={`/news/${slug}`} target="_blank" rel="noopener noreferrer">View on site →</a>
        )}
        {status && <small style={{ color: status.startsWith("Error") ? "crimson" : "green" }}>{status}</small>}
      </div>
    </section>
  );
}
