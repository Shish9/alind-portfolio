import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const crosshairs = [
  { x: "12%", y: "18%" },
  { x: "78%", y: "10%" },
  { x: "88%", y: "46%" },
  { x: "8%", y: "62%" },
  { x: "52%", y: "84%" },
  { x: "30%", y: "38%" },
  { x: "68%", y: "70%" },
];

const dots = [
  { x: "22%", y: "28%", d: "0s" },
  { x: "84%", y: "22%", d: "1.2s" },
  { x: "64%", y: "8%", d: "2.1s" },
  { x: "14%", y: "82%", d: "0.6s" },
  { x: "92%", y: "72%", d: "1.7s" },
  { x: "40%", y: "60%", d: "2.6s" },
  { x: "74%", y: "90%", d: "0.9s" },
];

export default function BlueprintBackground() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 40, damping: 20 });
  const y = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e) => {
      // Subtle parallax: at most ~10px of travel.
      mx.set((e.clientX / window.innerWidth - 0.5) * -20);
      my.set((e.clientY / window.innerHeight - 0.5) * -14);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg" aria-hidden="true">
      <motion.div style={{ x, y }} className="absolute -inset-8">
        {/* drifting grid */}
        <div className="blueprint-grid absolute inset-0" />

        {/* faint long construction lines */}
        <div className="absolute left-0 right-0 top-[24%] h-px bg-gradient-to-r from-transparent via-sky/15 to-transparent" />
        <div className="absolute left-0 right-0 top-[76%] h-px bg-gradient-to-r from-transparent via-sky/10 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[18%] w-px bg-gradient-to-b from-transparent via-sky/10 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[82%] w-px bg-gradient-to-b from-transparent via-sky/15 to-transparent" />

        {/* crosshair markers */}
        {crosshairs.map((c, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="absolute opacity-30"
            style={{ left: c.x, top: c.y }}
          >
            <path d="M12 4v16M4 12h16" stroke="#62B7FF" strokeWidth="0.8" />
            <circle cx="12" cy="12" r="4" fill="none" stroke="#62B7FF" strokeWidth="0.8" />
          </svg>
        ))}

        {/* tiny glowing dots */}
        {dots.map((p, i) => (
          <span
            key={i}
            className="bg-dot absolute h-1 w-1 rounded-full bg-sky"
            style={{
              left: p.x,
              top: p.y,
              animationDelay: p.d,
              boxShadow: "0 0 8px 2px rgba(98,183,255,0.45)",
            }}
          />
        ))}
      </motion.div>

      {/* vignette to keep edges dark and content readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,17,31,0.85)_100%)]" />
    </div>
  );
}
