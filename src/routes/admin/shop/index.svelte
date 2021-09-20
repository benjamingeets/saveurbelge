<script>
import { getAllShops } from "$lib/admin_req";
import {currentAdminPage} from '$lib/store.js'
import { onMount } from "svelte";
let shops
let searchInput
let display = false

let displayShops = []
    onMount(async()=>{
        currentAdminPage.update(n => "shop")
        shops = await getAllShops()
        shops.sort((a,b)=>{
            return a.status - b.status
        })
        displayShops = shops
        display = true
    })
const search = () =>{
    displayShops = shops.filter(shop=>shop.name.toLowerCase().includes(searchInput.toLowerCase()))

}
</script>

{#if display}
    <section>
        <p>Recherche:</p>
        <input type="text" class="input-normal" bind:value={searchInput} on:input={()=>{search()}}>

        <hr class="my-4">
    </section>
    {#each displayShops as shop}
    <a href={`/admin/shop/${shop._id}`} class="flex justify-between border my-2 rounded-md p-2 max-w-3xl w-full hover:bg-grey-light">
        <div>
            🚜 {shop.name} ({shop.slug})
        </div>
        <div>
            <span>
                {#if shop.status == 0}
                <span class="rounded-full bg-grey px-2 text-white">Non validé</span>
               {:else if shop.status == 1}
               <span class="rounded-full text-white bg-green px-2">Validé</span>
               {:else if shop.status == -1}
               <span class="rounded-full text-white bg-orange px-2">Refusé</span>
               {:else}
                Erreur
               {/if}</span>
        </div>
    </a>
    {/each}
{/if}