<script>
import Button from "./Button.svelte";
const links = [
    {text:"Accueil",href:"/"},
    {text:"A propos",href:"/a-propos"},
    {text:"Se connecter",href:"/connexion",style:"text-green"},
    {text:"Ajouter mon commerce", href:"/ajouter-mon-commerce",type:"button"}
]
</script>
<header class="flex justify-between text-brown p-4 select-none">
    <div class="w-4/12 uppercase">
        <p class="font-bebas text-4xl">Saveur Belge</p>
        <p class="font-bebas text-lg">Des produits de chez nous</p>
    </div>
    <div class="w-4/12 text-center">
        <img src="" alt="Saveur Belge">
    </div>
    <nav class="xl:block hidden w-4/12">
        <ul class="flex justify-evenly h-full items-center">
            {#each links as link}
                {#if link.type !="button"}
                    <li>
                        <a class="{link.style}" href="{link.href}">{link.text}</a>
                    </li>
                {:else if link.type =="button"}
                    <li>
                        <Button href="{link.href}">{link.text}</Button>
                    </li>
                {/if}
            {/each}
        </ul>
    </nav>
</header>
