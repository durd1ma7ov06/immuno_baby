import { motion } from 'framer-motion'
import { User, Phone, MapPin, Briefcase, AlertCircle, Map, Save, Globe, ShieldCheck, UserCheck, Baby, CheckCircle2, Settings, Info } from 'lucide-react'

const ParentCard = ({ title, name, phone, work, t, icon: Icon, gender }: any) => (
  <div className="glass-panel rounded-[2.5rem] p-7 card-hover group cursor-pointer">
    <div className="flex items-center gap-4 mb-7">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:scale-110 ${
        gender === 'f' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'
      }`}>
        <Icon size={28} />
      </div>
      <div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</h4>
        <p className="text-lg font-extrabold text-slate-800 tracking-tight">{name}</p>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50/60 border border-slate-100/50 backdrop-blur-sm">
        <Phone className="text-slate-400" size={16} />
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase">{t.phone}</p>
          <p className="text-sm font-semibold text-slate-700">{phone}</p>
        </div>
      </div>
      <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50/60 border border-slate-100/50 backdrop-blur-sm">
        <Briefcase className="text-slate-400" size={16} />
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase">{t.occupation}</p>
          <p className="text-sm font-semibold text-slate-700">{work}</p>
        </div>
      </div>
    </div>
  </div>
)

export const Profile = ({ t, lang, setLang }: { t: any, lang: string, setLang: (l: string) => void }) => {
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
      <div className="grid grid-cols-12 gap-7">
        {/* LEFT COLUMN */}
        <div className="col-span-8 space-y-7">
          
          {/* CHILD DETAILS */}
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-9 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
               <Baby size={160} />
            </div>
            <div className="flex items-center gap-5 mb-9 relative z-10">
              <motion.div 
                whileHover={{ scale: 1.08, rotate: 3 }}
                className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-brand-500 to-brand-400 text-white flex items-center justify-center text-4xl shadow-brand"
              >
                👶
              </motion.div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Maftunaxon Alisherova</h2>
                <p className="text-[12px] font-bold text-brand-500 uppercase tracking-wider mt-1">Sog'lom va Baxtli bola</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 relative z-10">
              {[
                { label: "Tug'ilgan sanasi", val: "15.04.2024", sub: "Soat: 08:30" },
                { label: "Qon guruhi", val: "A+ (I-Guruh)", sub: "Rezuz: Musbat (+)", highlight: true },
                { label: "Tug'ilgan vazni", val: "3.500 kg", sub: "Bo'yi: 52 sm" },
              ].map((d, i) => (
                <div key={i} className="p-4.5 rounded-2xl bg-slate-50/60 border border-slate-100/50 backdrop-blur-sm hover:bg-white hover:shadow-sm transition-all duration-300">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">{d.label}</p>
                  <p className={`text-lg font-extrabold tracking-tight ${d.highlight ? 'text-brand-500' : 'text-slate-800'}`}>{d.val}</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1">{d.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 gap-7">
            <ParentCard title={t.mother_info} name="Aziza Alisherova" phone="+998 90 123 45 67" work="O'qituvchi, 15-maktab" t={t} icon={UserCheck} gender="f" />
            <ParentCard title={t.father_info} name="Jasurbek Alisherov" phone="+998 93 765 43 21" work="Muhandis, IT-Park" t={t} icon={User} gender="m" />
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 gap-7">
            <div className="glass-panel rounded-[2.5rem] p-7">
              <h3 className="text-[13px] font-extrabold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
                <MapPin className="text-brand-500" size={16} /> {t.address}
              </h3>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                Toshkent shahar, Chilonzor tumani, 5-kvartal, 12-uy, 45-xonadon.
              </p>
              <div className="mt-5 flex items-center gap-2 text-blue-500 text-[10px] font-bold uppercase cursor-pointer hover:underline group">
                <Map size={13} className="group-hover:scale-110 transition-transform" /> Xaritada ko'rish
              </div>
            </div>
            <div className="bg-gradient-to-br from-brand-500 to-brand-400 rounded-[2.5rem] p-7 text-white shadow-brand relative overflow-hidden group cursor-pointer">
               <div className="absolute top-0 right-0 w-28 h-28 bg-white/8 rounded-full blur-2xl -mr-14 -mt-14 group-hover:scale-125 transition-transform duration-700" />
               <h3 className="text-[13px] font-bold uppercase tracking-wider opacity-60 mb-5 flex items-center gap-2">
                <AlertCircle size={16} /> {t.emergency}
              </h3>
              <p className="text-2xl font-extrabold mb-2 tracking-tight">+998 71 234 56 78</p>
              <p className="text-xs font-medium opacity-60 uppercase tracking-wider">Yaqin qarindosh (Bobosi)</p>
            </div>
          </motion.div>

          <motion.div variants={item} className="premium-gradient-dark rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/8 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-brand-500/15 transition-all duration-1000" />
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/40 mb-8 flex items-center gap-2">
              <ShieldCheck size={15} /> {t.clinic}
            </h3>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="text-[10px] font-medium opacity-30 mb-2 tracking-wider uppercase">Tibbiy muassasa</p>
                <p className="text-xl font-extrabold leading-tight">14-sonli Oilaviy Poliklinika</p>
                <div className="mt-5 flex items-center gap-2.5 text-brand-300">
                  <MapPin size={14} />
                  <span className="text-xs font-medium">Chilonzor 5-daha, 10-uy</span>
                </div>
              </div>
              <div className="border-l border-white/8 pl-10">
                <p className="text-[10px] font-medium opacity-30 mb-2 tracking-wider uppercase">{t.pediatrician}</p>
                <p className="text-xl font-extrabold leading-tight">Dr. Nigora Karimbekova</p>
                <div className="mt-5 flex items-center gap-2.5 text-emerald-400">
                  <CheckCircle2 size={14} />
                  <span className="text-xs font-medium text-white/50">Oliy toifali shifokor (Pediatr)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-4 space-y-7">
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-8">
              <Settings className="text-brand-500" size={22} />
              <h3 className="text-lg font-extrabold text-slate-800">{t.settings}</h3>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-2 block">{t.old_password}</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50/80 border border-slate-100 rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-500/10 focus:border-brand-200 transition-all outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-2 block">{t.new_password}</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50/80 border border-slate-100 rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-brand-500/10 focus:border-brand-200 transition-all outline-none" />
              </div>
              <button className="w-full btn-primary py-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2.5">
                <Save size={16} /> {t.save_changes}
              </button>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-600/15 group">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-7 backdrop-blur-md group-hover:scale-110 transition-transform duration-500 border border-white/5">
              <Globe size={28} className="opacity-80" />
            </div>
            <h4 className="text-xl font-extrabold mb-5">{t.system_language}</h4>
            <div className="flex flex-col gap-2.5">
              {['uz', 'ru', 'en'].map(l => (
                <button 
                  key={l} 
                  onClick={() => setLang(l)} 
                  className={`w-full py-4 rounded-xl border-2 font-bold text-[11px] uppercase tracking-widest transition-all duration-300 ${
                    lang === l 
                      ? 'bg-white text-blue-600 border-white shadow-lg scale-[1.02]' 
                      : 'bg-white/8 border-white/10 hover:bg-white/15 hover:border-white/20'
                  }`}
                >
                  {l === 'uz' ? "O'zbekcha" : l === 'ru' ? "Русский" : "English"}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-slate-50/60 backdrop-blur-md border border-slate-200/50 rounded-[2rem] p-7">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Info size={13} /> Xavfsizlik
            </h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Sizning barcha tibbiy ma'lumotlaringiz 256-bitli SSL shifrlash tizimi orqali himoyalangan va faqat siz hamda biriktirilgan shifokoringiz uchun ko'rinadi.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
