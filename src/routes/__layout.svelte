<script>
import Footer from "$lib/Footer.svelte";
import Navbar from "$lib/Navbar.svelte";
import "../app.postcss";
const links = [
    {text:"Accueil",href:"/"},
    {text:"A propos",href:"/a-propos"},
    {text:"Se connecter",href:"/connexion",style:"text-green"},
    {text:"Ajouter mon commerce", href:"/ajouter-mon-commerce",type:"button"}
]
</script>
<div class="flex flex-col min-h-screen">
    <Navbar links={links}/>
    <main class="px-4 mb-auto min-h-full">
        <slot></slot>
    </main>
    <Footer/>
</div>