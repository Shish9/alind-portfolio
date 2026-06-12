import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

// Shared variants for SVG line-drawing. Pass an index via `custom` to stagger.
export const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.1, duration: 1.4, ease: "easeInOut" },
      opacity: { delay: i * 0.1, duration: 0.3 },
    },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export function SectionHeading({ title, lead, className = "" }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={fadeUp}
      className={`mb-10 ${className}`}
    >
      <div className="flex items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.18em] text-sky">
          {title}
        </h2>
        <span className="h-0.5 w-8 bg-primary" />
        <span className="h-0.5 w-3 bg-primary/50" />
      </div>
      {lead && <p className="mt-4 max-w-2xl text-muted leading-relaxed">{lead}</p>}
    </motion.div>
  );
}

export function CrosshairMark({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="6" fill="none" stroke="rgba(98,183,255,0.5)" strokeWidth="1" />
      <path d="M10 0v6M10 14v6M0 10h6M14 10h6" stroke="rgba(98,183,255,0.5)" strokeWidth="1" />
    </svg>
  );
}

// Circular animated progress ring with counting percentage.
export function ProgressRing({ pct, size = 132, label, sub, icon }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, pct, { duration: 1.6, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, pct, count]);

  const stroke = 5;
  const r = (size - stroke) / 2 - 4;
  const c = 2 * Math.PI * r;

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(98,183,255,0.15)"
            strokeWidth={stroke}
          />
          {/* faint tick marks around the ring */}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const r1 = r + 6;
            const r2 = r + 9;
            return (
              <line
                key={i}
                x1={size / 2 + r1 * Math.cos(a)}
                y1={size / 2 + r1 * Math.sin(a)}
                x2={size / 2 + r2 * Math.cos(a)}
                y2={size / 2 + r2 * Math.sin(a)}
                stroke="rgba(98,183,255,0.2)"
                strokeWidth="1"
              />
            );
          })}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#ring-grad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={inView ? { strokeDashoffset: c * (1 - pct / 100) } : {}}
            transition={{ duration: 1.6, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 6px rgba(22,139,255,0.55))" }}
          />
          <defs>
            <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#168BFF" />
              <stop offset="100%" stopColor="#62B7FF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          {icon}
          <motion.span className="font-mono text-lg text-ice">{rounded}</motion.span>
        </div>
      </div>
      {label && <p className="mt-3 text-sm font-medium text-ice max-w-[10rem]">{label}</p>}
      {sub && <p className="mt-1 font-mono text-xs text-muted uppercase tracking-wider">{sub}</p>}
    </div>
  );
}
