import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Syringe,
  Calendar,
  Activity,
  Phone,
  MapPin,
  X,
  Baby,
  Heart,
  TrendingUp,
  Eye,
  FileText,
  MoreVertical
} from 'lucide-react'

interface Patient {
  id: number
  name: string
  birthDate: string
  age: string
  gender: 'male' | 'female'
  mother: string
  phone: string
  address: string
  bloodType: string
  weight: string
  height: string
  status: 'active' | 'completed' | 'overdue'
  totalVaccines: number
  completedVaccines: number
  nextVaccine: string
  nextDate: string
  avatar: string
  lastVisit: string
}

const patientsData: Patient[] = [
  { 
    id: 1, name: "Maftunaxon Alisherova", birthDate: "15.04.2024", age: "7 oylik", 
    gender: 'female', mother: "Aziza Alisherova", phone: "+998 90 123 45 67",
    address: "Chilonzor, 5-kvartal", bloodType: "A+", weight: "7.5 kg", height: "68 sm",
    status: 'active', totalVaccines: 13, completedVaccines: 6, 
    nextVaccine: "Pentavalent-3", nextDate: "05.04.2025", avatar: "👶", lastVisit: "01.04.2025"
  },
  { 
    id: 2, name: "Jasurbek Kurbanov", birthDate: "10.03.2024", age: "12 oylik", 
    gender: 'male', mother: "Dilrabo Kurbanova", phone: "+998 91 234 56 78",
    address: "Yunusobod, 3-daha", bloodType: "B+", weight: "9.8 kg", height: "75 sm",
    status: 'active', totalVaccines: 13, completedVaccines: 8, 
    nextVaccine: "MMR-1", nextDate: "10.03.2025", avatar: "🧒", lastVisit: "15.03.2025"
  },
  { 
    id: 3, name: "Oydinabonu Sobirova", birthDate: "01.02.2025", age: "2 oylik", 
    gender: 'female', mother: "Nodira Sobirova", phone: "+998 93 345 67 89",
    address: "Sergeli, 7-daha", bloodType: "O+", weight: "4.8 kg", height: "56 sm",
    status: 'overdue', totalVaccines: 13, completedVaccines: 2, 
    nextVaccine: "Pentavalent-1", nextDate: "Bugun", avatar: "👶", lastVisit: "01.02.2025"
  },
  { 
    id: 4, name: "Bekzod Raxmonov", birthDate: "15.09.2023", age: "18 oylik", 
    gender: 'male', mother: "Mahliyo Raxmonova", phone: "+998 90 456 78 90",
    address: "Mirzo Ulug'bek, 4-daha", bloodType: "AB+", weight: "11.2 kg", height: "82 sm",
    status: 'completed', totalVaccines: 13, completedVaccines: 13, 
    nextVaccine: "-", nextDate: "-", avatar: "🧒", lastVisit: "20.03.2025"
  },
  { 
    id: 5, name: "Sardorbek Karimov", birthDate: "05.12.2024", age: "4 oylik", 
    gender: 'male', mother: "Zulfiya Karimova", phone: "+998 94 567 89 01",
    address: "Yakkasaroy, 2-daha", bloodType: "A-", weight: "6.1 kg", height: "62 sm",
    status: 'active', totalVaccines: 13, completedVaccines: 4, 
    nextVaccine: "Pentavalent-2", nextDate: "05.04.2025", avatar: "👶", lastVisit: "05.03.2025"
  },
  { 
    id: 6, name: "Kamola Tursunova", birthDate: "20.06.2024", age: "10 oylik", 
    gender: 'female', mother: "Gulbahor Tursunova", phone: "+998 95 678 90 12",
    address: "Shayxontohur, 1-daha", bloodType: "B-", weight: "8.5 kg", height: "72 sm",
    status: 'active', totalVaccines: 13, completedVaccines: 7, 
    nextVaccine: "MMR-1", nextDate: "20.06.2025", avatar: "👧", lastVisit: "10.04.2025"
  },
  { 
    id: 7, name: "Abdullo Xolmatov", birthDate: "28.01.2025", age: "2 oylik", 
    gender: 'male', mother: "Shahlo Xolmatova", phone: "+998 97 789 01 23",
    address: "Olmazor, 6-daha", bloodType: "O-", weight: "5.0 kg", height: "57 sm",
    status: 'active', totalVaccines: 13, completedVaccines: 2, 
    nextVaccine: "Pentavalent-1", nextDate: "28.03.2025", avatar: "👶", lastVisit: "28.01.2025"
  },
]

