import { createClient } from '@supabase/supabase-js'

// Netlify'da .env fayllari yuklanmagani uchun oq ekran bo'lib qolmasligi maqsadida to'g'ridan-to'g'ri ulaymiz.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qqqbbdavxilljtnuaiqj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Fwn9yw8AcukZn-XqzjqzOQ_JgBbZ0sv'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
