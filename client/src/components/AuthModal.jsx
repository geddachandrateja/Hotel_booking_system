import { useState } from 'react';

export function AuthModal({ isOpen, onClose, initialMode = 'Sign In', onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'Register' && !name.trim()) {
      setError('Please provide your full name.');
      return;
    }

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    // Successful authentication simulation
    const user = {
      name: mode === 'Register' ? name : email.split('@')[0].replace('.', ' '),
      email: email,
    };

    onLoginSuccess(user);
    onClose();
  };

  const handleQuickDemoLogin = () => {
    onLoginSuccess({
      name: 'Chandra Sharma',
      email: 'chandra@example.com',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-slate-200 p-6 sm:p-7 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Tabs */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 id="auth-modal-title" className="text-xl font-bold text-slate-900">
              {mode === 'Register' ? 'Create StayNest Account' : 'Welcome back'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Access your reservations, wishlist, and member rates
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => { setMode('Sign In'); setError(''); }}
            className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
              mode === 'Sign In' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('Register'); setError(''); }}
            className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
              mode === 'Register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'Register' && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Chandra Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Toggle password visibility"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors shadow-xs"
          >
            {mode === 'Register' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 rounded-xl border border-teal-200 bg-teal-50/50 hover:bg-teal-100/60 text-teal-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">account_circle</span>
            <span>Quick Demo Login (Chandra Sharma)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
