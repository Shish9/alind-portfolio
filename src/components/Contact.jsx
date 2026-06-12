import { motion } from "framer-motion";
import Icon from "./icons.jsx";
import { fadeUp } from "./ui.jsx";
import { SkylineSVG } from "./HeroSVGs.jsx";
import { profile } from "../data/cv.js";

const details = [
  { icon: "pin", value: profile.location, href: null },
  { icon: "phone", value: profile.phone, href: profile.phoneHref },
  { icon: "mail", value: profile.email, href: `mailto:${profile.email}` },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line pt-16">
      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-5%" }}
              className="max-w-xl text-2xl font-bold uppercase leading-snug tracking-[0.08em] text-sky sm:text-3xl"
            >
              Let's Build Something Great Together
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-5%" }}
              custom={1}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8"
            >
              {details.map((d) => {
                const Tag = d.href ? "a" : "div";
                return (
                  <Tag
                    key={d.icon}
                    {...(d.href ? { href: d.href } : {})}
                    className={`group flex items-center gap-3 text-sm text-muted ${
                      d.href ? "transition-colors hover:text-sky" : ""
                    }`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded border border-line text-sky transition-all duration-300 group-hover:border-sky/60 group-hover:drop-shadow-[0_0_8px_rgba(98,183,255,0.7)]">
                      <Icon name={d.icon} size={17} />
                    </span>
                    <span className="text-ice/90">{d.value}</span>
                  </Tag>
                );
              })}
            </motion.div>
          </div>

          {/* back to top */}
          <motion.a
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
            custom={2}
            href="#home"
            aria-label="Back to top"
            className="btn-glow flex h-11 w-11 items-center justify-center rounded bg-primary text-white transition-all duration-300 hover:bg-sky hover:text-bg"
          >
            <Icon name="arrow-right" size={18} className="-rotate-90" />
          </motion.a>
        </div>
      </div>

      {/* skyline draws itself from left to right */}
      <div className="relative mt-12">
        <SkylineSVG className="block h-24 w-full opacity-50 sm:h-32" custom0={0} />
        <div className="absolute inset-x-0 bottom-0 h-px bg-line" />
      </div>

      <footer className="bg-bg/80 py-5">
        <p className="text-center font-mono text-xs text-muted">
          © 2026 Alind Salahaldin. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
