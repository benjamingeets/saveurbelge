import '../css/app.css'
import unpoly from 'unpoly'
import Alpine from 'alpinejs'
 


window.Alpine = Alpine

Alpine.start()

up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])
