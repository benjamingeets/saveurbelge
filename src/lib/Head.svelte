<script>
    const DOMAIN = import.meta.env.VITE_DOMAIN;
    export let title = "Saveur Belge 🌽 Des produits de chez nous 😁"
    export let description = "Venez découvrir les commerçant qui ont a coeur de vendre des produits qui viennent de votre région!"
    export let lien = ""
    export let image = `https://${DOMAIN}/public/image/share.png`
    export let noindex = false
    if(description.length > 100){
        description = `${description.substring(0,140)}...`
    }
</script>

<svelte:head>
    <!--🌽-->
    <title>{title}</title>
    <link rel="icon" href="/favicon.ico">
    <meta name="description" content={description}/>
    <link rel="canonical" href="https://{DOMAIN}/{lien}">
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://{DOMAIN}" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description}/>
    <meta name="image" property="og:image" content={image} />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://{DOMAIN}" />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image} />
    {#if noindex}
        <meta name="robots" content="noindex">
    {/if}
</svelte:head>