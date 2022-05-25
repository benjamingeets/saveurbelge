import leaflet, {
    icon
} from 'leaflet'
const restaurantIcon = L.icon({
    iconUrl: '/pin.png',
    iconSize: [16, 38],
    tooltipAnchor: [18, 0],
    iconAnchor: [0, 38],
});
const homepage = () => {

    const shops = document.querySelectorAll('ul li')
    const sidepanel = document.querySelector('#sidepanel')
    const searchbar = document.querySelector('#search')
    const search = document.querySelector('form')
    const input = document.querySelector('input')

    searchbar.style.transform = `translateY(${sidepanel.clientHeight}px)`

    let lat = 50.850340
    let lon = 4.351710

    const map = L.map('map', {
        zoomControl: false
    }).setView([lat, lon], 9);

    map.attributionControl.setPrefix('Saveur Belge / <a href="https://loak.studio" target="_blank">LoakStudio</a>')

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
    
    sidepanel.querySelector('button').addEventListener('click', () => {
        sidepanel.classList.add('lg:-translate-x-full', 'lg:-left-10', 'lg:h-0')
        searchbar.style.transform = `translateY(${sidepanel.clientHeight}px)`
    })

    shops.forEach(s => {
        let m = L.marker([s.dataset.latitude, s.dataset.longitude], {
            icon: restaurantIcon
        }).addTo(map);
        m.bindTooltip(s.dataset.name);
        m.on('click', () => {
            searchbar.style.transform = `translateY(0px)`
            map.flyTo(new L.LatLng(s.dataset.latitude - 0.003, s.dataset.longitude), 15)
            sidepanel.classList.remove('lg:-translate-x-full', 'lg:-left-10', 'lg:h-0')
            sidepanel.querySelector('h1 a').textContent = s.dataset.name
            sidepanel.querySelector('p').textContent = s.dataset.title
            sidepanel.querySelector('a').href = `/commerce/${s.dataset.slug}`
            sidepanel.querySelector('img').src = `/storage/${s.dataset.logo}`
        })
    })

    search.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch('https://belgium.deno.dev/' + input.value).then(r => {
            r.json().then(o => {
                const target = o[0]
                map.flyTo(new L.LatLng(target.lat, target.lon), 14)
            })
        })
    })
}

export default homepage;
