<script>
    export let pc
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import Pointer from "$lib/svg/Pointer.svelte";
    export let city
    export let sector
    export let categories
    const searchCityName = async (cp) =>{
    if(cp.length == 4){
        const cityNameQuery = await fetch(`http://localhost:8000/get-city-from-cp/${cp}`)
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
}
let distance = 25
</script>

<aside class="md:w-72 mb-12 md:mx-0 mx-auto">
    <label for="pc">
        <p class="font-bold my-4">Code postal</p>
        <div class="border rounded-md py-2 px-4 flex"><input class="w-3/12" id="pc" type="text" bind:value={pc} on:input="{handleInput}"><p class="mr-auto">{city}</p> <Pointer/> </div>
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
</aside>

<style>

</style>