import { useState } from 'react';

export function MyBookingsView({ bookings, onCancelBooking, onExploreStays, formatPrice }) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'cancelled'

  const upcomingBookings = bookings.filter((b) => b.status === 'Confirmed');
  const cancelledBookings = bookings.filter((b) => b.status === 'Cancelled');
  const displayList = activeTab === 'upcoming' ? upcomingBookings : cancelledBookings;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-fade-in">
      {/* Page Title */}
      <div className="mb-6">
        <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
          Guest Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Bookings & Reservations
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Review upcoming stays, download confirmation summaries, or manage cancellations
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          type="button"
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${activeTab === 'upcoming'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
        >
          Upcoming Bookings ({upcomingBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          type="button"
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${activeTab === 'cancelled'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
        >
          Cancelled ({cancelledBookings.length})
        </button>
      </div>

      {/* Bookings List */}
      {displayList.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[28px]">luggage</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            {activeTab === 'upcoming' ? 'No active reservations found' : 'No cancelled bookings'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            {activeTab === 'upcoming'
              ? 'You have no confirmed upcoming trips at the moment. Ready to plan your next sanctuary?'
              : 'You have no cancelled reservations in your history.'}
          </p>
          {activeTab === 'upcoming' && (
            <button
              onClick={onExploreStays}
              type="button"
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
            >
              Explore Available Hotels
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {displayList.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4 truncate">
                <img
                  src={booking.imageUrl}
                  alt={booking.hotelName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
                />
                <div className="truncate">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {booking.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${booking.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-slate-900 truncate">
                    {booking.hotelName}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">{booking.location}</p>
                  <p className="text-xs font-semibold text-teal-700 mt-1">{booking.roomName}</p>

                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-2">
                    <span className="material-symbols-outlined text-[15px] text-teal-700">calendar_month</span>
                    <span>{booking.checkIn} — {booking.checkOut} ({booking.nights} nights)</span>
                  </div>
                </div>
              </div>

              {/* Actions & Price */}
              <div className="w-full md:w-auto text-left md:text-right shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 flex flex-col md:items-end justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total reservation rate</span>
                  <span className="text-xl font-bold text-slate-900 font-price-display">
                    {formatPrice(booking.totalAmount)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {booking.paymentMethod}
                  </span>
                </div>

                {booking.status === 'Confirmed' && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to cancel your reservation at ${booking.hotelName}?`)) {
                        onCancelBooking(booking.id);
                      }
                    }}
                    type="button"
                    className="mt-4 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
                  >
                    Cancel Reservation
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
