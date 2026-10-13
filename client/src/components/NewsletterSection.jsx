import { useState } from 'react';

export function NewsletterSection({ onShowToast }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitted(true);
    onShowToast(`Subscribed! Travel offers will be delivered to ${email}.`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <span className="text-teal-400 font-bold text-xs uppercase tracking-wider block mb-2">
            StayNest Insider
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Receive exclusive secret sales & destination guides
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Get early access to private hotel rate reductions, seasonal weekend discounts, and insider travel tips.
          </p>
        </div>

        <div className="w-full md:max-w-md">
          {submitted ? (
            <div className="bg-teal-900/50 border border-teal-500/50 p-4 rounded-xl flex items-center gap-3 text-teal-200">
              <span className="material-symbols-outlined text-[24px] text-teal-400">check_circle</span>
              <div className="text-xs">
                <span className="font-bold block text-white">Thank you for subscribing!</span>
                Check your inbox shortly for your exclusive member welcome voucher.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-slate-400 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  aria-label="Email address for travel deals"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors shrink-0 shadow-sm"
              >
                Subscribe
              </button>
            </form>
          )}

          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          <p className="text-[11px] text-slate-400 mt-2.5 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>We value your privacy. Unsubscribe anytime with one click.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
