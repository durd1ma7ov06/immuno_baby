import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Plus, 
  Search,
  Syringe,
  User,
  Phone,
  AlertTriangle,
  Filter,
  X,
  MapPin,
  ClipboardList
} from 'lucide-react'

interface Appointment {
  id: number
  time: string
  patientName: string
  patientAge: string
  vaccine: string
  type: 'new' | 'repeat' | 'checkup'
  status: 'waiting' | 'in_progress' | 'completed' | 'cancelled'
  phone: string
  avatar: string
  notes?: string
}

const appointmentsData: Record<string, Appointment[]> = {
  '2025-04-05': [
    { id: 1, time: "09:00", patientName: "Oydinabonu Sobirova", patientAge: "2 oylik", vaccine: "BCG + Gepatit B", type: "new", status: "completed", phone: "+998 93 345 67 89", avatar: "👶", notes: "Normal o'tdi" },
    { id: 2, time: "09:30", patientName: "Maftunaxon Alisherova", patientAge: "7 oylik", vaccine: "Pentavalent-3", type: "repeat", status: "completed", phone: "+998 90 123 45 67", avatar: "👶" },
    { id: 3, time: "10:00", patientName: "Komiljon Umarov", patientAge: "4 oylik", vaccine: "Pentavalent-2", type: "repeat", status: "in_progress", phone: "+998 91 234 56 78", avatar: "🧒" },
    { id: 4, time: "10:30", patientName: "Sardorbek Karimov", patientAge: "4 oylik", vaccine: "Pentavalent-1", type: "new", status: "waiting", phone: "+998 94 567 89 01", avatar: "👶" },
    { id: 5, time: "11:00", patientName: "Dilfuza Qodirova", patientAge: "5 oylik", vaccine: "OPV-3", type: "repeat", status: "waiting", phone: "+998 95 678 90 12", avatar: "👧" },
    { id: 6, time: "14:00", patientName: "Kamola Tursunova", patientAge: "10 oylik", vaccine: "Tekshiruv", type: "checkup", status: "waiting", phone: "+998 95 678 90 12", avatar: "👧" },
    { id: 7, time: "14:30", patientName: "Abdullo Xolmatov", patientAge: "2 oylik", vaccine: "Pentavalent-1", type: "new", status: "waiting", phone: "+998 97 789 01 23", avatar: "👶" },
    { id: 8, time: "15:00", patientName: "Nilufar Saidova", patientAge: "12 oylik", vaccine: "MMR-1", type: "new", status: "waiting", phone: "+998 90 890 12 34", avatar: "👧" },
  ],
  '2025-04-06': [
    { id: 9, time: "09:00", patientName: "Murod Ergashev", patientAge: "3 oylik", vaccine: "Pentavalent-1", type: "new", status: "waiting", phone: "+998 91 901 23 45", avatar: "🧒" },
    { id: 10, time: "10:00", patientName: "Sabohat Mirkomilova", patientAge: "6 oylik", vaccine: "Pentavalent-3", type: "repeat", status: "waiting", phone: "+998 93 012 34 56", avatar: "👶" },
    { id: 11, time: "11:00", patientName: "Doniyor Karimov", patientAge: "18 oylik", vaccine: "DTP Buster", type: "repeat", status: "waiting", phone: "+998 94 123 45 67", avatar: "🧒" },
  ],
  '2025-04-07': [
    { id: 12, time: "09:30", patientName: "Barno Xasanova", patientAge: "1 oylik", vaccine: "Tekshiruv", type: "checkup", status: "waiting", phone: "+998 95 234 56 78", avatar: "👶" },
    { id: 13, time: "10:30", patientName: "Rustam Olimov", patientAge: "4 oylik", vaccine: "Pentavalent-2", type: "repeat", status: "waiting", phone: "+998 97 345 67 89", avatar: "🧒" },
  ],
}

