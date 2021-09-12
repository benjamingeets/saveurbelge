<script>
    export let pc
    import { createEventDispatcher } from "svelte";
    import {API} from '$lib/env.js'
    const dispatch = createEventDispatcher();
    import Pointer from "$lib/svg/Pointer.svelte";
import Filters from "$lib/svg/Filters.svelte";
    export let city
    export let sector
    export let categories
    const searchCityName = async (cp) =>{
    if(cp.length == 4){
        const cityNameQuery = await fetch(`${API}/get-city-from-cp/${cp}`)
        const cityName = await cityNameQuery.json()
        city = cityName.name
    }
    else if(cp.length === 0){
        city = "Tournai"
    }
    else{
        city = "..."
    }
}
    const handleInput = async ()=>{
    searchCityName(pc)
}

const clearCategories = () =>{
    categories.forEach(elt=>{
        elt.value = false
    })
}
const dispatchSearch =async (query)=>{
    
    categories.filter(cat => cat.value === true).forEach(e=>{
        if(e.value){
            query.categories.push(e.name)
        }
    })
    dispatch('query',query)
    seeFilters = false
}
let distance = 25
let screenWidth
let seeFilters = true
</script>

<svelte:window bind:innerWidth={screenWidth}/>
<aside class="md:w-72 w-full max-w-xs mb-12 md:mx-0 mx-auto">
    {#if screenWidth > 767}
    <label for="pc">
        <p class="font-bold my-4">Code postal</p>
        <div class="border rounded-md py-2 px-4 flex"><input  class="w-3/12" id="pc" type="text" bind:value={pc} on:input="{handleInput}" on:change={()=>{dispatchSearch({pc,sector,distance,categories:[]})}}><p class="mr-auto cursor-text select-none">{city}</p> <Pointer/> </div>
    </label>
    <hr class="my-4">
    <label for="sector"><p class="font-bold my-4">Secteur d'activité</p>
        <select bind:value="{sector}" on:change="{()=>{clearCategories();dispatchSearch({pc,sector,distance,categories:[]})}}"  class="border rounded-md py-2 px-4 w-full" name="" id="sector">
            <option value="" selected disabled>Secteur d'activité</option>
            <option value="restaurant">Restaurant/Bar</option>
            <option value="commerce">Commerce</option>
        </select>
    </label>
    {#if sector != null}
        <hr class="my-4">
        <p class="font-bold">Catégories</p>
    {/if}
    {#each categories as cat}
        {#if cat.sector == sector}
        <label class="block" for="{cat.name}"><input bind:checked={cat.value} on:change={()=>{dispatchSearch({pc,sector,distance,categories:[]})}} class="mr-2" type="checkbox" name="" id="{cat.name}">{cat.name}</label>
        {/if}
    {/each}
    <hr class="my-4">
    <p class="font-bold">Distance</p>
    <small>0km - {distance}km</small>
    <input bind:value={distance} on:change={()=>(dispatchSearch({pc,sector,distance,categories:[]}))} class="w-full my-6 bg-red-500" type="range" min=5 max=50 name="" id="">
    <div class="flex justify-center">
        <span on:click={()=>(dispatchSearch({pc,sector,distance,categories:[]}))} class="btn btn-green">
            Appliquer le filtre
        </span>  
    </div>
    {:else}

    <div class="border w-full p-2 rounded-md">
        <p class="w-full cursor-pointer flex items-center" on:click={()=>{seeFilters = !seeFilters}}><Filters color={'black'} size={20}/> <span class="ml-2">Filtres</span></p>
        {#if seeFilters}
        <div>
            <label for="pc">
                <p class="font-bold my-4">Code postal</p>
                <div class="border rounded-md py-2 px-4 flex"><input class="w-3/12" id="pc" type="text" bind:value={pc} on:input="{handleInput}"><p class="mr-auto cursor-text select-none">{city}</p> <Pointer/> </div>
            </label>
            <hr class="my-4">
            <label for="sector"><p class="font-bold my-4">Secteur d'activité</p>
                <select bind:value="{sector}" on:change="{()=>clearCategories()}"  class="border rounded-md py-2 px-4 w-full" name="" id="sector">
                    <option value="" selected disabled>Secteur d'activité</option>
                    <option value="restaurant">Restaurant/Bar</option>
                    <option value="commerce">Commerce</option>
                </select>
            </label>
            {#if sector != null}
                <hr class="my-4">
                <p class="font-bold">Catégories</p>
            {/if}
            {#each categories as cat}
                {#if cat.sector == sector}
                <label class="block" for="{cat.name}"><input bind:checked={cat.value} class="mr-2" type="checkbox" name="" id="{cat.name}">{cat.name}</label>
                {/if}
            {/each}
            <hr class="my-4">
            <p class="font-bold">Distance</p>
            <small>0km - {distance}km</small>
            <input bind:value={distance} class="w-full my-6 bg-red-500" type="range" min=5 max=50 name="" id="">
            <div class="flex justify-center">
                <span on:click={()=>(dispatchSearch({pc,sector,distance,categories:[]}))} class="btn btn-green">
                    Appliquer le filtre
                </span>  
            </div>
        
        </div>
        {/if}
    </div>
    {/if}
    
</aside>

<style>

</style>