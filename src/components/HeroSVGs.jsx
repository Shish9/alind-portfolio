import { motion, useReducedMotion } from "framer-motion";
import { draw } from "./ui.jsx";

/* ----------------------------------------------------------------------------
   Axonometric helpers for the hero tower.
   u = right-back axis, v = left-back axis, F = base front corner.
---------------------------------------------------------------------------- */
const U = [150, -36];
const V = [-120, -30];
const F = [300, 690];
const H = 470; // tower height
const pt = (s, t, dy = 0) => [F[0] + U[0] * s + V[0] * t, F[1] + U[1] * s + V[1] * t - dy];
const P = (s, t, dy = 0) => pt(s, t, dy).map((n) => n.toFixed(1)).join(" ");

const groupFade = (delay, to = 1) => ({
  hidden: { opacity: 0 },
  visible: { opacity: to, transition: { delay, duration: 1.1, ease: "easeOut" } },
});

/* Shared timeline for the looping crane work cycle (trolley out, lower slab,
   place it, hoist back). All synced elements use the same times array. */
const WORK_TIMES = [0, 0.18, 0.2, 0.38, 0.42, 0.58, 0.75, 0.85, 1];
const work = (extra = {}) => ({
  duration: 14,
  repeat: Infinity,
  ease: "easeInOut",
  times: WORK_TIMES,
  delay: 3.2,
  ...extra,
});

