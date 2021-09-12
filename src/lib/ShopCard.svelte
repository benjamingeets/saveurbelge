<script>
import Badges from "./Badges.svelte";
import Distance from "./svg/Distance.svelte";
export let shop = {
    _id:'',
    sector:'restaurant',
    slug:'sample-slug',
    name:'sample name',
    addresse:{
        city:'Tournai',
        cp:'7500'
    },
    header:false,
    description:'',
    options:{
        bio:false,
        local:false,
        monnaie:false
    }
}
export let distance = false
export let disabled = false
export let dispatchMode = false
export let headerImage
export let buttonText

import {API} from '$lib/env.js'
</script>

<div class="md:w-80 w-72 md:m-4 m-2 shadow-lg rounded-md overflow-hidden">
    <div class="h-48 flex flex-col justify-end rounded-t-md" style={!shop.header ? `background-image:url(/images/headers/${shop.sector}.png);background-repeat:repeat;background-size:30%` : `background-image:url(${headerImage ? headerImage : `${API}/public/${shop._id}_header.webp`});background-size:cover`}>
        <div class="flex justify-center {shop.options.bio || shop.options.monnaie || shop.options.local ? 'py-2' : ''}" style="background:rgba(255,255,255,0.4)">
            <Badges options={shop.options}/>
        </div>
    </div>
    <div class="p-4">
        <h5 class="text-center text-xl bold">
            {#if shop.name != ''}
                {shop.name} 
                {#if shop.status == -1}
                    (🚫)
                {:else if shop.status == 0}
                    (⏳)
                {/if}
            {:else}
                Votre commerce
            {/if} 
        </h5>
        {#if distance}<small class="flex text-green-light justify-center my-1"><Distance/> <span class="ml-2">{distance}km - {shop.address.city}</span></small> {/if}
        <p class="my-4 h-24 md:h-26 break-words">
           {shop.description.length > 100 ? `${shop.description.substring(0,100)}...` : shop.description}
        </p>
        <div class="flex justify-center">
            {#if disabled}
            <span class="btn btn-green-outline cursor-not-allowed" href="#" >Voir la boutique</span>
            {:else if dispatchMode}
            <div on:click class="btn btn-green-outline">{buttonText ? buttonText : 'Voir la boutique'}</div>
            {:else}
            <a class="btn btn-green-outline" href="/commerce/{shop.slug}" >Voir la boutique</a>
            {/if}
        </div>
    </div>
</div>
