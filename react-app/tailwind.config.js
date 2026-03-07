/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        basketball: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7ff',
          300: '#a4b5ff',
          400: '#818dff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        duke: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7ff',
          300: '#a4b5ff',
          400: '#818dff',
          500: '#5555ff',
          600: '#0033a0',
          700: '#001f3f',
          800: '#001530',
          900: '#000b1f',
          950: '#000815',
        },
        gold: {
          50: '#fffbf0',
          100: '#fff7e6',
          200: '#ffeccc',
          300: '#ffe0b3',
          400: '#ffd699',
          500: '#ffcc80',
          600: '#ffb84d',
          700: '#ff9800',
          800: '#f57c00',
          900: '#e65100',
          950: '#bf360c',
        },
      },
    },
  },
  plugins: [],
}
