import { motion } from 'framer-motion'
import { Home, Calendar, BarChart3, User, LogOut, Heart, BookOpen, Users, ClipboardList, Bell, Syringe, Stethoscope, Activity, X } from 'lucide-react'

interface SidebarProps {
  activePortal: string
  setActivePortal: (portal: string) => void
  t: any
  userType: 'parent' | 'doctor'
  onLogout?: () => void
  isOpen?: boolean
  onClose?: () => void
}

export const Sidebar = ({ activePortal, setActivePortal, t, userType, onLogout, isOpen, onClose }: SidebarProps) => {
  // Menu items change based on who is logged in
  const parentMenu = [
    { id: 'dashboard', icon: Home, label: t.dashboard },
    { id: 'calendar', icon: Calendar, label: t.calendar },
    { id: 'stats', icon: BarChart3, label: t.statistics },
    { id: 'notifications', icon: Bell, label: t.notifications },
    { id: 'info', icon: BookOpen, label: t.knowledge },
    { id: 'profile', icon: User, label: t.profile },
  ]

  const doctorMenu = [
    { id: 'dashboard', icon: LayoutGridIcon, label: "Ish Stoli" },
    { id: 'patients', icon: Users, label: "Bemorlarim" },
    { id: 'appointments', icon: ClipboardList, label: "Navbatlar" },
    { id: 'stats', icon: BarChart3, label: t.statistics || "Statistika" },
    { id: 'profile', icon: User, label: t.profile },
  ]

  const menuItems = userType === 'doctor' ? doctorMenu : parentMenu

  return (
    <>
      <aside className={`w-[280px] bg-white/60 backdrop-blur-3xl border-r border-white/60 flex flex-col py-8 px-6 z-40 fixed h-full noise-overlay transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Close button for mobile */}
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all"
        >
          <X size={20} />
        </button>

        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12 px-3"
        >
          <img src="/logo.png" alt="Immuno Baby" className="w-12 h-12 object-contain" />
          <div>
            <h2 className="text-[17px] font-extrabold text-slate-800 tracking-tight leading-tight">Immuno Baby</h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-0.5">
              {userType === 'doctor' ? "Medical Portal" : "Smart Healthcare"}
            </p>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 px-1">
          {menuItems.map((item, index) => {
            const isActive = activePortal === item.id
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setActivePortal(item.id)}
                className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                  isActive 
                    ? (userType === 'doctor' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20' 
                        : 'bg-gradient-to-r from-brand-500 to-brand-400 text-white shadow-lg shadow-brand')
                    : 'text-slate-400 hover:bg-white/60 hover:text-slate-700 hover:shadow-sm'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute left-0 top-[20%] w-[3px] h-[60%] rounded-r-full ${
                      userType === 'doctor' ? 'bg-white/50' : 'bg-white/50'
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                <item.icon 
                  size={19} 
                  className={`transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : (userType === 'doctor' 
                          ? 'group-hover:text-blue-500' 
                          : 'group-hover:text-brand-500')
                  }`} 
                />
                <span className="font-semibold text-[13px] tracking-tight">{item.label}</span>
                
                {/* Notification badge for notifications menu item */}
                {item.id === 'notifications' && !isActive && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-brand-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse-soft">
                    3
                  </span>
                )}
              </motion.button>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto pt-6 border-t border-slate-100/60 px-1">
          {/* User mini profile */}
          <div className="flex items-center gap-3 mb-4 px-3 py-3 rounded-2xl bg-slate-50/50">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center text-brand-600 font-bold text-sm">
              {userType === 'doctor' ? '👨‍⚕️' : '👩'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-700 truncate">
                {userType === 'doctor' ? 'Dr. Nigora' : 'Aziza Alisherova'}
              </p>
              <p className="text-[9px] font-medium text-slate-400 truncate">
                {userType === 'doctor' ? 'Pediatr' : 'Ota-ona'}
              </p>
            </div>
          </div>

          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3.5 px-5 py-3.5 text-slate-400 font-semibold text-[13px] hover:bg-rose-50 hover:text-rose-500 rounded-2xl transition-all duration-300"
          >
            <LogOut size={18} />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>
    </>
  )
}

// Simple LayoutGrid icon if not imported
const LayoutGridIcon = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
)
