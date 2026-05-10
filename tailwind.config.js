/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        baby: {
          pink: '#FF8BA7',
          teal: '#BBDED6',
          peach: '#FAE3D9',
          cream: '#FAFAFA',
          slate: '#334756',
        },
        brand: {
          50: '#FFF0F3',
          100: '#FFD9E2',
          200: '#FFB3C5',
          300: '#FF8BA7',
          400: '#FF6B8B',
          500: '#FF4D6D',
          600: '#E63E5C',
          700: '#CC2F4A',
          800: '#991F35',
          900: '#661020',
        },
        surface: {
          primary: '#FFFFFF',
          secondary: '#F8FAFC',
          tertiary: '#F1F5F9',
          elevated: 'rgba(255, 255, 255, 0.7)',
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s infinite ease-in-out',
        'float-slow': 'float 10s infinite ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.03)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      backdropBlur: {
        '3xl': '64px',
        '4xl': '80px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.04)',
        'glass-lg': '0 20px 60px rgba(0, 0, 0, 0.06)',
        'brand': '0 10px 40px rgba(255, 77, 109, 0.15)',
        'brand-lg': '0 20px 60px rgba(255, 77, 109, 0.25)',
        'inner-glow': 'inset 0 2px 20px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  safelist: [
    'bg-emerald-50', 'bg-emerald-100', 'text-emerald-500', 'text-emerald-600', 'bg-emerald-400',
    'bg-amber-50', 'bg-amber-100', 'text-amber-400', 'text-amber-500', 'text-amber-600', 'bg-amber-300', 'bg-amber-400',
    'bg-rose-50', 'bg-rose-100', 'text-rose-500', 'text-rose-600', 'bg-rose-400', 'bg-rose-500',
    'bg-blue-50', 'bg-blue-100', 'text-blue-500', 'text-blue-600', 'bg-blue-400', 'bg-blue-500',
    'bg-purple-50', 'bg-purple-100', 'text-purple-500', 'text-purple-600',
    'bg-indigo-50', 'bg-indigo-100', 'text-indigo-500', 'text-indigo-600',
    'bg-violet-50', 'bg-violet-100', 'text-violet-500', 'text-violet-600',
    'bg-teal-50', 'bg-teal-100', 'text-teal-500', 'text-teal-600',
    // Dynamic colors used in DoctorDashboard schedule
    'w-1', 'h-10', 'bg-rose-400', 'bg-blue-400', 'bg-emerald-400', 'bg-amber-400',
    'bg-rose-100', 'bg-blue-100', 'bg-emerald-100', 'bg-amber-100',
    'text-rose-600', 'text-blue-600', 'text-emerald-600', 'text-amber-600',
  ],
  plugins: [],
}
