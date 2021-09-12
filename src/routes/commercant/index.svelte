<script>
import { onMount } from "svelte";
import { currentUserPage } from "$lib/store";
import { getUserInformations, getUserShops } from "$lib/user_req";
import Plus from "$lib/svg/Plus.svelte";
import Shop from "$lib/svg/Shop.svelte";
import {API} from '$lib/env.js'
let shops
let user
let ready = false
    onMount(async()=>{
        currentUserPage.update(n => "")
        shops = await getUserShops()
        user = await getUserInformations()

        shops.sort((a,b)=>{
            return b.status - a.status
        })
        ready = true
    })
</script>

<section class="lg:ml-72 flex flex-wrap px-2">
    {#if ready && user && user.status >= 1}
        {#each shops as shop}
            <div class="w-80 h-80 rounded-md shadow-lg sm:m-2 mb-2 mx-auto">
                <div class="h-48 rounded-t-md" style={shop.header ? `background-image:url(${API}/public/${shop._id}_header.webp); background-size: cover;)` : shop.sector == 'restaurant' ? 'background-image:url(/images/headers/restaurant.png);background-size:30%;' : 'background-image:url(/images/headers/commerce.png);background-size:30%;'}>
                </div>
                <div class="flex flex-col items-center h-32 pb-8 px-4 w-full">
                    <h3 class="my-2 w-full font-bold text-center">{shop.name}</h3>
                    {#if shop.status == 0}
                    <small>En attente de validation</small>
                    {:else if shop.status == -1}
                    <small class="text-center">Votre établissement a été refusé. Vous pouvez le modifier pour qu'il soit à nouveau vérifié.</small>
                    {/if}
                    <a class="btn btn-green" href="/commercant/shop/{shop._id}">Modifier</a>
                    
                </div>
            </div>

        {/each}
        {#if user.shopsLimit > shops.length}
        <a href="/commercant/shop/new" class="h-80 w-80 border md:m-2 shadow-lg rounded-md mx-auto my-2" >
            <div class="cursor-pointer w-full h-full flex justify-center items-center">
                <Plus></Plus>
            </div>
        </a>
        {/if}
    {:else}
        <p>Veuillez valider votre compte via le lien reçu par mail</p>
    {/if}
        
</section>