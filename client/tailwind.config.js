/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Modern dark/neutral theme
                primary: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                },
                accent: {
                    50: '#fef3ff',
                    100: '#fde4ff',
                    200: '#fbcafe',
                    300: '#f7a0fc',
                    400: '#f069f7',
                    500: '#e434e9',
                    600: '#c716cc',
                    700: '#a50ca7',
                    800: '#881a8b',
                    900: '#6b1b6b',
                },
                // Modern neutral palette
                neutral: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                },
                // Electric blue accent
                electric: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                background: '#0f0f0f',
                foreground: '#ffffff',
                border: '#262626',
                'card-bg': '#1a1a1a',
                'muted': '#525252',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-mesh': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-modern': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'gradient-dark': 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'fade-in-down': 'fadeInDown 0.6s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'slide-in-left': 'slideInLeft 0.6s ease-out',
                'slide-in-right': 'slideInRight 0.6s ease-out',
                'bounce-slow': 'bounce 2s infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'scale-in': 'scaleIn 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px #f093fb, 0 0 10px #f093fb, 0 0 15px #f093fb' },
                    '100%': { boxShadow: '0 0 10px #f093fb, 0 0 20px #f093fb, 0 0 30px #f093fb' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(240, 147, 251, 0.4)',
                'glow-lg': '0 0 40px rgba(240, 147, 251, 0.6)',
                'inner-glow': 'inset 0 2px 4px rgba(240, 147, 251, 0.1)',
            },
        },
    },
    plugins: [],
} 
