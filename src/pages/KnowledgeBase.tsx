import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Syringe, Info, AlertTriangle, HelpCircle, Phone, ChevronDown, ChevronUp, ShieldAlert, BookOpen, Heart, ExternalLink } from 'lucide-react'

const vaccines = [
  { id: 'bcg', name: "BCG", disease: "Sil kasalligi (Туберкулез)", protection: "Og'ir sil shakllaridan", sideEffects: "Qizarish, shish, kichik yara", emoji: "🛡️" },
  { id: 'penta', name: "Pentavalent", disease: "Diffteriya, ko'kyo'tal, tetanus, gepatit B, Hib", protection: "5 xil xavfli kasallikdan", sideEffects: "Harorat, injiqlik, shish", emoji: "💉" },
  { id: 'opv', name: "OPV", disease: "Poliomielit (Полиомиелит)", protection: "Polio (shol) kasalligidan", sideEffects: "Juda kam uchraydi", emoji: "🔬" },
  { id: 'mmr', name: "MMR", disease: "Qizamiq, qizilcha, parotit", protection: "3 xil virusli kasallikdan", sideEffects: "Harorat, toshma", emoji: "🧬" },
  { id: 'varicella', name: "Varicella", disease: "Suv chechak (Ветрянка)", protection: "Suv chechak kasalligidan", sideEffects: "Yengil toshma, harorat", emoji: "🧪" },
]

const faqs = [
  { q: "Emlashdan keyin harorat ko'tarilsa nima qilish kerak?", a: "Paratsetamol bering, ko'p suv ichiring. Harorat 38.5° dan oshsa shifokorga murojaat qiling." },
  { q: "Emlashdan keyin cho'miltirish mumkinmi?", a: "Emlash kunida cho'miltirmaslik tavsiya etiladi. 24 soatdan keyin xavfsiz." },
  { q: "O'zbekistonda emlash bepulmi?", a: "Ha, milliy taqvimdagi barcha emlashlar davlat tomonidan bepul amalga oshiriladi." },
  { q: "Bir nechta emlashni bir vaqtda qilish xavflimi?", a: "Yo'q, ilmiy tadqiqotlar shuni ko'rsatadiki, bir nechta emlashni birgalikda qilish xavfsiz va samarali." },
  { q: "Emlash qachon qilinmasligi kerak?", a: "Bola og'ir kasal bo'lsa, yuqori isitmasi bo'lsa yoki oldingi emlashga og'ir allergik reaksiya bo'lgan bo'lsa." }
]

const healthTips = [
  { title: "Ko'krak suti", desc: "Kamida 6 oy davomida faqat ko'krak suti bilan emizish tavsiya etiladi.", icon: Heart },
  { title: "Toza suv", desc: "6 oydan keyin toza qaynatilgan suv berish muhim.", icon: BookOpen },
  { title: "Uyqu rejimi", desc: "Bolalar kuniga 14-17 soat uxlashi kerak (1 yoshgacha).", icon: Info },
]

