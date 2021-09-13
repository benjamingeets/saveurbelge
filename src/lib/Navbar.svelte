<script>
import Hamburger from "./svg/Hamburger.svelte";
import {goto} from "$app/navigation"
export let sousTitre = "Des produits de chez nous"
let menuOpen = false;
export let links

</script>
<div class="h-28"></div>
<header class="z-20 fixed top-0 bg-white w-full flex justify-between text-brown py-4 select-none mb-4 px-4">
    <div class="w-5/12 uppercase">
        <a class="inline-block" href="/">
            <p class="font-bebas lg:text-4xl text-2xl">Saveur Belge</p>
            <p class="font-bebas lg:text-lg text-xs">{sousTitre}</p>
        </a>
    </div>
    <div class="w-2/12 flex justify-center">
            <p id="bord" class="md:w-32 w-20 p-2 -bottom-4 md:p-3 bg-white rounded-full absolute md:-bottom-6">
                <img on:click={()=>{goto(`/`) }} class="cursor-pointer z-30 w-full" src="/images/logo_saveur_belge.svg" alt="Saveur Belge">
            </p>
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
                        <a class="btn btn-green" href="{link.href}">{link.text}</a>
                        
                    </li>
                {/if}
            {/each}
        </ul>
    </nav>
    <div class="xl:hidden w-5/12 flex items-center justify-end">
        <Hamburger on:click={()=>{menuOpen = !menuOpen}} />
    </div>
</header>


<ul on:click={()=>{menuOpen = !menuOpen}} class="xl:hidden fixed z-10 pt-32 flex bg-white w-full border-b-2 flex-col justify-evenly items-center overflow-hidden transition duration-300 ease-in-out {menuOpen?'h-auto opacity-100': 'h-0 w-0 opacity-0'}">
    {#each links as link}
        {#if link.type !="button"}
            <li class="my-4">
                <a class="{link.style ? link.style : ''} my-4" href="{link.href}">{link.text}</a>
            </li>
        {:else if link.type =="button"}
            <li class="my-6">
                <a class="btn btn-green" href="{link.href}">{link.text}</a>
            </li>
        {/if}
    {/each}
</ul>

{#if menuOpen}
<div on:click={()=>{menuOpen = !menuOpen}} class="lg:hidden block fixed h-screen w-screen bg-black opacity-20">

</div>
{/if}

<style>
    header{
        filter: drop-shadow(0 0 1px #9CA3AF);
    }
</style>