import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Icon from "./icons.jsx";
import { SectionHeading } from "./ui.jsx";
import { experience } from "../data/cv.js";

function TimelineCard({ item, side }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: side === "left" ? -44 : 44 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="card-blueprint group flex gap-4 rounded p-5 sm:p-6"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded border border-line text-sky transition-all duration-300 group-hover:border-sky/60 group-hover:drop-shadow-[0_0_8px_rgba(98,183,255,0.7)]">
        <Icon name={item.icon} size={30} />
      </span>
      <div className="min-w-0">
        <h3 className="font-semibold leading-snug text-sky">{item.company}</h3>
        <p className="mt-1 text-sm text-muted">
          <span className="text-ice/90">{item.role}</span>
          <span className="mx-2 text-line">|</span>
          <span className="font-mono text-xs tracking-wider">{item.dates}</span>
        </p>
        <ul className="mt-3 space-y-1.5">
          {item.bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-sky/70" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function YearNode({ year }) {
  return (
    <div className="hidden flex-col items-center lg:flex">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="z-10 mt-1 bg-bg px-1 py-0.5 font-mono text-sm font-semibold text-primary"
      >
        {year}
      </motion.span>
      <span className="node-glow relative z-10 mt-2 block h-4 w-4 rounded-full border-2 border-primary bg-bg">
        <span className="absolute inset-1 rounded-full bg-primary" />
      </span>
    </div>
  );
}

export default function ExperienceTimeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading title="Experience Timeline" />

        <div ref={ref} className="relative">
          {/* static guide line + animated progress line */}
          <div className="absolute inset-y-0 left-4 w-px bg-line lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute inset-y-0 left-4 w-px origin-top bg-gradient-to-b from-primary via-sky to-primary shadow-[0_0_12px_rgba(22,139,255,0.7)] lg:left-1/2 lg:-translate-x-1/2"
          />

          <div className="space-y-10 lg:space-y-4">
            {experience.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={item.company}
                  className="relative grid gap-0 pl-12 pt-7 lg:grid-cols-[1fr_6rem_1fr] lg:pl-0 lg:pt-0"
                >
                  {/* mobile node + year */}
                  <span className="node-glow absolute left-4 top-1 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-primary bg-bg lg:hidden" />
                  <span className="absolute left-9 top-0 font-mono text-xs font-semibold text-primary lg:hidden">
                    {item.year}
                  </span>

                  {left ? (
                    <>
                      <TimelineCard item={item} side="left" />
                      <YearNode year={item.year} />
                      <div className="hidden lg:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden lg:block" />
                      <YearNode year={item.year} />
                      <TimelineCard item={item} side="right" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
