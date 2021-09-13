<script context="module">
    import {DOMAIN} from "$lib/env.js"
    export const load = async()=>{
        const data = await fetch(`${DOMAIN}/api/last-shops`)
        return{
            props:{
                lastShops : await data.json()
            }
        }
    }
</script>

<script>
// @ts-nocheck

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
    <p class="md:text-xl">
        Saveur Belge est le site qui regroupe les commerçants locaux et de circuit court près de chez vous !  Avec seulement quelques informations, vous allez pouvoir découvrir quels sont les commerçants de votre région qui proposent des produits bons à la fois pour vous et pour l'environnement. Cette initiative citoyenne a pour vocation de rapprocher les personnes qui veulent consommer local et des commerçants dans toute la Belgique. 
        <br/>Si vous souhaitez agir et changer votre manière de consommer, lancez une recherche et découvrez les produits de chez nous !
    </p>
    <div class="my-24 flex md:flex-row flex-col justify-center items-center">
        <div><a class="btn btn-green" href="recherche">Lancer une recherche</a></div>
        <div class="m-4"></div><!--Un peu shlagos ça mais c rien c le dev-->
        <div><a class="btn btn-green-outline" href="ajouter-mon-commerce">Ajouter mon commerce</a></div>
    </div>
</section>
<section class="flex md:flex-row flex-col max-w-5xl mx-auto">
    <Category href="recherche?sector=restaurant" title="Restaurants/Bars/..." description="Des restaurateurs qui ont a coeur de vous faire manger mieux!" image="bar.jpg"/>
    <Category href="recherche?sector=commerce" title="Commerces" description="Des dizaines de commerçants vendant des produits qui ont été cultivés à 2 pas de chez vous!" image="commerce.jpg"/>
</section>
<section class="my-16">
    <h2 class="my-12">Les derniers inscrits</h2>
    <div class="flex lg:flex-row flex-col items-center justify-evenly max-w-5xl mx-auto">
        {#each lastShops as shop}
            <ShopCard shop={shop}/>
        {/each}
    </div>
    <div class="flex justify-center mt-4">
        <a class="btn btn-green" href="/recherche">Voir tous les commerces</a>
    </div>
</section>