<script>
import { API } from "$lib/env";
import { onDestroy, onMount } from "svelte";
import Badges from '$lib/Badges.svelte'
import Facebook from '$lib/svg/Facebook.svelte'
import Instagram from '$lib/svg/Instagram.svelte'
import Website from '$lib/svg/Website.svelte'
import Pointer from '$lib/svg/Pointer.svelte'
import Phone from '$lib/svg/Phone.svelte'
export let modal = false
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
    export let shop
</script>

<section on:click|stopPropagation class={`bg-grey-light max-w-3xl w-full mt-32 rounded-md p-4 relative ${shop.logo ? 'pb-32' : ''}`}>
    <div>
        {#if modal}
        <div on:click={()=>{dispatch('close')}} class={`absolute left-4 top-4 cursor-pointer`}>
            X
        </div>
        {/if}
        {#if shop.logo}
        <div class="bg-grey-light w-52 h-52 rounded-full mx-auto -mt-32 p-4">
            <!--<img class="rounded-full w-full h-full p-4" src={`${API}/public/${shop._id}_logo.webp`} alt="">-->
            <div class="w-full h-full rounded-full p-4" style={`background-image:url(${API}/public/${shop._id}_logo.webp);background-size:cover`}>

            </div>
        </div>
        {/if}
        
        <div class={`absolute right-3 top-4 flex hidden md:block`}>
            <Badges options={shop.options}/>
        </div>
    </div>
    <div class="flex flex-col overflow-auto max-h-full">
        <h2 class="text-noir">{shop.name}</h2>
        <small class="text-grey-dark mx-auto capitalize">{shop.sector}</small>
        <div class={`flex gap-3 justify-center ${shop.social.facebook || shop.social.instagram || shop.social.website ? 'mt-10' : ''}`}>
            {#if shop.social.facebook}
             <a target="_blank" href="https://facebook.com">
                 <Facebook  size="30" color="#7EA172"/>
             </a>
            {/if}
            {#if shop.social.instagram}
            <a target="_blank" href="https://instagram.com">
                <Instagram  size="30" color="#7EA172"/>
            </a>
            {/if}
            {#if shop.social.website}
                <a target="_blank" href={shop.social.website}>
                    <Website  size="30" color="#7EA172"/>
                </a>
            {/if}
        </div>
        <p class="text-center mt-10">
            {shop.description}
        </p>
        <div class="mt-10 md:hidden">
            <Badges options={shop.options}/>
        </div>
        <div class="mt-10">
            <span class="flex justify-center gap-2"><Pointer color="black"/><a target="_blank" href={`https://www.google.be/maps?hl=fr&q=${shop.address.num} ${shop.address.street} ${shop.address.city}`}>{shop.address.num}, {shop.address.street} {shop.address.city}</a></span>
            {#if shop.phone}
            <span class="flex justify-center gap-2"><Phone color="black"/> <a target="_blank" href={`tel:${shop.phone}`}>{shop.phone}</a> </span>
            {/if}
        </div>
        <div class="flex justify-center mt-10">
            <a href={`/commerce/${shop.slug}`} class="btn btn-green">
                En savoir plus
            </a>
        </div>
        <p class="text-grey-dark text-center mt-10">Vous constatez un problème avec ce commerce? <a class="underline" href="/contact">Signalez le nous!</a></p>
    </div>
</section>