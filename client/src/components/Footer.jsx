import { StayNestLogo } from './StayNestLogo';
import { BRAND_INFO } from '../data/mockData';

export function Footer({ onNavigate, onOpenApiStatus }) {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Main Directory Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="text-left">
              <StayNestLogo size="md" showTagline={false} inverted={true} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated hotel discovery and seamless booking platform connecting discerning travelers with handpicked sanctuaries worldwide.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p>Email: <a href={`mailto:${BRAND_INFO.contactEmail}`} className="text-slate-300 hover:text-white underline">{BRAND_INFO.contactEmail}</a></p>
              <p>Tel: {BRAND_INFO.contactPhone}</p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">Explore StayNest</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home & Stays</button></li>
              <li><button onClick={() => onNavigate('search')} className="hover:text-white transition-colors">All Hotel Inventory</button></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Popular Destinations</a></li>
              <li><a href="#deals" className="hover:text-white transition-colors">Member Offers</a></li>
              <li><button onClick={() => onNavigate('my-bookings')} className="hover:text-white transition-colors">My Bookings</button></li>
            </ul>
          </div>

          {/* Column 3: Top Destinations */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">Top Destinations</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('search', { city: 'Goa' })} className="hover:text-white transition-colors">Hotels in Goa</button></li>
              <li><button onClick={() => onNavigate('search', { city: 'Bengaluru' })} className="hover:text-white transition-colors">Hotels in Bengaluru</button></li>
              <li><button onClick={() => onNavigate('search', { city: 'Hyderabad' })} className="hover:text-white transition-colors">Hotels in Hyderabad</button></li>
              <li><button onClick={() => onNavigate('search', { city: 'Dubai' })} className="hover:text-white transition-colors">Resorts in Dubai</button></li>
              <li><button onClick={() => onNavigate('search', { city: 'Bali' })} className="hover:text-white transition-colors">Villas in Bali</button></li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">Support & Policies</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#featured-stays" className="hover:text-white transition-colors">Verified Property Standards</a></li>
              <li><a href="#featured-stays" className="hover:text-white transition-colors">Cancellation Guidelines</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#trust" className="hover:text-white transition-colors">Security & Trust</a></li>
            </ul>
          </div>

          {/* Column 5: Administration & Dev Diagnostics */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">Platform Operations</h4>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => onNavigate('admin')}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-between transition-colors border border-slate-800"
              >
                <span>Admin Management</span>
                <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              </button>

              {/* Preserved Milestone 1 Express Health Diagnostics Trigger */}
              <button
                onClick={onOpenApiStatus}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-between transition-colors border border-slate-800"
                title="View Express Backend Diagnostics"
              >
                <span>Express API Diagnostics</span>
                <span className="material-symbols-outlined text-[16px] text-teal-500">terminal</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal pt-1">
              StayNest MERN Platform Architecture. Express reverse proxy active on port 5000.
            </p>
          </div>
        </div>

        {/* Sub-footer Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {BRAND_INFO.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-teal-600">lock</span>
              <span>256-Bit SSL Secured</span>
            </span>
            <span>Placement Portfolio Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
