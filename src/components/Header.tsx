import { motion } from 'framer-motion'
import { Bell, Search } from 'lucide-react'

interface HeaderProps {
  title: string
  t: any
  lang: string
  setLang: (lang: string) => void
}

export const Header = ({ title, t, lang, setLang }: HeaderProps) => {
  const today = new Date()
  const dateStr = today.toLocaleDateString(lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-between items-center mb-8"
    >
      <div>
        <h1 className="text-[28px] font-extrabold text-slate-800 font-jakarta tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-[11px] font-medium text-slate-400 mt-1.5 capitalize">{dateStr}</p>
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-400 transition-colors" size={15} />
          <input 
            type="text" 
            placeholder="Qidiruv..." 
            className="pl-9 pr-4 py-2.5 bg-white/60 backdrop-blur-xl border border-white/80 rounded-xl text-xs font-medium text-slate-600 outline-none focus:bg-white/90 focus:border-brand-200 focus:shadow-sm transition-all w-44 placeholder:text-slate-300"
          />
        </div>

        {/* Language Switcher */}
        <div className="flex bg-white/60 backdrop-blur-xl border border-white/80 rounded-xl p-1 shadow-sm">
          {['uz', 'ru', 'en'].map((l) => (
            <button 
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase transition-all duration-300 ${
                lang === l 
                  ? 'bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-brand-500 hover:bg-white/50'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* System Status */}
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/80 p-2.5 rounded-xl px-4 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/30" />
          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{t.system_online}</span>
        </div>
      </div>
    </motion.div>
  )
}
