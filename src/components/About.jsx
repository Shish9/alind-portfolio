import { motion } from "framer-motion";
import Icon from "./icons.jsx";
import { SectionHeading, draw, fadeUp } from "./ui.jsx";
import { profile, stats } from "../data/cv.js";

/* Axonometric helpers for the villa drawing. */
const U = [110, -26];
const V = [-85, -20];
const F = [250, 310];
const p = (s, t, h = 0) =>
  `${(F[0] + U[0] * s + V[0] * t).toFixed(1)} ${(F[1] + U[1] * s + V[1] * t - h).toFixed(1)}`;

const groupFade = (delay, to = 1) => ({
  hidden: { opacity: 0 },
  visible: { opacity: to, transition: { delay, duration: 1, ease: "easeOut" } },
});

/* Glowing wireframe luxury villa with trees. */
function VillaSVG() {
  return (
    <motion.svg
      viewBox="0 0 520 370"
      className="h-auto w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      aria-hidden="true"
    >
      <defs>
        <filter id="vglow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="vpool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#168BFF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#168BFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#62B7FF" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#168BFF" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* ground glow + hints of grid */}
      <motion.ellipse cx="270" cy="318" rx="245" ry="48" fill="url(#vpool)" variants={groupFade(0.2)} />
      <motion.g stroke="#62B7FF" strokeWidth="0.6" variants={groupFade(0.4, 0.18)}>
        <line x1="40" y1="352" x2="500" y2="244" />
        <line x1="20" y1="316" x2="420" y2="222" />
        <line x1="150" y1="364" x2="498" y2="282" />
      </motion.g>

      {/* face fills */}
      <motion.g variants={groupFade(0.6)}>
        <path d={`M${p(0, 0)} L${p(0, 1)} L${p(0, 1, 130)} L${p(0, 0, 130)} Z`} fill="url(#vface)" />
        <path d={`M${p(0, 0)} L${p(1, 0)} L${p(1, 0, 130)} L${p(0, 0, 130)} Z`} fill="url(#vface)" opacity="0.6" />
      </motion.g>

      <g fill="none" stroke="#8FC4FF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" filter="url(#vglow)">
        {/* main volume edges */}
        <motion.path d={`M${p(0, 1)} L${p(0, 0)} L${p(1, 0)}`} variants={draw} custom={0.4} strokeWidth="1.4" />
        <motion.path d={`M${p(0, 0)} L${p(0, 0, 130)}`} variants={draw} custom={0.8} strokeWidth="1.4" />
        <motion.path d={`M${p(0, 1)} L${p(0, 1, 130)}M${p(1, 0)} L${p(1, 0, 130)}`} variants={draw} custom={1} />
        {/* flat roof: double slab */}
        <motion.path d={`M${p(0, 0, 130)} L${p(1, 0, 130)} L${p(1, 1, 130)} L${p(0, 1, 130)} Z`} variants={draw} custom={1.3} strokeWidth="1.3" />
        <motion.path d={`M${p(0, 0, 138)} L${p(1, 0, 138)} L${p(1, 1, 138)} L${p(0, 1, 138)} Z`} variants={draw} custom={1.5} strokeWidth="0.9" />
        <motion.path d={`M${p(0, 0, 130)} L${p(0, 0, 138)}M${p(1, 0, 130)} L${p(1, 0, 138)}M${p(0, 1, 130)} L${p(0, 1, 138)}`} variants={draw} custom={1.6} strokeWidth="0.8" />
        {/* mid floor lines */}
        <motion.path d={`M${p(0, 1, 65)} L${p(0, 0, 65)} L${p(1, 0, 65)}`} variants={draw} custom={1.8} strokeWidth="0.8" opacity="0.7" />

        {/* upper glass band — left face */}
        <motion.path d={`M${p(0, 0.12, 75)} L${p(0, 0.88, 75)} L${p(0, 0.88, 118)} L${p(0, 0.12, 118)} Z`} variants={draw} custom={2} strokeWidth="0.9" />
        <motion.path d={`M${p(0, 0.31, 75)} L${p(0, 0.31, 118)}M${p(0, 0.5, 75)} L${p(0, 0.5, 118)}M${p(0, 0.69, 75)} L${p(0, 0.69, 118)}`} variants={draw} custom={2.2} strokeWidth="0.6" opacity="0.7" />
        {/* upper band — right face */}
        <motion.path d={`M${p(0.15, 0, 75)} L${p(0.85, 0, 75)} L${p(0.85, 0, 118)} L${p(0.15, 0, 118)} Z`} variants={draw} custom={2.3} strokeWidth="0.9" opacity="0.8" />
        <motion.path d={`M${p(0.4, 0, 75)} L${p(0.4, 0, 118)}M${p(0.62, 0, 75)} L${p(0.62, 0, 118)}`} variants={draw} custom={2.4} strokeWidth="0.6" opacity="0.6" />
        {/* door + lower window — left face */}
        <motion.path d={`M${p(0, 0.2)} L${p(0, 0.2, 52)} L${p(0, 0.38, 52)} L${p(0, 0.38)}`} variants={draw} custom={2.6} strokeWidth="0.9" />
        <motion.path d={`M${p(0, 0.5, 14)} L${p(0, 0.85, 14)} L${p(0, 0.85, 48)} L${p(0, 0.5, 48)} Z`} variants={draw} custom={2.7} strokeWidth="0.9" />
        {/* lower window — right face */}
        <motion.path d={`M${p(0.2, 0, 14)} L${p(0.8, 0, 14)} L${p(0.8, 0, 48)} L${p(0.2, 0, 48)} Z`} variants={draw} custom={2.8} strokeWidth="0.9" opacity="0.8" />
        <motion.path d={`M${p(0.5, 0, 14)} L${p(0.5, 0, 48)}`} variants={draw} custom={2.9} strokeWidth="0.6" opacity="0.6" />

        {/* single-storey wing */}
        <motion.path d={`M${p(1, 0)} L${p(1.55, 0)} L${p(1.55, 0, 52)} L${p(1, 0, 52)}`} variants={draw} custom={3.1} />
        <motion.path d={`M${p(1, 0, 52)} L${p(1.55, 0, 52)} L${p(1.55, 0.5, 52)} L${p(1, 0.5, 52)}`} variants={draw} custom={3.3} strokeWidth="0.9" />
        <motion.path d={`M${p(1, 0, 58)} L${p(1.55, 0, 58)} L${p(1.55, 0.5, 58)}`} variants={draw} custom={3.4} strokeWidth="0.8" />
        <motion.path d={`M${p(1.55, 0)} L${p(1.55, 0.5)} M${p(1.55, 0.5)} L${p(1.55, 0.5, 58)}`} variants={draw} custom={3.5} strokeWidth="0.8" opacity="0.7" />
        <motion.path d={`M${p(1.08, 0, 12)} L${p(1.45, 0, 12)} L${p(1.45, 0, 42)} L${p(1.08, 0, 42)} Z M${p(1.27, 0, 12)} L${p(1.27, 0, 42)}`} variants={draw} custom={3.6} strokeWidth="0.7" opacity="0.8" />

        {/* terrace deck in front */}
        <motion.path d={`M235 334 L${p(0.75, -0.18)} L${p(0.75, -0.62)} L${p(0, -0.62)}`} variants={draw} custom={3.8} strokeWidth="0.8" opacity="0.6" />
        <motion.path d="M252 339l78-18M244 330l78-18" variants={draw} custom={4} strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* trees */}
      <motion.g fill="none" stroke="#62B7FF" strokeWidth="1" strokeLinecap="round" variants={groupFade(2.2, 0.65)} filter="url(#vglow)">
        <path d="M96 322v-44" />
        <circle cx="96" cy="262" r="17" />
        <circle cx="84" cy="272" r="10" />
        <circle cx="109" cy="270" r="11" />
        <path d="M468 296v-40" />
        <circle cx="468" cy="242" r="14" />
        <circle cx="457" cy="251" r="8" />
        <circle cx="479" cy="250" r="9" />
        <path d="M428 304v-16" strokeWidth="0.8" />
        <circle cx="428" cy="282" r="8" strokeWidth="0.8" />
      </motion.g>

      {/* sparkle dots */}
      <motion.g fill="#BFE0FF" variants={groupFade(2.6, 0.9)}>
        {[[250, 168], [360, 146], [165, 152], [60, 200], [500, 180], [430, 120], [140, 90], [330, 70]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 1.2 : 1.8} opacity={0.7} className={i % 3 === 0 ? "bg-dot" : ""} />
        ))}
      </motion.g>
    </motion.svg>
  );
}

export default function About() {
  return (
    <section id="about" className="border-y border-line bg-section/60 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading title="About Me" />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            custom={1}
            className="leading-relaxed text-muted"
          >
            {profile.about}
          </motion.p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                custom={i + 1}
                className="card-blueprint group flex flex-col items-center gap-2 rounded px-3 py-5 text-center"
              >
                <span className="text-sky transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(22,139,255,0.8)]">
                  <Icon name={s.icon} size={26} />
                </span>
                <p className="text-xl font-bold leading-none text-ice">{s.value}</p>
                <p className="text-xs leading-snug text-muted">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-1/2 h-56 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <VillaSVG />
        </div>
      </div>
    </section>
  );
}
