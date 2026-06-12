import { motion } from "framer-motion";
import Icon from "./icons.jsx";
import { SectionHeading, ProgressRing, fadeUp } from "./ui.jsx";
import { skills } from "../data/cv.js";

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading title="Professional Skills" />

        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 xl:grid-cols-6">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8%" }}
              custom={i % 6}
              className="group flex flex-col items-center text-center"
            >
              <span className="text-sky transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(22,139,255,0.8)]">
                <Icon name={s.icon} size={34} />
              </span>
              <p className="mt-3 mb-4 min-h-[2.5rem] text-sm font-medium leading-snug text-ice">
                {s.name}
              </p>
              <ProgressRing pct={s.pct} size={104} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
