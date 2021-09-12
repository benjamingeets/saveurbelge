<script>
import { addCategory, deleteCategory } from '$lib/admin_req';

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
const postCategory = async (name,sector) =>{
    const req = await addCategory(name,sector)
    if(req.success){
        alert(req.message)

        document.location.reload()
    }
}

const handleDeleteCategory = async (name) =>{
    const req = await deleteCategory(name)
    if(req.success){
        alert(req.message)
        document.location.reload()
    }
}
let commerceInput,restaurantInput
    </script>

    <div>
        <small>Supprimer une catégorie va la rendre indisponible à la recherche et à l'ajout aux shops, mais restera affichée sur les shops.</small>
        <h2 class="text-left text-noir">Commerces :</h2>
        {#each commerces as commerce}
        <p class="flex max-w-xl items-center justify-between"><span>{commerce.name}</span> <span class="btn btn-red-outline" on:click={()=>{handleDeleteCategory(commerce.name)}}>Supprimer</span></p>
        <hr class="max-w-xl my-4"/>
        {/each}
        <span class=""><input bind:value={commerceInput} class="input-normal" type="text"> <span class="btn btn-green" on:click={()=>{postCategory(commerceInput,"commerce")}}>Ajouter</span></span>
        <h2 class="text-left text-noir">Restaurants/bar :</h2>
        {#each restaurants as resto}
        <p class="flex max-w-xl items-center justify-between"><span>{resto.name}</span> <span class="btn btn-red-outline" on:click={()=>{handleDeleteCategory(resto.name)}}>Supprimer</span> </p>
        <hr class="max-w-xl my-4"/>
        {/each}

        <span><input bind:value={restaurantInput} class="input-normal" type="text"> <span class="btn btn-green cursor-pointer" on:click={()=>{postCategory(restaurantInput,"restaurant")}}>Ajouter</span></span>
    </div>