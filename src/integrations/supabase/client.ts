
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oihmekwnemzpfcgvtttx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9paG1la3duZW16cGZjZ3Z0dHR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMzExNTcsImV4cCI6MjA2MjcwNzE1N30.miTVlFbxDdvKUt0QbbFUJwoHoPvpp2ingGGHxwqS8VA';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
