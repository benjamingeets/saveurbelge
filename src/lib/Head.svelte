<script>
    export let title = "Saveur Belge 🌽 Des produits de chez nous 😁"
    export let description = "Venez découvrir les commerçant qui ont a coeur de vendre des produits qui viennent de votre région!"
    export let lien = ""
    const URL = "https://saveurbelge.be"
    export let image = `${URL}/public/image/share.png`

</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}/>
    <link rel="canonical" href="{URL}/{lien}">
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{URL}" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description}/>
    <meta name="image" property="og:image" content={image} />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="{URL}" />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image} />
</svelte:head>