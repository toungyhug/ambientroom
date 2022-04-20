module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      opacity: {
        '85': '85%',
        '95': '95%'
      },
      backgroundImage:{
        'usual-background': "url('../assets/backgrnd.png')",
        'seek': "url('../assets/seek.gif')",
        'eq': "url('../assets/eq.gif')",
      },
      backgroundSize:{
        '120%': '120%',
      },
      spacing: {
        '76': '19rem',
        '30': '7.5rem',
        '22': '5.7rem',
        '18': '4.5rem',
        '1/7': '14.2857%',
        '1/10': '10%',
        '9/10': '90%',
        '1/15': '7.5%',
        '110': '28rem',
        '120': '40rem',
      },
      colors: {
        yellow: '#b9ad46',
        grayy: '#353535',
        grayymore: '#494949'
      },
      letterSpacing:{
        widetest: '.18em',
      },
      fontFamily: {
        'urbanist': ['Urbanist'],
        'cinzel': ['Cinzel'],
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
