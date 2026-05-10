import { motion } from 'framer-motion'
import { 
  Users, 
  Calendar, 
  Clock, 
  Activity, 
  Search, 
  Plus, 
  ChevronRight, 
  MoreVertical, 
  CheckCircle2, 
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Filter,
  Syringe,
  AlertTriangle
} from 'lucide-react'

export const DoctorDashboard = ({ t }: { t: any }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } }
  }

  const patients = [
    { name: "Maftunaxon Alisherova", age: "6 oylik", status: "Active", next: "05.04.2025", urgent: true, avatar: "👶" },
    { name: "Jasurbek Kurbanov", age: "12 oylik", status: "Active", next: "12.04.2025", urgent: false, avatar: "🧒" },
    { name: "Oydinabonu Sobirova", age: "2 oylik", status: "Active", next: "Bugun", urgent: true, avatar: "👶" },
    { name: "Bekzod Raxmonov", age: "18 oylik", status: "Completed", next: "-", urgent: false, avatar: "🧒" },
    { name: "Sardorbek Karimov", age: "4 oylik", status: "Active", next: "20.04.2025", urgent: false, avatar: "👶" }
  ]

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-7 pb-10"
    >
      {/* 1. DOCTOR STATS ROW */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "Jami Bemorlar", val: "1,240", sub: "+12 yangi", icon: Users, gradient: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/15" },
          { label: "Bugungi Navbat", val: "24", sub: "8 ta bajarildi", icon: Clock, gradient: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/15" },
          { label: "Emlanganlar", val: "94%", sub: "Bu oyda", icon: CheckCircle2, gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/15" },
          { label: "Kritik Holatlar", val: "03", sub: "Shoshilinch", icon: AlertTriangle, gradient: "from-rose-500 to-pink-500", shadow: "shadow-rose-500/15" }
        ].map((s, i) => (
          <motion.div 
            variants={item}
            key={i} 
            className={`bg-gradient-to-br ${s.gradient} p-6 rounded-[2rem] text-white shadow-2xl ${s.shadow} relative overflow-hidden group`}
          >
            <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-white/8 rounded-full blur-xl group-hover:scale-[2] transition-transform duration-700" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 rounded-xl bg-white/12 backdrop-blur-sm">
                  <s.icon size={18} />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider opacity-70">{s.sub}</span>
              </div>
              <p className="text-[26px] font-extrabold tracking-tight">{s.val}</p>
              <p className="text-[10px] font-medium uppercase tracking-wider mt-0.5 opacity-70">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-7">
        {/* LEFT: PATIENTS LIST */}
        <div className="col-span-8 space-y-7">
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-9">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Biriktirilgan Bolalar</h3>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">Sizning nazoratingizdagi bemorlar ro'yxati</p>
              </div>
              <div className="flex gap-2.5">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                  <input type="text" placeholder="Qidiruv..." className="pl-9 pr-4 py-2.5 bg-slate-50/80 border border-slate-100 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-200 transition-all w-56 placeholder:text-slate-300" />
                </div>
                <button className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-400 hover:text-blue-500 hover:bg-blue-50 hover:border-blue-100 transition-all">
                  <Filter size={16} />
                </button>
              </div>
            </div>

            <div className="overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100/50">
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bemor FISh</th>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Yoshi</th>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Keyingi Emlash</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50/80">
                  {patients.map((p, i) => (
                    <motion.tr 
                      key={i} 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                      className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${
                            p.urgent ? 'bg-rose-50' : 'bg-blue-50'
                          }`}>
                            {p.avatar}
                          </div>
                          <span className="font-semibold text-sm text-slate-700 group-hover:text-blue-600 transition-colors">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm font-medium text-slate-500">{p.age}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase ${
                          p.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`text-sm font-bold ${p.next === 'Bugun' ? 'text-rose-500' : 'text-slate-700'}`}>
                          {p.next}
                          {p.next === 'Bugun' && (
                            <span className="ml-2 inline-block w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                          )}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="p-2 text-slate-300 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Today's Schedule */}
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-9">
            <div className="flex items-center gap-3 mb-7">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Bugungi jadval</h3>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Rejalashtirilgan emlashlar</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { time: "09:00", patient: "Oydinabonu Sobirova", vaccine: "BCG + Gepatit B", type: "Yangi", color: "rose" },
                { time: "10:30", patient: "Komiljon Umarov", vaccine: "Pentavalent-2", type: "Takroriy", color: "blue" },
                { time: "11:00", patient: "Dilfuza Qodirova", vaccine: "OPV-3", type: "Takroriy", color: "emerald" },
                { time: "14:00", patient: "Sardorbek Karimov", vaccine: "Pentavalent-1", type: "Yangi", color: "amber" },
              ].map((schedule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/60 border border-slate-100/50 hover:bg-white hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="text-center min-w-[50px]">
                    <p className="text-sm font-extrabold text-slate-800">{schedule.time}</p>
                  </div>
                  <div className={`w-1 h-10 rounded-full bg-${schedule.color}-400`} />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-slate-700">{schedule.patient}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Syringe size={11} className="text-slate-400" />
                      <p className="text-[11px] text-slate-400 font-medium">{schedule.vaccine}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-full bg-${schedule.color}-100 text-${schedule.color}-600`}>
                    {schedule.type}
                  </span>
                  <ChevronRight size={14} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT: SUMMARY & TOOLS */}
        <div className="col-span-4 space-y-7">
          {/* Performance Card */}
          <motion.div variants={item} className="premium-gradient-dark rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <TrendingUp className="absolute -right-8 -bottom-8 text-white/3" size={150} />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-7 flex items-center gap-2">
              <ShieldCheck className="text-blue-400" size={18} /> Ish unumdorligi
            </h3>
            <div className="space-y-5 relative z-10">
              <div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2.5">
                  <span className="opacity-60">Oylik Reja</span>
                  <span className="text-blue-400">85%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '85%' }} 
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" 
                  />
                </div>
              </div>
              <div className="pt-5 border-t border-white/8">
                <p className="text-2xl font-extrabold">124</p>
                <p className="text-[10px] font-medium opacity-40 uppercase tracking-wider mt-0.5">Emlangan bolalar (May)</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-8">
            <h3 className="text-[15px] font-extrabold text-slate-800 mb-6">Tezkor Amallar</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <UserPlus size={18} />
                  <span className="font-bold text-[12px] uppercase tracking-wider">Yangi Bemor</span>
                </div>
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:bg-slate-50 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar size={18} />
                  <span className="font-bold text-[12px] uppercase tracking-wider">Navbatni ko'rish</span>
                </div>
                <ChevronRight size={15} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:bg-slate-50 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3 text-slate-600">
                  <Activity size={18} />
                  <span className="font-bold text-[12px] uppercase tracking-wider">Hisobot yaratish</span>
                </div>
                <ChevronRight size={15} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Tips for Doctor */}
          <motion.div variants={item} className="bg-blue-50 border border-blue-100/80 rounded-[2rem] p-7">
            <h4 className="text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck size={13} /> Shifokor eslatmasi
            </h4>
            <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
              Vaksinalarni saqlash harorati doimiy ravishda +2°C dan +8°C gacha bo'lishini nazorat qiling.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
