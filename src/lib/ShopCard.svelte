<script>
import Button from "./Button.svelte";
import IconBio from "./svg/IconBio.svelte";
import IconMonnaie from "./svg/IconMonnaie.svelte";
import IconProducteur from "./svg/IconProducteur.svelte";
export let name = "Sample Name"
export let slug = "sample-slug"
export let banner = "resto.jpg"
export let description = "Alternatur vous propose un assortiement aussi vastre qu'un supermarché ... oe cons"
export let badges = {
    bio:true,
    producteur:true,
    monnaie:true
}
</script>

<div class="max-w-xs m-4 shadow-lg rounded-md overflow-hidden">
    <div class="h-48 flex flex-col justify-end" style="background-image:url('/images/categories/{banner}');background-size:cover;">
        <div class="flex justify-center py-2" style="background:rgba(255,255,255,0.4)">
            {#if badges.bio}
                <span class="mx-1"><IconBio/></span>
            {/if}
            {#if badges.monnaie}
                <span class="mx-1"><IconMonnaie/></span>
            {/if}
            {#if badges.producteur}
                <span class="mx-1"><IconProducteur/></span>
            {/if}
        </div>
    </div>
    <div class="p-4">
        <h5 class="text-center text-xl bold">
            {name}
        </h5>
        <p class="my-4">
           {description}
        </p>
        <div class="flex justify-center">
            <Button outline={true} href="/commerce/{slug}" color="green">Voir la boutique</Button>
        </div>
    </div>
</div>
