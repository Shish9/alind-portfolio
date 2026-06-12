// Blueprint-style stroke icons. All paths use currentColor so hover states
// can simply change the text color.
const paths = {
  home: (
    <>
      <path d="M4 11.5 12 4.5l8 7" />
      <path d="M6 10.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="1.5" />
      <path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" />
      <path d="M4 12.5h16" />
    </>
  ),
  building: (
    <>
      <rect x="7" y="4" width="10" height="16" />
      <path d="M4 20h16" />
      <path d="M10 8h1.5M13 8h1.5M10 11.5h1.5M13 11.5h1.5M10 15h1.5M13 15h1.5" />
      <path d="M12 4V2.5" />
    </>
  ),
  gauge: (
    <>
      <path d="M5 17a8 8 0 1 1 14 0" />
      <path d="M12 13.5 15.5 9" />
      <circle cx="12" cy="14.5" r="1.2" />
      <path d="M4 20.5h16" />
    </>
  ),
  cap: (
    <>
      <path d="m12 5 9.5 4.5L12 14 2.5 9.5 12 5Z" />
      <path d="M7 11.5v4.2c0 1.2 2.2 2.3 5 2.3s5-1.1 5-2.3v-4.2" />
      <path d="M21.5 9.5v5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.6 2.3 3.9 5.2 3.9 8.5s-1.3 6.2-3.9 8.5c-2.6-2.3-3.9-5.2-3.9-8.5S9.4 5.8 12 3.5Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v10" />
      <path d="m8 10.5 4 4 4-4" />
      <path d="M5 19.5h14" />
    </>
  ),
  phone: (
    <>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C10.7 18.4 5.6 13.3 5 5.1a1.5 1.5 0 0 1 1.5-1.6Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.7-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.3 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  check: (
    <>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.4-2.9 7.6-7 9-4.1-1.4-7-4.6-7-9V6l7-2.5Z" />
      <path d="m9 11.5 2 2 4-4.5" />
    </>
  ),
  "check-badge": (
    <>
      <path d="M12 3 14.5 5h3.5v3.5L20.5 11l-2.5 2.5V17h-3.5L12 19.5 9.5 17H6v-3.5L3.5 11 6 8.5V5h3.5L12 3Z" />
      <path d="m9 11.5 2 2 4-4.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.8" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  helmet: (
    <>
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M3 15h18v2.5H3z" />
      <path d="M10 7.5V5h4v2.5" />
      <path d="M9 15V9.5M15 15V9.5" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5.5" y="4.5" width="13" height="16" rx="1.5" />
      <path d="M9 4.5V3h6v1.5" />
      <path d="M8.5 9.5h7M8.5 13h7M8.5 16.5h4.5" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="2.8" />
      <path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
      <circle cx="16.5" cy="9.5" r="2.2" />
      <path d="M16 14.4c2.4.2 4 1.8 4.5 4.1" />
    </>
  ),
  excavator: (
    <>
      <path d="M3 17.5h11" />
      <circle cx="5.5" cy="17.5" r="1.6" />
      <circle cx="11.5" cy="17.5" r="1.6" />
      <path d="M4.5 14.5h8v-4h-5l-1.5 2z" />
      <path d="M12.5 11.5 17 6.5l3.5 1.5" />
      <path d="M20.5 8 19 13.5h-2.5" />
      <path d="M19 13.5c1.5 1 1.5 2.5.5 3.5" />
    </>
  ),
  villa: (
    <>
      <path d="M3 19.5h18" />
      <path d="M4.5 19.5V11l5-3.5 5 3.5v8.5" />
      <path d="M14.5 13h5v6.5" />
      <path d="M7 19.5v-4h3v4" />
      <path d="M16.5 15.5h1.5" />
      <path d="M11.5 11.5h1" />
    </>
  ),
  tower: (
    <>
      <path d="M8 21V6.5L12 3l4 3.5V21" />
      <path d="M5 21h14" />
      <path d="M10 9h1.2M12.8 9H14M10 12.5h1.2M12.8 12.5H14M10 16h1.2M12.8 16H14" />
      <path d="M12 3V1.5" />
    </>
  ),
  blueprint: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1" />
      <path d="M3.5 9h17M8.5 4.5V19.5" />
      <circle cx="14.5" cy="14" r="2.5" />
      <path d="M14.5 11.5V9M12 14h-2" />
    </>
  ),
  column: (
    <>
      <path d="M5 4.5h14M5 19.5h14" />
      <path d="M8 4.5v15M16 4.5v15" />
      <path d="M10.5 7.5h3M10.5 12h3M10.5 16.5h3" />
    </>
  ),
  rebar: (
    <>
      <path d="M4 8h16M4 13h16M4 18h16" />
      <path d="M7.5 5v16M12 5v16M16.5 5v16" opacity="0.9" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
      <path d="m7 7 4-2.5L15 6l4-2.5" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4 12h15" />
      <path d="m13.5 6.5 5.5 5.5-5.5 5.5" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
};

export default function Icon({ name, size = 24, strokeWidth = 1.5, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? null}
    </svg>
  );
}
