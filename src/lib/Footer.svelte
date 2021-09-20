<script>
import Facebook from "./svg/Facebook.svelte";
import Instagram from "./svg/Instagram.svelte";
const categories = [
    {name:"Commerces",link:"commerce"},
    {name:"Restaurants/bars",link:"restaurant"},
]
</script>
<footer class="bg-green text-white py-16 mt-10">
    <div class="max-w-5xl flex md:flex-row flex-col mx-auto p-4">
        <div class="flex md:flex-row flex-col md:w-6/12 w-12/12">
            <div class="md:w-6/12 w-12/12">
                <h4>Catégories</h4>
                <ul>
                    {#each categories as category}
                        <li class="my-4"><a class="text-white" href="/recherche?sector={category.link}">{category.name}</a></li>
                    {/each}
                </ul>
            </div>
            <div class="md:w-6/12 w-12/12">
                <h4>Commerçant</h4>
                <ul>
                    <li class="my-4"><a class="text-white" href="/ajouter-mon-commerce">Ajouter mon commerce</a></li>
                    <li class="my-4"><a class="text-white" href="/connexion">Se connecter</a></li>
                    <li class="my-4"><a class="text-white" href="/contact">Nous contacter</a></li>
                </ul>
            </div>
        </div>
        <div class="md:w-6/12 w-12/12">
            <h4>Saveur Belge</h4>
            <p class="my-4 text-lg">Saveur Belge est une initiative bénévole et gratuite de 2 étudiants tournaisiens ayant à coeur de participer à une transition écologique. <a class="text-green-light" href="/a-propos">En savoir plus.</a></p>
            <p class="mb-4"><a class="text-green-light" href="/politique-de-confidentialite">Politique de confidentialité</a></p>
            <div class="flex">
                <a class="mr-2" href="https://www.facebook.com/saveurbelgium"><Facebook size="30" /></a>
                <a href="https://instagram.com/saveurbelge"><Instagram size="30"  /></a>
            </div>
        </div>
    </div>
    <p class="text-center text-sm pt-8">
        <a class="text-green-light" target="_blank" title="Développé par Benjamin Geets" href="https://geets.dev">{"<geets.dev/>"}</a> // designé par <a class="text-green-light" target="_blank" href="https://galandtristan.be">Galand Tristan</a>
    </p>
</footer>