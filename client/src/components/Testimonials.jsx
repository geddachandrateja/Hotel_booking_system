import { TESTIMONIALS } from '../data/mockData';

export function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
            Guest Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Real guest experiences
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Recent verified guest reviews from travelers who reserved their stays through StayNest
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 self-start sm:self-end">
          <span className="text-xs font-bold text-slate-900">4.9 / 5 Guest Rating</span>
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined text-[17px]">
                star
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[17px]">
                    star
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                {review.quote}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                {review.initials}
              </div>
              <div className="truncate">
                <p className="font-bold text-xs text-slate-900">{review.author}</p>
                <p className="text-[11px] text-slate-500 truncate">{review.stayLocation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
