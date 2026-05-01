const DEFAULT_DEV_API_BASE = 'http://localhost:5000';
const DEFAULT_PROD_API_BASE = 'https://powerpulseproo-backend.onrender.com';

function inferBackendBaseFromFrontendHost(hostname) {
  if (!hostname || typeof hostname !== 'string') return null;

  if (/^localhost(:\d+)?$/.test(hostname) || /^127\.0\.0\.1(:\d+)?$/.test(hostname)) {
    return DEFAULT_DEV_API_BASE;
  }

  if (/^powerpulseproo(?:-[a-z0-9]+)?\.onrender\.com$/i.test(hostname)
    || /^powerpulsepro-api(?:-[a-z0-9]+)?\.onrender\.com$/i.test(hostname)) {
    return DEFAULT_PROD_API_BASE;
  }

  return null;
}

export function getApiBaseUrl() {
  const browserHostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const inferredApiBase = inferBackendBaseFromFrontendHost(browserHostname);
  // Prefer explicit Vite env VITE_API_URL (user-provided full API base, may include /api)
  const explicitUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;

  let apiBase = explicitUrl || inferredApiBase || (import.meta.env.DEV ? DEFAULT_DEV_API_BASE : DEFAULT_PROD_API_BASE);
  // Normalize trailing slash
  apiBase = apiBase.replace(/\/$/, '');

  return apiBase;
}

export function getApiUrl(path = '') {
  const normalizedPath = path
    ? (path.startsWith('/') ? path : `/${path}`)
    : '';

  // If user supplied a VITE_API_URL that already contains '/api', avoid duplicating
  const base = getApiBaseUrl();
  if (/\/api(\/|$)/i.test(base)) {
    return `${base.replace(/\/$/, '')}${normalizedPath}`;
  }

  return `${base.replace(/\/$/, '')}/api${normalizedPath}`;
}