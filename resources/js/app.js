import '../css/app.css'
import unpoly from 'unpoly'
import Alpine from 'alpinejs'
import leaflet, { icon } from 'leaflet'

window.Alpine = Alpine

Alpine.start()

up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])
up.compiler('#map', () => {
    let shops

    let lat = 50.850340
    let lon = 4.351710
    const map = L.map('map').setView([lat, lon], 9);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
    var myIcon = L.icon({
        iconUrl: 'https://cms.galandtristan.be/galandtristan.webp',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });
    fetch("http://localhost:3333/shops").then((r) => {
        r.json().then((l) => {
            l.forEach(s => {
                let m = L.marker([s.latitude, s.longitude],{riseOnHover:true}).addTo(map);
                m.bindTooltip(`<div class="flex w-80 h-40">
                    <img src="${s.logo}"/>
                    <div class="text-2xl">${s.name}</div>
                </div>`,{direction:'center',interactive:true,opacity:1});
            })
        })
    })
})
