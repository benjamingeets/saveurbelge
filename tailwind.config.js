module.exports = {
  content: [
    './resources/views/**/*.edge',
    './resources/css/**/*.css',
    './resources/js/**/*.js',
  ],
  theme: {
    extend: {
      colors:{
        'primary':{
          'DEFAULT':'#7EA172',
          'dark':'#A8D09A'
        },
        'grey':{
          'DEFAULT':'#cccccc'
        }
      },
      maxWidth:{
        '64ch':'64ch'
      }
    },
  },
  plugins: [],
}
