import leaflet, {
    icon
} from 'leaflet'
const restaurantIcon = L.icon({
    iconUrl: '/pin.png',
    iconSize: [16, 38],
    tooltipAnchor: [18, 0],
    iconAnchor: [0, 38],
});
const shop = () =>{
    const button = document.querySelector('[data-action="edit"]')
    const form = document.querySelector('[data-modal]')
    const close = document.querySelector('[data-close]')
    button.addEventListener('click',()=>{
        form.classList.toggle('hidden')
        form.classList.toggle('flex')
    })
    close.addEventListener('click',(event)=>{
        event.preventDefault()
        form.classList.toggle('hidden')
        form.classList.toggle('flex')
    })
    const shop = document.querySelector('#shop')
    const map = L.map('shop-map', {
        zoomControl: false,
        scrollWheelZoom:false,
    }).setView([shop.dataset.latitude, shop.dataset.longitude], 13);

    map.attributionControl.setPrefix('Saveur Belge / <a href="https://loak.studio" target="_blank">LoakStudio</a>')
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);
    let m = L.marker([shop.dataset.latitude, shop.dataset.longitude], {
        icon: restaurantIcon
    }).addTo(map);
}

export default shop