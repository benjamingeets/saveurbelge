<script>
import Navbar from "$lib/Navbar.svelte";
import { onMount } from "svelte";
import {goto} from '$app/navigation'
import Head from "$lib/Head.svelte";
import { currentAdminPage } from "$lib/store";
import Id from "$lib/svg/Id.svelte";
import Shop from "$lib/svg/Shop.svelte";
import Mail from "$lib/svg/Mail.svelte";
let currentPage

currentAdminPage.subscribe(v=>{
    currentPage = v
})
const links = [
    {text:"Se déconnecter", href:"/deconnexion",type:"button"}
]
onMount(()=>{
    if(!localStorage.getItem('accessToken')){
        goto('/connexion')
    }
})
let sidebarLinks = [
    {text:'Mes commerces',href:'/commercant/'},
    {text:'Mes infos',href:'/commercant/informations'},
]
</script>
<Head title="Gestion - SaveurBelge" noindex={true}/>
<Navbar links={links} sousTitre="Espace commerçant"/>
<main class="md:mt-10 mt-4">
    <aside class="w-60 ml-4 lg:absolute static">
        <ul>
            {#each sidebarLinks as l}
                {#if l.href==`/commercant/${currentPage}`}
                    <li class="border border-green-light border-2 p-2 rounded-md">
                        <a href="{l.href}" class="flex items-center">
                            {#if l.text == 'Mes commerces'}
                                <Shop></Shop>
                            {:else if l.text =='Mes infos'}
                                <Id></Id>
                            {:else if l.text == 'Contact'}
                                <Mail></Mail>
                            {/if}
                            {l.text}</a>
                    </li>
                {:else}
                    <li class="p-2 px-3" ><a class="flex items-center" href="{l.href}">
                        {#if l.text == 'Mes commerces'}
                                <Shop></Shop>
                            {:else if l.text =='Mes infos'}
                                <Id></Id>
                            {:else if l.text == 'Contact'}
                                <Mail></Mail>
                            {/if}
                        {l.text}</a></li>
                {/if}
            {/each}
        </ul>
    </aside>
    <slot></slot>
</main>