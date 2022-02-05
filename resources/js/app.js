import '../css/app.css'
import unpoly from 'unpoly'
import Alpine from 'alpinejs'
import leaflet from 'leaflet' 

window.Alpine = Alpine

Alpine.start()

up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])
up.compiler('#map',()=>{
   
let lat = 50.850340
let lon = 4.351710
const map = leaflet.map('map').setView([lat, lon], 8);
leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);
})
