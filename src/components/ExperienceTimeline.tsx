"use client";
import { motion } from "framer-motion";
import { MapPin, BriefcaseBusiness } from "lucide-react";
import { experience } from "@/data/portfolioData";
export default function ExperienceTimeline() {
  return (
    <div className="relative mx-auto max-w-4xl before:absolute before:bottom-8 before:left-[11px] before:top-3 before:w-px before:bg-gradient-to-b before:from-cyan-300/80 before:via-blue-500/30 before:to-transparent md:before:left-1/2">
      {experience.map((item, i) => (
        <motion.article
          key={item.company}
          initial={{ opacity: 0, y: 28, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: i * 0.08 }}
          className={`relative mb-8 pl-9 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}
        >
          <span
            className={`absolute left-[5px] top-7 h-3.5 w-3.5 rounded-full border-2 border-cyan-200 bg-ink shadow-[0_0_18px_4px_rgba(56,189,248,.35)] md:left-auto ${i % 2 ? "md:-left-[7px]" : "md:-right-[7px]"}`}
          />
          <div className="glass tilt-card rounded-2xl p-5 text-left sm:p-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.18em] text-cyan-200">
                {item.type}
              </span>
              <span className="text-xs text-slate-400">{item.date}</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{item.role}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-cyan-200">
              <BriefcaseBusiness size={14} />
              {item.company}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={12} />
              {item.location}
            </p>
            <ul className="mt-5 space-y-2.5">
              {item.points.map((point, j) => (
                <li
                  key={j}
                  className="flex gap-2 text-sm leading-relaxed text-slate-400"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
