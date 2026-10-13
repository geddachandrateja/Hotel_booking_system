import { EXCLUSIVE_DEALS } from '../data/mockData';

export function ExclusiveDeals({ onCopyCode, onClaimDeal }) {
  return (
    <section id="deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      {/* Section Header */}
      <div className="mb-8">
        <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
          Special Promotions
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Seasonal travel privileges
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-xl">
          Take advantage of limited-period vouchers and early-planner savings on your next stay
        </p>
      </div>

      {/* 3 Restrained & Clean Deal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EXCLUSIVE_DEALS.map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 text-[11px] font-bold inline-block mb-3">
                {deal.badge}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {deal.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {deal.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Promo Code</span>
                <span className="font-mono text-xs font-bold text-slate-900">{deal.code}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onClaimDeal(deal)}
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-colors"
                >
                  Explore Stays
                </button>
                <button
                  onClick={() => onCopyCode(deal.code)}
                  type="button"
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1 active:scale-95"
                  title="Copy code"
                >
                  <span className="material-symbols-outlined text-[15px]">content_copy</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
