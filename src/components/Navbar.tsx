
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "About Me", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["home", "experience", "skills", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Keep the clicked section active during smooth scrolling.
  const pendingTarget = useRef<string | null>(null);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const activationPoint = 160;

    const updateActiveSection = () => {
      setScrolled(window.scrollY > 30);

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (atBottom) {
        pendingTarget.current = null;
        setActive("contact");
        return;
      }

      // Wait until the clicked section reaches the activation line.
      if (pendingTarget.current) {
        const target = document.getElementById(
          pendingTarget.current
        );

        if (target) {
          const rect = target.getBoundingClientRect();

          if (
            rect.top <= activationPoint &&
            rect.bottom > activationPoint
          ) {
            pendingTarget.current = null;
          } else {
            return;
          }
        } else {
          pendingTarget.current = null;
        }
      }

      // Find the last section whose top has passed the activation line.
      let currentSection = "home";

      for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= activationPoint) {
          currentSection = id;
        }
      }

      setActive(currentSection);
    };

    const handleScroll = () => {
      if (animationFrame.current !== null) return;

      animationFrame.current = window.requestAnimationFrame(() => {
        updateActiveSection();
        animationFrame.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const navigateTo = (href: string) => {
    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);

    if (!section) return;

    pendingTarget.current = sectionId;
    setActive(sectionId);
    setMenuOpen(false);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-5 sm:px-6"
    >
      <motion.nav
        animate={{ maxWidth: scrolled ? 900 : 1100 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="mx-auto"
      >
        <div
          className={`
            flex items-center justify-between
            rounded-2xl border px-5 py-3
            backdrop-blur-2xl transition-all duration-300
            ${
              scrolled
                ? "border-cyan-400/20 bg-[#070b14]/90 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                : "border-white/10 bg-[#0b1423]/65"
            }
          `}
        >
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateTo("#home")}
            className="flex items-center gap-2"
          >
            <span className="text-xl font-black tracking-wider text-white">
              PORTFOLIO<span className="text-cyan-400"></span>
            </span>

            {/* <span className="hidden text-[10px] font-medium tracking-[0.2em] text-slate-500 sm:block">
              IT PORTFOLIO
            </span> */}
          </motion.button>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = active === sectionId;

              return (
                <motion.button
                  key={link.label}
                  onClick={() => navigateTo(link.href)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-current={isActive ? "location" : undefined}
                  className={`
                    relative isolate rounded-xl px-4 py-2.5
                    text-sm font-medium transition-colors duration-300
                    ${
                      isActive
                        ? "text-cyan-300"
                        : "text-slate-400 hover:text-white"
                    }
                  `}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute inset-0 z-0 rounded-xl border border-cyan-400/30 bg-cyan-400/15 shadow-[0_0_22px_rgba(34,211,238,0.2)]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">
                    {link.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Let's Talk */}
          <motion.button
            onClick={() => navigateTo("#contact")}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(34,211,238,0.25)",
            }}
            whileTap={{ scale: 0.95 }}
            className="hidden items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-400/20 md:flex"
          >
            Let's Talk
            <ArrowUpRight size={16} />
          </motion.button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white transition hover:border-cyan-400/40 hover:text-cyan-300 md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {menuOpen ? <X size={21} /> : <Menu size={21} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1423]/95 p-3 shadow-2xl backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = active === sectionId;

                  return (
                    <motion.button
                      key={link.label}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => navigateTo(link.href)}
                      className={`
                        flex items-center justify-between rounded-xl
                        px-4 py-3 text-left text-sm font-medium
                        transition-colors
                        ${
                          isActive
                            ? "bg-cyan-400/15 text-cyan-300"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }
                      `}
                    >
                      {link.label}

                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-3 border-t border-white/10 pt-3">
                <button
                  onClick={() => navigateTo("#contact")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Let's Talk
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}
