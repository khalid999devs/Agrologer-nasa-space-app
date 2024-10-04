/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pSansBold: ['pSans-bold', 'sans-serif'],
        pSansBoldItalic: ['pSans-boldItalic', 'sans-serif'],
        pSansRegular: ['pSans-regular', 'sans-serif'],
        pSansItalic: ['pSans-Italic', 'sans-serif'],
      },
      colors: {
        primary: {
          main: '#128F5F', //color 2
          light: '#119965',
        },
        onPrimary: {
          main: '#E2E2E2',
          light: '#999999',
        },
        secondary: {
          dark: '#49454F',
          main: '#40403F', //color 3
          light: '#909090',
        },
        body: {
          main: '#F6F6F6',
          light: '#CBCBCB',
        },
        tertiary: {
          brown: '#582500',
          blue: '#3260C2',
          green: '#02A05E',
        },
      },
      backgroundImage: {
        'green-gradient':
          'linear-gradient(to right, #119965 0%, #119160 27%, #137E52 67%, #156943 100%)',
      },
    },
  },
  plugins: [],
};
