import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Bell, 
  Syringe, 
  Calendar, 
  Info, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  X,
  BellOff,
  Sparkles,
  Heart,
  ShieldCheck
} from 'lucide-react'

interface Notification {
  id: number
  type: 'vaccine' | 'checkup' | 'info' | 'alert'
  title: string
  message: string
  time: string
  read: boolean
  urgent: boolean
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'vaccine',
    title: "Pentavalent-3 Eslatmasi",
    message: "Farzandingizning navbatdagi Pentavalent-3 emlanishi 5-aprel sanasiga belgilangan. 14-sonli poliklinikaga tashrif buyuring.",
    time: "2 soat oldin",
    read: false,
    urgent: true,
  },
  {
    id: 2,
    type: 'checkup',
    title: "Oylik tekshiruv",
    message: "7 oylik davriy tekshiruv vaqti keldi. Vazn, bo'y va bosh aylanasi o'lchovlarini shifokorga ko'rsating.",
    time: "5 soat oldin",
    read: false,
    urgent: false,
  },
  {
    id: 3,
    type: 'info',
    title: "Yangi maqola: Immunitet kuchaytirish",
    message: "Bilim Markazida yangi maqola: 'Bolalarda immunitetni tabiiy yo'llar bilan kuchaytirish usullari' — hoziroq o'qing!",
    time: "1 kun oldin",
    read: false,
    urgent: false,
  },
  {
    id: 4,
    type: 'alert',
    title: "OPV-3 muddati yaqinlashmoqda",
    message: "OPV-3 vaksinasi uchun tayinlangan muddat 2 haftadan keyin tugaydi. Iltimos, tezroq shifokoringizga murojaat qiling.",
    time: "2 kun oldin",
    read: true,
    urgent: true,
  },
  {
    id: 5,
    type: 'info',
    title: "Bola ovqatlanishi haqida maslahat",
    message: "6-7 oylik bolalar uchun qo'shimcha oziq-ovqat kiritish vaqti. Kasha, meva pyuresi va sabzavotlardan boshlang.",
    time: "3 kun oldin",
    read: true,
    urgent: false,
  },
  {
    id: 6,
    type: 'vaccine',
    title: "BCG emlanishi muvaffaqiyatli",
    message: "Farzandingizning BCG va Gepatit B (1-doza) emlanishi muvaffaqiyatli yakunlandi. Keyingi tekshiruv 2 oylik sanaga belgilangan.",
    time: "5 kun oldin",
    read: true,
    urgent: false,
  },
]

