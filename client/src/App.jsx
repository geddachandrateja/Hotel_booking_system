import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [healthData, setHealthData] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'connected' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [latency, setLatency] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchHealthCheck = async () => {
    setIsRefreshing(true);
    const startTime = performance.now();
    try {
      const response = await fetch('/api/health');
      const endTime = performance.now();
      setLatency(Math.round(endTime - startTime));

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const json = await response.json();
      setHealthData(json);
      setStatus('connected');
      setErrorMsg('');
    } catch (err) {
      console.error('Failed to connect to backend:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Unable to connect to Express backend.');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHealthCheck();
  }, []);

  return (
    <div className="staynest-app">
      {/* Header / Navigation Bar */}
      <header className="navbar">
        <div className="nav-container">
          <div className="brand">
            <div className="brand-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">StayNest</span>
              <span className="brand-badge">Milestone 1</span>
            </div>
          </div>

          <div className="nav-actions">
            <span className={`status-pill ${status}`}>
              <span className="status-dot"></span>
              {status === 'connected' && 'API Operational'}
              {status === 'loading' && 'Checking API...'}
              {status === 'error' && 'API Disconnected'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="main-content">
        <div className="hero-banner">
          <div className="hero-tag">MERN Full-Stack Architecture</div>
          <h1 className="hero-title">StayNest Hotel Booking Application</h1>
          <p className="hero-subtitle">
            Enterprise-ready hotel reservation platform built with React, Node.js, Express, and MongoDB.
          </p>
        </div>

        {/* Milestone 1 Status Grid */}
        <div className="grid-container">
          {/* Card 1: Live Backend Health-Check */}
          <div className="card health-card">
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon api-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h2 className="card-title">Backend Health Check</h2>
                  <p className="card-subtitle">Verified through Vite Development Proxy</p>
                </div>
              </div>
              <button 
                className="refresh-btn" 
                onClick={fetchHealthCheck} 
                disabled={isRefreshing}
                title="Trigger health probe"
              >
                <svg className={isRefreshing ? 'spin' : ''} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 4v6h-6"></path>
                  <path d="M1 20v-6h6"></path>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                </svg>
                {isRefreshing ? 'Checking...' : 'Ping API'}
              </button>
            </div>

            <div className="health-body">
              {status === 'loading' && (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Probing backend service at <code>/api/health</code>...</p>
                </div>
              )}

              {status === 'error' && (
                <div className="error-state">
                  <div className="state-badge error">Connection Failed</div>
                  <p className="error-text">{errorMsg}</p>
                  <p className="hint">Ensure Express server is active on port 5000.</p>
                </div>
              )}

              {status === 'connected' && healthData && (
                <div className="connection-details">
                  <div className="metric-row">
                    <div className="metric-item">
                      <span className="metric-label">Status</span>
                      <span className="metric-value status-good">{healthData.status}</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Response Time</span>
                      <span className="metric-value">{latency} ms</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Service</span>
                      <span className="metric-value">{healthData.data?.service}</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Environment</span>
                      <span className="metric-value">{healthData.data?.environment}</span>
                    </div>
                  </div>

                  <div className="payload-box">
                    <div className="payload-header">
                      <span>Live Response Payload (JSON)</span>
                      <span className="proxy-tag">Proxy: http://localhost:5173/api/health &rarr; :5000</span>
                    </div>
                    <pre className="payload-content">
                      {JSON.stringify(healthData, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Request Lifecycle Flow */}
          <div className="card architecture-card">
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon flow-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="6" y1="3" x2="6" y2="15"></line>
                    <circle cx="18" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M18 9a9 9 0 0 1-9 9"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="card-title">Full-Stack Request Flow</h2>
                  <p className="card-subtitle">Architecture verified in Milestone 1</p>
                </div>
              </div>
            </div>

            <div className="flow-steps">
              <div className="flow-step">
                <div className="step-num">1</div>
                <div className="step-content">
                  <strong>React Client</strong>
                  <p>Dispatches <code>fetch('/api/health')</code> from frontend running on port 5173</p>
                </div>
              </div>

              <div className="flow-arrow">&darr;</div>

              <div className="flow-step">
                <div className="step-num">2</div>
                <div className="step-content">
                  <strong>Vite Dev Proxy</strong>
                  <p>Seamlessly routes <code>/api/*</code> to <code>http://localhost:5000</code> avoiding CORS hurdles</p>
                </div>
              </div>

              <div className="flow-arrow">&darr;</div>

              <div className="flow-step">
                <div className="step-num">3</div>
                <div className="step-content">
                  <strong>Express Middleware & Router</strong>
                  <p><code>app.js</code> maps route to <code>health.routes.js</code></p>
                </div>
              </div>

              <div className="flow-arrow">&darr;</div>

              <div className="flow-step">
                <div className="step-num">4</div>
                <div className="step-content">
                  <strong>Health Controller</strong>
                  <p><code>health.controller.js</code> compiles uptime, timestamp, and responds with <code>HTTP 200 OK</code></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Roadmap */}
        <div className="roadmap-section">
          <div className="roadmap-header">
            <h3>Milestone 1 Completed Checklist</h3>
            <span className="badge-ready">Ready for Milestone 2</span>
          </div>

          <div className="checklist-grid">
            <div className="check-item done">
              <span className="check-icon">&#10003;</span>
              <div>
                <strong>Environment & Tools Inspection</strong>
                <p>Node.js v24, npm v11, Git 2.56, GitHub CLI 2.102 verified.</p>
              </div>
            </div>

            <div className="check-item done">
              <span className="check-icon">&#10003;</span>
              <div>
                <strong>Project Directory Scaffolding</strong>
                <p>Clean root repository with <code>client/</code> and <code>server/</code> separation.</p>
              </div>
            </div>

            <div className="check-item done">
              <span className="check-icon">&#10003;</span>
              <div>
                <strong>Git Repository & Ignored Files</strong>
                <p>Git initialized on branch <code>main</code> with robust <code>.gitignore</code> and documentation.</p>
              </div>
            </div>

            <div className="check-item done">
              <span className="check-icon">&#10003;</span>
              <div>
                <strong>Express Backend Baseline</strong>
                <p>CORS, JSON parser, modular routes, centralized error handler, and <code>/api/health</code>.</p>
              </div>
            </div>

            <div className="check-item done">
              <span className="check-icon">&#10003;</span>
              <div>
                <strong>Vite Reverse Proxy</strong>
                <p>Configured <code>vite.config.js</code> to proxy <code>/api</code> requests to port 5000.</p>
              </div>
            </div>

            <div className="check-item next">
              <span className="check-icon">&rarr;</span>
              <div>
                <strong>Next: Milestone 2 — Landing Page UI</strong>
                <p>Hero banner, destination search, date range pickers, guest selectors & luxury hotel cards.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} StayNest Hospitality. Placement Portfolio Project.</p>
      </footer>
    </div>
  );
}

export default App;
