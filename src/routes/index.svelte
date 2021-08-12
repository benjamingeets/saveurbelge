<script>
import Button from "$lib/Button.svelte";
import Head from "$lib/Head.svelte";
import Search from "$lib/index/Search.svelte";
</script>
<Head/>
<Search/>
<div class="max-w-5xl mx-auto mt-24">
    <h2>Qu'est-ce que c'est?</h2>
    <p>
        Saveur Belge est le site qui regroupe tous les commerçants locaux prêt de chez vous !  Avec seulement quelques informations, vous allez pouvoir découvrir quelles sont les commerçants locaux qui travaillent dans votre région. Cette initiative citoyenne a pour vocation de rapprocher les personnes qui veulent consommer local et des commerçants dans toute la Belgique. 
        <br/>Si vous souhaitez agir et changer votre manière de consommer, lancez une recherche et découvrez les produits de chez nous !
    </p>
    <div class="mt-8 flex justify-center">
        <Button color="green">Lancer une recherche</Button>
        <div class="mx-4"></div><!--Un peu shlagos ça mais c rien c le dev-->
        <Button color="green" outline="{true}">Ajouter mon commerce</Button>
    </div>
</div>