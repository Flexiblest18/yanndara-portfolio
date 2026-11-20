
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
  ShieldCheck,
  Phone,
  Linkedin,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsShowcase from "@/components/SkillsShowcase";

import { profile } from "@/data/portfolioData";

// Load 3D components in the browser only
const NetworkScene = dynamic(
  () => import("@/components/NetworkScene"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 -z-0 hero-grid" />
    ),
  }
);

const ObjProfile = dynamic(
  () => import("@/components/ObjProfile"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-2xl bg-white/5" />
    ),
  }
);

// Contact information comes from portfolioData.ts
const contactItems = [
  {
    label: "Email",
    value: profile.email,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      profile.email
    )}`,
    icon: Mail,
    external: true,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: Phone,
    external: false,
  },
  {
    label: "LinkedIn",
    value: profile.linkedinLabel,
    href: profile.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: "Telegram",
    value: profile.telegramLabel,
    href: profile.telegram,
    icon: Send,
    external: true,
  },
];

export default function Home() {
  const [show3DPopup, setShow3DPopup] = useState(true);

  // Separate the first name from the remaining name for styling
  const nameParts = profile.name.trim().split(" ");
  const firstName = nameParts[0];
  const remainingName = nameParts.slice(1).join(" ");

  // Close popup and go to About Me section
  const handleAboutMe = () => {
    setShow3DPopup(false);

    window.setTimeout(() => {
      document.getElementById("home")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
  };

  const closePopup = () => {
    setShow3DPopup(false);
  };

  return (
    <main className="overflow-hidden">
      <Navbar />

      {/* =====================================
          WELCOME 3D POPUP
      ====================================== */}

      {show3DPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#030711]/90 px-4 py-8 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#0b1423] shadow-[0_0_80px_rgba(56,189,248,0.12)]"
          >
            {/* Close button */}
            <button
              onClick={closePopup}
              aria-label="Close welcome popup"
              className="absolute right-5 top-5 z-20 rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:border-cyan-300/40 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Popup heading */}
            <div className="px-6 pt-9 text-center sm:px-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[.2em] text-cyan-200">
                <Sparkles size={13} />
                Welcome to my portfolio
              </span>

              <h2 className="mt-5 text-2xl font-semibold text-white sm:text-4xl">
                Meet{" "}
                <span className="gradient-text">{profile.name}</span>
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
                {profile.roles}
              </p>
            </div>

            {/* 3D Model */}
            <div className="mx-auto mt-3 h-[280px] w-full sm:h-[390px]">
              <ObjProfile />
            </div>

            {/* Popup buttons */}
            <div className="px-6 pb-8 text-center sm:px-10">
              <p className="mb-6 text-xs text-slate-500">
                Drag the 3D model to rotate it
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  onClick={handleAboutMe}
                  className="primary-button justify-center"
                >
                  About Me
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={closePopup}
                  className="secondary-button justify-center"
                >
                  Explore Portfolio
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* =====================================
          MAIN HERO + ABOUT ME + 3D PROFILE
      ====================================== */}

      <section
        id="home"
        className="relative flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8"
      >
        <div className="hero-glow" />

        <NetworkScene />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* LEFT SIDE: ABOUT ME INFORMATION */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[.2em] text-cyan-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
              I'm here
            </div>

            <p className="text-sm font-medium tracking-wide text-slate-400">
              ABOUT ME
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-6xl">
              {firstName}{" "}
              <span className="gradient-text">{remainingName}</span>
              <span className="text-cyan-300">.</span>
            </h1>

            {/* Job title from portfolioData.ts */}
            <h2 className="mt-5 text-lg font-medium leading-relaxed text-cyan-300 sm:text-xl">
              {profile.roles}
            </h2>

            {/* About Me summary from portfolioData.ts */}
            <p className="mt-7 text-sm leading-8 text-slate-400 sm:text-base">
              {profile.summary}
            </p>

            {/* Action buttons */}
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={profile.cvPath}
                download
                className="primary-button"
              >
                <Download size={16} />
                Download CV
              </a>

              <a
                href="#contact"
                className="secondary-button"
              >
                <Mail size={16} />
                Contact Me
              </a>
            </div>

            {/* Location */}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-cyan-300" />
                {profile.location}
              </span>

              <span className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-cyan-300" />
                Troubleshooting mindset
              </span>
            </div>
          </motion.div>

          {/* RIGHT SIDE: YOUR 3D PROFILE */}

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="absolute -inset-8 rounded-full bg-cyan-400/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-white/[0.025] shadow-[0_0_60px_rgba(56,189,248,0.12)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="font-mono text-[10px] tracking-widest text-slate-500">
                  MY 3D PROFILE
                </span>

                <span className="flex items-center gap-2 text-xs text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  INTERACTIVE
                </span>
              </div>

              <div className="h-[400px] sm:h-[520px]">
                <ObjProfile />
              </div>

              <div className="border-t border-white/10 px-5 py-4 text-center">
                <h3 className="font-semibold text-white">
                  {profile.name.toUpperCase()}
                </h3>

                <p className="mt-1 text-xs text-cyan-300">
                  Drag the model to rotate
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================
          EXPERIENCE
      ====================================== */}

      <section
        id="experience"
        className="section-wrap scroll-mt-24"
      >
        <div className="mx-auto mb-14 max-w-6xl">
          <p className="eyebrow">Career journey</p>

          <h2 className="section-title">
            Professional{" "}
            <span className="gradient-text">Experience</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
            Practical experience supporting users, business-critical
            terminals, and day-to-day IT operations.
          </p>
        </div>

        <ExperienceTimeline />
      </section>

      {/* =====================================
          SKILLS
      ====================================== */}

      <section
        id="skills"
        className="section-wrap scroll-mt-24 border-y border-white/[.035] bg-white/[.012]"
      >
        <div className="mx-auto max-w-6xl">
          <SkillsShowcase />
        </div>
      </section>

      {/* =====================================
          CONTACT
      ====================================== */}

      <footer
        id="contact"
        className="scroll-mt-24 px-5 pb-10 pt-24 sm:px-8"
      >
        <div className="glass mx-auto max-w-6xl rounded-3xl p-7 sm:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow">Let's connect</p>

              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Building reliable systems,{" "}
                <span className="gradient-text">
                  one step at a time.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-400">
                I'm open to opportunities in IT support, network
                operations, and junior system administration.
              </p>
            </div>

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                profile.email
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              <Mail size={16} />
              Email Me
            </a>
          </div>

          {/* Contact links */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {contactItems.map(
              ({ label, value, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[.08] bg-white/[.025] p-4 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/[.06]"
                >
                  <span className="rounded-xl border border-cyan-300/15 bg-cyan-300/[.07] p-3 text-cyan-200">
                    <Icon size={18} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[.18em] text-slate-500">
                      {label}
                    </span>

                    <span className="mt-1 block truncate text-xs font-medium text-slate-200 group-hover:text-cyan-100">
                      {value}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={14}
                    className="ml-auto shrink-0 text-slate-600 group-hover:text-cyan-200"
                  />
                </a>
              )
            )}
          </div>

          {/* Footer bottom */}
          <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-5 text-xs text-slate-600 sm:flex-row">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Available for opportunities
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
