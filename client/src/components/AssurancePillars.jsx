import { ASSURANCE_PILLARS } from '../data/mockData';

export function AssurancePillars() {
  return (
    <section className="w-full bg-slate-50 border-b border-slate-200/80 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
            Why Book With StayNest
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed for stress-free hotel reservations
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every booking is backed by verified standards, clear policies, and round-the-clock support
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ASSURANCE_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col items-start"
            >
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[24px]">{pillar.icon}</span>
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-1.5">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
