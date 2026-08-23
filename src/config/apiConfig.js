/**
 * Dynamic Environment & API Configuration for Aevum Website
 * Tự động chuyển đổi giữa Development (localhost) và Production (aevum.ai.vn)
 */

export const API_CONFIG = {
  // Aevum Cloud Backend API Base URL
  AEVUM_CLOUD_URL: (
    import.meta.env.VITE_AEVUM_CLOUD_URL ||
    (import.meta.env.PROD ? 'https://api.aevum.ai.vn' : 'http://localhost:4000')
  ).replace(/\/+$/, ''),

  // Website Public URL
  WEBSITE_URL: (
    import.meta.env.VITE_WEBSITE_URL ||
    (import.meta.env.PROD ? 'https://aevum.ai.vn' : 'http://localhost:5177')
  ).replace(/\/+$/, ''),

  // Supabase Configuration
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',

  // Environment Flags
  IS_PROD: Boolean(import.meta.env.PROD),
  IS_DEV: Boolean(import.meta.env.DEV),
  MODE: import.meta.env.MODE || 'development'
};

export default API_CONFIG;
