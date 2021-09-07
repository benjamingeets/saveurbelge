<script context='module'>
    export const load = async({page})=>{
        const id = page.params.id
        return {
            props:{
                id
            }
        }
    }
</script>

<script>
import { onMount } from "svelte";
import { currentAdminPage } from "$lib/store";
import { getShop,deleteShop } from "$lib/user_req";
import Slider from "$lib/Slider.svelte";
import ShopCard from "$lib/ShopCard.svelte";
export let id
let shop 
let categories
let displayDelete = false
let display = false
let sector
let initialValue
    onMount(async ()=>{
        currentAdminPage.update(n => "")
        shop = await getShop(id)
        const categoriesRes = await fetch("http://localhost:3000/api/get-categories")
        categories = await categoriesRes.json()
        categories.forEach(e=>{
            shop.categories.forEach(f=>{
                if(f == e.name){
                    e.value = true
                }
                else{
                    e.value = false
                }
            })
        })
        initialValue = {...shop}
        sector = shop.sector
        display = true
    })
    const clearCategories = ()=>{}
</script>
{#if displayDelete}
<div>
    <div class="fixed top-0 w-screen h-screen bg-grey bg-opacity-80 flex justify-center items-center z-20">
        <div class="bg-white w-full max-w-xl h-80 rounded-md p-4 text-center">
            <h5 class="text-center my-10 font-bebas text-3xl">Attention</h5>
            <p>Voulez-vous vraiment supprimer ce commerce?</p>
            <small>Cette action est irréversible</small>
            <div class="flex justify-center">
                <div on:click={()=>{deleteShop(id)}} class="btn btn-green-outline my-2 mx-4">Confirmer</div>
                <div on:click={()=>{displayDelete = false}} class="btn btn-green my-2 mx-4">Annuler</div>
            </div>
        </div>
    </div>
</div>
{/if}
<section class="max-w-3xl mx-auto w-full border">
    <h2>Votre commerce</h2>
    {#if display}
    <div class="flex"><!--Form-->
        <div class="w-6/12 border">
            <label for="nom">
                <p>Nom*</p>
                <input class="input-normal" bind:value={shop.name} type="text" id="nom">
            </label>
            <p>Secteur d'activité</p>
            <select bind:value={sector} on:change={()=>clearCategories()} class="input-normal" name="" id="">
                <option value="restaurant">Restaurant/Bar</option>
                <option value="commerce">Commerce</option>
            </select>
            <p>Catégories :</p>
            <div class="flex flex-col">
                {shop.categories}
                {#each categories as category}
                    {#if category.sector == sector}
                        <label for={category.name}>
                            <input bind:checked={category.value} type="checkbox" name={category.name} id={category.name}>
                            <span>{category.name}</span>
                        </label>
                    {/if}
                {/each}
            </div>
            <div>
                <span class="flex items-center my-2"><Slider on:updateValue={(event)=>{shop.options.monnaie = event.detail}} value={shop.options.monnaie}/>Monnaie locale (Yar, SolAToi,...)</span>
                <span class="flex items-center my-2"><Slider on:updateValue={(event)=>{shop.options.local = event.detail}} value={shop.options.local}/>Vous êtes producteur</span>
                <span class="flex items-center my-2"><Slider on:updateValue={(event)=>{shop.options.bio = event.detail}} value={shop.options.bio}/>Vos produits sont essentiellement bio</span>
            </div>
        </div>
        <div class="w-6/12">
d
        </div>
    </div>
    <div class="btn btn-red-outline w-36 text-center mx-auto" on:click={()=>{displayDelete = true}}>
        Supprimer 
    </div>
    {/if}
</section>


{#if display}
<section class="fixed right-0 top-36 2xl:block hidden">
    <ShopCard name={shop.name} badges={shop.options} disabled={true} description={shop.description}/>
</section>{/if}