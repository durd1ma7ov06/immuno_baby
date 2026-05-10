import { motion } from 'framer-motion'
import { Weight, Ruler, Brain, Heart, Syringe, CheckCircle2, Activity, Clock, AlertCircle, ChevronRight, TrendingUp, ArrowUpRight, Sparkles, Calendar, Shield } from 'lucide-react'

export const Dashboard = ({ t }: { t: any }) => {
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

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-7 pb-10"
    >
      {/* 1. TOP STATS */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: t.weight, val: "7.5 kg", sub: "+0.3 kg", icon: Weight, gradient: "from-rose-500 to-pink-400", shadow: "shadow-rose-500/15", bg: "bg-rose-50" },
          { label: t.height, val: "68 sm", sub: "+1.2 sm", icon: Ruler, gradient: "from-blue-500 to-indigo-500", shadow: "shadow-blue-500/15", bg: "bg-blue-50" },
          { label: t.head, val: "42 sm", sub: "+0.5 sm", icon: Brain, gradient: "from-violet-500 to-purple-500", shadow: "shadow-violet-500/15", bg: "bg-violet-50" },
          { label: t.status, val: t.excellent, sub: "100%", icon: Heart, gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/15", bg: "bg-emerald-50" }
        ].map((s, i) => (
          <motion.div 
            variants={item}
            key={i} 
            className="glass-panel rounded-[1.8rem] p-6 card-hover group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-5">
              <div className={`p-2.5 rounded-xl ${s.bg} group-hover:scale-110 transition-transform duration-500`}>
                <s.icon size={20} className={`bg-gradient-to-br ${s.gradient} bg-clip-text`} style={{ color: s.gradient.includes('rose') ? '#F43F5E' : s.gradient.includes('blue') ? '#3B82F6' : s.gradient.includes('violet') ? '#8B5CF6' : '#10B981' }} />
              </div>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <ArrowUpRight size={9} /> {s.sub}
              </span>
            </div>
            <p className="text-[22px] font-extrabold text-slate-800 tracking-tight">{s.val}</p>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-7">
        {/* LEFT COLUMN */}
        <div className="col-span-8 space-y-7">
          {/* Main Hero Card */}
          <motion.div 
            variants={item}
            className="relative p-10 rounded-[2.5rem] text-white shadow-2xl overflow-hidden group cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #FF4D6D 0%, #FF758F 50%, #FF8FA3 100%)' }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/8 rounded-full -mr-36 -mt-36 blur-2xl group-hover:scale-125 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20 blur-xl" />
            
            {/* Floating vaccine icons */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 opacity-10"
            >
              <Syringe size={80} />
            </motion.div>

            <div className="relative z-10 flex justify-between items-center">
              <div className="max-w-md">
                <div className="flex items-center gap-2 mb-5 bg-white/15 w-fit px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                  <Syringe size={13} className="animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">{t.next_vaccine}</span>
                </div>
                <h2 className="text-4xl font-extrabold mb-3 leading-tight tracking-tight">Pentavalent-2</h2>
                <p className="text-white/70 text-[15px] font-medium mb-8 leading-relaxed">
                  5-aprel kuni, soat 09:00 da 14-sonli poliklinikada kutilmoqdasiz.
                </p>
                <div className="flex gap-3">
                  <button className="bg-white text-brand-500 px-7 py-3.5 rounded-xl font-extrabold text-[11px] uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    OK
                  </button>
                  <button className="bg-white/12 backdrop-blur-md border border-white/15 text-white px-7 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-white/20 transition-all duration-300">
                    Taqvim
                  </button>
                </div>
              </div>
              <motion.div 
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-center bg-black/12 backdrop-blur-xl p-9 rounded-[2rem] border border-white/10 shadow-inner"
              >
                <p className="text-7xl font-extrabold leading-none mb-1.5 tabular-nums">03</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">{t.days_left}</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Vaccination History */}
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-9">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-brand">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">{t.history_table}</h3>
                  <p className="text-[10px] font-medium text-slate-400 mt-0.5">So'nggi emlashlar holati</p>
                </div>
              </div>
              <button className="text-[10px] font-bold text-brand-500 bg-brand-50 px-4 py-2 rounded-xl uppercase tracking-wider hover:bg-brand-100 transition-colors">
                {t.full_report}
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: "BCG (Silga qarshi)", date: "15.10.2024", status: t.completed, statusKey: "completed", icon: CheckCircle2 },
                { name: "Gepatit B (1)", date: "15.10.2024", status: t.completed, statusKey: "completed", icon: CheckCircle2 },
                { name: "Pentavalent-1", date: "05.12.2024", status: t.completed, statusKey: "completed", icon: CheckCircle2 },
                { name: "PV-2 (Kutilmoqda)", date: "05.04.2025", status: "Kutilmoqda", statusKey: "pending", icon: Clock }
              ].map((row, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/60 border border-slate-100/50 group hover:bg-white hover:shadow-lg hover:border-slate-100 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      row.statusKey === 'completed' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
                    }`}>
                      <row.icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-700">{row.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{row.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${
                      row.statusKey === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {row.status}
                    </span>
                    <ChevronRight size={14} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-4 space-y-7">
          {/* Progress Card */}
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-8">
            <h3 className="text-[15px] font-extrabold text-slate-800 mb-7 flex items-center gap-2">
              <Shield size={16} className="text-brand-400" /> Emlash Progress
            </h3>
            <div className="relative w-36 h-36 mx-auto mb-7">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="62" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                <motion.circle 
                  cx="72" cy="72" r="62" 
                  stroke="url(#progressGradient)" 
                  strokeWidth="10" 
                  fill="transparent" 
                  strokeDasharray="390"
                  initial={{ strokeDashoffset: 390 }}
                  animate={{ strokeDashoffset: 117 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF4D6D" />
                    <stop offset="100%" stopColor="#FF8BA7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-800">70%</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Emlangan</span>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "BCG", done: true },
                { label: "Pentavalent-1", done: true },
                { label: "Pentavalent-2", done: false },
                { label: "Pentavalent-3", done: false }
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 border border-slate-100/30">
                  <span className="text-xs font-medium text-slate-600">{p.label}</span>
                  {p.done 
                    ? <CheckCircle2 size={15} className="text-emerald-500" /> 
                    : <Clock size={15} className="text-amber-400" />
                  }
                </div>
              ))}
            </div>
          </motion.div>

          {/* Daily Tip Card */}
          <motion.div variants={item} className="rounded-[2.5rem] p-8 text-white relative overflow-hidden group premium-gradient-dark">
            <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-brand-500/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute top-6 right-6 opacity-5">
              <Sparkles size={50} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/8 rounded-xl flex items-center justify-center text-brand-300 backdrop-blur-md border border-white/5">
                  <Brain size={20} />
                </div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">Bugungi Maslahat</h4>
              </div>
              <p className="text-[15px] font-medium leading-relaxed mb-7 text-white/80">
                "Emlashdan keyin bolada isitma chiqishi normal holat. Bu organizm immunitet hosil qilayotganini bildiradi."
              </p>
              <button className="flex items-center gap-2 text-brand-300 font-bold text-[10px] uppercase tracking-wider hover:text-brand-200 transition-colors group/btn">
                Batafsil o'qish 
                <ChevronRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Emergency Info Card */}
          <motion.div variants={item} className="bg-amber-50 border border-amber-100/80 rounded-[2rem] p-7 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-700 flex items-center justify-center shrink-0">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-extrabold text-amber-900 mb-1">Eslatma!</p>
              <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
                Ukol qilingan joyga 2 kun davomida suv tekkizmang va cho'miltirmang.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
