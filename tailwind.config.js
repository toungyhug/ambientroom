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
        grayymore: '#494949',
        grayymoree: '#4d4d4d',
        darkgray: '#404040'
      },
      letterSpacing:{
        widetest: '.18em',
      },
      fontFamily: {
        'urbanist': ['Urbanist'],
        'cinzel': ['Cinzel'],
        'nunito': ['Nunito Sans'],
      },
      fontSize: {
        '2xs': '10px',
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'spin-slow-twice': 'spin 30s linear infinite',
        'spin-step': 'spin-step 0.7s infinite',
        'spin-reverse': 'spin-slow-reverse 10s linear infinite',
        'spin-reverse-twice': 'spin-slow-reverse-twice 10s linear infinite',
        'header-on': 'header-on 1s linear 1'
      },
      keyframes:{
        'header-on' :{
          '0%': {opacity: 0},
          '100%': {opacity: 100}
        },
        'spin-step':{
          '0%': {transform: 'rotate(0deg)'},
          '12.4%': {transform: 'rotate(0deg)'},

          '12.5%': {transform: 'rotate(45deg)'},
          '24.9%': {transform: 'rotate(45deg)'},

          '25%': {transform: 'rotate(90deg)'},
          '37.4%': {transform: 'rotate(90deg)'},

          '37.5%': {transform: 'rotate(135deg)'},
          '49.9%': {transform: 'rotate(135deg)'},

          '50%': {transform: 'rotate(180deg)'},
          '62.4%': {transform: 'rotate(180deg)'},

          '62.5%': {transform: 'rotate(225deg)'},
          '74.9%': {transform: 'rotate(225deg)'},

          '75%': {transform: 'rotate(270deg)'},
          '87.4%': {transform: 'rotate(270deg)'},

          '87.5%': {transform: 'rotate(315deg)'},
          '99.9%': {transform: 'rotate(315deg)'},
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
