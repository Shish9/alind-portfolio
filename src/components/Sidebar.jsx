import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./icons.jsx";
import { navItems, profile } from "../data/cv.js";

function Monogram({ size = 56 }) {
  return (
    <svg viewBox="0 0 56 56" width={size} height={size} aria-hidden="true">
      {/* drafting guide lines */}
      <path d="M4 46h48M10 4v48M46 4v48" stroke="rgba(98,183,255,0.18)" strokeWidth="0.8" />
      <path
        d="M14 46 28 9l14 37"
        fill="none"
        stroke="#F5F9FF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18.5 34h19" stroke="#62B7FF" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M18.5 31.5v5M37.5 31.5v5" stroke="#62B7FF" strokeWidth="1" strokeLinecap="round" />
      <circle cx="28" cy="9" r="1.6" fill="#168BFF" />
    </svg>
  );
}

function NavLink({ item, active, onClick }) {
  const isActive = active === item.id;
  return (
    <a
      href={`#${item.id}`}
      onClick={onClick}
      aria-current={isActive ? "true" : undefined}
      className={`group relative flex w-full items-center gap-3 px-4 py-3 transition-colors duration-300 ${
        isActive ? "bg-primary/10 text-ice" : "text-muted hover:text-sky"
      }`}
    >
      <span
        className={`absolute left-0 top-1/2 h-full w-0.5 -translate-y-1/2 bg-primary transition-opacity duration-300 ${
          isActive ? "opacity-100 shadow-[0_0_10px_rgba(22,139,255,0.9)]" : "opacity-0"
        }`}
      />
      <span
        className={`transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(98,183,255,0.8)] ${
          isActive ? "text-primary drop-shadow-[0_0_8px_rgba(22,139,255,0.9)]" : ""
        }`}
      >
        <Icon name={item.icon} size={18} />
      </span>
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
        {item.label}
      </span>
    </a>
  );
}

export default function Sidebar({ active }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ------- Desktop fixed sidebar ------- */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed inset-y-0 left-0 z-40 hidden w-[150px] flex-col border-r border-line bg-section/70 backdrop-blur-md lg:flex"
      >
        <a
          href="#home"
          aria-label="Back to top"
          className="flex justify-center border-b border-line py-6"
        >
          <Monogram />
        </a>

        <nav className="mt-6 flex w-full flex-col">
          {navItems.map((item) => (
            <NavLink key={item.id} item={item} active={active} />
          ))}
        </nav>

        <a
          href={profile.cvFile}
          download
          className="btn-glow mx-3 mt-6 flex items-center justify-center gap-2 rounded border border-line px-2 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-sky transition-all duration-300 hover:border-sky/60 hover:text-ice"
        >
          Download CV
          <Icon name="download" size={14} />
        </a>
      </motion.aside>

      {/* ------- Mobile top bar ------- */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-line bg-bg/90 px-4 py-3 backdrop-blur-md lg:hidden">
        <a href="#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Monogram size={38} />
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide text-ice">ALIND SALAHALDIN</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Site Engineer
            </p>
          </div>
        </a>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="rounded border border-line p-2 text-sky transition-colors hover:text-ice"
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[61px] z-30 border-b border-line bg-bg/95 backdrop-blur-lg lg:hidden"
          >
            <div className="grid grid-cols-2 px-2 py-2">
              {navItems.map((item) => (
                <NavLink key={item.id} item={item} active={active} onClick={() => setOpen(false)} />
              ))}
            </div>
            <div className="border-t border-line p-4">
              <a
                href={profile.cvFile}
                download
                className="btn-glow flex items-center justify-center gap-2 rounded border border-primary/60 px-4 py-3 font-mono text-xs uppercase tracking-widest text-sky"
              >
                <Icon name="download" size={16} /> Download CV
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