/* Glowing wireframe construction scene: main tower + crane + city backdrop. */
export function CityHeroSVG({ className = "" }) {
  const reduce = useReducedMotion();
  const floors = Array.from({ length: 12 }, (_, i) => (i + 1) * 30); // dy below roof zone
  const ring = (dy, close = true) =>
    `M${P(0, 0, dy)} L${P(1, 0, dy)} L${P(1, 1, dy)} L${P(0, 1, dy)}${close ? " Z" : ""}`;

  return (
    <motion.svg
      viewBox="0 0 680 760"
      className={className}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      <defs>
        <filter id="hglow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="hpool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#168BFF" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#168BFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#168BFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hfaceL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#62B7FF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#168BFF" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="hfaceR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#62B7FF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#168BFF" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* ---------- ground glow + iso grid ---------- */}
      <motion.ellipse
        cx="330"
        cy="688"
        rx="295"
        ry="62"
        fill="url(#hpool)"
        variants={groupFade(0.3)}
      />
      <motion.g stroke="#62B7FF" strokeWidth="0.6" variants={groupFade(0.5, 0.16)}>
        {[-1.2, -0.6, 0.7, 1.3, 1.9].map((t) => {
          const p = pt(0, t);
          return (
            <line
              key={`gu${t}`}
              x1={p[0] - 230}
              y1={p[1] + 55}
              x2={p[0] + 230}
              y2={p[1] - 55}
            />
          );
        })}
        {[-1.1, -0.5, 0.6, 1.2].map((s) => {
          const p = pt(s, 0);
          return (
            <line
              key={`gv${s}`}
              x1={p[0] + 195}
              y1={p[1] + 49}
              x2={p[0] - 195}
              y2={p[1] - 49}
            />
          );
        })}
      </motion.g>

      {/* ---------- background city ---------- */}
      <motion.g
        stroke="#62B7FF"
        fill="none"
        strokeWidth="1"
        variants={groupFade(0.9, 0.26)}
        strokeLinecap="round"
      >
        {/* far-left tower */}
        <path d="M36 700V396h72v304" />
        {[420, 450, 480, 510, 540, 570, 600, 630, 660].map((y) => (
          <path key={`b1${y}`} d={`M36 ${y}h72`} strokeWidth="0.6" opacity="0.6" />
        ))}
        <path d="M72 396v-26" />
        {/* small crane far left */}
        <path d="M118 700V302m0 0-8 16m8-16 8 16M118 314h86M118 314h-30M124 302l60 12m-4 0v44" strokeWidth="0.8" />
        {/* slim tower behind main, left */}
        <path d="M134 660V334h54v36" />
        {[356, 386, 416, 446].map((y) => (
          <path key={`b3${y}`} d={`M134 ${y}h54`} strokeWidth="0.6" opacity="0.6" />
        ))}
        {/* mid-right tower behind crane */}
        <path d="M472 660V352h64v300" />
        {[376, 406, 436, 466, 496, 526, 556, 586, 616].map((y) => (
          <path key={`b4${y}`} d={`M472 ${y}h64`} strokeWidth="0.6" opacity="0.6" />
        ))}
        <path d="M504 352v-22" />
        {/* far-right tower */}
        <path d="M600 700V434h62v266" />
        {[458, 488, 518, 548, 578, 608, 638, 668].map((y) => (
          <path key={`b5${y}`} d={`M600 ${y}h62`} strokeWidth="0.6" opacity="0.6" />
        ))}
      </motion.g>

      {/* ---------- main tower: holographic faces rise from the ground ---------- */}
      <g>
        <motion.path
          d={`M${P(0, 0)} L${P(0, 1)} L${P(0, 1, H)} L${P(0, 0, H)} Z`}
          fill="url(#hfaceL)"
          style={{ transformBox: "fill-box", originX: 0.5, originY: 1 }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 2, ease: "easeOut" }}
        />
        <motion.path
          d={`M${P(0, 0)} L${P(1, 0)} L${P(1, 0, H)} L${P(0, 0, H)} Z`}
          fill="url(#hfaceR)"
          style={{ transformBox: "fill-box", originX: 0.5, originY: 1 }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.85, duration: 2, ease: "easeOut" }}
        />
        <motion.path
          d={ring(H)}
          fill="#62B7FF"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
        />
      </g>

      {/* ---------- floor lines: built bottom-to-top with a weld flash ---------- */}
      <g stroke="#8FC4FF" strokeWidth="0.8">
        {floors.map((dy, i) => (
          <motion.path
            key={`fl${dy}`}
            d={`M${P(0, 1, H - 90 - dy)} L${P(0, 0, H - 90 - dy)} L${P(1, 0, H - 90 - dy)}`}
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0.55] }}
            transition={{
              delay: 1 + (floors.length - 1 - i) * 0.13,
              duration: 0.7,
              times: [0, 0.45, 1],
            }}
          />
        ))}
      </g>
      {/* mullions */}
      <motion.g stroke="#62B7FF" strokeWidth="0.6" variants={groupFade(2.5, 0.3)}>
        {[0.25, 0.5, 0.75].map((t) => {
          const b = pt(0, t);
          const tp = pt(0, t, H);
          return <line key={`mv${t}`} x1={b[0]} y1={b[1]} x2={tp[0]} y2={tp[1]} />;
        })}
        {[0.33, 0.66].map((s) => {
          const b = pt(s, 0);
          const tp = pt(s, 0, H);
          return <line key={`mu${s}`} x1={b[0]} y1={b[1]} x2={tp[0]} y2={tp[1]} />;
        })}
      </motion.g>

      {/* ---------- under-construction slabs (dashed) ---------- */}
      <motion.g
        stroke="#9FD0FF"
        strokeWidth="0.9"
        fill="none"
        strokeDasharray="6 5"
        variants={groupFade(2.7, 0.7)}
      >
        <path d={ring(H - 60)} />
        <path d={ring(H - 30)} />
      </motion.g>
      {/* slab-placement flash, synced with the crane dropping its load */}
      {!reduce && (
        <motion.path
          d={ring(H - 30)}
          stroke="#CFE8FF"
          strokeWidth="1.5"
          fill="none"
          filter="url(#hglow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0, 0, 0.9, 0.25, 0, 0, 0] }}
          transition={work()}
        />
      )}

      {/* ---------- bright edges (drawn in) ---------- */}
      <g stroke="#9FD0FF" strokeWidth="1.6" fill="none" strokeLinecap="round" filter="url(#hglow)">
        <motion.path d={`M${P(0, 0)} L${P(0, 0, H)}`} variants={draw} custom={1} />
        <motion.path d={`M${P(0, 1)} L${P(0, 1, H)}`} variants={draw} custom={1.5} strokeWidth="1.2" />
        <motion.path d={`M${P(1, 0)} L${P(1, 0, H)}`} variants={draw} custom={1.5} strokeWidth="1.2" />
        <motion.path d={`M${P(0, 1)} L${P(0, 0)} L${P(1, 0)}`} variants={draw} custom={0.5} />
        <motion.path d={ring(H)} variants={draw} custom={2.2} />
        {/* roof core + antenna */}
        <motion.path
          d="M315 196l30-7-24-6-30 7 24 6Zm0 0v-34l30-7v34m-30-27-24-6v34"
          variants={draw}
          custom={3}
          strokeWidth="1"
        />
        <motion.path d="M318 152V96" variants={draw} custom={3.4} strokeWidth="1.2" />
      </g>

      {/* ---------- holographic scan line sweeping up the tower ---------- */}
      {!reduce && (
        <motion.path
          d={`M${P(0, 1, 20)} L${P(0, 0, 20)} L${P(1, 0, 20)}`}
          fill="none"
          stroke="#CFE8FF"
          strokeWidth="1.2"
          filter="url(#hglow)"
          initial={{ opacity: 0 }}
          animate={{ y: [0, -(H - 130)], opacity: [0, 0.65, 0.65, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 3.5,
            delay: 4,
            ease: "linear",
            opacity: { duration: 5, times: [0, 0.12, 0.88, 1], repeat: Infinity, repeatDelay: 3.5, delay: 4 },
          }}
        />
      )}

      {/* ---------- windows flickering on across the floors ---------- */}
      {!reduce && (
        <g stroke="#9FD0FF" strokeWidth="5" strokeLinecap="butt">
          {[
            [`M${P(0, 0.15, 42)} L${P(0, 0.32, 42)}`],
            [`M${P(0, 0.55, 72)} L${P(0, 0.72, 72)}`],
            [`M${P(0, 0.28, 132)} L${P(0, 0.45, 132)}`],
            [`M${P(0, 0.6, 192)} L${P(0, 0.76, 192)}`],
            [`M${P(0, 0.18, 252)} L${P(0, 0.34, 252)}`],
            [`M${P(0, 0.5, 312)} L${P(0, 0.66, 312)}`],
            [`M${P(0.2, 0, 102)} L${P(0.36, 0, 102)}`],
            [`M${P(0.55, 0, 222)} L${P(0.7, 0, 222)}`],
            [`M${P(0.3, 0, 282)} L${P(0.46, 0, 282)}`],
          ].map(([d], i) => (
            <motion.path
              key={`w${i}`}
              d={d}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.05, 0.4, 0.05] }}
              transition={{
                duration: 2.4 + (i % 3) * 0.8,
                repeat: Infinity,
                repeatDelay: 1.5 + (i % 5) * 1.3,
                delay: 3.5 + i * 0.7,
              }}
            />
          ))}
        </g>
      )}

      {/* ---------- welding sparks at the construction crown ---------- */}
      {!reduce &&
        [pt(0.08, 0, H - 32), pt(0.55, 1, H - 58), pt(0.95, 0, H - 36)].map(([x, y], i) => (
          <motion.circle
            key={`sp${i}`}
            cx={x}
            cy={y}
            r="1.5"
            fill="#E8F4FF"
            filter="url(#hglow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.15, 0.85, 0] }}
            transition={{
              duration: 0.9,
              times: [0, 0.2, 0.5, 0.7, 1],
              repeat: Infinity,
              repeatDelay: 2.8 + i * 1.7,
              delay: 5 + i * 2.1,
            }}
          />
        ))}

      {/* ---------- tower crane ---------- */}
      <g stroke="#7FB8FF" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#hglow)">
        <motion.path d="M538 700h44" variants={draw} custom={2} strokeWidth="1.8" />
        <motion.path d="M552 700V148M568 700V148" variants={draw} custom={2.4} strokeWidth="1.2" />
        {/* mast lattice */}
        <motion.g variants={groupFade(2.9, 0.6)} strokeWidth="0.7">
          {Array.from({ length: 18 }, (_, i) => 700 - i * 30).map((y, i) => (
            <path
              key={`cl${y}`}
              d={i % 2 ? `M552 ${y}L568 ${y - 30}` : `M568 ${y}L552 ${y - 30}`}
            />
          ))}
        </motion.g>
        {/* slewing unit: everything above the mast swings around the tower axis
            (scaleX about x=560 reads as the jib rotating toward the viewer) */}
        <g transform="translate(560 0)">
          <motion.g
            variants={
              reduce
                ? undefined
                : {
                    hidden: { scaleX: 1 },
                    visible: {
                      scaleX: [1, 1, 1, 1, 1, 1, 1, 0.62, 1],
                      transition: work(),
                    },
                  }
            }
          >
            <g transform="translate(-560 0)">
        {/* apex */}
        <motion.path d="M552 148 560 112l8 36" variants={draw} custom={3} strokeWidth="1.2" />
        {/* jib over the roof + counter-jib */}
        <motion.path d="M552 140H300M558 152H306l-6-12" variants={draw} custom={3.2} strokeWidth="1.2" />
        <motion.g variants={groupFade(3.8, 0.6)} strokeWidth="0.7">
          {Array.from({ length: 10 }, (_, i) => 318 + i * 24).map((x) => (
            <path key={`jl${x}`} d={`M${x} 152 L${x + 12} 140 L${x + 24} 152`} />
          ))}
        </motion.g>
        <motion.path d="M568 140h80M568 152h74" variants={draw} custom={3.4} strokeWidth="1.2" />
        <motion.path d="M626 152h24v26h-24z" variants={draw} custom={3.6} strokeWidth="1.1" />
        {/* ties */}
        <motion.path d="M560 116 340 140M560 116l76 24" variants={draw} custom={3.8} strokeWidth="0.8" />
        {/* cab */}
        <motion.path d="M568 156h16v16h-16z" variants={draw} custom={4} strokeWidth="1" />

        {/* working trolley: travels the jib, lowers a slab onto the top floors */}
        {reduce ? (
          <>
            <motion.path d="M380 152h14v7h-14z" variants={draw} custom={4.2} strokeWidth="1" />
            <motion.path d="M387 159v37" variants={draw} custom={4.4} strokeWidth="0.8" strokeDasharray="4 4" />
            <motion.path d="M387 196c-5 2-5 8 0 10 5-2 5-8 0-10Z" variants={draw} custom={4.6} strokeWidth="1" />
          </>
        ) : (
          <motion.g
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: [120, 0, 0, 0, 0, 0, 120, 120, 120], opacity: 1 }}
            transition={{
              x: work(),
              opacity: { delay: 2.2, duration: 0.6 },
            }}
          >
            <path d="M380 152h14v7h-14z" strokeWidth="1" />
            {/* hoist cable: dash-offset extends in step with the hook */}
            <motion.path
              d="M387 159V235"
              strokeWidth="0.8"
              strokeDasharray="76"
              initial={{ strokeDashoffset: 56 }}
              animate={{ strokeDashoffset: [56, 56, 56, 0, 0, 56, 56, 56, 56] }}
              transition={work()}
            />
            <motion.g
              initial={{ y: -56 }}
              animate={{ y: [-56, -56, -56, 0, 0, -56, -56, -56, -56] }}
              transition={work()}
            >
              <path d="M387 235c-5 2-5 8 0 10 5-2 5-8 0-10Z" strokeWidth="1" />
              {/* carried slab: released on placement, picked up again at the mast */}
              <motion.path
                d="M378 248h18v8h-18zM378 252h18"
                strokeWidth="0.9"
                stroke="#CFE8FF"
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 1, 1, 1, 0, 0, 0, 1, 1] }}
                transition={work()}
              />
            </motion.g>
          </motion.g>
        )}
            </g>
          </motion.g>
        </g>

        {/* construction hoist riding the mast */}
        {!reduce && (
          <>
            <motion.path d="M576 700V214" strokeWidth="0.5" opacity="0.35" variants={groupFade(2.4, 0.35)} />
            <motion.g
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: [0, -426, -426, 0, 0], opacity: 0.8 }}
              transition={{
                y: { duration: 17, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.5, 0.9, 1], delay: 4 },
                opacity: { delay: 2.6, duration: 0.6 },
              }}
            >
              <path d="M571 642h10v14h-10zM571 649h10" strokeWidth="0.8" />
            </motion.g>
          </>
        )}
      </g>

      {/* ---------- beacons + corner glow dots ---------- */}
      <motion.circle cx="318" cy="92" r="2.6" fill="#62B7FF" initial={{ opacity: 0 }} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ delay: 3, duration: 2.6, repeat: Infinity }} />
      <motion.circle cx="560" cy="108" r="2.4" fill="#FF5A5A" initial={{ opacity: 0 }} animate={{ opacity: [0.15, 0.9, 0.15] }} transition={{ delay: 3.6, duration: 3, repeat: Infinity }} />
      <motion.g fill="#BFE0FF" variants={groupFade(2.6, 0.95)}>
        {[pt(0, 0, H), pt(1, 0, H), pt(0, 1, H), pt(0, 0, H - 150), pt(0, 0, H - 300), pt(1, 0, H - 210), pt(0, 1, H - 240)].map(
          ([x, y], i) => (
            <circle key={`cd${i}`} cx={x} cy={y} r="2" filter="url(#hglow)" />
          )
        )}
      </motion.g>

      {/* ---------- floating particles ---------- */}
      <motion.g fill="#8FC4FF" variants={groupFade(1.8, 1)}>
        {[
          [60, 120, 1.4, 0.7], [150, 80, 1, 0.5], [230, 60, 1.8, 0.8], [420, 70, 1.2, 0.6],
          [520, 100, 1.6, 0.7], [640, 150, 1, 0.5], [620, 260, 1.4, 0.6], [70, 280, 1.2, 0.5],
          [40, 460, 1.6, 0.6], [660, 420, 1.2, 0.5], [500, 230, 1, 0.7], [200, 160, 1, 0.4],
          [360, 110, 1.2, 0.5], [600, 560, 1.4, 0.5], [30, 600, 1, 0.4], [470, 300, 0.9, 0.5],
        ].map(([x, y, r, o], i) => (
          <circle key={`p${i}`} cx={x} cy={y} r={r} opacity={o} className={i % 3 === 0 ? "bg-dot" : ""} />
        ))}
      </motion.g>
    </motion.svg>
  );
}

