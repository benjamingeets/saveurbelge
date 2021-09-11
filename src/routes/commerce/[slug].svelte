<script context="module">
	export async function load({ page }) {
		const res = await getShopFromSlug(page.params.slug)
		if (res.success) {
			return {
				props: {
					shop:res.shop
				}
			};
		}
	}
</script>
<script>
    import Facebook from '$lib/svg/Facebook.svelte'
    import Instagram from '$lib/svg/Instagram.svelte'
    import Website from '$lib/svg/Website.svelte'

import Badges from '$lib/Badges.svelte'
    import Pointer from '$lib/svg/Pointer.svelte'
    import Phone from '$lib/svg/Phone.svelte'
    import {API} from '$lib/env.js'
    import Head from '$lib/Head.svelte'
    import { getShopFromSlug } from "$lib/public_req";
    import { onMount } from 'svelte';
    export let shop
    let L 
    onMount(async()=>{
        L = await import('leaflet')
       /* const map = L.map('map', {
            center: [shop.coordinates.lat, shop.coordinates.lon],
            zoom: 13
        });*/
        const map = L.map('map').setView([shop.coordinates.lat, shop.coordinates.lon], 15);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);
        var marker = L.marker([shop.coordinates.lat, shop.coordinates.lon]).addTo(map);
        var popup = marker.bindPopup(`<b>${shop.name}</b>`);
        popup.openPopup();
    })

    
</script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
crossorigin=""/>
<Head title={`${shop.name} - SaveurBelge`} description={shop.description}/>
<main class="flex flex-col items-center w-full">
    <div class="w-full rounded-md h-60" style={shop.header ? `background-image:url(${API}/public/${shop._id}_header.webp);background-size:cover;background-position:center` :`background-image:url(http://localhost:3000/images/headers/${shop.sector}.png)`} >

    </div>
    <div class="md:-mt-40 -mt-20 w-full flex justify-center">
        <section class={`bg-grey-light max-w-5xl w-full mt-32 rounded-md p-4 relative w-full pb-10`}>
            <div>
                <div class="bg-grey-light w-52 h-52 rounded-full mx-auto -mt-32 p-4">
                    <!--<img class="rounded-full w-full h-full p-4" src={`${API}/public/${shop._id}_logo.webp`} alt="">-->
                    <div class="w-full h-full rounded-full p-4 flex justify-center items-center" style={`${shop.logo ? `background-image:url(${API}/public/${shop._id}_logo.webp);background-size:cover` : `background-color:#C7CB85;`}`}>
                        {#if !shop.logo}
                            <p class="select-none text-white text-9xl capitalize">{shop.name.charAt(0)}</p>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <h2 class="text-noir mb-0">{shop.name}</h2>
                <small class="text-grey-dark mx-auto my-4 capitalize">{shop.sector}</small>
                <div class="flex w-full flex-wrap md:flex-nowrap">
                    <p class="w-full md:w-9/12 md:px-20 px-2">
                        {shop.description}
                    </p>
                    <div class="w-12/12 md:w-3/12 flex flex-col items-center mx-auto md:mt-0 mt-10">
                        <div class="">
                            <Badges options={shop.options}/>
                        </div>
                        <div class="mt-4">
                            {#each shop.categories as category}
                                <span class="text-white bg-grey rounded-full px-3 mr-1">{category}</span>
                            {/each}
                        </div>
                        {#if shop.social.facebook || shop.social.instagram || shop.social.website}
                        <div class="flex gap-3 mt-4">
                            {#if shop.social.facebook}<a target="_blank" href={`https://facebook.com/${shop.social.facebook}`}><Facebook size="30" color="#7EA172"/></a>{/if}
                            {#if shop.social.instagram}<a target="_blank" href={`https://instagram.com/${shop.social.instagram}`}><Instagram size="30" color="#7EA172"/></a>{/if}
                            {#if shop.social.website}<a target="_blank" href={`https://${shop.social.website}`}><Website size="30" color="#7EA172"/></a>{/if}
                        </div>
                        {/if}
                        <div class="mt-4">
                            <span class="flex items-center gap-2"><Pointer color="black"/><a target="_blank" href={`https://www.google.be/maps?hl=fr&q=${shop.address.num} ${shop.address.street} ${shop.address.city}`}>{shop.address.num}, {shop.address.street} {shop.address.city}</a></span>
                            {#if shop.phone}
                            <span class="flex mt-4 gap-2"><Phone color="black"/> <a target="_blank" href={`tel:${shop.phone}`}>{shop.phone}</a> </span>
                            {/if}
                        </div>
                    </div>
                </div>
                <p class="text-grey-dark text-center mt-10">Vous constatez un problème avec ce commerce? <a class="underline" href="/contact">Signalez le nous!</a></p>
            </div>
        </section>
    </div>
    <div class="mt-10 h-80 w-full max-w-5xl rounded-md" id="map">

    </div>
</main>