export const Patients = ({ t }: { t: any }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'overdue'>('all')

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
  }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }

  const filtered = patientsData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.mother.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    active: { bg: 'bg-blue-100', text: 'text-blue-600', label: 'Faol' },
    completed: { bg: 'bg-emerald-100', text: 'text-emerald-600', label: 'Tugallangan' },
    overdue: { bg: 'bg-rose-100', text: 'text-rose-600', label: "Muddati o'tgan" },
  }

  const totalActive = patientsData.filter(p => p.status === 'active').length
  const totalCompleted = patientsData.filter(p => p.status === 'completed').length
  const totalOverdue = patientsData.filter(p => p.status === 'overdue').length

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-7 pb-10">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "Jami Bemorlar", val: patientsData.length.toString(), icon: Users, gradient: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/15" },
          { label: "Faol", val: totalActive.toString(), icon: Activity, gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/15" },
          { label: "Tugallangan", val: totalCompleted.toString(), icon: CheckCircle2, gradient: "from-violet-500 to-purple-500", shadow: "shadow-violet-500/15" },
          { label: "Muddati o'tgan", val: totalOverdue.toString(), icon: AlertTriangle, gradient: "from-rose-500 to-pink-500", shadow: "shadow-rose-500/15" },
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

      <div className="grid grid-cols-12 gap-7">
        {/* MAIN PATIENTS LIST */}
        <div className="col-span-8 space-y-5">
          {/* Search & Filter Bar */}
          <motion.div variants={item} className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Bemor nomi yoki ona ismi bo'yicha qidirish..."
                className="w-full pl-11 pr-5 py-3.5 bg-white/70 backdrop-blur-xl border border-white/80 rounded-2xl text-sm font-medium text-slate-600 outline-none focus:bg-white/90 focus:border-blue-200 focus:shadow-sm transition-all placeholder:text-slate-300"
              />
            </div>
            <div className="flex gap-2">
              {[
                { key: 'all' as const, label: 'Barchasi' },
                { key: 'active' as const, label: 'Faol' },
                { key: 'overdue' as const, label: "O'tgan" },
                { key: 'completed' as const, label: 'Tugal' },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setStatusFilter(f.key)}
                  className={`px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    statusFilter === f.key
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/15'
                      : 'bg-white/60 border border-slate-100/50 text-slate-400 hover:bg-white hover:text-slate-600'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Patient Cards */}
          <AnimatePresence mode="popLayout">
            {filtered.map((patient, i) => (
              <motion.div
                key={patient.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelectedPatient(patient)}
                className="glass-panel rounded-[2rem] p-6 cursor-pointer group hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 ${
                    patient.status === 'overdue' ? 'bg-rose-50' : patient.status === 'completed' ? 'bg-emerald-50' : 'bg-blue-50'
                  }`}>
                    {patient.avatar}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <h4 className="font-bold text-[15px] text-slate-800 group-hover:text-blue-600 transition-colors truncate">{patient.name}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase ${statusColors[patient.status].bg} ${statusColors[patient.status].text}`}>
                        {statusColors[patient.status].label}
                      </span>
                      {patient.nextDate === 'Bugun' && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-rose-500 text-white text-[8px] font-bold rounded-full uppercase animate-pulse">
                          <AlertTriangle size={9} /> Bugun
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
                      <span>{patient.age}</span>
                      <span>•</span>
                      <span>{patient.mother}</span>
                      <span>•</span>
                      <span>{patient.address}</span>
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            patient.completedVaccines === patient.totalVaccines ? 'bg-emerald-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${(patient.completedVaccines / patient.totalVaccines) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{patient.completedVaccines}/{patient.totalVaccines}</span>
                    </div>
                    <p className="text-[10px] font-medium text-slate-400">
                      {patient.nextVaccine !== '-' ? `Keyingi: ${patient.nextVaccine}` : 'Barcha emlashlar tugadi'}
                    </p>
                  </div>
                  
                  <ChevronRight size={16} className="text-slate-200 group-hover:text-blue-400 transition-colors shrink-0" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="glass-panel rounded-[2.5rem] p-16 text-center">
              <Users size={44} className="text-slate-200 mx-auto mb-4" />
              <p className="text-lg font-extrabold text-slate-300">Bemor topilmadi</p>
              <p className="text-xs font-medium text-slate-300 mt-2">Qidiruv so'rovingizni o'zgartiring</p>
            </div>
          )}
        </div>

        {/* RIGHT: Patient Detail or Summary */}
        <div className="col-span-4 space-y-7">
          <AnimatePresence mode="wait">
            {selectedPatient ? (
              <motion.div
                key={selectedPatient.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-5"
              >
                {/* Patient Card */}
                <div className="glass-panel rounded-[2.5rem] p-7 relative">
                  <button 
                    onClick={() => setSelectedPatient(null)}
                    className="absolute top-5 right-5 p-2 text-slate-300 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-all"
                  >
                    <X size={16} />
                  </button>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mx-auto mb-3">
                      {selectedPatient.avatar}
                    </div>
                    <h3 className="text-[16px] font-extrabold text-slate-800 tracking-tight">{selectedPatient.name}</h3>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-1">{selectedPatient.age} • {selectedPatient.gender === 'female' ? 'Qiz' : "O'g'il"}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5 mb-5">
                    {[
                      { label: "Vazn", val: selectedPatient.weight },
                      { label: "Bo'y", val: selectedPatient.height },
                      { label: "Qon", val: selectedPatient.bloodType },
                    ].map((d, i) => (
                      <div key={i} className="text-center p-3 rounded-xl bg-slate-50/60 border border-slate-100/50">
                        <p className="text-[13px] font-extrabold text-slate-800">{d.val}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{d.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/60 border border-slate-100/50">
                      <Phone size={13} className="text-slate-400" />
                      <span className="text-[11px] font-medium text-slate-600">{selectedPatient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/60 border border-slate-100/50">
                      <MapPin size={13} className="text-slate-400" />
                      <span className="text-[11px] font-medium text-slate-600">{selectedPatient.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/60 border border-slate-100/50">
                      <Calendar size={13} className="text-slate-400" />
                      <span className="text-[11px] font-medium text-slate-600">Tug'ilgan: {selectedPatient.birthDate}</span>
                    </div>
                  </div>
                </div>

                {/* Vaccine Progress */}
                <div className={`rounded-[2rem] p-7 text-white relative overflow-hidden shadow-2xl ${
                  selectedPatient.status === 'completed' 
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-700 shadow-emerald-500/20'
                    : 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-blue-500/20'
                }`}>
                  <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/8 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-5">Emlash holati</h4>
                    <div className="flex items-end gap-3 mb-4">
                      <span className="text-4xl font-extrabold">
                        {Math.round((selectedPatient.completedVaccines / selectedPatient.totalVaccines) * 100)}%
                      </span>
                      <span className="text-xs font-medium opacity-50 mb-1.5">bajarildi</span>
                    </div>
                    <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(selectedPatient.completedVaccines / selectedPatient.totalVaccines) * 100}%` }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        className="h-full bg-white/90 rounded-full"
                      />
                    </div>
                    <p className="text-[10px] font-medium opacity-50">
                      {selectedPatient.totalVaccines} tadan {selectedPatient.completedVaccines} ta bajarildi
                    </p>
                    {selectedPatient.nextVaccine !== '-' && (
                      <div className="mt-4 bg-white/10 rounded-xl p-3 border border-white/5">
                        <div className="flex items-center gap-2 mb-1">
                          <Syringe size={12} className="opacity-60" />
                          <span className="text-[11px] font-bold">Keyingi: {selectedPatient.nextVaccine}</span>
                        </div>
                        <p className="text-[10px] font-medium opacity-50">{selectedPatient.nextDate}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-panel rounded-[2rem] p-6">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">Tezkor amallar</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Eye, label: "Ko'rish", color: "text-blue-500 bg-blue-50" },
                      { icon: FileText, label: "Hisobot", color: "text-violet-500 bg-violet-50" },
                      { icon: Syringe, label: "Emlash", color: "text-emerald-500 bg-emerald-50" },
                      { icon: Phone, label: "Qo'ng'iroq", color: "text-amber-500 bg-amber-50" },
                    ].map((action, i) => (
                      <button key={i} className={`flex items-center gap-2.5 p-3 rounded-xl ${action.color} hover:shadow-sm transition-all text-[10px] font-bold uppercase tracking-wider`}>
                        <action.icon size={14} /> {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-5"
              >
                {/* Add Patient */}
                <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-7">
                  <h4 className="text-[13px] font-extrabold text-slate-800 mb-5 flex items-center gap-2">
                    <Baby size={16} className="text-blue-500" /> Bemorlar ro'yxati
                  </h4>
                  <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                      <Plus size={18} />
                      <span className="font-bold text-[12px] uppercase tracking-wider">Yangi bemor qo'shish</span>
                    </div>
                    <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] font-medium text-slate-400 mt-4 text-center">
                    Bemor kartasini tanlang — batafsil ma'lumotlarni ko'ring
                  </p>
                </motion.div>

                {/* Coverage Overview */}
                <motion.div variants={item} className="premium-gradient-dark rounded-[2.5rem] p-7 text-white relative overflow-hidden">
                  <TrendingUp className="absolute -right-6 -bottom-6 text-white/3" size={120} />
                  <div className="relative z-10">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-40 mb-6">Umumiy qamrov</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                        <p className="text-2xl font-extrabold">
                          {Math.round(patientsData.reduce((acc, p) => acc + p.completedVaccines, 0) / patientsData.reduce((acc, p) => acc + p.totalVaccines, 0) * 100)}%
                        </p>
                        <p className="text-[9px] font-medium opacity-40 uppercase mt-0.5">Emlash qamrovi</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                        <p className="text-2xl font-extrabold">{patientsData.length}</p>
                        <p className="text-[9px] font-medium opacity-40 uppercase mt-0.5">Jami bolalar</p>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.round(patientsData.reduce((acc, p) => acc + p.completedVaccines, 0) / patientsData.reduce((acc, p) => acc + p.totalVaccines, 0) * 100)}%` }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Urgent Patients */}
                {patientsData.filter(p => p.status === 'overdue').length > 0 && (
                  <motion.div variants={item} className="bg-rose-50 border border-rose-100/80 rounded-[2rem] p-6">
                    <h4 className="text-[11px] font-bold text-rose-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <AlertTriangle size={14} className="text-rose-500" /> Shoshilinch
                    </h4>
                    <div className="space-y-2">
                      {patientsData.filter(p => p.status === 'overdue').map(p => (
                        <div key={p.id} className="flex items-center gap-3 p-3 bg-white/80 rounded-xl">
                          <span className="text-sm">{p.avatar}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-slate-700 truncate">{p.name}</p>
                            <p className="text-[9px] font-medium text-rose-500">{p.nextVaccine}</p>
                          </div>
                          <span className="text-[9px] font-bold text-rose-500 bg-rose-100 px-2 py-0.5 rounded-md">{p.nextDate}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