/* Faint city skyline used in the footer. */
export function SkylineSVG({ className = "", animated = true, custom0 = 0 }) {
  const d =
    "M0 180 h40 V120 h22 V96 h26 v84 h18 V140 h30 v40 h14 V70 h8 V52 h22 v18 h8 v110 h24 V104 h34 v76 h12 V128 h28 v52 h10 V84 h6 V62 h24 v22 h6 v96 h26 V140 h30 v40 h16 V110 h26 v70 h14 V90 h28 v90 h12 v-44 h26 v44 h30 V120 h24 v60 h36 v-36 h22 v36 h38 V100 h26 v80 h32 v-48 h20 v48 H800";

  return (
    <motion.svg
      viewBox="0 0 800 200"
      preserveAspectRatio="none"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
      aria-hidden="true"
    >
      {animated ? (
        <motion.path
          d={d}
          variants={draw}
          custom={custom0}
          fill="none"
          stroke="#62B7FF"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      ) : (
        <path d={d} fill="none" stroke="#62B7FF" strokeWidth="1.4" strokeLinejoin="round" />
      )}
      {[181, 412, 690].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy={i === 0 ? 48 : i === 1 ? 58 : 96}
          r="2"
          fill="#168BFF"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ delay: 1.5 + i, duration: 3, repeat: Infinity }}
        />
      ))}
    </motion.svg>
  );
}
