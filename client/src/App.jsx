import { useState, useEffect, useMemo } from 'react';
import './styles/staynest.css';
import {
  CURRENCIES,
  HOTEL_PROPERTIES,
  INITIAL_USER_BOOKINGS,
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PopularDestinations } from './components/PopularDestinations';
import { VerifiedStays } from './components/VerifiedStays';
import { ExclusiveDeals } from './components/ExclusiveDeals';
import { AssurancePillars } from './components/AssurancePillars';
import { Testimonials } from './components/Testimonials';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

import { SearchResultsView } from './components/SearchResultsView';
import { HotelDetailsView } from './components/HotelDetailsView';
import { CheckoutView } from './components/CheckoutView';
import { MyBookingsView } from './components/MyBookingsView';
import { AdminDashboardView } from './components/AdminDashboardView';

import { ApiHealthModal } from './components/ApiHealthModal';
import { AuthModal } from './components/AuthModal';

// Sensible rolling dates initialized at module level
const getRollingDates = () => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const outDate = new Date();
  outDate.setDate(today.getDate() + 3);
  const defaultCheckOut = outDate.toISOString().split('T')[0];
  return { todayStr, defaultCheckOut };
};

const { todayStr: DEFAULT_CHECKIN, defaultCheckOut: DEFAULT_CHECKOUT } = getRollingDates();

