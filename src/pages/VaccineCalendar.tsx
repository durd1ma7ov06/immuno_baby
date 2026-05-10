import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Syringe, CheckCircle2, Clock, AlertTriangle, Calendar, Star, Info } from 'lucide-react'

interface VaccineEvent {
  date: number
  name: string
  status: 'completed' | 'pending' | 'overdue'
}

const vaccineSchedule: Record<string, VaccineEvent[]> = {
  '2024-10': [
    { date: 15, name: 'BCG', status: 'completed' },
    { date: 15, name: 'Gepatit B (1)', status: 'completed' },
  ],
  '2024-12': [
    { date: 5, name: 'Pentavalent-1', status: 'completed' },
    { date: 5, name: 'OPV-1', status: 'completed' },
  ],
  '2025-02': [
    { date: 5, name: 'Pentavalent-2', status: 'completed' },
    { date: 5, name: 'OPV-2', status: 'completed' },
  ],
  '2025-04': [
    { date: 5, name: 'Pentavalent-3', status: 'pending' },
    { date: 5, name: 'OPV-3', status: 'pending' },
  ],
  '2025-05': [
    { date: 15, name: 'Gepatit B (2)', status: 'pending' },
  ],
  '2025-10': [
    { date: 15, name: 'MMR-1', status: 'pending' },
    { date: 15, name: 'Varicella', status: 'pending' },
  ],
  '2026-04': [
    { date: 15, name: 'DTP Buster', status: 'pending' },
    { date: 15, name: 'OPV Buster', status: 'pending' },
  ],
}

const nationalSchedule = [
  { age: "Tug'ilganda", vaccines: ["BCG", "Gepatit B (1-doza)"], done: true },
  { age: "2 oylik", vaccines: ["Pentavalent-1", "OPV-1"], done: true },
  { age: "3 oylik", vaccines: ["Pentavalent-2", "OPV-2"], done: true },
  { age: "4 oylik", vaccines: ["Pentavalent-3", "OPV-3"], done: false },
  { age: "12 oylik", vaccines: ["MMR-1", "Varicella"], done: false },
  { age: "18 oylik", vaccines: ["DTP Buster", "OPV Buster"], done: false },
  { age: "6 yoshda", vaccines: ["MMR-2", "DTP-2 Buster"], done: false },
]

