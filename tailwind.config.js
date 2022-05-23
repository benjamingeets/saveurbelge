module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.css",
    ],
    theme: {
        extend: {
            fontFamily: {
                'title': 'Comfortaa',
                'main':'Montserrat'
              },
            colors: {
                primary: {
                    'DEFAULT': '#7EA172',
                    'light': '#A8D09A'
                },
                sand:{
                    'DEFAULT':'#EDEBE8'
                }
            }
        },
    },
    plugins: [],
}
