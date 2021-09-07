<script>
import { onMount } from "svelte";
import { currentAdminPage } from "$lib/store";
import { getUserInformations, getUserShops } from "$lib/user_req";
import Plus from "$lib/svg/Plus.svelte";
import Shop from "$lib/svg/Shop.svelte";
let shops
let user
let ready = false
    onMount(async()=>{
        currentAdminPage.update(n => "")
        shops = await getUserShops()
        user = await getUserInformations()
        ready = true
    })
</script>

<section class="ml-72 flex flex-wrap">
    
    {#if ready}
        {#each shops as shop}
            <div class="w-80 rounded-md shadow-lg m-2">
                <div class="h-40 rounded-t-md" style={shop.header ? `background-image:url(http://localhost:8000/public/${shop._id}_header.png); background-size: cover;)` : shop.sector == 'restaurant' ? 'background-image:url(/images/headers/restaurant.png);background-size:30%;' : 'background-image:url(/images/headers/commerce.png);background-size:30%;'}>
                </div>
                <div class="flex flex-col items-center h-32 pb-8 px-4 w-full">
                    <h3 class="my-2 w-full font-bold text-center">{shop.name}</h3>
                    {#if shop.status > 0}
                    <a class="btn btn-green" href="/commercant/shop/{shop._id}">Modifier</a>
                    {:else}
                    <small>En attente de validation</small>
                    {/if}
                </div>
            </div>

        {/each}
        {#if user.shopsLimit > shops.length}
        <a href="/commercant/shop/new" class="h-72 w-80 border m-2 shadow-lg rounded-md" >
            <div class="cursor-pointer w-full h-full flex justify-center items-center">
                <Plus></Plus>
            </div>
        </a>
        {/if}
    {/if}
        
</section>