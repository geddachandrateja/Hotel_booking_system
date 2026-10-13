import { useState, useRef, useEffect } from 'react';

export function SearchConsole({
  searchQuery,
  onSearchQueryChange,
  checkInDate,
  onCheckInDateChange,
  checkOutDate,
  onCheckOutDateChange,
  nightsCount,
  guests,
  onUpdateGuests,
  onPerformSearch,
}) {
  const [occupancyOpen, setOccupancyOpen] = useState(false);
  const [destSuggestionsOpen, setDestSuggestionsOpen] = useState(false);
  const occupancyRef = useRef(null);
  const destRef = useRef(null);

  const topCities = [
    { name: 'Goa', label: 'Goa, India', desc: 'Beaches, resorts, coastal villas' },
    { name: 'Bengaluru', label: 'Bengaluru, India', desc: 'Central CBD, Indiranagar, tech corridors' },
    { name: 'Hyderabad', label: 'Hyderabad, India', desc: 'Jubilee Hills, Banjara Hills, historic palaces' },
    { name: 'Dubai', label: 'Dubai, UAE', desc: 'Marina, Downtown, Palm Jumeirah' },
    { name: 'Bangkok', label: 'Bangkok, Thailand', desc: 'Riverside, Sukhumvit, culinary stays' },
    { name: 'Bali', label: 'Bali, Indonesia', desc: 'Ubud valleys, Seminyak beaches' },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (occupancyRef.current && !occupancyRef.current.contains(e.target)) {
        setOccupancyOpen(false);
      }
      if (destRef.current && !destRef.current.contains(e.target)) {
        setDestSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 sm:p-5">
      {/* Search Input Bar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
        {/* 1. Destination Field */}
        <div className="md:col-span-4 relative" ref={destRef}>
          <div
            onClick={() => setDestSuggestionsOpen(true)}
            className="h-full p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 cursor-pointer transition-colors flex flex-col justify-center"
          >
            <label
              htmlFor="destination-input"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px] text-teal-700">location_on</span>
              <span>Destination or Hotel</span>
            </label>
            <input
              id="destination-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              onFocus={() => setDestSuggestionsOpen(true)}
              placeholder="e.g. Goa, Bengaluru, Dubai"
              className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none truncate p-0 cursor-text"
            />
          </div>

          {/* Quick Destination Suggestions Popover */}
          {destSuggestionsOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-fade-in max-h-80 overflow-y-auto">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Popular Travel Destinations
              </div>
              {topCities.map((city) => (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => {
                    onSearchQueryChange(city.name);
                    setDestSuggestionsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-3 text-slate-900 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[18px]">near_me</span>
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900">{city.label}</p>
                    <p className="text-[11px] text-slate-500 truncate">{city.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Dates Segment (Check-in & Check-out) */}
        <div className="md:col-span-5 grid grid-cols-2 gap-2">
          {/* Check-In */}
          <div className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 transition-colors flex flex-col justify-center">
            <label
              htmlFor="checkin-date-input"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px] text-teal-700">calendar_today</span>
              <span>Check-in</span>
            </label>
            <input
              id="checkin-date-input"
              type="date"
              value={checkInDate}
              onChange={(e) => onCheckInDateChange(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none p-0 cursor-pointer"
            />
          </div>

          {/* Check-Out */}
          <div className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 transition-colors flex flex-col justify-center relative">
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="checkout-date-input"
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px] text-teal-700">event</span>
                <span>Check-out</span>
              </label>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                {nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'}
              </span>
            </div>
            <input
              id="checkout-date-input"
              type="date"
              value={checkOutDate}
              min={checkInDate}
              onChange={(e) => onCheckOutDateChange(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none p-0 cursor-pointer"
            />
          </div>
        </div>

        {/* 3. Guests & Rooms Segment */}
        <div className="md:col-span-3 relative" ref={occupancyRef}>
          <button
            type="button"
            onClick={() => setOccupancyOpen(!occupancyOpen)}
            className="w-full h-full text-left p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 transition-colors flex flex-col justify-center focus:outline-none"
            aria-expanded={occupancyOpen}
            aria-label="Select Guests and Rooms"
          >
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[17px] text-teal-700">group</span>
              <span>Guests & Rooms</span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate block">
              {guests.adults} Adults · {guests.children} Children
            </span>
            <span className="text-[11px] text-slate-500 font-medium truncate block mt-0.5">
              {guests.rooms} {guests.rooms === 1 ? 'Room' : 'Rooms'}
            </span>
          </button>

          {/* Guests & Rooms Counter Popover */}
          {occupancyOpen && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Rooms & Guests</span>
                <button
                  type="button"
                  onClick={() => setOccupancyOpen(false)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800"
                >
                  Done
                </button>
              </div>

              {/* Adults */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">Adults</p>
                  <p className="text-[11px] text-slate-500">Ages 18 or older</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    disabled={guests.adults <= 1}
                    onClick={() => onUpdateGuests('adults', guests.adults - 1)}
                    className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-xs font-bold text-slate-800">{guests.adults}</span>
                  <button
                    type="button"
                    disabled={guests.adults >= 8}
                    onClick={() => onUpdateGuests('adults', guests.adults + 1)}
                    className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">Children</p>
                  <p className="text-[11px] text-slate-500">Ages 0 to 17</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    disabled={guests.children <= 0}
                    onClick={() => onUpdateGuests('children', guests.children - 1)}
                    className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-xs font-bold text-slate-800">{guests.children}</span>
                  <button
                    type="button"
                    disabled={guests.children >= 6}
                    onClick={() => onUpdateGuests('children', guests.children + 1)}
                    className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Rooms */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-xs font-bold text-slate-800">Rooms</p>
                  <p className="text-[11px] text-slate-500">Separate accommodation</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    disabled={guests.rooms <= 1}
                    onClick={() => onUpdateGuests('rooms', guests.rooms - 1)}
                    className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-xs font-bold text-slate-800">{guests.rooms}</span>
                  <button
                    type="button"
                    disabled={guests.rooms >= 4}
                    onClick={() => onUpdateGuests('rooms', guests.rooms + 1)}
                    className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary Action Button Row */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-teal-700">check_circle</span>
            <span>Upfront transparent rates</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-teal-700">verified</span>
            <span>100% verified properties</span>
          </span>
        </div>

        <button
          onClick={onPerformSearch}
          type="button"
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <span>Search Hotels</span>
          <span className="material-symbols-outlined text-[18px]">search</span>
        </button>
      </div>
    </div>
  );
}
