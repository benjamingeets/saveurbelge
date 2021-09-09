<script context="module">
export const load = async()=>{
        const data = await fetch("http://localhost:3000/api/get-categories")
        return{
            props:{
                categories : await data.json()
            }
        }
    }
</script>

<script>
    import {page} from '$app/stores'
    import Head from '$lib/Head.svelte';
    import { publicShopQuery } from '$lib/public_req';
    import SearchBar from '$lib/recherche/SearchBar.svelte';
import ShopModal from "$lib/ShopModal.svelte";
    import ShopCard from '$lib/ShopCard.svelte';
    let pc = $page.query.get('pc')
    let sector = $page.query.get('sector')
    let city = $page.query.get('city')
    if(pc == null){
        pc = "7500"
        city = "Tournai"
    }
    let displayModal = false
    let shops = []
    let displayQuery = false
    export let categories
    
    const queryShops = async (data)=>{
        shops = await publicShopQuery(data)
        displayQuery = true
        console.log(shops)
    }
let shopModal
    queryShops({sector,pc,distance:25})
</script>

<Head title={`Recherche de commerces aux alentours de ${city} - SaveurBelge`}/>

{#if displayModal}<ShopModal shop={shopModal} on:close={()=>{displayModal=false}} on:click={()=>{displayModal=false}}/>{/if} 
<main class="flex md:mt-10 mt-0 flex-wrap md:flex-nowrap">
    <SearchBar on:query={(event)=>{queryShops(event.detail)}} categories={categories} pc={pc} city={city} sector={sector}/>
    <div class="flex flex-wrap w-full md:justify-start justify-center">
        {#if displayQuery}
            {#each shops as shop}
            <div class=""><ShopCard shop={shop.shop} distance={shop.distanceFrom} dispatchMode={true} on:click={()=>{displayModal=true;shopModal = shop.shop;}}/></div>
            {/each}
        {/if}
    </div>
</main>