const weekDays = [
  { date: '2025-04-05', day: 'Sha', num: '05', active: true },
  { date: '2025-04-06', day: 'Yak', num: '06', active: false },
  { date: '2025-04-07', day: 'Du', num: '07', active: false },
  { date: '2025-04-08', day: 'Se', num: '08', active: false },
  { date: '2025-04-09', day: 'Chor', num: '09', active: false },
  { date: '2025-04-10', day: 'Pay', num: '10', active: false },
  { date: '2025-04-11', day: 'Ju', num: '11', active: false },
]

export const Appointments = ({ t }: { t: any }) => {
  const [selectedDate, setSelectedDate] = useState('2025-04-05')
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'waiting' | 'completed'>('all')

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
  }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }

  const todayAppointments = appointmentsData[selectedDate] || []
  const filtered = todayAppointments.filter(a => {
    if (statusFilter === 'waiting') return a.status === 'waiting' || a.status === 'in_progress'
    if (statusFilter === 'completed') return a.status === 'completed'
    return true
  })

  const allAppointments = Object.values(appointmentsData).flat()
  const totalToday = todayAppointments.length
  const completedToday = todayAppointments.filter(a => a.status === 'completed').length
  const waitingToday = todayAppointments.filter(a => a.status === 'waiting' || a.status === 'in_progress').length

  const statusConfig = {
    waiting: { bg: 'bg-amber-100', text: 'text-amber-600', label: 'Kutmoqda', icon: Clock },
    in_progress: { bg: 'bg-blue-100', text: 'text-blue-600', label: 'Jarayonda', icon: Syringe },
    completed: { bg: 'bg-emerald-100', text: 'text-emerald-600', label: 'Bajarildi', icon: CheckCircle2 },
    cancelled: { bg: 'bg-slate-100', text: 'text-slate-500', label: 'Bekor', icon: X },
  }

  const typeConfig = {
    new: { bg: 'bg-rose-100', text: 'text-rose-600', label: 'Yangi' },
    repeat: { bg: 'bg-blue-100', text: 'text-blue-600', label: 'Takroriy' },
    checkup: { bg: 'bg-violet-100', text: 'text-violet-600', label: 'Tekshiruv' },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-7 pb-10">
      
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "Bugungi navbat", val: totalToday.toString(), icon: Calendar, gradient: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/15" },
          { label: "Kutmoqda", val: waitingToday.toString(), icon: Clock, gradient: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/15" },
          { label: "Bajarildi", val: completedToday.toString(), icon: CheckCircle2, gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/15" },
          { label: "Jami haftalik", val: allAppointments.length.toString(), icon: ClipboardList, gradient: "from-violet-500 to-purple-500", shadow: "shadow-violet-500/15" },
        ].map((s, i) => (
          <motion.div 
            variants={item}
            key={i} 
            className={`bg-gradient-to-br ${s.gradient} p-6 rounded-[2rem] text-white shadow-2xl ${s.shadow} relative overflow-hidden group`}
          >
            <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-white/8 rounded-full blur-xl group-hover:scale-[2] transition-transform duration-700" />
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

      {/* Date Selector */}
      <motion.div variants={item} className="flex gap-2.5">
        {weekDays.map(d => (
          <button
            key={d.date}
            onClick={() => { setSelectedDate(d.date); setSelectedAppointment(null) }}
            className={`flex-1 py-4 rounded-2xl text-center transition-all duration-300 ${
              selectedDate === d.date
                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/20'
                : 'bg-white/60 border border-slate-100/50 text-slate-400 hover:bg-white hover:shadow-sm'
            }`}
          >
            <p className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${selectedDate === d.date ? 'opacity-60' : ''}`}>{d.day}</p>
            <p className="text-lg font-extrabold">{d.num}</p>
            {appointmentsData[d.date] && (
              <div className="flex justify-center mt-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${selectedDate === d.date ? 'bg-white' : 'bg-blue-400'}`} />
              </div>
            )}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-12 gap-7">
        {/* APPOINTMENTS LIST */}
        <div className="col-span-8 space-y-5">
          {/* Filter Bar */}
          <div className="flex items-center gap-2">
            {[
              { key: 'all' as const, label: 'Barchasi' },
              { key: 'waiting' as const, label: 'Kutmoqda' },
              { key: 'completed' as const, label: 'Bajarildi' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setStatusFilter(f.key)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  statusFilter === f.key
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/15'
                    : 'bg-white/60 border border-slate-100/50 text-slate-400 hover:bg-white hover:text-slate-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-2.5">
            <AnimatePresence mode="popLayout">
              {filtered.map((appt, i) => {
                const stConfig = statusConfig[appt.status]
                const tpConfig = typeConfig[appt.type]
                const StIcon = stConfig.icon

                return (
                  <motion.div
                    key={appt.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setSelectedAppointment(appt)}
                    className={`glass-panel rounded-2xl p-5 cursor-pointer group hover:shadow-lg transition-all duration-300 ${
                      selectedAppointment?.id === appt.id ? 'ring-2 ring-blue-300 bg-blue-50/30' : ''
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      {/* Time */}
                      <div className="text-center min-w-[60px] shrink-0">
                        <p className="text-lg font-extrabold text-slate-800">{appt.time}</p>
                        <p className="text-[9px] font-bold text-slate-300 uppercase">soat</p>
                      </div>

                      {/* Divider */}
                      <div className={`w-1 h-14 rounded-full ${
                        appt.status === 'completed' ? 'bg-emerald-400' : 
                        appt.status === 'in_progress' ? 'bg-blue-400' : 'bg-amber-300'
                      }`} />

                      {/* Patient Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-1">
                          <span className="text-lg">{appt.avatar}</span>
                          <h4 className="font-bold text-[14px] text-slate-800 group-hover:text-blue-600 transition-colors truncate">{appt.patientName}</h4>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                          <span>{appt.patientAge}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Syringe size={10} />
                            <span>{appt.vaccine}</span>
                          </div>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2.5 py-1 rounded-lg text-[8px] font-bold uppercase ${tpConfig.bg} ${tpConfig.text}`}>
                          {tpConfig.label}
                        </span>
                        <span className={`px-2.5 py-1 rounded-lg text-[8px] font-bold uppercase flex items-center gap-1 ${stConfig.bg} ${stConfig.text}`}>
                          <StIcon size={10} /> {stConfig.label}
                        </span>
                      </div>

                      <ChevronRight size={14} className="text-slate-200 group-hover:text-blue-400 transition-colors shrink-0" />
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="glass-panel rounded-[2.5rem] p-16 text-center">
                <Calendar size={44} className="text-slate-200 mx-auto mb-4" />
                <p className="text-lg font-extrabold text-slate-300">Bu kunga navbat yo'q</p>
                <p className="text-xs font-medium text-slate-300 mt-2">Boshqa kunni tanlang</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Selected Appointment Detail */}
        <div className="col-span-4 space-y-5">
          <AnimatePresence mode="wait">
            {selectedAppointment ? (
              <motion.div
                key={selectedAppointment.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-5"
              >
                <div className="glass-panel rounded-[2.5rem] p-7 relative">
                  <button 
                    onClick={() => setSelectedAppointment(null)}
                    className="absolute top-5 right-5 p-2 text-slate-300 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all"
                  >
                    <X size={16} />
                  </button>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mx-auto mb-3">
                      {selectedAppointment.avatar}
                    </div>
                    <h3 className="text-[16px] font-extrabold text-slate-800 tracking-tight">{selectedAppointment.patientName}</h3>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">{selectedAppointment.patientAge}</p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/60 border border-slate-100/50">
                      <div className="flex items-center gap-2.5">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-[11px] font-medium text-slate-600">Soat</span>
                      </div>
                      <span className="text-sm font-extrabold text-slate-800">{selectedAppointment.time}</span>
                    </div>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/60 border border-slate-100/50">
                      <div className="flex items-center gap-2.5">
                        <Syringe size={14} className="text-slate-400" />
                        <span className="text-[11px] font-medium text-slate-600">Vaksina</span>
                      </div>
                      <span className="text-sm font-bold text-slate-800">{selectedAppointment.vaccine}</span>
                    </div>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/60 border border-slate-100/50">
                      <div className="flex items-center gap-2.5">
                        <Phone size={14} className="text-slate-400" />
                        <span className="text-[11px] font-medium text-slate-600">Telefon</span>
                      </div>
                      <span className="text-sm font-medium text-blue-500">{selectedAppointment.phone}</span>
                    </div>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/60 border border-slate-100/50">
                      <div className="flex items-center gap-2.5">
                        <User size={14} className="text-slate-400" />
                        <span className="text-[11px] font-medium text-slate-600">Turi</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase ${typeConfig[selectedAppointment.type].bg} ${typeConfig[selectedAppointment.type].text}`}>
                        {typeConfig[selectedAppointment.type].label}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-2.5">
                    {selectedAppointment.status === 'waiting' && (
                      <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[11px] uppercase tracking-wider shadow-lg shadow-blue-600/15 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <Syringe size={15} /> Emlashni boshlash
                      </button>
                    )}
                    {selectedAppointment.status === 'in_progress' && (
                      <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-[11px] uppercase tracking-wider shadow-lg shadow-emerald-500/15 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <CheckCircle2 size={15} /> Yakunlash
                      </button>
                    )}
                    {selectedAppointment.status === 'completed' && selectedAppointment.notes && (
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
                        <p className="text-[10px] font-bold text-emerald-700 uppercase mb-1">Izoh</p>
                        <p className="text-[11px] text-emerald-600 font-medium">{selectedAppointment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                <div className="glass-panel rounded-[2.5rem] p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-500">
                      <ClipboardList size={18} />
                    </div>
                    <h4 className="text-[14px] font-extrabold text-slate-800">Navbatlar</h4>
                  </div>
                  <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/15 hover:scale-[1.02] active:scale-[0.98] transition-all group">
                    <div className="flex items-center gap-3">
                      <Plus size={18} />
                      <span className="font-bold text-[11px] uppercase tracking-wider">Yangi navbat</span>
                    </div>
                    <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] font-medium text-slate-400 mt-4 text-center">
                    Navbatni tanlang — batafsil ma'lumot
                  </p>
                </div>

                {/* Today's Progress */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-7 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
                  <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/8 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-5">Bugungi natija</h4>
                    <div className="flex items-end gap-3 mb-4">
                      <span className="text-4xl font-extrabold">
                        {totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0}%
                      </span>
                      <span className="text-xs font-medium opacity-50 mb-1.5">bajarildi</span>
                    </div>
                    <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: totalToday > 0 ? `${(completedToday / totalToday) * 100}%` : '0%' }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        className="h-full bg-white/90 rounded-full"
                      />
                    </div>
                    <p className="text-[10px] font-medium opacity-50">
                      {totalToday} ta navbatdan {completedToday} ta bajarildi
                    </p>
                  </div>
                </div>

                {/* Upcoming alert */}
                {todayAppointments.filter(a => a.status === 'waiting' || a.status === 'in_progress').length > 0 && (
                  <div className="bg-amber-50 border border-amber-100/80 rounded-[2rem] p-6">
                    <h4 className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <AlertTriangle size={13} className="text-amber-500" /> Navbatda
                    </h4>
                    <div className="space-y-2">
                      {todayAppointments.filter(a => a.status === 'waiting' || a.status === 'in_progress').slice(0, 3).map(a => (
                        <div key={a.id} className="flex items-center gap-3 p-2.5 bg-white/80 rounded-xl">
                          <span className="text-sm font-extrabold text-slate-700">{a.time}</span>
                          <span className="text-[11px] font-medium text-slate-600 truncate">{a.patientName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
