<script>
import Badge from "./Badge.svelte";
import IconBio from "./svg/IconBio.svelte";
import IconMonnaie from "./svg/IconMonnaie.svelte";
import IconProducteur from "./svg/IconProducteur.svelte";
export let name = "Sample Name"
export let slug = "sample-slug"
export let sector = 'restaurant'
export let banner = ""
export let disabled = false
export let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pellentesque turpis vitae mattis. Cras rutrum tu"
export let badges = {
    bio:true,
    local:true,
    monnaie:true
}


</script>

<div class="md:w-80 w-60 m-4 shadow-lg rounded-md overflow-hidden">
    <div class="h-48 flex flex-col justify-end rounded-t-md" style={banner == '' ? `background-image:url(/images/headers/${sector}.png);background-repeat:repeat;background-size:30%` : `background-image:url(${banner});background-size:cover`}>
        <div class="flex justify-center {badges.bio || badges.monnaie || badges.local ? 'py-2' : ''}" style="background:rgba(255,255,255,0.4)">
            {#if badges.bio}
                <Badge texte="Vend des produits bio"><IconBio/></Badge>
            {/if}
            {#if badges.monnaie}
                <Badge texte="Accepte une monnaie locale"><IconMonnaie/></Badge>
            {/if}
            {#if badges.local}
                <Badge texte="Producteur"><IconProducteur/></Badge>
            {/if}
        </div>
    </div>
    <div class="p-4">
        <h5 class="text-center text-xl bold">
            {name != '' ? name : 'Votre commerce'}
        </h5>
        <p class="my-4 md:h-24 h-26">
           {description.length > 100 ? `${description.substring(0,100)}...` : description}
        </p>
        <div class="flex justify-center">
            {#if !disabled}
                <a class="btn btn-green-outline" href="/commerce/{slug}" >Voir la boutique</a>
            {:else}
                <span class="btn btn-green-outline cursor-not-allowed" href="#" >Voir la boutique</span>
            {/if}
        </div>
    </div>
</div>
