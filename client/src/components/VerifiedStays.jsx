import { CATEGORIES } from '../data/mockData';

export function VerifiedStays({
  properties,
  selectedCategory,
  onSelectCategory,
  favorites,
  onToggleFavorite,
  onViewHotelDetails,
  formatPrice,
  currencyCode,
}) {
  return (
    <section id="featured-stays" className="w-full bg-slate-50 border-y border-slate-200/80 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
              Verified Collection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Recommended stays you'll love
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Audited properties combining exceptional architecture, prime locations, and stellar guest feedback
            </p>
          </div>
          <div className="text-xs text-slate-500 self-start md:self-end">
            *Indicative rates in {currencyCode} per night based on current availability
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6" role="tablist" aria-label="Hotel Categories">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Hotel Cards Grid (Responsive 1/2/4 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((hotel) => {
            const isFav = favorites.includes(hotel.id);
            const taxAmount = Math.round(hotel.pricePerNight * hotel.taxRate);

            return (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo & Overlays */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(hotel.id);
                      }}
                      type="button"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:text-red-500 transition-colors shadow-xs active:scale-90"
                      aria-label={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <span
                        className={`material-symbols-outlined text-[19px] ${
                          isFav ? 'text-red-500 fill-current' : 'text-slate-600'
                        }`}
                        style={isFav ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        favorite
                      </span>
                    </button>

                    {/* Star Category & Featured Tag */}
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase">
                        {hotel.starRating}★ {hotel.propertyType}
                      </span>
                      {hotel.featuredTag && (
                        <span className="px-2 py-0.5 rounded bg-teal-700 text-white text-[10px] font-bold">
                          {hotel.featuredTag}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    {/* Guest Rating Row */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-1.5 py-0.5 rounded bg-teal-700 text-white font-bold text-xs">
                        {hotel.guestScore}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{hotel.guestScoreLabel}</span>
                      <span className="text-[11px] text-slate-500">({hotel.reviewCount} reviews)</span>
                    </div>

                    {/* Hotel Name */}
                    <h3
                      className="font-bold text-base text-slate-900 line-clamp-1 mb-1 group-hover:text-teal-700 transition-colors"
                      title={hotel.name}
                    >
                      {hotel.name}
                    </h3>

                    {/* Location */}
                    <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-teal-700 shrink-0">location_on</span>
                      <span className="truncate">{hotel.location}</span>
                    </p>

                    {/* Key Amenities */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Free Cancellation Highlight */}
                    {hotel.freeCancellation && (
                      <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mb-2">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                        <span>Free cancellation available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing & Reservation CTA */}
                <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                  <div className="flex items-baseline justify-between mb-3 pt-3">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Nightly rate from</span>
                      <span className="font-bold text-xl text-slate-900 font-price-display">
                        {formatPrice(hotel.pricePerNight)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        + {formatPrice(taxAmount)} taxes & charges
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onViewHotelDetails(hotel)}
                    type="button"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>View Rooms & Rates</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
