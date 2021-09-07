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
    import SearchBar from '$lib/recherche/SearchBar.svelte';
    import ShopCard from '$lib/ShopCard.svelte';
    let pc = $page.query.get('pc')
    let sector = $page.query.get('sector')
    let city = $page.query.get('city')
    if(pc == null){
        pc = "7500"
        city = "Tournai"
    }
    let shops = []
    let displayQuery = false
    export let categories
</script>

<Head title={`Recherche de commerces aux alentours de ${city} - SaveurBelge`}/>
<main class="flex mt-10">
    <SearchBar on:query={(event)=>{console.log(event.detail)}} categories={categories} pc={pc} city={city} sector={sector}/>
    <div class="flex flex-wrap w-full px-10">
        {#if displayQuery}
            {#each shops as shop}
            <div class=""><ShopCard name="{shop.shop.name}" slug="{shop.shop.slug}" description="{shop.shop.description}" badges="{shop.shop.options}"/></div>
            {/each}
        {/if}
    </div>
</main>