import { useState } from 'react';

export function CheckoutView({
  hotel,
  room,
  checkInDate,
  checkOutDate,
  nightsCount,
  guests,
  currentUser,
  onBookingConfirmed,
  onBack,
  formatPrice,
}) {
  // Guest Form State
  const [firstName, setFirstName] = useState(currentUser ? currentUser.name.split(' ')[0] : 'Chandra');
  const [lastName, setLastName] = useState(currentUser ? currentUser.name.split(' ')[1] || 'Sharma' : 'Sharma');
  const [email, setEmail] = useState(currentUser ? currentUser.email : 'chandra@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'pay_at_hotel'

  // Promo Code State
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in percent
  const [couponFeedback, setCouponFeedback] = useState('');

  // Confirmation State
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price Calculations
  const roomBaseTotal = (room?.pricePerNight || hotel.pricePerNight) * nightsCount;
  const taxRate = hotel?.taxRate || 0.12;
  const taxesTotal = Math.round(roomBaseTotal * taxRate);
  const discountAmount = Math.round(roomBaseTotal * (appliedDiscount / 100));
  const finalTotal = roomBaseTotal + taxesTotal - discountAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'WEEKEND15' || code === 'WEEKEND25') {
      setAppliedDiscount(15);
      setCouponFeedback('15% discount applied successfully!');
    } else if (code === 'UPGRADE5') {
      setAppliedDiscount(10);
      setCouponFeedback('10% member discount applied!');
    } else if (code === 'EARLYBIRD') {
      setAppliedDiscount(12);
      setCouponFeedback('12% advance planner discount applied!');
    } else {
      setCouponFeedback('Invalid voucher code. Try WEEKEND15');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const bookingRef = `SN-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking = {
        id: bookingRef,
        hotelId: hotel.id,
        hotelName: hotel.name,
        location: hotel.location,
        roomName: room?.name || 'Deluxe Room',
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights: nightsCount,
        guests: { ...guests },
        guestName: `${firstName} ${lastName}`,
        guestEmail: email,
        guestPhone: phone,
        totalAmount: finalTotal,
        status: 'Confirmed',
        bookedAt: new Date().toISOString().split('T')[0],
        paymentMethod: paymentMethod === 'card' ? 'Credit Card (Simulated)' : paymentMethod === 'upi' ? 'UPI' : 'Pay At Hotel',
        freeCancellationUntil: checkInDate,
        imageUrl: hotel.images[0],
      };

      setConfirmedBooking(newBooking);
      onBookingConfirmed(newBooking);
      setIsSubmitting(false);
    }, 800);
  };

  // If Booking is confirmed, render clean confirmation view
  if (confirmedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>

          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
            Reservation Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            You're heading to {hotel.city}!
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            A confirmation receipt has been dispatched to <strong>{confirmedBooking.guestEmail}</strong>.
          </p>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-left max-w-lg mx-auto mb-6 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs text-slate-500">Booking Reference</span>
              <span className="font-mono text-base font-bold text-slate-900">{confirmedBooking.id}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Hotel</span>
              <span className="font-semibold text-slate-900">{confirmedBooking.hotelName}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Room</span>
              <span className="font-semibold text-slate-900">{confirmedBooking.roomName}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Dates</span>
              <span className="font-semibold text-slate-900">{confirmedBooking.checkIn} to {confirmedBooking.checkOut} ({confirmedBooking.nights} nights)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Primary Guest</span>
              <span className="font-semibold text-slate-900">{confirmedBooking.guestName}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <span className="text-sm font-bold text-slate-900">Total Paid</span>
              <span className="text-lg font-bold text-teal-800 font-price-display">{formatPrice(confirmedBooking.totalAmount)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onBack('my-bookings')}
              type="button"
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition-colors"
            >
              View in My Bookings
            </button>
            <button
              onClick={() => onBack('home')}
              type="button"
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => onBack('details')}
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to Room Selection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Guest Form & Payment Options */}
        <form onSubmit={handleFormSubmit} className="lg:col-span-8 space-y-6">
          {/* 1. Guest Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-teal-700">person</span>
              <span>1. Primary Guest Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address (for voucher & receipt) *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Contact *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs font-bold text-slate-700 block mb-1">Special Requests (Optional)</label>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="High floor, quiet room, late check-in notice, etc."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>
          </div>

          {/* 2. Payment Method Simulation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-teal-700">credit_card</span>
              <span>2. Payment Option</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {[
                { id: 'card', label: 'Credit / Debit Card', icon: 'credit_card' },
                { id: 'upi', label: 'UPI / Net Banking', icon: 'account_balance' },
                { id: 'pay_at_hotel', label: 'Pay at Check-in', icon: 'storefront' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPaymentMethod(opt.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === opt.id
                      ? 'border-teal-700 bg-teal-50/40 text-teal-900 ring-1 ring-teal-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px] mb-2">{opt.icon}</span>
                  <span className="text-xs font-bold">{opt.label}</span>
                </button>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="text-xs font-semibold text-slate-600 mb-2">Simulated Secure Payment Card:</div>
                <div>
                  <input
                    type="text"
                    defaultValue="4242 •••• •••• 4242"
                    readOnly
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-mono bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    defaultValue="12 / 28"
                    readOnly
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-mono bg-white"
                  />
                  <input
                    type="password"
                    defaultValue="•••"
                    readOnly
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-mono bg-white"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'pay_at_hotel' && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                <span className="font-bold block">No upfront payment required!</span>
                Your reservation will be held guaranteed. You can settle the full amount upon arrival at the property reception.
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-base shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Confirming Reservation...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">lock</span>
                <span>Confirm & Reserve Booking · {formatPrice(finalTotal)}</span>
              </>
            )}
          </button>
        </form>

        {/* Right Booking Breakdown & Coupon */}
        <aside className="lg:col-span-4 space-y-5">
          {/* Hotel & Room Lockup */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Reservation Summary
            </h3>

            <div className="flex gap-3 pb-4 border-b border-slate-100">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="truncate">
                <h4 className="font-bold text-sm text-slate-900 truncate">{hotel.name}</h4>
                <p className="text-xs text-slate-500 truncate">{hotel.location}</p>
                <p className="text-xs font-semibold text-teal-700 mt-1">{room?.name || 'Deluxe Room'}</p>
              </div>
            </div>

            <div className="py-3 border-b border-slate-100 text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Check-in:</span>
                <strong className="text-slate-900">{checkInDate} (14:00)</strong>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <strong className="text-slate-900">{checkOutDate} (11:00)</strong>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <strong className="text-slate-900">{nightsCount} Nights</strong>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <strong className="text-slate-900">{guests.adults} Adults, {guests.rooms} Room</strong>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="pt-3 text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Room Charges ({nightsCount} nights):</span>
                <span className="font-price-display">{formatPrice(roomBaseTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST & Hospitality Taxes:</span>
                <span className="font-price-display">{formatPrice(taxesTotal)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Voucher Discount ({appliedDiscount}%):</span>
                  <span className="font-price-display">- {formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">Total Payable:</span>
                <span className="text-xl font-extrabold text-teal-800 font-price-display">{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>

          {/* Promo Code Input */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <label className="text-xs font-bold text-slate-700 block mb-2">Have a promo code?</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="e.g. WEEKEND15"
                className="flex-grow px-3 py-2 rounded-lg border border-slate-200 text-xs uppercase font-mono focus:outline-none focus:ring-1 focus:ring-teal-700"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold"
              >
                Apply
              </button>
            </div>
            {couponFeedback && (
              <p className={`text-[11px] mt-2 font-medium ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-red-500'}`}>
                {couponFeedback}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
