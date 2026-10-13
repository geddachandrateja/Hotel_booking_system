import { useState } from 'react';

export function HotelDetailsView({
  hotel,
  onBack,
  checkInDate,
  checkOutDate,
  nightsCount,
  guests,
  favorites,
  onToggleFavorite,
  onSelectRoomForBooking,
  formatPrice,
}) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!hotel) return null;
  const isFav = favorites.includes(hotel.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in">
      {/* Top Breadcrumb & Navigation Action */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to Search Results</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(hotel.id)}
            type="button"
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                isFav ? 'text-red-500 fill-current' : 'text-slate-500'
              }`}
              style={isFav ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              favorite
            </span>
            <span>{isFav ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Hotel Title & Location Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[11px] font-bold tracking-wider uppercase">
                {hotel.starRating}★ {hotel.propertyType}
              </span>
              {hotel.featuredTag && (
                <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[11px] font-bold">
                  {hotel.featuredTag}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {hotel.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 mt-2">
              <span className="material-symbols-outlined text-[17px] text-teal-700 shrink-0">location_on</span>
              <span>{hotel.address || hotel.location}</span>
            </p>
          </div>

          {/* Rating Score Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-sm font-bold text-slate-900 block">{hotel.guestScoreLabel}</span>
              <span className="text-xs text-slate-500 block">{hotel.reviewCount} verified reviews</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-700 text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
              {hotel.guestScore}
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Photo Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-8">
        {/* Main Large Display Photo */}
        <div className="md:col-span-8 h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={hotel.images[selectedPhotoIndex] || hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>

        {/* Supporting Thumbnails */}
        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3 h-80 sm:h-96">
          {hotel.images.slice(0, 3).map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedPhotoIndex(idx)}
              className={`h-full rounded-xl overflow-hidden border-2 transition-all relative ${
                selectedPhotoIndex === idx ? 'border-teal-700 ring-2 ring-teal-700/20' : 'border-transparent opacity-85 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${hotel.name} view ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Property Highlights, Neighborhood & Amenities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-3">About this sanctuary</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {hotel.description}
            </p>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-teal-700 shrink-0">explore</span>
              <div>
                <span className="font-bold block text-slate-900">Neighborhood & Surroundings</span>
                {hotel.neighborhood}
              </div>
            </div>
          </div>

          {/* Full Amenities Grid */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Property Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotel.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="material-symbols-outlined text-[17px] text-teal-700">check_circle</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Booking Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs sticky top-24 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Your Booking Dates
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Check-in</span>
                <span className="font-bold text-slate-900">{checkInDate}</span>
                <span className="text-[10px] text-slate-500 block">From 14:00</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Check-out</span>
                <span className="font-bold text-slate-900">{checkOutDate}</span>
                <span className="text-[10px] text-slate-500 block">Until 11:00</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Occupancy</span>
              <span className="font-bold text-slate-900">
                {nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'} · {guests.adults} Adults, {guests.rooms} Room
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              Select one of the verified rooms below to proceed directly to the reservation and guest confirmation screen.
            </p>
          </div>
        </div>
      </div>

      {/* Available Room Types Table / Grid */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Available Rooms & Suites
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Choose your preferred configuration for {nightsCount} nights ({checkInDate} to {checkOutDate})
          </p>
        </div>

        <div className="space-y-4">
          {hotel.rooms.map((room) => {
            const roomTax = Math.round(room.pricePerNight * hotel.taxRate);
            const totalRoomStay = (room.pricePerNight + roomTax) * nightsCount;

            return (
              <div
                key={room.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Room Specifications */}
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{room.name}</h3>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                      {room.sizeSqFt} sq ft
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-teal-700">bed</span>
                    <span>{room.bed}</span>
                    <span>·</span>
                    <span className="material-symbols-outlined text-[16px] text-teal-700">group</span>
                    <span>Up to {room.maxGuests} guests</span>
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {room.features.map((feat, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-slate-600">
                        {feat}
                      </span>
                    ))}
                  </div>

                  <div className="pt-1 space-y-0.5 text-xs">
                    {room.freeCancellation && (
                      <p className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                        <span>Free cancellation until 48 hours before check-in</span>
                      </p>
                    )}
                    {room.breakfastIncluded && (
                      <p className="text-teal-800 font-medium flex items-center gap-1 text-[11px]">
                        <span className="material-symbols-outlined text-[14px]">restaurant</span>
                        <span>Gourmet breakfast included</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Price Lockup and Reserve Action */}
                <div className="text-right w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 flex flex-col items-end">
                  <span className="text-[11px] text-slate-400 block">Nightly room rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-900 font-price-display">
                      {formatPrice(room.pricePerNight)}
                    </span>
                    <span className="text-[11px] text-slate-500">+ {formatPrice(roomTax)} tax</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 block mt-0.5 mb-3">
                    Total for {nightsCount} nights: <strong className="text-slate-900">{formatPrice(totalRoomStay)}</strong>
                  </span>

                  <button
                    onClick={() => onSelectRoomForBooking(hotel, room)}
                    type="button"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>Reserve Room</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
