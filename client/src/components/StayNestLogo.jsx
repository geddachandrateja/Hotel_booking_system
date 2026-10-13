export function StayNestLogo({ size = 'md', showTagline = true, inverted = false }) {
  const iconDimensions = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const titleClass = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const taglineClass = size === 'sm' ? 'text-[10px]' : 'text-[11px]';

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Crisp Architectural & Haven Geometric SVG Logo */}
      <div className={`${iconDimensions} flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Base rounded background */}
          <rect width="36" height="36" rx="9" fill={inverted ? '#FFFFFF' : '#0F172A'} />
          
          {/* Roof / Sanctuary Haven Gable */}
          <path
            d="M8 18L18 9L28 18"
            stroke={inverted ? '#0F172A' : '#0D9488'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Inner Nest / Arch contour */}
          <path
            d="M13 17V24C13 25.1 13.9 26 15 26H21C22.1 26 23 25.1 23 24V17"
            stroke={inverted ? '#0D9488' : '#FFFFFF'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Sanctuary Point */}
          <circle cx="18" cy="20.5" r="2" fill={inverted ? '#0F172A' : '#38BDF8'} />
        </svg>
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-bold tracking-tight leading-none ${titleClass} ${
            inverted ? 'text-white' : 'text-slate-900'
          }`}
        >
          StayNest
        </span>
        {showTagline && (
          <span
            className={`font-medium tracking-normal leading-none mt-1 hidden sm:block ${taglineClass} ${
              inverted ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Sanctuary in Every Stay
          </span>
        )}
      </div>
    </div>
  );
}
