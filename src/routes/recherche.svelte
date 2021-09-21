<script context="module">
    import {DOMAIN} from '$lib/env.js'
export const load = async()=>{
        const data = await fetch(`${DOMAIN}/api/get-categories`)
        return{
            props:{
                categories : await data.json()
            }
        }
    }
</script>

<script>
// @ts-nocheck

    import {page} from '$app/stores'
    import Head from '$lib/Head.svelte';
    import { publicShopQuery } from '$lib/public_req';
    import SearchBar from '$lib/recherche/SearchBar.svelte';
    import ShopModal from "$lib/ShopModal.svelte";
    import ShopCard from '$lib/ShopCard.svelte';
    import {searchCityName} from '$lib/public_req'
import { onMount } from 'svelte';
    let pc = $page.query.get('pc')
    let sector = $page.query.get('sector')
    let city

    const queryShops = async (data)=>{
        shops = await publicShopQuery(data)
        displayQuery = true
    }
    onMount(async()=>{
        if(pc == null){
            if(typeof navigator !== 'undefined'){
                    if ("geolocation" in navigator) {
                        navigator.geolocation.getCurrentPosition(async function(position) {
                        const query = `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
                        const ville = await fetch(query)
                        const res = await ville.json()
                        pc = res.address.postcode
                        city = await searchCityName(pc)
                        queryShops({sector,pc,distance:25})
                    });
                } 
            }else{
                pc = "7500"
                city = "Tournai"
            }
        }
        else{
            city = await searchCityName(pc)
            queryShops({sector,pc,distance:25})
        }
    })
    let displayModal = false
    let shops = []
    let displayQuery = false
    export let categories
    
    let shopModal
</script>

<Head title={`Recherche de commerces aux alentours de ${city ? city : 'chez vous'} - SaveurBelge`} lien="recherche"/>

{#if displayModal}<ShopModal shop={shopModal} on:close={()=>{displayModal=false;window.history.pushState(``, ``, `/recherche`);}} />{/if} 
<main class="flex md:mt-10 mt-0 flex-wrap md:flex-nowrap">
    <SearchBar on:query={(event)=>{queryShops(event.detail)}} categories={categories} pc={pc ? pc : ''} city={city ? city : ''} sector={sector}/>
    <div class="flex flex-wrap w-full md:justify-start justify-center">
        {#if displayQuery}
            {#each shops as shop}
            <div class=""><ShopCard shop={shop.shop} distance={shop.distanceFrom} dispatchMode={true} on:click={()=>{displayModal=true;shopModal = shop.shop;window.history.pushState('page2', 'Title', `/commerce/${shopModal.slug}`);}}/></div>
            {/each}
            {#if shops.length == 0}
            <div class="w-full flex flex-col justify-center">
                <h2 class="">Nous n'avons pas encore de résultat pour cette recherche!</h2>
                <small class="text-center">N'hésitez pas à nous <a class="text-orange" href="/contact">soumettre des idées de commerces 🤔</a></small>
            </div>
                    
            {/if}
        {/if}
    </div>
</main>