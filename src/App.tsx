import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'


// Components
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'

// Pages
import { AuthPage } from './pages/AuthPage'
import { Dashboard } from './pages/Dashboard'
import { Profile } from './pages/Profile'
import { KnowledgeBase } from './pages/KnowledgeBase'
import { DoctorDashboard } from './pages/DoctorDashboard'
import { VaccineCalendar } from './pages/VaccineCalendar'
import { Statistics } from './pages/Statistics'
import { Notifications } from './pages/Notifications'
import { Patients } from './pages/Patients'
import { Appointments } from './pages/Appointments'

// Data
import { translations } from './data/translations'

const BubbleBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#F6F7FB] mesh-gradient">
    <motion.div 
      animate={{ y: [0, -50, 0], x: [0, 30, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-15%] right-[-10%] w-[55%] h-[55%] bg-gradient-to-br from-brand-100/30 to-brand-200/20 blur-[120px] rounded-full" 
    />
    <motion.div 
      animate={{ y: [0, 50, 0], x: [0, -30, 0], scale: [1, 1.12, 1] }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] bg-gradient-to-tr from-indigo-100/20 to-violet-100/15 blur-[140px] rounded-full" 
    />
    <motion.div 
      animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-gradient-to-br from-blue-100/10 to-teal-100/10 blur-[100px] rounded-full" 
    />
  </div>
)

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'parent' | 'doctor'>('parent')
  const [activePortal, setActivePortal] = useState('dashboard')
  const [lang, setLang] = useState('uz')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const t = translations[lang]

  const handleLogin = (type: 'parent' | 'doctor') => {
    setUserType(type)
    setIsAuthenticated(true)
    setActivePortal('dashboard')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActivePortal('dashboard')
  }

  // Show Auth Page if not authenticated
  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="auth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AuthPage onLogin={handleLogin} />
        </motion.div>
      </AnimatePresence>
    )
  }

  const getPageTitle = () => {
    switch(activePortal) {
      case 'dashboard': return userType === 'doctor' ? "Shifokor Kabineti 👨‍⚕️" : `Maftunaxon 👶`
      case 'profile': return t.profile
      case 'info': return t.knowledge
      case 'calendar': return t.calendar
      case 'stats': return t.statistics
      case 'notifications': return t.notifications
      case 'doctor_panel': return "Shifokor Kabineti 👨‍⚕️"
      case 'patients': return "Bemorlar 👶"
      case 'appointments': return "Navbatlar 📋"
      default: return userType === 'doctor' ? "Shifokor Kabineti 👨‍⚕️" : `Maftunaxon 👶`
    }
  }

  const renderContent = () => {
    // If we are in Doctor mode and Dashboard is active, show DoctorDashboard
    if (userType === 'doctor' && activePortal === 'dashboard') {
      return <DoctorDashboard t={t} />
    }

    switch(activePortal) {
      case 'dashboard':
        return <Dashboard t={t} />
      case 'profile':
        return <Profile t={t} lang={lang} setLang={setLang} />
      case 'info':
        return <KnowledgeBase t={t} />
      case 'calendar':
        return <VaccineCalendar t={t} />
      case 'stats':
        return <Statistics t={t} />
      case 'notifications':
        return <Notifications t={t} />
      case 'doctor_panel':
        return <DoctorDashboard t={t} />
      case 'patients':
        return <Patients t={t} />
      case 'appointments':
        return <Appointments t={t} />
      default:
        return (
          <div className="p-20 text-center">
            <h2 className="text-4xl font-black text-slate-200 uppercase tracking-[0.2em]">{t.soon}</h2>
            <p className="text-slate-400 mt-4 font-bold italic">Bu bo'lim ustida ish olib borilmoqda</p>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F6F7FB] font-inter overflow-hidden">
      <BubbleBackground />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <Sidebar 
        activePortal={activePortal} 
        setActivePortal={(portal) => { setActivePortal(portal); setSidebarOpen(false) }} 
        t={t} 
        userType={userType}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN CONTENT AREA */}
      <main className="lg:ml-[280px] flex-1 h-screen overflow-y-auto px-5 lg:px-10 pt-6 lg:pt-10 relative">
        
        {/* Mobile Header Button */}
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-5 left-5 z-50 w-11 h-11 bg-white/80 backdrop-blur-xl border border-white/80 rounded-2xl flex items-center justify-center shadow-glass text-slate-600 hover:text-brand-500 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>



        <Header 
          title={getPageTitle()} 
          t={t} 
          lang={lang} 
          setLang={setLang} 
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePortal}-${userType}`}
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
