import { SearchConsole } from './SearchConsole';

export function HeroSection({ searchProps }) {
  const heroImageUrl =
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80';

  return (
    <section className="relative w-full overflow-hidden bg-slate-900 pb-12 sm:pb-16 pt-10 sm:pt-14">
      {/* Background Photography with Readable Contrast Dark Wash */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url('${heroImageUrl}')` }}
        role="img"
        aria-label="Luxury hotel terrace overlooking calm waters"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/60 to-slate-950/80" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Headline & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-teal-300 text-xs font-semibold mb-4 border border-white/15">
            <span className="material-symbols-outlined text-[15px]">hotel_class</span>
            <span>Handpicked Sanctuaries & Verified Stays</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Find your perfect stay, anywhere.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover exceptional hotels, compare transparent rates, and reserve with flexible cancellation across premier global destinations.
          </p>
        </div>

        {/* Primary Booking Search Console */}
        <div className="max-w-5xl mx-auto">
          <SearchConsole {...searchProps} />
        </div>
      </div>
    </section>
  );
}