function App() {
  // Navigation & View State
  // Views: 'home' | 'search' | 'details' | 'checkout' | 'my-bookings' | 'admin'
  const [currentView, setCurrentView] = useState('home');

  // User & Authentication State
  const [currentUser, setCurrentUser] = useState({
    name: 'Chandra Sharma',
    email: 'chandra@example.com',
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('Sign In');

  // Currency Selection
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]); // INR default

  // Search Parameters State
  const [searchQuery, setSearchQuery] = useState('Goa');
  const [checkInDate, setCheckInDate] = useState(DEFAULT_CHECKIN);
  const [checkOutDate, setCheckOutDate] = useState(DEFAULT_CHECKOUT);
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });

  // Filter & Hotel Selection
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(['hotel-goa-1', 'hotel-blr-1']);
  const [selectedHotel, setSelectedHotel] = useState(HOTEL_PROPERTIES[0]);
  const [selectedRoom, setSelectedRoom] = useState(HOTEL_PROPERTIES[0].rooms[0]);

  // Bookings Record State
  const [bookings, setBookings] = useState(INITIAL_USER_BOOKINGS);

  // Toast Notifications
  const [toastMessage, setToastMessage] = useState('');

  // Milestone 1 API Health Monitoring (Preserved & Integrated)
  const [healthData, setHealthData] = useState(null);
  const [apiStatus, setApiStatus] = useState('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [apiLatency, setApiLatency] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);

  // Calculate nights count
  const nightsCount = useMemo(() => {
    try {
      const inDate = new Date(checkInDate);
      const outDate = new Date(checkOutDate);
      const diffTime = outDate.getTime() - inDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  }, [checkInDate, checkOutDate]);

  // Milestone 1 Backend Health Probe
  const fetchHealthCheck = async () => {
    setIsRefreshing(true);
    const startTime = performance.now();
    try {
      const response = await fetch('/api/health');
      const endTime = performance.now();
      setApiLatency(Math.round(endTime - startTime));

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const json = await response.json();
      setHealthData(json);
      setApiStatus('connected');
      setErrorMsg('');
    } catch (err) {
      setApiStatus('error');
      setErrorMsg(err.message || 'Unable to connect to Express backend.');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHealthCheck();
  }, []);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3800);
  };

  // Currency Formatter
  const formatPrice = (inrPrice) => {
    const converted = Math.round(inrPrice * selectedCurrency.rate);
    return `${selectedCurrency.symbol}${converted.toLocaleString()}`;
  };

  // View Navigation Handlers
  const handleNavigate = (view, options = {}) => {
    if (options.city) {
      setSearchQuery(options.city);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePerformSearch = () => {
    setCurrentView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Searching properties for ${nightsCount} nights in ${searchQuery}...`);
  };

  const handleSelectCityDestination = (cityTitle) => {
    setSearchQuery(cityTitle);
    setCurrentView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Exploring properties in ${cityTitle}`);
  };

  const handleViewHotelDetails = (hotel) => {
    setSelectedHotel(hotel);
    setSelectedRoom(hotel.rooms[0]);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRoomForBooking = (hotel, room) => {
    setSelectedHotel(hotel);
    setSelectedRoom(room);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingConfirmed = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Reservation ${newBooking.id} confirmed!`);
  };

  const handleCancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
    showToast(`Reservation ${bookingId} has been cancelled.`);
  };

  const handleToggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((f) => f !== id));
      showToast('Removed from saved wishlist');
    } else {
      setFavorites([...favorites, id]);
      showToast('Added to saved wishlist');
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    showToast(`Voucher code "${code}" copied to clipboard!`);
  };

  const handleOpenAuth = (mode) => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    showToast('You have been signed out.');
  };

  const handleUpdateGuests = (key, value) => {
    setGuests((prev) => ({ ...prev, [key]: value }));
  };

  // Filtered properties for Homepage section
  const homepageProperties = useMemo(() => {
    return HOTEL_PROPERTIES.filter((p) => {
      if (selectedCategory !== 'all' && p.propertyType !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Redesigned Clean Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <div>
            {/* 1. Hero Section & Primary Search Panel */}
            <HeroSection
              searchProps={{
                searchQuery,
                onSearchQueryChange: setSearchQuery,
                checkInDate,
                onCheckInDateChange: setCheckInDate,
                checkOutDate,
                onCheckOutDateChange: setCheckOutDate,
                nightsCount,
                guests,
                onUpdateGuests: handleUpdateGuests,
                onPerformSearch: handlePerformSearch,
              }}
            />

            {/* 2. Popular Destinations Grid */}
            <PopularDestinations
              onSelectCity={handleSelectCityDestination}
              formatPrice={formatPrice}
            />

            {/* 3. Recommended Verified Hotels */}
            <VerifiedStays
              properties={homepageProperties}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onViewHotelDetails={handleViewHotelDetails}
              formatPrice={formatPrice}
              currencyCode={selectedCurrency.code}
            />

            {/* 4. Special Offers */}
            <ExclusiveDeals
              onCopyCode={handleCopyCode}
              onClaimDeal={() => setCurrentView('search')}
            />

            {/* 5. StayNest Assurance Pillars */}
            <AssurancePillars />

            {/* 6. Guest Testimonials */}
            <Testimonials />

            {/* 7. Newsletter Dispatch */}
            <NewsletterSection onShowToast={showToast} />
          </div>
        )}

        {currentView === 'search' && (
          <SearchResultsView
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            nightsCount={nightsCount}
            guests={guests}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onViewHotelDetails={handleViewHotelDetails}
            formatPrice={formatPrice}
          />
        )}

        {currentView === 'details' && (
          <HotelDetailsView
            hotel={selectedHotel}
            onBack={() => setCurrentView('search')}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            nightsCount={nightsCount}
            guests={guests}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectRoomForBooking={handleSelectRoomForBooking}
            formatPrice={formatPrice}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            hotel={selectedHotel}
            room={selectedRoom}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            nightsCount={nightsCount}
            guests={guests}
            currentUser={currentUser}
            onBookingConfirmed={handleBookingConfirmed}
            onBack={(target) => setCurrentView(target || 'details')}
            formatPrice={formatPrice}
          />
        )}

        {currentView === 'my-bookings' && (
          <MyBookingsView
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onExploreStays={() => setCurrentView('search')}
            formatPrice={formatPrice}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboardView
            bookings={bookings}
            onBackToCustomerView={() => setCurrentView('home')}
            formatPrice={formatPrice}
          />
        )}
      </main>

      {/* Redesigned Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenApiStatus={() => setApiModalOpen(true)}
      />

      {/* Preserved Milestone 1 Express Health Diagnostics Modal */}
      <ApiHealthModal
        isOpen={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
        healthData={healthData}
        status={apiStatus}
        errorMsg={errorMsg}
        latency={apiLatency}
        isRefreshing={isRefreshing}
        onRefresh={fetchHealthCheck}
      />

      {/* Sign In & Registration Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 toast-notification border border-slate-800"
        >
          <span className="material-symbols-outlined text-teal-400 text-[18px]">info</span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage('')}
            type="button"
            className="ml-2 text-slate-400 hover:text-white"
            aria-label="Dismiss notification"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
