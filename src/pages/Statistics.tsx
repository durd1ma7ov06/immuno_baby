import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Activity, 
  Heart, 
  Syringe, 
  BarChart3, 
  ArrowUp, 
  Zap,
  Shield,
  Target,
  Sparkles
} from 'lucide-react'

// Growth data: months 0-12
const growthData = [
  { month: 0, weight: 3.5, height: 52, head: 35 },
  { month: 1, weight: 4.2, height: 54, head: 37 },
  { month: 2, weight: 5.0, height: 57, head: 38.5 },
  { month: 3, weight: 5.8, height: 60, head: 39.5 },
  { month: 4, weight: 6.3, height: 62, head: 40.5 },
  { month: 5, weight: 6.8, height: 64, head: 41 },
  { month: 6, weight: 7.2, height: 66, head: 42 },
  { month: 7, weight: 7.5, height: 68, head: 42.5 },
]

const vaccineStats = [
  { name: "BCG", percentage: 100 },
  { name: "Gepatit B", percentage: 50 },
  { name: "Pentavalent", percentage: 33 },
  { name: "OPV", percentage: 33 },
  { name: "MMR", percentage: 0 },
  { name: "DTP", percentage: 0 },
]

const monthlyVaccinations = [
  { month: "Okt", count: 2, year: 2024 },
  { month: "Noy", count: 0, year: 2024 },
  { month: "Dek", count: 2, year: 2024 },
  { month: "Yan", count: 0, year: 2025 },
  { month: "Fev", count: 2, year: 2025 },
  { month: "Mar", count: 0, year: 2025 },
  { month: "Apr", count: 0, year: 2025 },
]

const milestones = [
  { age: "2 oy", milestone: "Bosh ushlab turish", done: true, icon: "🧒" },
  { age: "4 oy", milestone: "O'tirishga urish", done: true, icon: "👶" },
  { age: "6 oy", milestone: "Emaklab yurish", done: true, icon: "🐣" },
  { age: "7 oy", milestone: "Tishlar chiqishi", done: true, icon: "🦷" },
  { age: "9 oy", milestone: "Tayanchsiz o'tirish", done: false, icon: "💪" },
  { age: "12 oy", milestone: "Birinchi qadamlar", done: false, icon: "👣" },
]

