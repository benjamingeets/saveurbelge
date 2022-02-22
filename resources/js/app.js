import '../css/app.css'
import unpoly from 'unpoly'
import Alpine from 'alpinejs'
import leaflet, { icon } from 'leaflet'

window.Alpine = Alpine

Alpine.start()


const makeTooltip = ({logo,name,city}) =>{
    return `
    <div class="flex gap-5">
        ${logo ? 
            `<figure class="h-10 w-10 rounded-full overflow-hidden border-2">
            <img class="h-full w-full object-cover" loading="lazy" src="/uploads/${logo}"/>
            </figure>
            ` : ''
        }
        <div class="text-sm">
            <h3>${name}</h3>
            <span class="text-primary-dark">${city}</span>
        </div>
    </div>`
}

const myIcon = L.icon({
    iconUrl: 'https://cms.galandtristan.be/galandtristan.webp',
    iconSize: [25, 25],
    iconAnchor: [0, -35],
    popupAnchor: [0, 0],
    shadowSize: [0, 0],
    shadowAnchor: [0, 0]
});

up.link.config.followSelectors.push('a[href]')
up.form.config.submitSelectors.push(['form'])

up.compiler('#map', () => {
    let lat = 50.850340
    let lon = 4.351710
    
    const map = L.map('map', { zoomControl: false }).setView([lat, lon], 9);
    map.attributionControl.setPrefix('')
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);

    fetch("http://localhost:3333/shops").then((r) => {
        r.json().then((l) => {
            l.forEach(s => {
                let m = L.marker([s.latitude, s.longitude], { riseOnHover: true,icon:myIcon }).addTo(map);
                m.bindTooltip(makeTooltip({logo:s.logo,name:s.name,city:s.address_city}),{ direction: 'center', interactive: true, opacity: 1 });
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