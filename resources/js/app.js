import '../css/app.css'
import unpoly from 'unpoly'
import leaflet, { icon } from 'leaflet'

up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])

up.compiler('#map', () => {
    const restaurantIcon = L.icon({
        iconUrl: '/pin.svg',
        iconSize: [35, 35],
        iconAnchor: [30, 10],
        popupAnchor: [0, 0],
        shadowSize: [0, 0],
        shadowAnchor: [0, 0]
    });
    const sidepanel = document.querySelector('#sidepanel')
    let lat = 50.850340
    let lon = 4.351710
    const map = L.map('map', { zoomControl: false }).setView([lat, lon], 9);
    map.attributionControl.setPrefix('Saveur Belge / <a href="https://loak.studio" target="_blank">LoakStudio</a>')
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
    sidepanel.querySelector('button').addEventListener('click',()=>{
        sidepanel.classList.add('hidden')
    })
    fetch("/shops").then(r=>r.json().then(shops=>{
        shops.forEach(s=>{
            let m = L.marker([s.latitude, s.longitude],{icon:restaurantIcon}).addTo(map);
            m.bindTooltip(s.name);
            m.on('click', () => {
                sidepanel.classList.remove('hidden')
                sidepanel.querySelector('h1').textContent = s.name
                sidepanel.querySelector('p').textContent = s.title
                sidepanel.querySelector('a').href = `/commerce/${s.slug}`
                sidepanel.querySelector('img').src = `/uploads/${s.logo}`
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