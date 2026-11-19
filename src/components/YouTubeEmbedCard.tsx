"use client";
import { motion } from "framer-motion";
import { Play, Youtube } from "lucide-react";
import { extractYouTubeId } from "@/lib/youtube";
import type { LabVideo } from "@/data/videos";
export default function YouTubeEmbedCard({
  video,
  index = 0,
}: {
  video: LabVideo;
  index?: number;
}) {
  const id = extractYouTubeId(video.url);
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
      className="glass tilt-card overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-video bg-slate-900">
        {id ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-xs text-slate-500">
            <Play size={22} />
            <span>Replace the example URL with a valid YouTube link</span>
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[.18em] text-cyan-300">
            {video.category} lab
          </p>
          <h4 className="text-sm font-medium text-slate-100">{video.title}</h4>
        </div>
        <Youtube size={18} className="shrink-0 text-slate-500" />
      </div>
    </motion.article>
  );
}
