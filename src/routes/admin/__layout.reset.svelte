<script>
import Navbar from "$lib/Navbar.svelte";
import { onMount } from "svelte";
import {goto} from '$app/navigation'
import Head from "$lib/Head.svelte";
import { currentAdminPage } from "$lib/store";
let currentPage

currentAdminPage.subscribe(v=>{
    currentPage = v
})
const links = [
    {text:"Se déconnecter", href:"/deconnexion",type:"button"}
]
onMount(()=>{
    if(!localStorage.getItem('accessToken') || parseInt(localStorage.getItem('status'))<5){
        goto('/connexion')
    }
})
let sidebarLinks = [
    {text:'Utilisateurs',href:'/admin/'},
    {text:'Commerces',href:'/admin/shop'},
    {text:'Catégories',href:'/admin/categories'}
]
</script>
<Head title="Admin - SaveurBelge" noindex={true}/>
<Navbar links={links} sousTitre="Admin"/>
<main class="md:mt-10 mt-4 mb-10">
    <aside class="w-60 ml-4 lg:absolute static">
        <ul>
            {#each sidebarLinks as l}
                {#if l.href==`/admin/${currentPage}`}
                    <li class="border border-green-light border-2 p-2 rounded-md">
                        <a href="{l.href}" class="flex items-center">{l.text}</a>
                    </li>
                {:else}
                    <li class="p-2 px-3" ><a class="flex items-center" href="{l.href}">{l.text}</a></li>
                {/if}
            {/each}
            <li class="p-2 px-3" ><a class="flex items-center" href="/commercant">Interface commerçant 🔗</a></li>
        </ul>
    </aside>
    <div class="md:ml-72 px-2">
        <slot></slot>
    </div>
</main>