import { motion } from "framer-motion";
import { SectionHeading, ProgressRing, draw, fadeUp } from "./ui.jsx";
import { education, languages } from "../data/cv.js";

const groupFade = (delay, to = 1) => ({
  hidden: { opacity: 0 },
  visible: { opacity: to, transition: { delay, duration: 1, ease: "easeOut" } },
});

/* Wireframe graduation cap. */
function GradCapSVG({ className = "" }) {
  return (
    <motion.svg
      viewBox="0 0 220 170"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      aria-hidden="true"
    >
      <defs>
        <filter id="gglow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" stroke="#8FC4FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" filter="url(#gglow)">
        {/* mortarboard */}
        <motion.path d="M110 28 194 60l-84 32-84-32 84-32Z" variants={draw} custom={0.3} strokeWidth="1.5" />
        <motion.path d="M110 40 162 60l-52 20-52-20 52-20Z" variants={draw} custom={0.8} strokeWidth="0.7" opacity="0.5" />
        {/* board underside */}
        <motion.path d="M46 70v12l64 24 64-24V70" variants={draw} custom={1.1} strokeWidth="0.9" opacity="0.8" />
        {/* head band */}
        <motion.path d="M74 96v22c0 9 16 16 36 16s36-7 36-16V96" variants={draw} custom={1.4} />
        <motion.path d="M74 118c8 7 21 10 36 10s28-3 36-10" variants={draw} custom={1.7} strokeWidth="0.7" opacity="0.6" />
        {/* tassel */}
        <motion.path d="M110 60h58v52" variants={draw} custom={2} strokeWidth="1" />
        <motion.circle cx="168" cy="118" r="4" variants={draw} custom={2.4} strokeWidth="1" />
        <motion.path d="M165 122l-2 8m5-8 2 8m-3-8v9" variants={draw} custom={2.6} strokeWidth="0.7" />
        <motion.circle cx="110" cy="60" r="2" variants={draw} custom={2.2} />
      </g>
      <motion.g fill="#BFE0FF" variants={groupFade(2.4, 0.9)}>
        {[[30, 36], [196, 30], [206, 96], [16, 102], [110, 12]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 1.2 : 1.7} opacity="0.7" className={i % 2 === 0 ? "bg-dot" : ""} />
        ))}
      </motion.g>
    </motion.svg>
  );
}

export default function EducationLanguages() {
  return (
    <section className="border-y border-line bg-section/60 py-24">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        {/* ---------- Education ---------- */}
        <div id="education" className="grid gap-8 sm:grid-cols-[200px_1fr] sm:items-center">
          <div className="relative mx-auto w-44 sm:w-full">
            <div className="absolute left-1/2 top-1/2 h-32 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-2xl" />
            <GradCapSVG className="relative h-auto w-full" />
          </div>

          <div>
            <SectionHeading title="Education" className="mb-8" />
            <div className="relative">
              <div className="absolute inset-y-2 left-[5px] w-px bg-gradient-to-b from-primary/70 via-line to-transparent" />
              <div className="space-y-8">
                {education.map((e, i) => (
                  <motion.div
                    key={e.school}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-12%" }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    className="relative pl-8"
                  >
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-12%" }}
                      transition={{ duration: 0.45, delay: 0.2 + i * 0.15 }}
                      className="node-glow absolute left-0 top-1.5 block h-3 w-3 rounded-full border-2 border-primary bg-bg"
                    />
                    <p className="font-mono text-xs tracking-wider text-primary">{e.dates}</p>
                    <h3 className="mt-1 text-lg font-semibold text-ice">{e.school}</h3>
                    <p className="mt-0.5 text-sm text-muted">{e.detail}</p>
                    {e.degree && <p className="mt-0.5 text-sm font-medium text-sky">{e.degree}</p>}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Languages ---------- */}
        <div id="languages">
          <SectionHeading title="Languages" className="mb-8" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {languages.map((l, i) => (
              <motion.div
                key={l.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-8%" }}
                custom={i}
                className="flex justify-center"
              >
                <ProgressRing pct={l.pct} size={104} label={l.name} sub={l.level} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
