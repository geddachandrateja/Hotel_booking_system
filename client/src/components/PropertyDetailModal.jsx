export function PropertyDetailModal({ property, onClose, formatPrice, onBookNow }) {
  if (!property) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-property-title"
    >
      <div
        className="bg-surface-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border-hairline p-6 sm:p-8 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider">
              {property.tier}
            </span>
            <h2 id="modal-property-title" className="text-2xl font-bold text-on-surface mt-2">
              {property.title}
            </h2>
            <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[16px] text-teal-dark">pin_drop</span>
              <span>{property.location}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-9 h-9 rounded-full bg-surface-subtle hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 shadow-sm">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-surface-card/90 backdrop-blur-md text-xs font-bold text-on-surface flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-amber-rich text-[16px]">star</span>
            <span>{property.ratingScore} ({property.ratingLabel})</span>
          </div>
        </div>

        {/* Description & Narrative */}
        <div className="space-y-4 mb-6">
          <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider">
            Property Overview
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {property.description}
          </p>

          {/* Stated Amenities */}
          <div>
            <h4 className="font-semibold text-xs text-on-surface uppercase tracking-wider mb-2">
              Highlighted Amenities
            </h4>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-surface-subtle border border-border-hairline text-xs font-medium text-navy-muted flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px] text-teal-dark">check_circle</span>
                  <span>{amenity}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio / Honest Notice */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs flex items-start gap-2.5 mb-6">
          <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0">info</span>
          <div>
            <span className="font-bold">Portfolio Milestone 2: </span>
            <span>
              Real-time payment processing and guest check-in dispatch are scheduled for Milestone 4. This modal showcases genuine frontend state orchestration.
            </span>
          </div>
        </div>

        {/* Price & Booking Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border-hairline">
          <div>
            <span className="text-xs text-on-surface-variant block">Total Nightly Rate</span>
            <span className="text-2xl font-bold text-on-surface font-price-display">
              {formatPrice(property.pricePerNight)}
            </span>
            <span className="text-[11px] text-on-surface-variant block">
              + {formatPrice(property.taxPerNight)} estimated tax & fees
            </span>
          </div>
          <button
            onClick={() => onBookNow(property)}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-secondary hover:bg-teal-dark text-on-secondary font-bold text-sm shadow-md transition-all active:scale-95"
          >
            Reserve Sanctuary
          </button>
        </div>
      </div>
    </div>
  );
}
