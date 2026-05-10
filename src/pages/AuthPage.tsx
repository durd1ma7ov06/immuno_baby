import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Heart, Lock, Eye, EyeOff, User, Phone, ArrowRight, ArrowLeft,
  ShieldCheck, Sparkles, Baby, Stethoscope, UserCheck, MapPin,
  Calendar, CheckCircle2, AlertCircle, Droplets, Building2, Mail
} from 'lucide-react'
import { supabase } from '../lib/supabase'

interface AuthPageProps { onLogin: (type: 'parent' | 'doctor') => void }

// Address Data for Khorezm
const regions = [{ id: 'xorazm', name: 'Xorazm viloyati' }];
const districts = [
  { id: 'urganch_sh', region_id: 'xorazm', name: 'Urganch shahri' },
  { id: 'xiva_sh', region_id: 'xorazm', name: 'Xiva shahri' },
  { id: 'urganch_t', region_id: 'xorazm', name: 'Urganch tumani' },
  { id: 'xiva_t', region_id: 'xorazm', name: 'Xiva tumani' },
  { id: 'bogot', region_id: 'xorazm', name: "Bog'ot tumani" },
  { id: 'gurlan', region_id: 'xorazm', name: 'Gurlan tumani' },
  { id: 'qoshkopir', region_id: 'xorazm', name: "Qo'shko'pir tumani" },
  { id: 'shovot', region_id: 'xorazm', name: 'Shovot tumani' },
  { id: 'xonqa', region_id: 'xorazm', name: 'Xonqa tumani' },
  { id: 'hazorasp', region_id: 'xorazm', name: 'Hazorasp tumani' },
  { id: 'yangiariq', region_id: 'xorazm', name: 'Yangiariq tumani' },
  { id: 'yangibozor', region_id: 'xorazm', name: 'Yangibozor tumani' },
  { id: 'tuproqqala', region_id: 'xorazm', name: "Tuproqqal'a tumani" },
];
const neighborhoods = [
  // Urganch shahri (Xaritadagi 40 ta mahalla)
  ...["Al-Xorazmiy", "Ma'rifat", "Ashxobot", "Mashal", "Avesto", "Mustaqillik", "Baynalminal", "Navbahor", "Beshmergan", "Navro'z", "Binokor", "Nurli hayot", "Bo'ston", "Obi hayot", "Bobur", "Olimpiya", "Do'stlik", "Olma bog'", "Feruz", "Sahovat", "Gulchilar", "Shodlik", "Gulshan", "Temir yo'lchi", "Gulzor", "Toza bog'", "Islomobod", "Umid", "Istitqlol", "Hamjihatlik", "J.Manguberdi", "Yangi O'zbekiston", "Jambul", "Yangi hayot", "Jingavuz", "Yangi obod", "Kamolot", "Yuqori bog'", "Ko'hna qal'a", "Ziyokor"].map((n, i) => ({ id: `u_sh_${i}`, district_id: 'urganch_sh', name: `${n} mahallasi` })),

  // Urganch tumani
  ...["Qoraul", "G'aybu", "Choandir", "Oq oltin", "Gurlan-yop", "Yuqori bog'", "Chandiriyot", "Chatko'pir", "Kenagas", "Oq kashish", "Beruniy", "Istiqlol", "Ko'rgancha", "Bekobod", "Mevazor", "Sholikor", "Cholish", "Qumrabot", "Uyg'ur", "Qiyot", "Navro'z", "Beshterak", "Tazabog'"].map((n, i) => ({ id: `u_t_${i}`, district_id: 'urganch_t', name: `${n} mahallasi` })),

  // Xiva shahri
  ...["Ittifoq", "Yangi hayot", "Mevaston", "Sangar", "Kaptarxona", "Toshqala", "Labixovuz", "Ichan qal'a", "Dishon qal'a", "Qibla toza bog'", "Ibn Sino", "Najmiddin Kubro", "Pahlavon Mahmud", "Nurullaboy", "Polvon qori"].map((n, i) => ({ id: `x_sh_${i}`, district_id: 'xiva_sh', name: `${n} mahallasi` })),

  // Xiva tumani
  ...["Ghandimyan", "Parcha xos", "Sayot", "Sho'r-qal'a", "Dashyoq", "Chodra", "Chinobod", "Eski Qiyot", "Sapcha", "Shomaxulum", "Angariq", "Qang'li", "Zargar", "Irdimzon", "Zarafshon", "Ilg'or", "Uchqun", "Tozabog'"].map((n, i) => ({ id: `x_t_${i}`, district_id: 'xiva_t', name: `${n} mahallasi` })),

  // Xonqa tumani
  ...["Xonqa", "Paxtagul", "Madaniy yer", "Navxos", "Olaja", "Amudaryo", "Qirg'iz-yop", "Sarapayon", "Tomadurvad", "Durvad", "Jirmiz", "Qirq yop", "Namuna", "Navro'z", "Istiqlol", "Beshariq", "Qiyot", "Shodlik", "Mustaqillik", "Gulzor"].map((n, i) => ({ id: `xn_${i}`, district_id: 'xonqa', name: `${n} mahallasi` })),

  // Gurlan tumani
  ...["Gurlan", "Chakkalar", "Olchin", "Do'stimbiya", "Vazir", "Nurafshon", "Bog'olon", "Eshonqal'a", "Markaziy", "Birlashgan", "Do'stlik", "Bo'zqal'a", "Sholikor", "Guliston", "Dehqonobod", "Paxtakor", "Alisher Navoiy", "O'zbekiston", "Nukus", "Yangi hayot", "Toshsaqa"].map((n, i) => ({ id: `g_${i}`, district_id: 'gurlan', name: `${n} mahallasi` })),

  // Shovot tumani
  ...["Shovot", "Bo'yirachi", "Ijtimoiyat", "Manak", "Chig'atoy", "Qatag'on", "Monoq", "Beshmirgan", "Komiljon Otaniyozov", "Oq ko'l", "Turon", "Navro'z", "Guliston", "Paxtachi", "Kattabog'", "Xitoy", "Qoraqosh", "Beshuy", "Oqtepa", "Amir Temur"].map((n, i) => ({ id: `sh_${i}`, district_id: 'shovot', name: `${n} mahallasi` })),

  // Hazorasp tumani
  ...["Hazorasp", "Sanoat", "Bo'ston", "Al-Xorazmiy", "Oybek", "Temirchi", "Karvak", "Jilovdor", "Pichoqchi", "Muhabbat", "Yangi hayot", "Guliston", "Bog'dor", "Sanoqli", "Beshariq", "Ovshar", "Toshsaka", "Nurobod", "Yangi asr"].map((n, i) => ({ id: `hz_${i}`, district_id: 'hazorasp', name: `${n} mahallasi` })),

  // Qo'shko'pir tumani
  ...["Qo'shko'pir", "Oqdarband", "Xonobod", "Shixmashad", "G'azovot", "Ittifoq", "Shix", "O'rta yop", "Xadra", "Katagan", "Bozor yop", "Uzunko'l", "O'rta qishloq", "Qiyot", "Shixmahalla", "Tazabog'", "Shakarboy", "Yangiobod"].map((n, i) => ({ id: `q_${i}`, district_id: 'qoshkopir', name: `${n} mahallasi` })),

  // Bog'ot tumani
  ...["Bog'ot", "Qulonqarabog'", "Beshariq", "Dehqonbozor", "Madaniyat", "Oltinqum", "Xo'jalik", "Nayman", "Uzunbog'", "Qora-yop", "Hurriyat", "Qipchoq", "O'zbekiston", "Navbahor", "Zarafshon", "Mustaqillik", "Do'stlik", "Amir Temur"].map((n, i) => ({ id: `b_${i}`, district_id: 'bogot', name: `${n} mahallasi` })),

  // Yangiariq tumani
  ...["Yangiariq", "Ostona", "Gullanbog'", "Tagan", "Soburzon", "Kattabog'", "Suvloq", "Chikirchi", "Qo'shqir", "Qatag'on", "Zaynal", "Qo'shloq", "Beshariq", "Tikanliq", "O'zbekiston"].map((n, i) => ({ id: `ya_${i}`, district_id: 'yangiariq', name: `${n} mahallasi` })),

  // Yangibozor tumani
  ...["Yangibozor", "Cho'li-shovot", "Bo'zqal'a", "Shirinqo'ng'irot", "Qatag'on", "Bog'olon", "Navoiy", "Uyg'ur", "Bashir", "Yangi yop", "Chobolon", "Qalandar", "Avesto", "Guliston", "Yoshlik"].map((n, i) => ({ id: `yb_${i}`, district_id: 'yangibozor', name: `${n} mahallasi` })),

  // Tuproqqal'a tumani
  ...["Pitnak shaharchasi", "Sarimoy", "Muhabbat", "Sayyod", "Sharlauq", "Obod", "Nukus", "Hazorasp chegara", "Shovot", "Sharq yulduzi", "Navbahor", "Toshsaqa", "Yoshlik", "Istiqlol"].map((n, i) => ({ id: `tp_${i}`, district_id: 'tuproqqala', name: `${n} mahallasi` })),
];

