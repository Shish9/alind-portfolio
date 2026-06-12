import { motion } from "framer-motion";
import Icon from "./icons.jsx";
import { profile } from "../data/cv.js";
import { CityHeroSVG } from "./HeroSVGs.jsx";

const levels = [
  { label: "TOP LEVEL", value: "+56.40", top: "6%", side: "left" },
  { label: "LEVEL 12", value: "+36.00", top: "26%", side: "right" },
  { label: "LEVEL 04", value: "+12.60", top: "52%", side: "right" },
  { label: "GROUND LEVEL", value: "+0.00", top: "78%", side: "right" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

function MouseIcon() {
  return (
    <svg viewBox="0 0 18 28" width="18" height="28" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="16" height="26" rx="8" stroke="currentColor" strokeWidth="1.4" />
      <motion.line
        x1="9"
        y1="7"
        x2="9"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={{ y: [0, 4, 0], opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-24 pb-10 lg:pt-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 sm:px-10 lg:grid-cols-[1fr_1.05fr]">
        {/* ---------- Left: intro ---------- */}
        <motion.div variants={container} initial="hidden" animate="visible" className="relative z-10">
          <motion.p
            variants={item}
            className="mb-4 font-mono text-sm font-medium tracking-[0.3em] text-primary"
          >
            HELLO, I'M
          </motion.p>

          <motion.h1
            variants={item}
            className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl"
          >
            <span className="text-ice">ALIND</span>
            <br />
            <span className="text-primary drop-shadow-[0_0_18px_rgba(22,139,255,0.45)]">
              SALAHALDIN
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-base text-ice/90 sm:text-lg">
            {profile.title}
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl leading-relaxed text-muted">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#experience"
              className="btn-glow group flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-sky hover:text-bg"
            >
              VIEW EXPERIENCE
              <Icon
                name="arrow-right"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              className="btn-glow rounded border border-line px-6 py-3 text-sm font-semibold tracking-wide text-ice transition-all duration-300 hover:border-sky/70 hover:text-sky"
            >
              CONTACT ME
            </a>
            <a
              href={profile.cvFile}
              download
              aria-label="Download CV"
              title="Download CV"
              className="btn-glow rounded border border-line p-3 text-sky transition-all duration-300 hover:border-sky/70 hover:text-ice"
            >
              <Icon name="download" size={18} />
            </a>
          </motion.div>

          {/* scroll-down indicator */}
          <motion.a
            variants={item}
            href="#about"
            className="mt-14 inline-flex items-center gap-3 text-muted transition-colors hover:text-sky"
          >
            <MouseIcon />
            <span className="font-mono text-[11px] tracking-[0.3em]">SCROLL DOWN</span>
          </motion.a>
          <motion.div variants={item} className="mt-3 ml-[7px] flex flex-col gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1 w-1 rounded-full bg-sky/50" style={{ opacity: 1 - i * 0.3 }} />
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- Right: glowing wireframe city ---------- */}
        <div className="relative h-[460px] sm:h-[560px] lg:h-[660px]">
          {/* soft glow behind the scene */}
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

          <motion.div
            className="absolute inset-0"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <CityHeroSVG className="h-full w-full" />
          </motion.div>

          {/* measurement labels */}
          {levels.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, x: l.side === "left" ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 + i * 0.25, duration: 0.6 }}
              className={`pointer-events-none absolute flex items-center gap-2 ${
                l.side === "left" ? "left-0 w-[34%]" : "right-0 w-[26%] sm:w-[24%]"
              }`}
              style={{ top: l.top }}
            >
              {l.side === "right" && (
                <>
                  <span className="h-px flex-1 border-t border-dashed border-sky/40" />
                  <span className="h-1.5 w-1.5 rotate-45 border border-sky/70 bg-bg" />
                </>
              )}
              <span
                className={`font-mono text-[10px] leading-tight text-sky/90 sm:text-[11px] ${
                  l.side === "left" ? "" : "text-left"
                }`}
              >
                {l.label}
                <span className="block text-muted">{l.value}</span>
              </span>
              {l.side === "left" && (
                <>
                  <span className="h-1.5 w-1.5 rotate-45 border border-sky/70 bg-bg" />
                  <span className="h-px flex-1 border-t border-dashed border-sky/40" />
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* slider dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2"
        aria-hidden="true"
      >
        <span className="h-1.5 w-6 rounded-full bg-primary shadow-[0_0_8px_rgba(22,139,255,0.8)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-sky/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-sky/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-sky/30" />
      </motion.div>
    </section>
  );
}