export const KnowledgeBase = ({ t }: { t: any }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'vaccines' | 'faq' | 'tips'>('vaccines')

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
  }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-7 pb-20">
      
      {/* Tab Navigation */}
      <motion.div variants={item} className="flex gap-2">
        {[
          { key: 'vaccines', label: t.vaccine_list || 'Emlashlar', icon: Syringe },
          { key: 'faq', label: t.faq || 'FAQ', icon: HelpCircle },
          { key: 'tips', label: "Foydali maslahatlar", icon: Heart },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key as any); setOpenIdx(null) }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-brand'
                : 'bg-white/60 border border-slate-100/50 text-slate-400 hover:bg-white hover:text-slate-600 hover:shadow-sm'
            }`}
          >
            <tab.icon size={15} /> {tab.label}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-12 gap-7">
        
        {/* LEFT: CONTENT */}
        <div className="col-span-8 space-y-7">
          
          <AnimatePresence mode="wait">
            {/* Vaccines Tab */}
            {activeTab === 'vaccines' && (
              <motion.div
                key="vaccines"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="glass-panel rounded-[2.5rem] p-9"
              >
                <h3 className="text-lg font-extrabold text-slate-800 mb-7 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-brand">
                    <Syringe size={20} />
                  </div>
                  {t.vaccine_list}
                </h3>
                <div className="space-y-3">
                  {vaccines.map((v, i) => (
                    <div key={v.id} className="rounded-2xl border border-slate-100/50 overflow-hidden">
                      <button 
                        onClick={() => setOpenIdx(openIdx === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 group hover:bg-slate-50/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xl">{v.emoji}</span>
                          <div className="text-left">
                            <span className="font-bold text-slate-700 group-hover:text-brand-500 transition-colors text-[15px]">{v.name}</span>
                            <p className="text-[10px] font-medium text-slate-400 mt-0.5">{v.protection}</p>
                          </div>
                        </div>
                        <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown size={18} className="text-slate-300" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openIdx === i && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 space-y-2.5">
                              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 flex gap-3">
                                <span className="font-bold text-emerald-600 shrink-0 text-[12px]">🦠 {t.protection}:</span>
                                <span className="font-medium text-slate-600 text-[12px]">{v.disease}</span>
                              </div>
                              <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50 flex gap-3">
                                <span className="font-bold text-amber-600 shrink-0 text-[12px]">⚠️ {t.side_effects}:</span>
                                <span className="font-medium text-slate-600 text-[12px]">{v.sideEffects}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="glass-panel rounded-[2.5rem] p-9"
              >
                <h3 className="text-lg font-extrabold text-slate-800 mb-7 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20">
                    <HelpCircle size={20} />
                  </div>
                  {t.faq}
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="p-5 rounded-2xl bg-slate-50/60 border border-slate-100/50 group hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <p className="font-bold text-[14px] text-slate-800 mb-2 flex items-start gap-2.5">
                        <span className="text-indigo-500 font-extrabold text-lg leading-none">?</span> {faq.q}
                      </p>
                      <p className="text-[12px] font-medium text-slate-500 pl-6 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Health Tips Tab */}
            {activeTab === 'tips' && (
              <motion.div
                key="tips"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-5"
              >
                {healthTips.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-panel rounded-[2rem] p-7 card-hover group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-brand-50 text-brand-500 group-hover:scale-110 transition-transform duration-500">
                        <tip.icon size={22} />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-extrabold text-slate-800 mb-2">{tip.title}</h4>
                        <p className="text-[13px] font-medium text-slate-500 leading-relaxed">{tip.desc}</p>
                      </div>
                      <ExternalLink size={16} className="text-slate-200 group-hover:text-brand-400 shrink-0 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: CONTRAINDICATIONS & EMERGENCY */}
        <div className="col-span-4 space-y-7">
          
          {/* Contraindications */}
          <motion.div variants={item} className="glass-panel rounded-[2.5rem] p-7">
            <h3 className="text-[15px] font-extrabold text-slate-800 mb-5 flex items-center gap-2">
              <ShieldAlert className="text-rose-500" size={18} /> {t.contraindications}
            </h3>
            <div className="space-y-2.5">
              {[
                "Harorat 38.5°C dan yuqori bo'lganda",
                "Og'ir allergik reaksiyalar bo'lganda",
                "Immunitet tizimi o'ta zaif bo'lganda",
                "Surunkali kasalliklar kuchayganda"
              ].map((text, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50/50 border border-rose-100/50"
                >
                  <AlertTriangle size={14} className="text-rose-500 shrink-0 mt-0.5" />
                  <span className="text-[11px] font-bold text-rose-700 leading-tight">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Emergency Numbers */}
          <motion.div variants={item} className="bg-gradient-to-br from-red-600 to-rose-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-red-500/20 relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/8 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-6">
                <Phone size={20} />
                <h3 className="text-[15px] font-extrabold uppercase tracking-wider">{t.emergency_nums}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/5">
                  <span className="text-[12px] font-bold opacity-80 uppercase tracking-wider">Ambulance</span>
                  <span className="text-2xl font-extrabold">103</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/5">
                  <span className="text-[12px] font-bold opacity-80 uppercase tracking-wider">Rescue</span>
                  <span className="text-2xl font-extrabold">112</span>
                </div>
              </div>
              <button className="w-full bg-white text-red-600 py-4 rounded-xl font-extrabold text-[11px] tracking-widest uppercase mt-6 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-lg">
                {t.call_emergency}
              </button>
            </div>
          </motion.div>

          {/* Tips Card */}
          <motion.div variants={item} className="premium-gradient-dark rounded-[2rem] p-7 text-white relative overflow-hidden">
            <Info className="absolute -right-4 -bottom-4 text-white/5" size={80} />
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-3">Eslatma</h4>
              <p className="text-[12px] font-medium leading-relaxed text-white/60 italic">
                "Milliy taqvimga muvofiq barcha emlashlar farzandingizni 13 xil xavfli kasallikdan himoya qiladi."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
