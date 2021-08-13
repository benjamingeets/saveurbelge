<script>
import Facebook from "./svg/Facebook.svelte";
import Instagram from "./svg/Instagram.svelte";
const categories = [
    {name:"Commerces",link:"commerce"},
    {name:"Restaurants",link:"restaurant"},
    {name:"Bars",link:"bar"}
]
</script>
<footer class="bg-green text-white py-16">
    <div class="max-w-5xl flex md:flex-row flex-col mx-auto p-4">
        <div class="flex md:flex-row flex-col md:w-6/12 w-12/12">
            <div class="md:w-6/12 w-12/12">
                <h4>Catégories</h4>
                <ul>
                    {#each categories as category}
                        <li class="my-4"><a class="text-white" href="/recherche?categorie={category.link}">{category.name}</a></li>
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
            <p class="my-4 text-lg">Chez Saveur Belge on aime manger des trucs tsé miam nourriture et tout laaa lezgo g pas raison?</p>
            <div class="flex">
                <a class="mr-2" href="https://facebook.com"><Facebook/></a>
                <a href="https://instagram.com"><Instagram/></a>
            </div>
        </div>
    </div>
    <p class="text-center text-sm pt-8">
        <a class="text-green-light" target="_blank" title="Développé par Benjamin Geets" href="https://geets.dev">{"<geets.dev/>"}</a> // designé par <a class="text-green-light" target="_blank" href="https://galandtristan.be">Galand Tristan</a>
    </p>
</footer>