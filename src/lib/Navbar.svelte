<script>
import Button from "./Button.svelte";
import Hamburger from "./svg/Hamburger.svelte";
let menuOpen = false;
const links = [
    {text:"Accueil",href:"/"},
    {text:"A propos",href:"/a-propos"},
    {text:"Se connecter",href:"/connexion",style:"text-green"},
    {text:"Ajouter mon commerce", href:"/ajouter-mon-commerce",type:"button"}
]

</script>
<div class="lg:h-36 h-24"></div>
<header class="fixed top-0 bg-white w-full flex justify-between text-brown py-4 select-none border-b mb-4 px-4">
    <div class="w-5/12 uppercase">
        <a class="inline-block" href="/">
            <p class="font-bebas lg:text-4xl text-2xl">Saveur Belge</p>
            <p class="font-bebas lg:text-lg text-xs">Des produits de chez nous</p>
        </a>
    </div>
    <div class="w-2/12 text-center">
        <a href="/">
            <img src="" alt="Saveur Belge">
        </a>
    </div>
    <nav class="xl:block hidden w-5/12">
        <ul class="flex justify-evenly h-full items-center ml-10">
            {#each links as link}
                {#if link.type !="button"}
                    <li>
                        <a class="{link.style ? link.style : ''}" href="{link.href}">{link.text}</a>
                    </li>
                {:else if link.type =="button"}
                    <li>
                        <Button href="{link.href}">{link.text}</Button>
                    </li>
                {/if}
            {/each}
        </ul>
    </nav>
    <div class="xl:hidden w-5/12 flex items-center justify-end">
        <Hamburger on:click={()=>{menuOpen = !menuOpen}} />
    </div>
</header>


<ul class="xl:hidden flex bg-white w-full flex-col justify-evenly items-center overflow-hidden transition duration-300 ease-in-out {menuOpen?'h-auto opacity-100': 'h-0 opacity-0'}">
    {#each links as link}
        {#if link.type !="button"}
            <li class="my-4">
                <a class="{link.style ? link.style : ''} my-4" href="{link.href}">{link.text}</a>
            </li>
        {:else if link.type =="button"}
            <li class="my-6">
                <Button href="{link.href}">{link.text}</Button>
            </li>
        {/if}
    {/each}
</ul>