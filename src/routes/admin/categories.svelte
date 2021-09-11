<script>
    import {currentAdminPage} from '$lib/store.js'
    import { onMount } from "svelte";
    let categories
    let display = false
    onMount(async()=>{
            currentAdminPage.update(n => "categories")
            const req = await fetch("http://localhost:3000/api/get-categories")
            categories = await req.json()
            triage()
            display = true
    })
let commerces = []
let restaurants = []
$: if(display){
    commerces = []
    restaurants = []
    triage()
}
const triage = () =>{
    categories.forEach(e=>{
        if(e.sector == 'commerce'){
            commerces.push(e)
        }
        else{
            restaurants.push(e)
        }
    })
}
let commerceInput
    </script>

    <div>
        <h2 class="text-left text-noir">Commerces :</h2>
        {#each commerces as commerce}
        <p>{commerce.name} <span>[-]</span></p>
        {/each}
        <span><input bind:value={commerceInput} class="input-normal" type="text"> <span on:click={()=>{/*Appel API directement ICI*/}}>[+]</span></span>
        <h2 class="text-left text-noir">Restaurants/bar :</h2>
        {#each restaurants as resto}
        <p>{resto.name}</p>
        {/each}

        <span><input class="input-normal" type="text"> [+]</span>
    </div>