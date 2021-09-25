<script>
import Magnifier from "$lib/svg/Magnifier.svelte";
import Pointer from "$lib/svg/Pointer.svelte";
import {searchCityName} from '$lib/public_req'

export let city ="Tournai"
export let pc = "7500"
let sector

if(typeof navigator !== 'undefined'){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function(position) {
        const query = `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
        const ville = await fetch(query)
        const res = await ville.json()
        pc = res.address.postcode
        city = await searchCityName(pc)
    });
    } 
}

const handleInput = async ()=>{
    city = await searchCityName(pc)
}


</script>
<section id="search" class="flex px-4 flex-col justify-center items-center rounded-md" style="height:80vh;">
    <p class="uppercase text-white text-5xl mb-10 font-bebas">Quel type de commerce cherchez-vous ?</p>
    <form class="flex lg:flex-row flex-col justify-between bg-white p-2 rounded-md w-full max-w-3xl">
        <div class="lg:w-6/12 w-full bg-grey-light flex justify-between p-2 rounded-md" >
            <span class="bg-grey-light w-full">
                <label class="flex cursor-text" for="oui"><input id="oui" name="oui" placeholder="7500" class="bg-grey-light w-3/12" type="text" bind:value="{pc}" on:input="{handleInput}"><p class="w-9/12">{city}</p></label>
            </span>
            <span><Pointer/></span>
        </div>
        <select bind:value="{sector}" class="lg:w-5/12 lg:my-0 my-2 w-full bg-grey-light rounded-md p-2 lg:mx-2" name="" id="">
            <option value="" selected disabled>Secteur d'activité</option>
            <option value="restaurant">Restaurant/Bar</option>
            <option value="commerce">Commerce</option>
        </select>

        <a class="btn btn-green" href="/recherche?pc={pc.length > 3 ? pc : '7500'}{sector? `&sector=${sector}` : ''}"><span class="block w-full flex justify-center"><Magnifier></Magnifier></span></a>

    </form>
</section>

<style>
    #search{
        background-image: url("/images/table.webp");
        background-size: cover;
    }
</style>