export const Notifications = ({ t }: { t: any }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'vaccine' | 'info'>('all')

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read
    if (filter === 'vaccine') return n.type === 'vaccine' || n.type === 'alert'
    if (filter === 'info') return n.type === 'info' || n.type === 'checkup'
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: string) => {
    switch(type) {
      case 'vaccine': return Syringe
      case 'checkup': return Calendar
      case 'info': return Info
      case 'alert': return AlertTriangle
      default: return Bell
    }
  }

  const getColors = (type: string, urgent: boolean) => {
    if (urgent) return { bg: 'bg-rose-50', border: 'border-rose-100', icon: 'bg-rose-100 text-rose-500', badge: 'bg-rose-500' }
    switch(type) {
      case 'vaccine': return { bg: 'bg-emerald-50/50', border: 'border-emerald-100', icon: 'bg-emerald-100 text-emerald-500', badge: 'bg-emerald-500' }
      case 'checkup': return { bg: 'bg-blue-50/50', border: 'border-blue-100', icon: 'bg-blue-100 text-blue-500', badge: 'bg-blue-500' }
      case 'info': return { bg: 'bg-violet-50/50', border: 'border-violet-100', icon: 'bg-violet-100 text-violet-500', badge: 'bg-violet-500' }
      case 'alert': return { bg: 'bg-amber-50/50', border: 'border-amber-100', icon: 'bg-amber-100 text-amber-500', badge: 'bg-amber-500' }
      default: return { bg: 'bg-slate-50', border: 'border-slate-100', icon: 'bg-slate-100 text-slate-500', badge: 'bg-slate-500' }
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-7 pb-10">
      <div className="grid grid-cols-12 gap-7">
        
        {/* MAIN NOTIFICATIONS */}
        <div className="col-span-8 space-y-5">
          {/* Header & Filters */}
          <motion.div variants={item} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20">
                <Bell size={22} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">{t.notifications}</h3>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
                  {unreadCount > 0 ? `${unreadCount} ta o'qilmagan` : "Barcha o'qilgan"}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={markAllRead}
                className="text-[10px] font-bold text-violet-500 bg-violet-50 px-4 py-2 rounded-xl uppercase tracking-wider hover:bg-violet-100 transition-colors"
              >
                {t.mark_all_read}
              </button>
            )}
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={item} className="flex gap-2">
            {[
              { key: 'all', label: 'Barchasi', count: notifications.length },
              { key: 'unread', label: "O'qilmagan", count: unreadCount },
              { key: 'vaccine', label: 'Emlash', count: notifications.filter(n => n.type === 'vaccine' || n.type === 'alert').length },
              { key: 'info', label: "Ma'lumot", count: notifications.filter(n => n.type === 'info' || n.type === 'checkup').length },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as any)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  filter === f.key 
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/15' 
                    : 'bg-white/60 border border-slate-100/50 text-slate-400 hover:bg-white hover:text-slate-600 hover:shadow-sm'
                }`}
              >
                {f.label}
                <span className={`px-1.5 py-0.5 rounded-md text-[8px] ${
                  filter === f.key ? 'bg-white/20' : 'bg-slate-100'
                }`}>{f.count}</span>
              </button>
            ))}
          </motion.div>

          {/* Notification List */}
          <div className="space-y-2.5">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-panel rounded-[2.5rem] p-16 text-center"
                >
                  <BellOff size={44} className="text-slate-200 mx-auto mb-5" />
                  <p className="text-lg font-extrabold text-slate-300">{t.no_notifications}</p>
                  <p className="text-xs font-medium text-slate-300 mt-2">Hozircha bildirishnomalar yo'q</p>
                </motion.div>
              ) : (
                filtered.map((n, i) => {
                  const Icon = getIcon(n.type)
                  const colors = getColors(n.type, n.urgent && !n.read)
                  
                  return (
                    <motion.div
                      key={n.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100, scale: 0.8 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => markRead(n.id)}
                      className={`relative p-5 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all duration-300 group hover:shadow-lg ${
                        n.read 
                          ? 'bg-white/40 border-slate-100/50' 
                          : `${colors.bg} ${colors.border} shadow-sm`
                      }`}
                    >
                      {/* Unread dot */}
                      {!n.read && (
                        <div className={`absolute top-5 right-5 w-2.5 h-2.5 rounded-full ${colors.badge} animate-pulse shadow-lg`} />
                      )}
                      
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                          n.read ? 'bg-slate-100 text-slate-400' : colors.icon
                        }`}>
                          <Icon size={19} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5 mb-1">
                            <h4 className={`font-bold text-[13px] ${n.read ? 'text-slate-500' : 'text-slate-800'}`}>{n.title}</h4>
                            {n.urgent && !n.read && (
                              <span className="text-[8px] font-bold text-rose-500 bg-rose-100 px-2 py-0.5 rounded-md uppercase">Muhim</span>
                            )}
                          </div>
                          <p className={`text-[12px] leading-relaxed ${n.read ? 'text-slate-400' : 'text-slate-600'} font-medium`}>
                            {n.message}
                          </p>
                          <p className="text-[10px] font-medium text-slate-300 mt-2.5 flex items-center gap-1.5">
                            <Clock size={10} /> {n.time}
                          </p>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); dismissNotification(n.id); }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-span-4 space-y-7">
          {/* Quick Stats */}
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-7">
            <h4 className="text-[13px] font-extrabold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Sparkles size={15} className="text-violet-500" /> Tezkor ko'rish
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-rose-50/50 border border-rose-100/80">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle size={14} className="text-rose-500" />
                  <span className="text-xs font-semibold text-slate-700">Muhim</span>
                </div>
                <span className="text-lg font-extrabold text-rose-500">
                  {notifications.filter(n => n.urgent && !n.read).length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/50 border border-amber-100/80">
                <div className="flex items-center gap-2.5">
                  <Clock size={14} className="text-amber-500" />
                  <span className="text-xs font-semibold text-slate-700">Kutilmoqda</span>
                </div>
                <span className="text-lg font-extrabold text-amber-500">
                  {notifications.filter(n => !n.read).length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100/80">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span className="text-xs font-semibold text-slate-700">O'qilgan</span>
                </div>
                <span className="text-lg font-extrabold text-emerald-500">
                  {notifications.filter(n => n.read).length}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Reminders */}
          <motion.div variants={item} className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-[2.5rem] p-7 text-white shadow-2xl shadow-violet-500/20 relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/8 rounded-full blur-2xl" />
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-5">Yaqinlashayotgan</h4>
              <div className="space-y-3">
                {[
                  { icon: Syringe, name: "Pentavalent-3", date: "5-Aprel, 2025" },
                  { icon: Heart, name: "Oylik tekshiruv", date: "12-Aprel, 2025" },
                  { icon: Syringe, name: "Gepatit B (2)", date: "15-May, 2025" },
                ].map((r, i) => (
                  <div key={i} className="bg-white/8 backdrop-blur-sm rounded-xl p-3.5 border border-white/8">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <r.icon size={13} className="opacity-60" />
                      <span className="text-xs font-bold">{r.name}</span>
                    </div>
                    <p className="text-[10px] font-medium opacity-50">{r.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Info Card */}
          <motion.div variants={item} className="premium-gradient-dark rounded-[2rem] p-7 text-white relative overflow-hidden">
            <ShieldCheck className="absolute -right-3 -bottom-3 text-white/5" size={80} />
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">Xavfsizlik</h4>
              <p className="text-[11px] font-medium leading-relaxed text-white/55 italic">
                "Bildirishnomalar faqat sizning qurilmangizda ko'rinadi va hech qanday uchinchi tomon tizimiga yuborilmaydi."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
