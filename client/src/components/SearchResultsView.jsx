import { useState, useMemo } from 'react';
import { HOTEL_PROPERTIES } from '../data/mockData';

export function SearchResultsView({
  searchQuery,
  onSearchQueryChange,
  checkInDate,
  checkOutDate,
  nightsCount,
  guests,
  favorites,
  onToggleFavorite,
  onViewHotelDetails,
  formatPrice,
}) {
  // Filter States
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [freeCancelOnly, setFreeCancelOnly] = useState(false);
  const [breakfastOnly, setBreakfastOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'price-asc' | 'price-desc' | 'rating'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredHotels = useMemo(() => {
    return HOTEL_PROPERTIES.filter((hotel) => {
      // Query filter (matches name, city, location)
      if (searchQuery && searchQuery.trim() !== '' && searchQuery.toLowerCase() !== 'all') {
        const q = searchQuery.toLowerCase();
        const matchesCity = hotel.city.toLowerCase().includes(q);
        const matchesName = hotel.name.toLowerCase().includes(q);
        const matchesLoc = hotel.location.toLowerCase().includes(q);
        if (!matchesCity && !matchesName && !matchesLoc) return false;
      }

      // Max price filter
      if (hotel.pricePerNight > maxPrice) return false;

      // Star rating filter
      if (selectedStars.length > 0 && !selectedStars.includes(hotel.starRating)) {
        return false;
      }

      // Property type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(hotel.propertyType)) {
        return false;
      }

      // Guest rating filter
      if (minRating > 0 && hotel.guestScore < minRating) {
        return false;
      }

      // Free cancellation filter
      if (freeCancelOnly && !hotel.freeCancellation) {
        return false;
      }

      // Breakfast filter
      if (breakfastOnly && !hotel.breakfastIncluded) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
      if (sortBy === 'rating') return b.guestScore - a.guestScore;
      return 0; // recommended
    });
  }, [searchQuery, maxPrice, selectedStars, selectedTypes, minRating, freeCancelOnly, breakfastOnly, sortBy]);

  const resetFilters = () => {
    setSelectedStars([]);
    setSelectedTypes([]);
    setMinRating(0);
    setFreeCancelOnly(false);
    setBreakfastOnly(false);
    setMaxPrice(25000);
    setSortBy('recommended');
  };

  const toggleStar = (star) => {
    if (selectedStars.includes(star)) {
      setSelectedStars(selectedStars.filter((s) => s !== star));
    } else {
      setSelectedStars([...selectedStars, star]);
    }
  };

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in">
      {/* Top Search Summary & Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">travel_explore</span>
          </div>
          <div className="truncate flex-grow">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Destination:</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder="Search city..."
                className="font-bold text-slate-900 text-sm sm:text-base border-b border-transparent hover:border-slate-300 focus:border-teal-700 focus:outline-none bg-transparent"
              />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {checkInDate} — {checkOutDate} · {nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'} · {guests.adults} Adults, {guests.rooms} Room
            </p>
          </div>
        </div>

        {/* Quick Search Reset / Mobile Filter Trigger */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            type="button"
            className="md:hidden px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Filters</span>
          </button>
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-semibold text-slate-500 whitespace-nowrap">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Guest Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Filter Sidebar + Hotel Results Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar (Desktop) */}
        <aside className={`md:col-span-4 lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-6 ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-teal-700">tune</span>
              <span>Filter Results</span>
            </h2>
            <button
              onClick={resetFilters}
              type="button"
              className="text-xs text-teal-700 font-bold hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
              <span>Max Nightly Rate</span>
              <span className="text-teal-700 font-price-display">{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="3000"
              max="25000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span>{formatPrice(3000)}</span>
              <span>{formatPrice(25000)}+</span>
            </div>
          </div>

          {/* Star Rating Checkboxes */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 mb-2.5">Star Rating</h3>
            <div className="space-y-2 text-xs">
              {[5, 4].map((star) => (
                <label key={star} className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedStars.includes(star)}
                    onChange={() => toggleStar(star)}
                    className="w-4 h-4 rounded text-teal-700 accent-teal-700 cursor-pointer"
                  />
                  <span>{star} Stars ({star === 5 ? 'Luxury' : 'Premium'})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Guest Rating Score */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 mb-2.5">Guest Review Score</h3>
            <div className="space-y-2 text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="guestRating"
                  checked={minRating === 0}
                  onChange={() => setMinRating(0)}
                  className="accent-teal-700 cursor-pointer"
                />
                <span>Any rating</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="guestRating"
                  checked={minRating === 9.0}
                  onChange={() => setMinRating(9.0)}
                  className="accent-teal-700 cursor-pointer"
                />
                <span>9.0+ Exceptional</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="radio"
                  name="guestRating"
                  checked={minRating === 8.5}
                  onChange={() => setMinRating(8.5)}
                  className="accent-teal-700 cursor-pointer"
                />
                <span>8.5+ Very Good</span>
              </label>
            </div>
          </div>

          {/* Property Category Type */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 mb-2.5">Property Type</h3>
            <div className="space-y-2 text-xs text-slate-700">
              {[
                { id: 'resort', label: 'Resorts' },
                { id: 'hotel', label: 'City Hotels' },
                { id: 'heritage', label: 'Heritage Palaces' },
                { id: 'boutique', label: 'Boutique Suites' },
              ].map((type) => (
                <label key={type.id} className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type.id)}
                    onChange={() => toggleType(type.id)}
                    className="w-4 h-4 rounded text-teal-700 accent-teal-700 cursor-pointer"
                  />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities & Inclusions */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 mb-2.5">Inclusions & Policies</h3>
            <div className="space-y-2 text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={freeCancelOnly}
                  onChange={(e) => setFreeCancelOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-700 accent-teal-700 cursor-pointer"
                />
                <span className="font-semibold text-slate-900">Free Cancellation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={breakfastOnly}
                  onChange={(e) => setBreakfastOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-700 accent-teal-700 cursor-pointer"
                />
                <span>Breakfast Included</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Hotel Result List */}
        <main className="md:col-span-8 lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
            <span>Showing <strong className="text-slate-900">{filteredHotels.length}</strong> available properties</span>
          </div>

          {filteredHotels.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">search_off</span>
              <h3 className="text-base font-bold text-slate-900">No properties match your current filters</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try widening your price range or clearing specific star and amenity filters.
              </p>
              <button
                onClick={resetFilters}
                type="button"
                className="mt-4 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredHotels.map((hotel) => {
              const isFav = favorites.includes(hotel.id);
              const taxAmount = Math.round(hotel.pricePerNight * hotel.taxRate);
              const totalStayPrice = (hotel.pricePerNight + taxAmount) * nightsCount;

              return (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col sm:flex-row group"
                >
                  {/* Photo Container */}
                  <div className="sm:w-72 h-52 sm:h-auto relative bg-slate-100 shrink-0 overflow-hidden">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(hotel.id);
                      }}
                      type="button"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:text-red-500 transition-colors shadow-xs active:scale-90"
                      aria-label="Wishlist"
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isFav ? 'text-red-500 fill-current' : 'text-slate-600'
                        }`}
                        style={isFav ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        favorite
                      </span>
                    </button>
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded bg-slate-950/80 text-white text-[10px] font-bold tracking-wider uppercase">
                        {hotel.starRating}★ {hotel.propertyType}
                      </span>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Name & Rating Row */}
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h3
                            onClick={() => onViewHotelDetails(hotel)}
                            className="font-bold text-base sm:text-lg text-slate-900 hover:text-teal-700 cursor-pointer transition-colors"
                          >
                            {hotel.name}
                          </h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[15px] text-teal-700 shrink-0">location_on</span>
                            <span>{hotel.location}</span>
                          </p>
                        </div>

                        {/* Guest Rating Badge */}
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1 justify-end">
                            <span className="text-xs font-bold text-slate-800 hidden sm:inline">{hotel.guestScoreLabel}</span>
                            <span className="px-1.5 py-0.5 rounded bg-teal-700 text-white font-bold text-xs">
                              {hotel.guestScore}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-0.5">({hotel.reviewCount} reviews)</span>
                        </div>
                      </div>

                      {/* Amenities Chips */}
                      <div className="flex flex-wrap gap-1.5 my-2.5">
                        {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>

                      {/* Policy Badges */}
                      <div className="space-y-1 text-xs">
                        {hotel.freeCancellation && (
                          <p className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                            <span className="material-symbols-outlined text-[14px]">check</span>
                            <span>Free cancellation available</span>
                          </p>
                        )}
                        {hotel.breakfastIncluded && (
                          <p className="text-teal-800 font-medium flex items-center gap-1 text-[11px]">
                            <span className="material-symbols-outlined text-[14px]">restaurant</span>
                            <span>Breakfast included in select rooms</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price Lockup and Action */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Nightly rate from</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-bold text-slate-900 font-price-display">
                            {formatPrice(hotel.pricePerNight)}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            + {formatPrice(taxAmount)} taxes
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block">
                          Total {nightsCount} nights: {formatPrice(totalStayPrice)}
                        </span>
                      </div>

                      <button
                        onClick={() => onViewHotelDetails(hotel)}
                        type="button"
                        className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <span>View Rooms</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
}
