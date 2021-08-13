<script>
import Button from "$lib/Button.svelte";
import Head from "$lib/Head.svelte";
import Category from "$lib/index/Category.svelte";
import Search from "$lib/index/Search.svelte";
import ShopCard from "$lib/ShopCard.svelte";
</script>
<Head/>
<Search/>
<section class="max-w-5xl mx-auto mt-24">
    <h2>Qu'est-ce que c'est?</h2>
    <p class="text-xl">
        Saveur Belge est le site qui regroupe tous les commerçants locaux prêt de chez vous !  Avec seulement quelques informations, vous allez pouvoir découvrir quelles sont les commerçants locaux qui travaillent dans votre région. Cette initiative citoyenne a pour vocation de rapprocher les personnes qui veulent consommer local et des commerçants dans toute la Belgique. 
        <br/>Si vous souhaitez agir et changer votre manière de consommer, lancez une recherche et découvrez les produits de chez nous !
    </p>
    <div class="my-24 flex md:flex-row flex-col justify-center items-center">
        <div><Button href="recherche" color="green">Lancer une recherche</Button></div>
        <div class="m-4"></div><!--Un peu shlagos ça mais c rien c le dev-->
        <div><Button href="ajouter-mon-commerce" color="green" outline="{true}">Ajouter mon commerce</Button></div>
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
        <ShopCard/>
        <ShopCard/>
        <ShopCard/>
    </div>
    <div class="flex justify-center mt-4">
        <Button href="/recherche">Voir tous les commerces</Button>
    </div>
</section>