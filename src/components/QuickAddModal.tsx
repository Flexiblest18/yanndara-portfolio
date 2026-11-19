"use client";
import { useEffect, useMemo, useState } from "react";
import { Copy, Plus, Trash2, X, Check, AlertCircle } from "lucide-react";
import { extractYouTubeId } from "@/lib/youtube";
import type { LabVideo } from "@/data/videos";

const STORAGE_KEY = "yanndara-portfolio-quick-add-v1";
type Draft = { category: LabVideo["category"]; title: string; url: string };
const blank: Draft = { category: "Network", title: "", url: "" };
export default function QuickAddModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Draft>(blank);
  const [items, setItems] = useState<Draft[]>([]);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      /* ignore invalid local draft */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable */
    }
  }, [items]);
  const snippet = useMemo(
    () =>
      `export const youtubeVideos: LabVideo[] = [\n${items.map((v) => `  { category: '${v.category}', title: '${v.title.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}', url: '${v.url.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}' },`).join("\n")}\n];`,
    [items],
  );
  if (!open) return null;
  const add = () => {
    if (!draft.title.trim() || !extractYouTubeId(draft.url)) return;
    setItems((prev) => [
      ...prev,
      { ...draft, title: draft.title.trim(), url: draft.url.trim() },
    ]);
    setDraft(blank);
  };
  const copy = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-add-title"
        className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-5 shadow-2xl sm:p-7"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-cyan-300">
              Video library
            </p>
            <h3
              id="quick-add-title"
              className="mt-1 text-xl font-semibold text-white"
            >
              Quick Add / Snippet Generator
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Add video links, preview the list, then copy TypeScript.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-[150px_1fr]">
          <select
            value={draft.category}
            onChange={(e) =>
              setDraft({
                ...draft,
                category: e.target.value as Draft["category"],
              })
            }
            className="field"
          >
            <option>Network</option>
            <option>Windows Server</option>
            <option>Linux</option>
          </select>
          <input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            placeholder="Video title"
            className="field"
          />
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            value={draft.url}
            onChange={(e) => setDraft({ ...draft, url: e.target.value })}
            placeholder="Paste YouTube URL (watch, youtu.be, shorts)"
            className="field min-w-0 flex-1"
          />
          <button
            onClick={add}
            disabled={!draft.title.trim() || !extractYouTubeId(draft.url)}
            className="primary-button justify-center disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={16} /> Add video
          </button>
        </div>
        {draft.url && !extractYouTubeId(draft.url) && (
          <p className="mt-2 flex items-center gap-1 text-xs text-amber-300">
            <AlertCircle size={13} /> Enter a valid YouTube URL.
          </p>
        )}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-200">
              Your videos{" "}
              <span className="text-slate-500">({items.length})</span>
            </h4>
            <button
              onClick={() => setItems([])}
              className="text-xs text-slate-500 hover:text-rose-300"
            >
              Clear all
            </button>
          </div>
          <div className="space-y-2">
            {items.length ? (
              items.map((item, i) => (
                <div
                  key={`${item.url}-${i}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[.03] px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-slate-200">
                      {item.title}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-cyan-300">
                      {item.category}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setItems((prev) => prev.filter((_, j) => j !== i))
                    }
                    aria-label={`Remove ${item.title}`}
                    className="rounded-lg p-2 text-slate-500 hover:bg-rose-400/10 hover:text-rose-300"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            ) : (
              <p className="rounded-xl border border-dashed border-white/10 py-6 text-center text-xs text-slate-500">
                No videos added yet. Add your first lab video above.
              </p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-200">
              TypeScript snippet
            </h4>
            <button
              onClick={copy}
              disabled={!items.length}
              className="flex items-center gap-2 rounded-lg border border-cyan-300/20 px-3 py-2 text-xs text-cyan-200 hover:bg-cyan-300/10 disabled:opacity-40"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
              {copied ? "Copied" : "Copy snippet"}
            </button>
          </div>
          <pre className="max-h-40 overflow-auto rounded-xl border border-white/5 bg-[#050810] p-4 text-[11px] leading-relaxed text-sky-200">
            {snippet}
          </pre>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
            Paste the copied array into{" "}
            <code className="text-slate-300">src/data/videos.ts</code> and keep
            the <code className="text-slate-300">LabVideo</code> interface at
            the top. Your draft list is saved in this browser only.
          </p>
        </div>
      </div>
    </div>
  );
}
