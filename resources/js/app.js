import '../css/app.css'
import unpoly from 'unpoly'
import Alpine from 'alpinejs'
import leaflet, { icon } from 'leaflet'

window.Alpine = Alpine

Alpine.start()

up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])
up.compiler('#map', () => {
    let lat = 50.850340
    let lon = 4.351710
    const map = L.map('map', { zoomControl: false }).setView([lat, lon], 9);
    map.attributionControl.setPrefix('')
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
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
                let m = L.marker([s.latitude, s.longitude], { riseOnHover: true }).addTo(map);
                m.bindTooltip(`
                <div class="flex p-5">
                    ${s.logo ? `<img class="h-20" loading="lazy" src="/uploads/${s.logo}"/>` : ''}
                    <div class="text-2xl">${s.name}</div>
                </div>`,
                    { direction: 'center', interactive: true, opacity: 1 });
                m.on('click', () => {
                    up.visit('/commerce/' + s.slug)
                })
            })
        })
    })

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
up.compiler('#edit-shop', () => {
    const bouton = document.querySelector('#logo')
    bouton.addEventListener('change', (e) => {
        var output = document.querySelector("img");
        output.src = URL.createObjectURL(e.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src)
        }
    })
})