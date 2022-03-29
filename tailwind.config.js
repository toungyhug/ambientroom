module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage:{
        'usual-background': "url('../assets/backgrnd.png')",
      },
      spacing: {
        '30': '7.5rem',
        '76': '19rem',
        '1/7': '14.2857%',
        '1/10': '10%',
        '9/10': '90%',
        '1/20': '5%',
        '110': '28rem',
        '120': '40rem',
      },
      colors: {
        yellow: '#b9ad46'
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
      },
      fontSize: {
        '2xs': '10px',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'spin-slow-twice': 'spin 30s linear infinite',
        'spin-reverse': 'spin-slow-reverse 10s linear infinite',
        'spin-reverse-twice': 'spin-slow-reverse-twice 10s linear infinite',
        'header-on': 'header-on 1s linear 1'
      },
      keyframes:{
        'header-on' :{
          '0%': {opacity: 0},
          '100%': {opacity: 100}
        },
        'spin-slow-reverse' :{
          '0%': {transform: 'rotate(0deg)'},
          '100%': {transform: 'rotate(-360deg)'}
        },
        'spin-slow-reverse-twice' :{
          '0%': {transform: 'rotate(0deg)'},
          '100%': {transform: 'rotate(-360deg)'}
        },
        
      },
      cursor:{
        grab: 'grab',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
