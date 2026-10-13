import { POPULAR_DESTINATIONS } from '../data/mockData';

export function PopularDestinations({ onSelectCity, formatPrice }) {
  return (
    <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
            Curated Destinations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular destinations to explore
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Trending cities and beach escapes with verified boutique and luxury accommodations
          </p>
        </div>
        <button
          onClick={() => onSelectCity('All')}
          type="button"
          className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-bold self-start sm:self-end group"
        >
          <span>View all properties</span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Grid of 6 High-Quality Destination Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {POPULAR_DESTINATIONS.map((dest) => (
          <div
            key={dest.id}
            onClick={() => onSelectCity(dest.title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectCity(dest.title);
              }
            }}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 flex flex-col justify-between"
          >
            {/* Image Container with Consistent Aspect Ratio */}
            <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-100">
              <img
                src={dest.imageUrl}
                alt={dest.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

              {/* Top-Right Rating Badge */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-white/95 backdrop-blur-sm text-xs font-bold text-slate-900 flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-amber-500 text-[15px]">star</span>
                <span>{dest.rating}</span>
              </div>

              {/* Bottom Card Title & Subtitle */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[11px] font-bold tracking-wider uppercase text-teal-300">
                  {dest.state}
                </p>
                <h3 className="text-xl font-bold text-white drop-shadow-sm mt-0.5">
                  {dest.title}
                </h3>
              </div>
            </div>

            {/* Bottom Card Summary Bar */}
            <div className="p-3.5 px-4 flex items-center justify-between text-slate-700 bg-white border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-500 block">{dest.propertiesCount}+ available stays</span>
                <span className="text-xs font-semibold text-teal-700">{dest.tag}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-medium">Avg. per night</span>
                <span className="text-base font-bold text-slate-900 font-price-display">
                  {formatPrice(dest.avgNightRate)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
