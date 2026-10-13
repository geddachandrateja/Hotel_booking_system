export function ApiHealthModal({
  isOpen,
  onClose,
  healthData,
  status,
  errorMsg,
  latency,
  isRefreshing,
  onRefresh,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-modal-title"
    >
      <div
        className="bg-surface-card rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border-hairline p-6 sm:p-8 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-border-hairline">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-dark/10 text-teal-dark flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">terminal</span>
            </div>
            <div>
              <h2 id="api-modal-title" className="text-xl font-bold text-on-surface">
                Express Backend & Vite Proxy Diagnostics
              </h2>
              <p className="text-xs text-on-surface-variant">
                Full-stack architecture status preserved from Milestone 1
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-9 h-9 rounded-full bg-surface-subtle hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Live Health Check Card */}
        <div className="bg-surface-subtle rounded-2xl p-5 border border-border-hairline mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  status === 'connected' ? 'bg-emerald-500 animate-pulse' : status === 'loading' ? 'bg-amber-500' : 'bg-red-500'
                }`}
              />
              <span className="text-sm font-bold text-on-surface">
                {status === 'connected' ? 'Backend Online & Operational' : status === 'loading' ? 'Probing /api/health...' : 'Connection Failed'}
              </span>
            </div>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              type="button"
              className="px-3.5 py-1.5 rounded-lg bg-navy-muted hover:bg-primary-container text-white text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[16px] ${isRefreshing ? 'animate-spin' : ''}`}>
                refresh
              </span>
              <span>{isRefreshing ? 'Checking...' : 'Ping API'}</span>
            </button>
          </div>

          {/* Metric Stats */}
          {status === 'connected' && healthData && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="bg-surface-card p-3 rounded-xl border border-border-hairline">
                <span className="text-[11px] text-on-surface-variant block">Status Code</span>
                <span className="text-sm font-bold text-emerald-600">{healthData.status}</span>
              </div>
              <div className="bg-surface-card p-3 rounded-xl border border-border-hairline">
                <span className="text-[11px] text-on-surface-variant block">Response Latency</span>
                <span className="text-sm font-bold text-on-surface">{latency} ms</span>
              </div>
              <div className="bg-surface-card p-3 rounded-xl border border-border-hairline">
                <span className="text-[11px] text-on-surface-variant block">Service</span>
                <span className="text-sm font-bold text-on-surface">{healthData.data?.service || 'staynest-api'}</span>
              </div>
              <div className="bg-surface-card p-3 rounded-xl border border-border-hairline">
                <span className="text-[11px] text-on-surface-variant block">Environment</span>
                <span className="text-sm font-bold text-on-surface">{healthData.data?.environment || 'development'}</span>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl text-xs mb-3">
              <div className="font-bold">Error: {errorMsg}</div>
              <div className="text-[11px] text-on-surface-variant mt-1">
                Make sure the Express server is running on port 5000 (`npm.cmd run server`).
              </div>
            </div>
          )}

          {/* JSON Payload Display */}
          {healthData && (
            <div className="bg-navy-muted rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-sans flex items-center justify-between">
                <span>Payload: GET /api/health</span>
                <span>Proxy: http://localhost:5173 &rarr; :5000</span>
              </div>
              <pre>{JSON.stringify(healthData, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Architecture Request Lifecycle Flow */}
        <div className="border border-border-hairline rounded-2xl p-5 bg-surface-card">
          <h3 className="font-bold text-sm text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-teal-dark">schema</span>
            <span>Request Lifecycle Architecture</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-surface-subtle rounded-xl border border-border-hairline">
              <div className="font-bold text-teal-dark mb-1">1. React Client</div>
              <p className="text-on-surface-variant text-[11px]">Dispatches <code>fetch('/api/health')</code> from port 5173</p>
            </div>
            <div className="p-3 bg-surface-subtle rounded-xl border border-border-hairline">
              <div className="font-bold text-teal-dark mb-1">2. Vite Dev Proxy</div>
              <p className="text-on-surface-variant text-[11px]">Maps <code>/api/*</code> to <code>:5000</code> without CORS</p>
            </div>
            <div className="p-3 bg-surface-subtle rounded-xl border border-border-hairline">
              <div className="font-bold text-teal-dark mb-1">3. Express Router</div>
              <p className="text-on-surface-variant text-[11px]">Routes through <code>health.routes.js</code></p>
            </div>
            <div className="p-3 bg-surface-subtle rounded-xl border border-border-hairline">
              <div className="font-bold text-teal-dark mb-1">4. Controller Response</div>
              <p className="text-on-surface-variant text-[11px]">Returns uptime, ISO timestamp, and <code>HTTP 200 OK</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