// SVG line chart for growth
const GrowthLineChart = ({ data, dataKey, color, maxY }: { data: typeof growthData, dataKey: 'weight' | 'height' | 'head', color: string, maxY: number }) => {
  const width = 400
  const height = 120
  const padding = 10
  
  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * (width - padding * 2),
    y: height - padding - ((d[dataKey] / maxY) * (height - padding * 2))
  }))
  
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = pathD + ` L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
  
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${dataKey})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="white" stroke={color} strokeWidth="2" />
          {i === points.length - 1 && (
            <circle cx={p.x} cy={p.y} r="7" fill="none" stroke={color} strokeWidth="1" opacity="0.3">
              <animate attributeName="r" values="7;12;7" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}
    </svg>
  )
}

export const Statistics = ({ t }: { t: any }) => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
  }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }

  const maxVaccineCount = Math.max(...monthlyVaccinations.map(m => m.count), 1)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-7 pb-10">
      
      {/* TOP ROW: Key Metrics */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: t.health_score || "Salomatlik", val: "94%", sub: "+3%", icon: Heart, gradient: "from-rose-500 to-pink-400", shadow: "shadow-rose-500/15", trend: "up" },
          { label: t.immunity_level || "Immunitet", val: "72%", sub: "+8%", icon: Shield, gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/15", trend: "up" },
          { label: t.vaccine_coverage || "Qamrov", val: "46%", sub: "6/13", icon: Target, gradient: "from-blue-500 to-indigo-500", shadow: "shadow-blue-500/15", trend: "up" },
          { label: t.bmi_index || "BMI", val: "16.2", sub: "Normal", icon: Zap, gradient: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/15", trend: "stable" }
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
                <span className="text-[9px] font-bold uppercase bg-white/12 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ArrowUp size={9} /> {s.sub}
                </span>
              </div>
              <p className="text-[26px] font-extrabold tracking-tight">{s.val}</p>
              <p className="text-[10px] font-medium uppercase tracking-wider mt-0.5 opacity-70">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-7">
        {/* LEFT COLUMN */}
        <div className="col-span-8 space-y-7">
          
          {/* Growth Charts */}
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-9">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">{t.growth_tracking || "O'sish kuzatuvi"}</h3>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">0 - 7 oylik</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-5">
              {[
                { label: t.weight_kg || "Vazn (kg)", color: "#FF4D6D", dataKey: 'weight' as const, maxY: 10, current: "7.5 kg", change: "+0.3" },
                { label: t.height_cm || "Bo'y (sm)", color: "#4F46E5", dataKey: 'height' as const, maxY: 80, current: "68 sm", change: "+2" },
                { label: t.head_circumference || "Bosh (sm)", color: "#8B5CF6", dataKey: 'head' as const, maxY: 50, current: "42.5 sm", change: "+0.5" }
              ].map((chart, i) => (
                <div key={i} className="bg-slate-50/60 rounded-2xl p-5 border border-slate-100/50 hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{chart.label}</span>
                    <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">{chart.change}</span>
                  </div>
                  <p className="text-xl font-extrabold text-slate-800 mb-3">{chart.current}</p>
                  <div className="h-24">
                    <GrowthLineChart data={growthData} dataKey={chart.dataKey} color={chart.color} maxY={chart.maxY} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Monthly Vaccinations Bar Chart */}
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-9">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">{t.monthly_progress || "Oylik rivojlanish"}</h3>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Emlash dinamikasi</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-end gap-3 h-40 mb-5">
              {monthlyVaccinations.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[9px] font-bold text-slate-400">{m.count}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: m.count === 0 ? '4px' : `${(m.count / maxVaccineCount) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                    className={`w-full rounded-xl ${m.count > 0 ? 'bg-gradient-to-t from-violet-600 to-violet-400' : 'bg-slate-100'}`}
                  />
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-slate-500">{m.month}</span>
                    <p className="text-[8px] text-slate-300 font-medium">{m.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vaccine Coverage Progress */}
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-9">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
                <Syringe size={20} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">{t.vaccine_coverage || "Emlash qamrovi"}</h3>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Vaksina turlari bo'yicha</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {vaccineStats.map((v, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">{v.name}</span>
                    <span className={`text-xs font-bold ${v.percentage === 100 ? 'text-emerald-500' : v.percentage > 0 ? 'text-amber-500' : 'text-slate-300'}`}>
                      {v.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${v.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                      className={`h-full rounded-full ${
                        v.percentage === 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 
                        v.percentage > 0 ? 'bg-gradient-to-r from-amber-500 to-orange-400' : 'bg-slate-200'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-4 space-y-7">
          
          {/* Development Milestones */}
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-7">
            <div className="flex items-center gap-3 mb-7">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500">
                <Sparkles size={18} />
              </div>
              <h3 className="text-[15px] font-extrabold text-slate-800 tracking-tight">{t.development_milestones || "Rivojlanish"}</h3>
            </div>
            <div className="space-y-2.5">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className={`flex items-center gap-3.5 p-3.5 rounded-xl border transition-all duration-300 ${
                    m.done 
                      ? 'bg-emerald-50/50 border-emerald-100/80' 
                      : 'bg-slate-50/50 border-slate-100/80 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <span className="text-lg">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold truncate ${m.done ? 'text-slate-700' : 'text-slate-400'}`}>{m.milestone}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{m.age}</p>
                  </div>
                  {m.done && <Activity size={13} className="text-emerald-500 shrink-0" />}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Circular Stats */}
          <motion.div variants={item} className="premium-gradient-dark rounded-[2.5rem] p-7 text-white relative overflow-hidden group">
            <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-gradient-to-br from-brand-500/15 to-violet-500/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-40 mb-7 flex items-center gap-2">
                <Activity size={14} className="text-brand-300" /> Umumiy ko'rsatkichlar
              </h4>
              
              {/* Circular progress */}
              <div className="flex justify-center mb-7">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="7" fill="transparent" className="text-white/8" />
                    <motion.circle 
                      cx="64" cy="64" r="54" 
                      stroke="url(#circleGradient)" 
                      strokeWidth="7" 
                      fill="transparent" 
                      strokeDasharray="339"
                      initial={{ strokeDashoffset: 339 }}
                      animate={{ strokeDashoffset: 339 * 0.28 }}
                      transition={{ duration: 1.5, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FF4D6D" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold">72%</span>
                    <span className="text-[8px] font-medium opacity-40 uppercase tracking-wider">Umumiy</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3.5 text-center border border-white/5">
                  <p className="text-lg font-extrabold">7.5</p>
                  <p className="text-[8px] font-medium opacity-40 uppercase mt-0.5">kg vazn</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3.5 text-center border border-white/5">
                  <p className="text-lg font-extrabold">68</p>
                  <p className="text-[8px] font-medium opacity-40 uppercase mt-0.5">sm bo'y</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Checkup */}
          <motion.div variants={item} className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2rem] p-7 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-white/8 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-3">{t.next_checkup || "Keyingi tekshiruv"}</h4>
              <p className="text-2xl font-extrabold mb-1.5">12-Aprel</p>
              <p className="text-xs font-medium opacity-60">14-sonli Poliklinika</p>
              <p className="text-xs font-medium opacity-60 mt-0.5">Dr. Nigora Karimbekova</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
