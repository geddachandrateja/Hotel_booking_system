import { useState } from 'react';
import { HOTEL_PROPERTIES } from '../data/mockData';

export function AdminDashboardView({ bookings, onBackToCustomerView, formatPrice }) {
  const [hotelsList, setHotelsList] = useState(
    HOTEL_PROPERTIES.map((h) => ({ ...h, isAvailable: true }))
  );

  const toggleAvailability = (id) => {
    setHotelsList((prev) =>
      prev.map((h) => (h.id === id ? { ...h, isAvailable: !h.isAvailable } : h))
    );
  };

  const totalRevenue = bookings.reduce((sum, b) => (b.status === 'Confirmed' ? sum + b.totalAmount : sum), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
            Operations & Control Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            StayNest Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time reservation metrics, active properties inventory, and platform oversight
          </p>
        </div>

        <button
          onClick={onBackToCustomerView}
          type="button"
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <span className="material-symbols-outlined text-[17px]">arrow_back</span>
          <span>Back to Guest Experience</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Confirmed Revenue</span>
          <span className="text-2xl font-extrabold text-slate-900 font-price-display">{formatPrice(totalRevenue)}</span>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1 flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>Live platform turnover</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Total Reservations</span>
          <span className="text-2xl font-extrabold text-slate-900">{bookings.length}</span>
          <span className="text-[11px] text-slate-400 block mt-1">Guest bookings recorded</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Active Properties</span>
          <span className="text-2xl font-extrabold text-slate-900">{hotelsList.filter((h) => h.isAvailable).length}</span>
          <span className="text-[11px] text-teal-700 font-semibold block mt-1">Across 6 destinations</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Average Occupancy</span>
          <span className="text-2xl font-extrabold text-teal-800">89.4%</span>
          <span className="text-[11px] text-slate-400 block mt-1">Healthy demand tier</span>
        </div>
      </div>

      {/* Section 1: Recent Reservations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Recent Bookings</span>
          <span className="text-xs text-slate-400 font-normal">Auto-synchronized with checkout</span>
        </h2>

        {bookings.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">No bookings recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 pr-4">Reference</th>
                  <th className="pb-3 px-4">Guest</th>
                  <th className="pb-3 px-4">Property</th>
                  <th className="pb-3 px-4">Stay Dates</th>
                  <th className="pb-3 px-4">Amount</th>
                  <th className="pb-3 pl-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="py-3 pr-4 font-mono font-bold text-slate-900">{b.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-800">{b.guestName}</p>
                      <p className="text-[11px] text-slate-400">{b.guestEmail}</p>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{b.hotelName}</td>
                    <td className="py-3 px-4 text-slate-600">{b.checkIn} — {b.checkOut} ({b.nights}n)</td>
                    <td className="py-3 px-4 font-bold text-slate-900 font-price-display">{formatPrice(b.totalAmount)}</td>
                    <td className="py-3 pl-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section 2: Property Inventory Management */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
          Property Inventory Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 pr-4">Property Name</th>
                <th className="pb-3 px-4">Destination</th>
                <th className="pb-3 px-4">Category</th>
                <th className="pb-3 px-4">Base Rate</th>
                <th className="pb-3 px-4">Rating</th>
                <th className="pb-3 pl-4">Inventory Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hotelsList.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50">
                  <td className="py-3 pr-4 font-bold text-slate-900">{h.name}</td>
                  <td className="py-3 px-4 text-slate-600">{h.city}</td>
                  <td className="py-3 px-4 text-slate-600">{h.starRating}★ {h.propertyType}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 font-price-display">{formatPrice(h.pricePerNight)}</td>
                  <td className="py-3 px-4 text-teal-700 font-bold">{h.guestScore} / 10</td>
                  <td className="py-3 pl-4">
                    <button
                      onClick={() => toggleAvailability(h.id)}
                      type="button"
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${h.isAvailable
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                    >
                      {h.isAvailable ? 'Active on Search' : 'Paused'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
