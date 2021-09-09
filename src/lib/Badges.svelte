<script>
    export let options
    import Badge from "./Badge.svelte";
    import IconBio from "./svg/IconBio.svelte";
    import IconMonnaie from "./svg/IconMonnaie.svelte";
    import IconProducteur from "./svg/IconProducteur.svelte";
</script>

<div class="flex justify-center">
    {#if options.bio}
                    <Badge texte="Vend des produits bio"><IconBio/></Badge>
                {/if}
                {#if options.monnaie}
                    <Badge texte="Accepte une monnaie locale"><IconMonnaie/></Badge>
                {/if}
                {#if options.local}
                    <Badge texte="Producteur"><IconProducteur/></Badge>
                {/if}
</div>