// Standalone InputField component - MUST be outside AuthPage to prevent focus loss
const InputField = ({ icon: Icon, label, value, onChange, error, type='text', placeholder, half=false }: {
  icon: any, label: string, value: string, onChange: (val: string) => void, error?: string,
  type?: string, placeholder?: string, half?: boolean
}) => (
  <div className={half ? 'flex-1' : ''}>
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1.5 block">{label}</label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-400 transition-colors" size={16} />
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-11 pr-5 py-3.5 bg-slate-50/80 border rounded-2xl text-sm font-medium text-slate-700 outline-none focus:bg-white focus:border-brand-200 focus:ring-3 focus:ring-brand-500/5 transition-all placeholder:text-slate-300 ${error ? 'border-rose-300 bg-rose-50/30' : 'border-slate-100'}`}
      />
    </div>
    {error && <p className="text-[10px] text-rose-500 font-semibold mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10}/>{error}</p>}
  </div>
)

const SelectField = ({ icon: Icon, label, value, onChange, options, error, placeholder, half=false, disabled=false }: {
  icon: any, label: string, value: string, onChange: (val: string) => void, options: {id:string, name:string}[], error?: string, placeholder?: string, half?: boolean, disabled?: boolean
}) => (
  <div className={half ? 'flex-1' : ''}>
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1.5 block">{label}</label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-400 transition-colors" size={16} />
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full pl-11 pr-10 py-3.5 bg-slate-50/80 border rounded-2xl text-sm font-medium outline-none focus:bg-white focus:border-brand-200 focus:ring-3 focus:ring-brand-500/5 transition-all appearance-none ${value ? 'text-slate-700' : 'text-slate-400'} ${error ? 'border-rose-300 bg-rose-50/30' : 'border-slate-100'} ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
    {error && <p className="text-[10px] text-rose-500 font-semibold mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10}/>{error}</p>}
  </div>
)

export const AuthPage = ({ onLogin }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<'parent' | 'doctor'>('parent')
  const [step, setStep] = useState(1) // 1=credentials, 2=personal info, 3=child/doctor info
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string,string>>({})
  const [agreed, setAgreed] = useState(false)

  const [form, setForm] = useState({
    fullName: '', phone: '', password: '', confirmPassword: '',
    // Shared Address fields
    region: 'xorazm', district: '', neighborhood: '', street: '',
    // Parent fields
    childName: '', childBirthDate: '', childGender: 'female' as 'male'|'female',
    childBloodType: '', emergencyPhone: '',
    // Doctor fields
    specialization: '', clinicName: '', licenseNumber: '', experience: '',
  })

  const set = (key: string, val: string) => {
    setForm(p => {
      const next = { ...p, [key]: val }
      if (key === 'district') next.neighborhood = '' // Tuman o'zgarsa mahallani tozalash
      return next
    })
    setErrors(p => { const n = {...p}; delete n[key]; return n })
  }

  const validateStep1 = () => {
    const e: Record<string,string> = {}
    if (!form.phone.trim()) e.phone = "Telefon raqam kiriting"
    if (!form.password) e.password = "Parol kiriting"
    else if (form.password.length < 6) e.password = "Kamida 6 belgi bo'lishi kerak"
    if (!isLogin) {
      if (!form.fullName.trim()) e.fullName = "F.I.Sh kiriting"
      if (form.password !== form.confirmPassword) e.confirmPassword = "Parollar mos kelmadi"
    }
    setErrors(e); return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e: Record<string,string> = {}
    if (!form.district) e.district = "Tumanni tanlang"
    if (!form.neighborhood) e.neighborhood = "Mahallani tanlang"

    if (userType === 'parent') {
      if (!form.childName.trim()) e.childName = "Bola ismini kiriting"
      if (!form.childBirthDate) e.childBirthDate = "Tug'ilgan sanani kiriting"
    } else {
      if (!form.specialization.trim()) e.specialization = "Mutaxassislikni kiriting"
      if (!form.clinicName.trim()) e.clinicName = "Klinika nomini kiriting"
      if (!form.licenseNumber.trim()) e.licenseNumber = "Litsenziya raqamini kiriting"
    }
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // LOGIN (Tizimga kirish)
    if (isLogin) { 
      if (!validateStep1()) return 
      setIsLoading(true)
      
      const virtualEmail = `${form.phone.replace(/\D/g, '')}@immunobaby.uz`
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: virtualEmail,
        password: form.password,
      })
      
      if (error) {
        setIsLoading(false)
        setErrors({ phone: "Telefon raqami yoki parol noto'g'ri" })
        return
      }

      // Foydalanuvchining asl rolini (ota-ona yoki shifokor) bazadan tekshiramiz
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
      
      setIsLoading(false)

      if (profile && profile.role !== userType) {
        alert(`Siz bu tizimda ${profile.role === 'doctor' ? 'Shifokor' : 'Ota-ona'} sifatida ro'yxatdan o'tgansiz. Iltimos, tepadan to'g'ri bo'limni tanlang!`)
        return
      }

      onLogin(profile?.role || userType)
    } 
    
    // REGISTER (Ro'yxatdan o'tish)
    else {
      if (step < 3) { handleNext(); return }
      if (!agreed) { setErrors({agreed:"Shartlarni qabul qiling"}); return }
      
      setIsLoading(true)
      
      try {
        const virtualEmail = `${form.phone.replace(/\D/g, '')}@immunobaby.uz`
        
        // 1. Supabase Auth orqali profilingizni yaratamiz
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: virtualEmail,
          password: form.password,
        })
        
        if (authError) throw new Error(authError.message)
        if (!authData.user) throw new Error("Xatolik: Foydalanuvchi tizimda yaratilmadi")

        // 2. Tanlangan manzil va shifokor/ota-ona malumotlarini PROFILES jadvaliga yozamiz
        const profilePayload = {
          id: authData.user.id,
          role: userType,
          full_name: form.fullName,
          phone: form.phone,
          region_id: 'xorazm', 
          district_id: form.district,
          neighborhood_id: form.neighborhood,
        }

        if (userType === 'doctor') {
          Object.assign(profilePayload, {
            specialization: form.specialization,
            clinic_name: form.clinicName,
            license_number: form.licenseNumber,
            experience_years: parseInt(form.experience) || 0
          })
        }

        const { error: profileError } = await supabase.from('profiles').insert([profilePayload])
        if (profileError) throw new Error(profileError.message)

        // 3. Agar ro'yxatdan o'tayotgan foydalanuvchi Ota-ona bo'lsa, Bolani ham PATIENTS jadvaliga qo'shamiz
        if (userType === 'parent') {
          const { error: patientError } = await supabase.from('patients').insert([{
            parent_id: authData.user.id,
            name: form.childName,
            birth_date: form.childBirthDate,
            gender: form.childGender,
            neighborhood_id: form.neighborhood,
          }])
          if (patientError) throw new Error(patientError.message)
        }

        alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!")
        onLogin(userType)
        
      } catch (err: any) {
        alert("Xatolik yuz berdi: " + err.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const totalSteps = isLogin ? 1 : 3

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#F6F7FB]">
      {/* Animated BG */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div animate={{ y:[0,-40,0], x:[0,30,0], scale:[1,1.15,1] }} transition={{ duration:18, repeat:Infinity, ease:"easeInOut" }}
          className="absolute top-[-20%] right-[-15%] w-[60%] h-[60%] bg-gradient-to-br from-brand-200/40 to-brand-300/20 blur-[140px] rounded-full" />
        <motion.div animate={{ y:[0,50,0], x:[0,-25,0], scale:[1,1.1,1] }} transition={{ duration:22, repeat:Infinity, ease:"easeInOut", delay:4 }}
          className="absolute bottom-[-20%] left-[-15%] w-[50%] h-[50%] bg-gradient-to-tr from-indigo-200/30 to-violet-200/20 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-12 gap-0 items-stretch min-h-[680px]">
          
          {/* LEFT: Branding */}
          <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7 }}
            className="col-span-5 relative overflow-hidden rounded-l-[3rem]"
            style={{ background:'linear-gradient(135deg, #FF4D6D 0%, #FF758F 40%, #FF8FA3 100%)' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/8 rounded-full -mr-32 -mt-32 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20 blur-xl" />
            <motion.div animate={{ y:[0,-15,0], rotate:[0,3,0] }} transition={{ duration:6, repeat:Infinity }}
              className="absolute bottom-20 right-8 opacity-[0.06]"><Baby size={200}/></motion.div>

            <div className="relative z-10 p-12 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-14">
                  <div className="w-12 h-12 bg-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                    <Heart size={24} fill="currentColor" className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-white tracking-tight">Immuno Baby</h2>
                    <p className="text-[9px] font-bold text-white/50 uppercase tracking-[0.15em]">Smart Healthcare</p>
                  </div>
                </div>
                <h1 className="text-[34px] font-extrabold text-white leading-[1.15] tracking-tight mb-5">
                  Farzandingiz<br/>sog'lig'ini<br/><span className="text-white/70">nazorat qiling</span>
                </h1>
                <p className="text-[13px] font-medium text-white/50 leading-relaxed max-w-[280px]">
                  Emlash taqvimi, o'sish kuzatuvi va salomatlik monitoring — barchasi bir platformada.
                </p>
              </div>

              {/* Features list */}
              <div className="space-y-2.5">
                {[
                  { icon: ShieldCheck, text: "256-bit SSL shifrlash himoyasi" },
                  { icon: Sparkles, text: "13 xil kasallikdan himoya" },
                  { icon: Calendar, text: "Milliy emlash taqvimi bilan sinxron" },
                  { icon: Baby, text: "O'sish va rivojlanish kuzatuvi" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.5+i*0.1}}
                    className="flex items-center gap-3 bg-white/8 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/5">
                    <item.icon size={14} className="text-white/50 shrink-0" />
                    <span className="text-[11px] font-semibold text-white/60">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{duration:0.7, delay:0.15}}
            className="col-span-7 bg-white/80 backdrop-blur-3xl rounded-r-[3rem] p-10 flex flex-col justify-center border border-white/60 overflow-y-auto max-h-[700px]"
            style={{boxShadow:'0 20px 80px rgba(0,0,0,0.06)'}}>
            
            {/* User Type Switcher */}
            <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-6 border border-slate-100/80">
              <button onClick={() => { setUserType('parent'); setStep(1); setErrors({}) }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  userType==='parent' ? 'bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-brand' : 'text-slate-400 hover:text-slate-600'}`}>
                <UserCheck size={15}/> Ota-ona
              </button>
              <button onClick={() => { setUserType('doctor'); setStep(1); setErrors({}) }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  userType==='doctor' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-slate-600'}`}>
                <Stethoscope size={15}/> Shifokor
              </button>
            </div>

            {/* Step indicator (registration only) */}
            {!isLogin && (
              <div className="flex items-center gap-3 mb-6">
                {[1,2,3].map(s => (
                  <div key={s} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold transition-all duration-300 ${
                      step > s ? 'bg-emerald-500 text-white' : step === s 
                        ? (userType==='doctor' ? 'bg-blue-600 text-white' : 'bg-brand-500 text-white')
                        : 'bg-slate-100 text-slate-400'}`}>
                      {step > s ? <CheckCircle2 size={16}/> : s}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider hidden sm:block ${step >= s ? 'text-slate-600' : 'text-slate-300'}`}>
                      {s===1 ? "Hisob" : s===2 ? (userType==='parent' ? "Bola" : "Shifokor") : "Tasdiqlash"}
                    </span>
                    {s < 3 && <div className={`flex-1 h-0.5 rounded-full ${step > s ? 'bg-emerald-400' : 'bg-slate-100'}`}/>}
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div key={`${isLogin}-${step}`} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:0.25}}>
                
                <h2 className="text-[24px] font-extrabold text-slate-800 tracking-tight mb-1">
                  {isLogin ? 'Tizimga kirish' : step===1 ? "Hisob yaratish" : step===2 ? (userType==='parent' ? "Bola ma'lumotlari" : "Shifokor ma'lumotlari") : "Tasdiqlash"}
                </h2>
                <p className="text-[12px] font-medium text-slate-400 mb-6">
                  {isLogin ? (userType==='doctor' ? "Shifokor kabinetingizga kiring" : "Monitoring panelingizga kiring")
                    : step===1 ? "Asosiy hisob ma'lumotlarini kiriting"
                    : step===2 ? (userType==='parent' ? "Farzandingiz haqida ma'lumot" : "Professional ma'lumotlaringiz")
                    : "Ma'lumotlarni tekshiring va tasdiqlang"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  
                  {/* ===== STEP 1: Credentials ===== */}
                  {(isLogin || step === 1) && (<>
                    {!isLogin && <InputField icon={User} label={userType==='doctor' ? "F.I.Sh (Shifokor)" : "F.I.Sh (Ota-ona)"} value={form.fullName} onChange={v => set('fullName', v)} error={errors.fullName} placeholder={userType==='doctor' ? "Dr. Nigora Karimbekova" : "Aziza Alisherova"} />}
                    
                    <InputField icon={Phone} label="Telefon raqam" value={form.phone} onChange={v => set('phone', v)} error={errors.phone} type="tel" placeholder="+998 90 123 45 67" />

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1.5 block">Parol</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-400 transition-colors" size={16}/>
                        <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => set('password', e.target.value)} placeholder="••••••••"
                          className={`w-full pl-11 pr-14 py-3.5 bg-slate-50/80 border rounded-2xl text-sm font-medium text-slate-700 outline-none focus:bg-white focus:border-brand-200 focus:ring-3 focus:ring-brand-500/5 transition-all placeholder:text-slate-300 ${errors.password ? 'border-rose-300' : 'border-slate-100'}`}/>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors p-1">
                          {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                        </button>
                      </div>
                      {errors.password && <p className="text-[10px] text-rose-500 font-semibold mt-1 ml-1 flex items-center gap-1"><AlertCircle size={10}/>{errors.password}</p>}
                      {!isLogin && form.password && (
                        <div className="flex gap-1 mt-2">
                          {[1,2,3,4].map(i => (
                            <div key={i} className={`flex-1 h-1 rounded-full transition-all ${form.password.length >= i*2 ? (form.password.length >= 8 ? 'bg-emerald-400' : form.password.length >= 6 ? 'bg-amber-400' : 'bg-rose-400') : 'bg-slate-100'}`}/>
                          ))}
                        </div>
                      )}
                    </div>

                    {!isLogin && <InputField icon={Lock} label="Parolni tasdiqlang" value={form.confirmPassword} onChange={v => set('confirmPassword', v)} error={errors.confirmPassword} type="password" placeholder="••••••••" />}

                    {isLogin && (
                      <div className="flex justify-end">
                        <button type="button" className="text-[11px] font-bold text-brand-500 hover:text-brand-600 transition-colors">Parolni unutdingizmi?</button>
                      </div>
                    )}
                  </>)}

                  {/* ===== STEP 2: Personal Info ===== */}
                  {!isLogin && step === 2 && userType === 'parent' && (<>
                    <InputField icon={Baby} label="Bola ismi" value={form.childName} onChange={v => set('childName', v)} error={errors.childName} placeholder="Maftunaxon Alisherova" />
                    <div className="flex gap-3">
                      <InputField icon={Calendar} label="Tug'ilgan sana" value={form.childBirthDate} onChange={v => set('childBirthDate', v)} error={errors.childBirthDate} type="date" placeholder="" half />
                      <div className="flex-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1.5 block">Jinsi</label>
                        <div className="flex gap-2">
                          {[{v:'female' as const,l:"Qiz 👧"},{v:'male' as const,l:"O'g'il 👦"}].map(g => (
                            <button key={g.v} type="button" onClick={() => set('childGender', g.v)}
                              className={`flex-1 py-3.5 rounded-2xl text-[11px] font-bold border transition-all ${form.childGender===g.v ? 'bg-brand-50 border-brand-200 text-brand-600' : 'bg-slate-50/80 border-slate-100 text-slate-400'}`}>
                              {g.l}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <InputField icon={Droplets} label="Qon guruhi" value={form.childBloodType} onChange={v => set('childBloodType', v)} error={errors.childBloodType} placeholder="A+" half />
                      <InputField icon={Phone} label="Favqulodda aloqa" value={form.emergencyPhone} onChange={v => set('emergencyPhone', v)} error={errors.emergencyPhone} type="tel" placeholder="+998 71 234 56 78" half />
                    </div>
                    
                    <div className="pt-2 border-t border-slate-100 mt-2 space-y-3.5">
                      <div className="flex gap-3">
                        <SelectField icon={MapPin} label="Viloyat" value={form.region} onChange={v => set('region', v)} options={regions} placeholder="Viloyatni tanlang" half disabled />
                        <SelectField icon={MapPin} label="Tuman / Shahar" value={form.district} onChange={v => set('district', v)} options={districts.filter(d => d.region_id === form.region)} error={errors.district} placeholder="Tumanni tanlang" half />
                      </div>
                      <div className="flex gap-3">
                        <SelectField icon={Building2} label="Mahalla" value={form.neighborhood} onChange={v => set('neighborhood', v)} options={neighborhoods.filter(n => n.district_id === form.district)} error={errors.neighborhood} placeholder="Mahallani tanlang" half />
                        <InputField icon={MapPin} label="Uy/Kvartira (ixtiyoriy)" value={form.street} onChange={v => set('street', v)} placeholder="Masalan: 12-uy, 4-xonadon" half />
                      </div>
                    </div>
                  </>)}

                  {!isLogin && step === 2 && userType === 'doctor' && (<>
                    <InputField icon={Stethoscope} label="Mutaxassislik" value={form.specialization} onChange={v => set('specialization', v)} error={errors.specialization} placeholder="Pediatr" />
                    <InputField icon={Building2} label="Klinika / Poliklinika" value={form.clinicName} onChange={v => set('clinicName', v)} error={errors.clinicName} placeholder="14-sonli Oilaviy Poliklinika" />
                    <div className="flex gap-3">
                      <InputField icon={ShieldCheck} label="Litsenziya raqami" value={form.licenseNumber} onChange={v => set('licenseNumber', v)} error={errors.licenseNumber} placeholder="MD-2025-XXXX" half />
                      <InputField icon={Calendar} label="Ish tajribasi (yil)" value={form.experience} onChange={v => set('experience', v)} error={errors.experience} placeholder="12" half />
                    </div>

                    <div className="pt-2 border-t border-slate-100 mt-2 space-y-3.5">
                      <div className="flex gap-3">
                        <SelectField icon={MapPin} label="Viloyat" value={form.region} onChange={v => set('region', v)} options={regions} placeholder="Viloyatni tanlang" half disabled />
                        <SelectField icon={MapPin} label="Tuman / Shahar" value={form.district} onChange={v => set('district', v)} options={districts.filter(d => d.region_id === form.region)} error={errors.district} placeholder="Tumanni tanlang" half />
                      </div>
                      <div className="flex gap-3">
                        <SelectField icon={Building2} label="Biriktirilgan Mahalla" value={form.neighborhood} onChange={v => set('neighborhood', v)} options={neighborhoods.filter(n => n.district_id === form.district)} error={errors.neighborhood} placeholder="Mahallani tanlang" half />
                        <InputField icon={MapPin} label="Ko'cha/Uy (ixtiyoriy)" value={form.street} onChange={v => set('street', v)} placeholder="Masalan: 5-daha, 10-uy" half />
                      </div>
                    </div>
                  </>)}

                  {/* ===== STEP 3: Confirmation ===== */}
                  {!isLogin && step === 3 && (
                    <div className="space-y-3">
                      {/* Summary Card */}
                      <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 space-y-3">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Ma'lumotlar xulosasi</h4>
                        {(() => {
                          const distName = districts.find(d => d.id === form.district)?.name || ''
                          const neighName = neighborhoods.find(n => n.id === form.neighborhood)?.name || ''
                          const addressFull = distName && neighName ? `${distName}, ${neighName}${form.street ? ', ' + form.street : ''}` : '-'
                          
                          return [
                            { l: "F.I.Sh", v: form.fullName },
                            { l: "Telefon", v: form.phone },
                            ...(userType === 'parent' ? [
                              { l: "Bola ismi", v: form.childName },
                              { l: "Tug'ilgan sana", v: form.childBirthDate },
                              { l: "Jinsi", v: form.childGender === 'female' ? "Qiz" : "O'g'il" },
                              { l: "Qon guruhi", v: form.childBloodType || "-" },
                              { l: "Manzil", v: addressFull },
                            ] : [
                              { l: "Mutaxassislik", v: form.specialization },
                              { l: "Klinika", v: form.clinicName },
                              { l: "Litsenziya", v: form.licenseNumber },
                              { l: "Biriktirilgan hudud", v: addressFull },
                            ])
                          ].map((r, i) => (
                            <div key={i} className="flex justify-between items-center py-1.5 border-b border-slate-100/50 last:border-0">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">{r.l}</span>
                              <span className="text-[12px] font-semibold text-slate-700">{r.v}</span>
                            </div>
                          ))
                        })()}
                      </div>

                      {/* Terms */}
                      <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${agreed ? 'bg-emerald-50/50 border-emerald-200' : errors.agreed ? 'bg-rose-50/50 border-rose-200' : 'bg-slate-50/50 border-slate-100'}`}>
                        <input type="checkbox" checked={agreed} onChange={e => { setAgreed(e.target.checked); setErrors(p => { const n={...p}; delete n.agreed; return n }) }}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500/20" />
                        <div>
                          <p className="text-[11px] font-semibold text-slate-700">Foydalanish shartlarini qabul qilaman</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Shaxsiy ma'lumotlarim 256-bit SSL orqali himoyalanishiga roziman</p>
                        </div>
                      </label>
                      {errors.agreed && <p className="text-[10px] text-rose-500 font-semibold ml-1 flex items-center gap-1"><AlertCircle size={10}/>{errors.agreed}</p>}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className={`flex gap-3 mt-4 ${!isLogin && step > 1 ? '' : ''}`}>
                    {!isLogin && step > 1 && (
                      <button type="button" onClick={() => setStep(step-1)}
                        className="px-6 py-3.5 rounded-2xl border border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider hover:bg-slate-50 transition-all flex items-center gap-2">
                        <ArrowLeft size={14}/> Orqaga
                      </button>
                    )}
                    <motion.button type="submit" disabled={isLoading} whileHover={{scale:1.01}} whileTap={{scale:0.98}}
                      className={`flex-1 py-3.5 rounded-2xl font-extrabold text-[12px] uppercase tracking-[0.12em] shadow-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                        userType==='doctor'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-600/20'
                          : 'bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-brand'}`}>
                      {isLoading ? (
                        <motion.div animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:"linear"}} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"/>
                      ) : (<>
                        {isLogin ? 'Kirish' : step < 3 ? 'Davom etish' : "Ro'yxatdan o'tish"}
                        <ArrowRight size={15}/>
                      </>)}
                    </motion.button>
                  </div>
                </form>

                {/* Toggle */}
                <div className="mt-6 text-center">
                  <span className="text-[12px] font-medium text-slate-400">{isLogin ? "Hisobingiz yo'qmi? " : "Allaqachon hisobingiz bormi? "}</span>
                  <button onClick={() => { setIsLogin(!isLogin); setStep(1); setErrors({}) }}
                    className={`text-[12px] font-bold transition-colors ${userType==='doctor' ? 'text-blue-600' : 'text-brand-500'}`}>
                    {isLogin ? "Ro'yxatdan o'ting" : "Tizimga kiring"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
