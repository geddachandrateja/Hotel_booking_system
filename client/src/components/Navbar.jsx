import { useState, useEffect, useRef } from 'react';
import { StayNestLogo } from './StayNestLogo';
import { CURRENCIES } from '../data/mockData';

export function Navbar({
  currentView,
  onNavigate,
  selectedCurrency,
  onSelectCurrency,
  currentUser,
  onOpenAuth,
  onSignOut,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currencyRef = useRef(null);
  const userRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setCurrencyDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Subtle header shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 bg-white transition-all duration-200 border-b ${
        isScrolled
          ? 'border-slate-200 shadow-sm'
          : 'border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          type="button"
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg p-1 group shrink-0"
          aria-label="StayNest Home"
        >
          <StayNestLogo size="md" showTagline={true} />
        </button>

        {/* Primary Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => onNavigate('home')}
            type="button"
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
              currentView === 'home'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Stays
          </button>

          <button
            onClick={() => onNavigate('search')}
            type="button"
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
              currentView === 'search'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Explore Hotels
          </button>

          <a
            href="#destinations"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors whitespace-nowrap"
          >
            Destinations
          </a>

          <a
            href="#deals"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors whitespace-nowrap"
          >
            Offers
          </a>

          <button
            onClick={() => onNavigate('my-bookings')}
            type="button"
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
              currentView === 'my-bookings'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            My Bookings
          </button>
        </nav>

        {/* Right Tools & User Authentication Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Currency Switcher */}
          <div className="relative" ref={currencyRef}>
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              type="button"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
              aria-label="Select Currency"
            >
              <span className="material-symbols-outlined text-[17px] text-teal-700">payments</span>
              <span>{selectedCurrency.code}</span>
              <span className="material-symbols-outlined text-[14px] text-slate-400">arrow_drop_down</span>
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Currency
                </div>
                {CURRENCIES.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      onSelectCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    type="button"
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      curr.code === selectedCurrency.code
                        ? 'font-bold text-teal-700 bg-teal-50/50'
                        : 'text-slate-700'
                    }`}
                  >
                    <span>{curr.name}</span>
                    <span className="font-mono text-slate-500 font-semibold">{curr.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Account Controls */}
          {currentUser ? (
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-800"
              >
                <div className="w-6 h-6 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-[11px]">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline">{currentUser.name}</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">arrow_drop_down</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('my-bookings');
                      setUserDropdownOpen(false);
                    }}
                    type="button"
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[17px] text-teal-700">receipt_long</span>
                    <span>My Bookings</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('admin');
                      setUserDropdownOpen(false);
                    }}
                    type="button"
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[17px] text-teal-700">dashboard</span>
                    <span>Admin Operations</span>
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    onClick={() => {
                      onSignOut();
                      setUserDropdownOpen(false);
                    }}
                    type="button"
                    className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                  >
                    <span className="material-symbols-outlined text-[17px] text-red-600">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('Sign In')}
                type="button"
                className="px-3 sm:px-3.5 py-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('Register')}
                type="button"
                className="px-3.5 sm:px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs whitespace-nowrap"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors ml-1"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-5 py-4 shadow-lg animate-slide-down">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              type="button"
              className="text-left px-3 py-2.5 rounded-lg text-slate-800 font-semibold text-sm hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Stays</span>
              <span className="material-symbols-outlined text-[18px] text-teal-700">hotel</span>
            </button>
            <button
              onClick={() => {
                onNavigate('search');
                setMobileMenuOpen(false);
              }}
              type="button"
              className="text-left px-3 py-2.5 rounded-lg text-slate-800 font-semibold text-sm hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Explore All Hotels</span>
              <span className="material-symbols-outlined text-[18px] text-teal-700">travel_explore</span>
            </button>
            <a
              href="#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-slate-800 font-semibold text-sm hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Popular Destinations</span>
              <span className="material-symbols-outlined text-[18px] text-teal-700">location_on</span>
            </a>
            <a
              href="#deals"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-slate-800 font-semibold text-sm hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Special Offers</span>
              <span className="material-symbols-outlined text-[18px] text-teal-700">local_offer</span>
            </a>
            <button
              onClick={() => {
                onNavigate('my-bookings');
                setMobileMenuOpen(false);
              }}
              type="button"
              className="text-left px-3 py-2.5 rounded-lg text-slate-800 font-semibold text-sm hover:bg-slate-50 flex items-center justify-between"
            >
              <span>My Bookings</span>
              <span className="material-symbols-outlined text-[18px] text-teal-700">receipt_long</span>
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              type="button"
              className="text-left px-3 py-2.5 rounded-lg text-slate-800 font-semibold text-sm hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Admin Operations</span>
              <span className="material-symbols-outlined text-[18px] text-teal-700">admin_panel_settings</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
