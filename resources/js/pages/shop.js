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
    const formContainer = document.querySelector('[data-modal]')
    const form = formContainer.querySelector('form')
    const close = document.querySelector('[data-close]')
    button.addEventListener('click',()=>{
        formContainer.classList.toggle('hidden')
        formContainer.classList.toggle('flex')
    })
    close.addEventListener('click',(event)=>{
        event.preventDefault()
        formContainer.classList.toggle('hidden')
        formContainer.classList.toggle('flex')
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let formData = new FormData(form);
        fetch(form.action, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
            .then((e) => {
                form.querySelector('span').textContent = "Email envoyé"
                form.querySelector('p').textContent = "Si l'adresse e-mail entrée correspond à celle de cet établissement, vous allez recevoir un mail d'édition."
                form.querySelector('[data-send]').remove()
                form.querySelector('label').remove()
            })
            .catch((error) => alert(error));
    
    
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