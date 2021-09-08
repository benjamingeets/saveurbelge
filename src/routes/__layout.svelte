<script>
import Footer from "$lib/Footer.svelte";
import Navbar from "$lib/Navbar.svelte";
import { onMount } from "svelte";
import "../app.postcss";
let loaded = false
let links = [
    {text:"Accueil",href:"/"},
    {text:"A propos",href:"/a-propos"}
]
onMount(()=>{
    if(localStorage.getItem('accessToken')){
        links.push({text:"Mon compte",href:"/commercant",type:"button"})
    }
    else{
        links.push({text:"Se connecter",href:"/connexion",style:"text-green"},{text:"Ajouter mon commerce", href:"/ajouter-mon-commerce",type:"button"})
    }
    loaded = true
})
</script>
<div class="flex flex-col min-h-screen">
    {#if loaded}<Navbar links={links}/>{/if}
    <main class="md:px-4 px-2 mb-auto min-h-full">
        <slot></slot>
    </main>
    <Footer/>
</div>