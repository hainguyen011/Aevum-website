import { createClient } from '@supabase/supabase-js';
import { API_CONFIG } from '../config/apiConfig.js';

const supabaseUrl = API_CONFIG.SUPABASE_URL;
const supabaseAnonKey = API_CONFIG.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Anon Key is missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

