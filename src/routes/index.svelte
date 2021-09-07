<script context="module">
    export const load = async()=>{
        const data = await fetch("http://localhost:3000/api/last-shops")
        return{
            props:{
                lastShops : await data.json()
            }
        }
    }
</script>

<script>
import Head from "$lib/Head.svelte";
import Category from "$lib/index/Category.svelte";
import Search from "$lib/index/Search.svelte";
import ShopCard from "$lib/ShopCard.svelte";

let pc = ""


export let lastShops
</script>
<Head/>
<Search pc="{pc}"/>
<section class="max-w-5xl mx-auto mt-24">
    <h2 class="mb-12">Qu'est-ce que c'est?</h2>
    <p class="text-xl">
        Saveur Belge est le site qui regroupe tous les commerçants locaux prêt de chez vous !  Avec seulement quelques informations, vous allez pouvoir découvrir quelles sont les commerçants locaux qui travaillent dans votre région. Cette initiative citoyenne a pour vocation de rapprocher les personnes qui veulent consommer local et des commerçants dans toute la Belgique. 
        <br/>Si vous souhaitez agir et changer votre manière de consommer, lancez une recherche et découvrez les produits de chez nous !
    </p>
    <div class="my-24 flex md:flex-row flex-col justify-center items-center">
        <div><a class="btn btn-green" href="recherche">Lancer une recherche</a></div>
        <div class="m-4"></div><!--Un peu shlagos ça mais c rien c le dev-->
        <div><a class="btn btn-green-outline" href="ajouter-mon-commerce">Ajouter mon commerce</a></div>
    </div>
</section>
<section class="flex md:flex-row flex-col">
    <Category href="recherche?categorie=restaurant" title="Restaurants" description="Des restaurants, près de chez vous, vous proposent des produits locaux et de saison" image="resto.jpg"/>
    <Category href="recherche?categorie=bar" title="Bars" description="Des bars locaux vous proposent des boissons locales, brassées près de chez vous." image="bar.jpg"/>
    <Category href="recherche?categorie=commerce" title="Commerces" description="Des dizaines de commerçants vendant des produits locaux qui ont été cultivés dans votre région" image="commerce.jpg"/>
</section>
<section class="my-16">
    <h2 class="my-12">Les derniers inscrits</h2>
    <div class="flex lg:flex-row flex-col items-center justify-evenly max-w-5xl mx-auto">
        {#each lastShops as shop}
            <ShopCard name="{shop.name}" slug="{shop.slug}" description="{shop.description}" badges="{shop.options}"/>
        {/each}
    </div>
    <div class="flex justify-center mt-4">
        <a class="btn btn-green" href="/recherche">Voir tous les commerces</a>
    </div>
</section>