"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Cloud,
  Code2,
  Network,
  Plus,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { youtubeVideos } from "@/data/videos";
import YouTubeEmbedCard from "./YouTubeEmbedCard";
import QuickAddModal from "./QuickAddModal";

const domains = [
  {
    name: "Network",
    icon: Network,
    description: "Connectivity, routing and switching fundamentals.",
    skills: [
      "Router & Switch Configuration",
      "VLANs & Firewall",
      "Run cable",
      "VPN Fundamentals",
      "Wireless & LAN Troubleshooting",
    ],
  },
  {
    name: "Windows Server",
    icon: Server,
    description:
      "Identity, directory services and core Windows infrastructure.",
    skills: [
      "Active Directory",
      "Group Policy (GPO)",
      "DNS & DHCP",
      "User & OU Management",
      "Permissions & Access Control",
    ],
  },
  {
    name: "Linux",
    icon: Terminal,
    description: "Linux administration and modern service deployment basics.",
    skills: [
      "Install Nginx | FTP & EC2 | Host Static Site & IP | Mult-Domain | Reverse Proxy | Microservice Route",
      "Step-by-step guide to installing NGINX with Docker on AWS",
      "Docker Fundamentals",
      "Explain group management in Linux",
      "How to manage user in Linux",
      "How to Setup Webmail in Namecheap",
    ],
  },
  {
  name: "Troubleshooting",
  icon: Activity,
  description:
    "IT support, system diagnostics and hardware/software troubleshooting.",
  skills: [
    "Windows Troubleshooting",
    "Hardware & Peripheral Troubleshooting",
    "Software Installation & Troubleshooting",
    "Wi-Fi Connectivity Issues",
    "Printer Troubleshooting",
    "IT Helpdesk & User Support",
  ],
},
  
] as const;
type Domain = (typeof domains)[number]["name"];
export default function SkillsShowcase() {
  const [active, setActive] = useState<Domain>("Network");
  const [modalOpen, setModalOpen] = useState(false);
  const selected = domains.find((d) => d.name === active)!;
  const videos = youtubeVideos.filter((v) => v.category === active);
  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow">Technical toolkit</p>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Labs</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
            Core infrastructure domains I’m building through hands-on practice
            and guided labs.
          </p>
        </div>
        {/* <button
          onClick={() => setModalOpen(true)}
          className="secondary-button w-fit"
        >
          <Plus size={15} /> Quick Add Video
        </button> */}
      </div>
      <div className="glass rounded-3xl p-4 sm:p-6">
        <div className="mb-7 flex flex-wrap gap-2 rounded-2xl bg-black/20 p-1.5">
          {domains.map((domain) => {
            const Icon = domain.icon;
            return (
              <button
                key={domain.name}
                onClick={() => setActive(domain.name)}
                className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold transition sm:text-sm ${active === domain.name ? "text-white" : "text-slate-500 hover:text-slate-200"}`}
              >
                <Icon size={15} />
                <span>{domain.name}</span>
                {active === domain.name && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 -z-0 rounded-xl border border-cyan-300/20 bg-cyan-300/10 shadow-[0_0_24px_rgba(56,189,248,.08)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-cyan-300/10 p-3 text-cyan-200">
                <selected.icon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white">{selected.name}</h3>
                <p className="text-xs text-slate-500">{selected.description}</p>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {selected.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                  className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[.025] px-3 py-3 text-sm text-slate-300"
                >
                  <ShieldCheck
                    size={15}
                    className="shrink-0 text-cyan-300/80"
                  />
                  {skill}
                </motion.div>
              ))}
            </div>
            <div className="mb-4 mt-9 flex items-center justify-between">
              <div>
                <p className="eyebrow">Hands-on learning</p>
                <h4 className="mt-1 text-base font-semibold text-white">
                  Video lab showcase
                </h4>
              </div>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-slate-500">
                {videos.length} {videos.length === 1 ? "VIDEO" : "VIDEOS"}
              </span>
            </div>
            {videos.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {videos.map((video, i) => (
                  <YouTubeEmbedCard
                    key={`${video.url}-${i}`}
                    video={video}
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 px-5 py-8 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-500">
                  <Activity size={18} />
                </div>
                <p className="text-sm text-slate-300">
                  No {active} videos added yet
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Use Quick Add Video to add a lab link, or edit{" "}
                  <code>src/data/videos.ts</code>.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <QuickAddModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
