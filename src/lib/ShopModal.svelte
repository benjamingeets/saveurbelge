<script>
import { onDestroy, onMount } from "svelte";
import { createEventDispatcher } from 'svelte';

import Facebook from '$lib/svg/Facebook.svelte'
import Instagram from '$lib/svg/Instagram.svelte'
import Website from '$lib/svg/Website.svelte'
import Close from '$lib/svg/Close.svelte'
import Pointer from '$lib/svg/Pointer.svelte'
import Phone from '$lib/svg/Phone.svelte'

import { API } from "$lib/env";
const dispatch = createEventDispatcher();

    export let shop = {
        name:"Sample name",
        slug:'sample-name',
        _id:'',
    }
    onMount(()=>{
        document.querySelector("body").style.overflow="hidden"
    })
    onDestroy(()=>{

        document.querySelector("body").style.overflow="auto"
    })

</script>

<div class="h-screen w-screen bg-grey-light bg-opacity-50 fixed z-20 top-0 left-0 flex justify-center md:pt-10 md:pb-10" on:click={()=>{dispatch('close')}}>
    <section on:click|stopPropagation class={`bg-grey-light max-w-3xl w-full mt-32 rounded-md p-4 relative w-full pb-32`}>
        <div>
            <div on:click={()=>{dispatch('close')}} class={`absolute left-4 top-4 cursor-pointer`}>
                <Close color="black"/>
            </div>
            <div class="bg-grey-light w-52 h-52 rounded-full mx-auto -mt-32 p-4">
                <!--<img class="rounded-full w-full h-full p-4" src={`${API}/public/${shop._id}_logo.webp`} alt="">-->
                <div class="w-full h-full rounded-full p-4 flex justify-center items-center" style={`${shop.logo ? `background-image:url(${API}/public/${shop._id}_logo.webp);background-size:cover;background-position:center;` : `background-color:#C7CB85;`}`}>
                    {#if !shop.logo}
                        <p class="select-none text-white text-9xl capitalize">{shop.name.charAt(0)}</p>
                    {/if}
                </div>
            </div>
        </div>
        <div class="flex flex-col overflow-auto max-h-full">
            <h2 class="text-noir">{shop.name}</h2>
            <small class="text-grey-dark mx-auto capitalize">{shop.sector}</small>
            <p class="mt-10 md:px-20">
                {shop.description}
            </p>
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
</div>