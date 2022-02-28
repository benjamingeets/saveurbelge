import '../css/app.css'
import unpoly from 'unpoly'
import leaflet, { icon } from 'leaflet'

up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])

up.compiler('#map', () => {


    let lat = 50.850340
    let lon = 4.351710
    const map = L.map('map', { zoomControl: false }).setView([lat, lon], 9);
    map.attributionControl.setPrefix('Saveur Belge / <a href="https://loak.studio" target="_blank">LoakStudio</a>')
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
    fetch("/shops").then(r=>r.json().then(shops=>{
        shops.forEach(s=>{
            console.log(s)
            let m = L.marker([s.latitude, s.longitude]).addTo(map);
            m.bindTooltip(s.name);
            m.on('click', () => {
                up.visit('/commerce/' + s.slug)
            })
        })
    }))

    const search = document.querySelector('form')
    const input = document.querySelector('input')
    search.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch('https://api-postcode.vercel.app/get-city/' + input.value).then(r => {
            r.json().then(o => {
                const target = o[0]
                map.flyTo(new L.LatLng(target.lat, target.lon), 14)
            })
        })
    })
})