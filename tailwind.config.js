module.exports = {
  content: [
    './resources/views/**/*.edge',
    './resources/css/**/*.css',
    './resources/js/**/*.js',
  ],
  theme: {
    fontFamily:{
      'main':['Comfortaa']
    },
    extend: {
      colors:{
        'primary':{
          'light':'#E1F9D9',
          'DEFAULT':'#A8D09A',
          'dark':'#7EA172'
        },
        'grey':{
          'DEFAULT':'#cccccc',
          'light':'#F5F5F5',
          'dark':'#817D7D',
          'bg':'#F5F5F5'
        },
        'red':{
          'DEFAULT':'#FF7373'
        },
        'black':{
          'DEFAULT':'#252323'
        },
        'white':{
          'DEFAULT':'#FDFDFD'
        }
      },
      maxWidth:{
        '64ch':'64ch'
      }
    },
  },
  plugins: [],
}
