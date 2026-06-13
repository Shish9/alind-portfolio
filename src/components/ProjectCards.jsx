import { motion } from "framer-motion";
import Icon from "./icons.jsx";
import { SectionHeading, draw } from "./ui.jsx";
import { projects } from "../data/cv.js";

const g = {
  fill: "none",
  stroke: "#62B7FF",
  strokeWidth: 1.3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function VillaDrawing() {
  return (
    <g {...g}>
      <motion.path d="M16 150h208" variants={draw} custom={0} strokeWidth="1.8" />
      <motion.path d="M40 150V80h78v70" variants={draw} custom={1} />
      <motion.path d="M32 80h94M32 72h94M32 72v8M126 72v8" variants={draw} custom={2} />
      <motion.path d="M52 150v-28h22v28" variants={draw} custom={3} strokeWidth="0.9" />
      <motion.path d="M86 104h28v20H86zM100 104v20" variants={draw} custom={3.4} strokeWidth="0.9" />
      <motion.path d="M118 150v-44h62v44" variants={draw} custom={4} />
      <motion.path d="M112 106h74M112 99h74" variants={draw} custom={4.5} strokeWidth="0.9" />
      <motion.path d="M132 122h34v16h-34zM149 122v16" variants={draw} custom={5} strokeWidth="0.9" />
      <motion.path d="M186 150v-32h28v32M186 126h28" variants={draw} custom={5.5} strokeWidth="0.8" opacity="0.7" />
      <motion.path d="M196 118v32M206 118v32" variants={draw} custom={6} strokeWidth="0.6" opacity="0.55" />
    </g>
  );
}

function TowerDrawing() {
  return (
    <g {...g}>
      <motion.path d="M16 150h208" variants={draw} custom={0} strokeWidth="1.8" />
      {/* twin towers */}
      <motion.path d="M58 150V34h46v116" variants={draw} custom={1} strokeWidth="1.6" />
      <motion.path d="M136 150V44h46v106" variants={draw} custom={1.4} strokeWidth="1.6" />
      {/* construction crowns */}
      <motion.path d="M66 34V22h30v12" variants={draw} custom={2} strokeDasharray="5 4" />
      <motion.path d="M144 44V32h30v12" variants={draw} custom={2.2} strokeDasharray="5 4" />
      <motion.path d="M81 22V10M159 32V20" variants={draw} custom={2.5} />
      {/* floor lines */}
      {[48, 62, 76, 90, 104, 118, 132].map((y, i) => (
        <motion.path key={y} d={`M58 ${y}h46`} variants={draw} custom={3 + i * 0.12} strokeWidth="0.8" opacity="0.55" />
      ))}
      {[58, 72, 86, 100, 114, 128, 142].map((y, i) => (
        <motion.path key={y} d={`M136 ${y}h46`} variants={draw} custom={3.2 + i * 0.12} strokeWidth="0.8" opacity="0.55" />
      ))}
      {/* mullions */}
      <motion.path d="M73 34v116M89 34v116M151 44v106M167 44v106" variants={draw} custom={4} strokeWidth="0.7" opacity="0.4" />
      {/* sky bridge */}
      <motion.path d="M104 70h32M104 80h32M112 70v10M126 70v10" variants={draw} custom={4.6} strokeWidth="0.9" />
      {/* podium wings */}
      <motion.path d="M30 150v-26h28M210 150v-26h-28" variants={draw} custom={5} opacity="0.7" />
      {/* beacons */}
      <motion.circle cx="81" cy="8" r="2" fill="#168BFF" stroke="none" variants={draw} custom={6} />
      <motion.circle cx="159" cy="18" r="2" fill="#168BFF" stroke="none" variants={draw} custom={6.2} />
    </g>
  );
}

const drawings = {
  villa: VillaDrawing,
  tower: TowerDrawing,
};

export default function ProjectCards() {
  return (
    <section id="projects" className="border-y border-line bg-section/60 py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          title="Featured Projects"
          lead="Selected works — from luxury villas to high-rise towers, drawn straight from the site."
        />

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {projects.map((p, i) => {
            const Drawing = drawings[p.drawing];
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                className="card-blueprint group flex flex-col rounded transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* drawing plate */}
                <div className="relative border-b border-line">
                  <motion.svg
                    viewBox="0 0 240 168"
                    className="h-44 w-full opacity-85 transition-all duration-300 [filter:drop-shadow(0_0_5px_rgba(98,183,255,0.3))] group-hover:opacity-100 group-hover:[filter:drop-shadow(0_0_10px_rgba(98,183,255,0.55))]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    aria-hidden="true"
                  >
                    <Drawing />
                  </motion.svg>
                  <span className="absolute right-3 top-3 font-mono text-[10px] tracking-wider text-muted">
                    {p.code}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-ice">{p.title}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-primary">
                    {p.subtitle}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                  <a
                    href="#experience"
                    className="group/btn mt-5 inline-flex w-fit items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky transition-colors hover:text-ice"
                  >
                    View Details
                    <Icon
                      name="arrow-right"
                      size={15}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