export const VaccineCalendar = ({ t }: { t: any }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)) // April 2025
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1
  
  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`
  const events = vaccineSchedule[monthKey] || []
  
  const prevMonth = () => { setCurrentDate(new Date(year, month - 1, 1)); setSelectedDay(null) }
  const nextMonth = () => { setCurrentDate(new Date(year, month + 1, 1)); setSelectedDay(null) }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
  }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }

  const getEventForDay = (day: number) => events.filter(e => e.date === day)
  
  const selectedDayEvents = selectedDay ? getEventForDay(selectedDay) : []
  
  const statusConfig = {
    completed: { bg: 'bg-emerald-500', ring: 'ring-emerald-200', text: 'text-emerald-600', light: 'bg-emerald-50', label: t.completed },
    pending: { bg: 'bg-amber-500', ring: 'ring-amber-200', text: 'text-amber-600', light: 'bg-amber-50', label: t.upcoming },
    overdue: { bg: 'bg-rose-500', ring: 'ring-rose-200', text: 'text-rose-600', light: 'bg-rose-50', label: t.overdue_vaccines },
  }

  const completedCount = Object.values(vaccineSchedule).flat().filter(e => e.status === 'completed').length
  const totalCount = Object.values(vaccineSchedule).flat().length
  const pendingCount = totalCount - completedCount

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-7 pb-10">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-3 gap-5">
        {[
          { label: t.total_vaccines || "Jami emlashlar", val: totalCount.toString(), icon: Syringe, color: "from-brand-500 to-brand-400", shadow: "shadow-brand" },
          { label: t.completed_vaccines || "Bajarilgan", val: completedCount.toString(), icon: CheckCircle2, color: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20" },
          { label: t.pending_vaccines || "Kutilayotgan", val: pendingCount.toString(), icon: Clock, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" },
        ].map((s, i) => (
          <motion.div key={i} variants={item} className={`bg-gradient-to-br ${s.color} p-6 rounded-[2rem] text-white shadow-2xl ${s.shadow} relative overflow-hidden group`}>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/8 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-3xl font-extrabold tracking-tight">{s.val}</p>
                <p className="text-[10px] font-medium uppercase tracking-wider mt-1 opacity-70">{s.label}</p>
              </div>
              <div className="p-3 bg-white/12 rounded-xl backdrop-blur-sm">
                <s.icon size={22} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-7">
        {/* CALENDAR */}
        <div className="col-span-8">
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-9">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-brand">
                  <Calendar size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
                    {t.months_full?.[month] || t.months?.[month]} {year}
                  </h3>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">{t.calendar}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={prevMonth} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:bg-brand-50 hover:border-brand-100 transition-all duration-300">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={nextMonth} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:bg-brand-50 hover:border-brand-100 transition-all duration-300">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {(t.days_short || ["Du", "Se", "Chor", "Pay", "Ju", "Sha", "Yak"]).map((d: string, i: number) => (
                <div key={i} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dayEvents = getEventForDay(day)
                const isToday = day === 5 && month === 3 && year === 2025
                const hasEvent = dayEvents.length > 0
                const isSelected = selectedDay === day
                
                return (
                  <motion.div
                    key={day}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setSelectedDay(isSelected ? null : day)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center relative cursor-pointer transition-all duration-300 ${
                      isToday 
                        ? 'bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-xl shadow-brand ring-3 ring-brand-100' 
                        : isSelected
                          ? 'bg-brand-50 border-2 border-brand-300 text-brand-600'
                          : hasEvent 
                            ? 'bg-slate-50/80 border border-slate-100/80 hover:bg-white hover:shadow-md' 
                            : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <span className={`text-[13px] font-bold ${isToday ? 'text-white' : isSelected ? 'text-brand-600' : 'text-slate-700'}`}>{day}</span>
                    {hasEvent && (
                      <div className="flex gap-1 mt-1">
                        {dayEvents.map((e, idx) => (
                          <div key={idx} className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white' : statusConfig[e.status].bg}`} />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Selected Day Details */}
            {selectedDay && selectedDayEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8 p-5 rounded-2xl bg-brand-50/50 border border-brand-100"
              >
                <h4 className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-3">
                  {selectedDay}-{t.months_full?.[month] || t.months?.[month]} emlanishlari
                </h4>
                <div className="space-y-2">
                  {selectedDayEvents.map((e, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/80">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${statusConfig[e.status].light} ${statusConfig[e.status].text}`}>
                          {e.status === 'completed' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                        </div>
                        <span className="font-semibold text-sm text-slate-700">{e.name}</span>
                      </div>
                      <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-full ${
                        e.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {statusConfig[e.status].label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Events for this month */}
            {events.length > 0 && !selectedDay && (
              <div className="mt-8 space-y-2.5">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Bu oydagi emlashlar
                </h4>
                {events.map((e, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50/60 border border-slate-100/50 hover:bg-white hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${statusConfig[e.status].light} ${statusConfig[e.status].text}`}>
                        {e.status === 'completed' ? <CheckCircle2 size={17} /> : 
                         e.status === 'pending' ? <Clock size={17} /> : <AlertTriangle size={17} />}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-700">{e.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                          {e.date}-{t.months_full?.[month] || t.months?.[month]}, {year}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase ${
                      e.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 
                      e.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {statusConfig[e.status].label}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-4 space-y-7">
          {/* National Calendar */}
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-7">
            <div className="flex items-center gap-3 mb-7">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-500">
                <Star size={18} />
              </div>
              <div>
                <h3 className="text-[15px] font-extrabold text-slate-800 tracking-tight">Milliy Taqvim</h3>
                <p className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">O'zbekiston standarti</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {nationalSchedule.map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className={`p-3.5 rounded-xl border transition-all duration-300 ${
                    s.done 
                      ? 'bg-emerald-50/50 border-emerald-100/80' 
                      : 'bg-slate-50/50 border-slate-100/80 hover:bg-white hover:shadow-sm cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${s.done ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {s.age}
                    </span>
                    {s.done ? (
                      <CheckCircle2 size={13} className="text-emerald-500" />
                    ) : (
                      <Clock size={13} className="text-slate-300" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.vaccines.map((v, vi) => (
                      <span key={vi} className={`text-[9px] font-semibold px-2 py-0.5 rounded-md ${
                        s.done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {v}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stat Summary */}
          <motion.div variants={item} className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-7 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/8 rounded-full blur-2xl" />
            <Syringe className="absolute right-5 top-5 opacity-5" size={50} />
            <div className="relative z-10 space-y-5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-60">Umumiy holat</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 text-center border border-white/5">
                  <p className="text-2xl font-extrabold">{completedCount}</p>
                  <p className="text-[9px] font-medium opacity-60 uppercase mt-0.5">{t.completed}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 text-center border border-white/5">
                  <p className="text-2xl font-extrabold">{pendingCount}</p>
                  <p className="text-[9px] font-medium opacity-60 uppercase mt-0.5">{t.upcoming}</p>
                </div>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round((completedCount / totalCount) * 100)}%` }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="h-full bg-white/90 rounded-full"
                />
              </div>
              <p className="text-[10px] font-medium opacity-50 text-center">
                {totalCount} ta emlashdan {completedCount} tasi bajarildi ({Math.round((completedCount / totalCount) * 100)}%)
              </p>
            </div>
          </motion.div>

          {/* Info Tip */}
          <motion.div variants={item} className="premium-gradient-dark rounded-[2rem] p-6 text-white relative overflow-hidden">
            <Info className="absolute -right-3 -bottom-3 text-white/5" size={60} />
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">Ma'lumot</h4>
              <p className="text-[12px] font-medium leading-relaxed text-white/60 italic">
                "Emlash taqvimiga rioya qilish farzandingizni 13 xil xavfli kasallikdan himoya qiladi."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
