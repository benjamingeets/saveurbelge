<script>
    import { onMount } from 'svelte';
    export let shops
    let L 
    let lat = 50.850340
    let lon = 4.351710
    onMount(async()=>{
        L = await import('leaflet')
        const map = L.map('map',{scrollWheelZoom: false}).setView([lat, lon], 8);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);
        shops.forEach(shop=>{
            var marker = L.marker([shop.coordinates.lat, shop.coordinates.lon]).addTo(map);
            var popup = marker.bindPopup(`<a href="/commerce/${shop.slug}">${shop.name}</a>`);
        })
    })

</script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
crossorigin=""/>
<div class="h-96 w-full max-w-5xl rounded-md z-0" id="map">

</div>