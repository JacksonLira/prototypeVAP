/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    screens: {
      'mobilemini':'300px',
      'mobile':'300px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      fontFamily: {
        'GillBold' : ['GillSansBoldItalic','sans-serif'],
        'GillBoldItalic' : ['GillSansBold', 'sans-serif'],
        'GillHeavyItalic' : ['GillSansHeavyItalic', 'sans-serif'],
        'GillHeavy' : ['GillSansHeavy','sans-serif'],
        'GillItalic' : ['GillSansItalic','sans-serif'],
        'GillLightIta' : ['GillSansLightItalic', 'sans-serif'],
        'GillLight' : ['GillSansLight', 'sans-serif'],
        'GillMItalic' : ['GillSansMItalic','sans-serif'],
        'GillMedium' : ['GillSansMedium', 'sans-serif'],
        'GillCondensed' : ['GillSansCondensed','sans-serif'],
        'GillCondensedB' : ['GillSansCondensedBold', 'sans-serif'],

      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      // Definindo novas classes utilitárias
      const newUtilities = {
        '.text-outline-black': {
          textShadow: '1px 1px 0 black, -1px -1px 0 black, -1px 1px 0 black, 1px -1px 0 black',
        },
        '.text-outline-white': {
          textShadow: '1px 1px 0 white, -1px -1px 0 white, -1px 1px 0 white, 1px -1px 0 white',
        },
        '.text-outline-blue': {
          textShadow: '2px 2px 0 #014d98, -2px -2px 0 #014d98, -2px 2px 0 #014d98, 2px -2px 0 #014d98',
        },
        '.text-shadow-md': {
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
  
}
