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
    // @ts-nocheck
import { onMount } from "svelte";
import { currentAdminPage } from "$lib/store";
import { getShop,deleteShop, updateShop } from "$lib/user_req";
import Slider from "$lib/Slider.svelte";
import ShopCard from "$lib/ShopCard.svelte";
import Category from "$lib/index/Category.svelte";
import Plus from "$lib/svg/Plus.svelte";
import { goto } from "$app/navigation";
export let id
let pdpUpload,headerUpload,images
let pdpImage =""
let headerImage = ''
let shop 
let categories
let displayDelete = false
let display = false
    onMount(async ()=>{
        currentAdminPage.update(n => "")
        shop = await getShop(id)
        const categoriesRes = await fetch("http://localhost:3000/api/get-categories")
        categories = await categoriesRes.json()
        if(shop.logo){
            pdpImage = "http://localhost:8000/public/" + shop._id + "_logo.webp"
        }
        console.log(shop.header)
        if(shop.header){
            headerImage = "http://localhost:8000/public/" + shop._id + "_header.webp"
        }
        categories.forEach(e=>{
            shop.categories.forEach(f=>{
                if(f == e.name){
                    e.value = true
                }
            })
        })
        display = true
    })
    const clearCategories = ()=>{
        categories.forEach(e=>{
            e.value = false
        })
    }
const setPdp = async(e)=>{
    shop.logo = true
    if(typeof images =='undefined'){
        images = new FormData()
    }
    let image = e.target.files[0];
    let reader = new FileReader();
    images.append('logo',image)
    reader.readAsDataURL(image);
    reader.onload = e => {
        pdpImage = e.target.result
    };
}


const setHeader = async (e)=>{
    if(typeof images == 'undefined'){
        images = new FormData()
    }
    shop.header = true
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    images.append('header',image)
    reader.onload = e => {
        headerImage = e.target.result
    };
}

const handleUpdate =async ()=>{
    shop.categories = []
    categories.forEach(e=>{
        if(e.value){
            shop.categories.push(e.name)
        }
    })
    if(shop.categories.length<= 0){
        alert("Sélectionnez au moins 1 catégorie")
        return
    }
    const res = await updateShop(shop,images)
    alert(res.message)
    if(res.success){
        goto("/commercant")
    }
}
</script>
{#if displayDelete}
<div>
    <div class="fixed top-0 w-screen h-screen bg-grey bg-opacity-80 flex justify-center items-center z-20 px-2">
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
<section class="max-w-3xl xl:mx-auto ml-auto border w-full px-2">
    <h2>Votre commerce</h2>
    {#if display}
    <div class="flex flex-wrap"><!--Form-->
        <div class="md:w-6/12 w-12/12">
            <label for="nom">
                <p>Nom*</p>
                <input class="input-normal" bind:value={shop.name} type="text" id="nom">
            </label>
            <p>Secteur d'activité</p>
            <select bind:value={shop.sector} on:change={()=>clearCategories()} class="input-normal" name="" id="">
                <option value="restaurant">Restaurant/Bar</option>
                <option value="commerce">Commerce</option>
            </select>
            <p>Catégories :</p>
            <div class="flex flex-col">
                {#each categories as category}
                    {#if category.sector == shop.sector}
                        <label for={category.name}>
                            <input bind:checked={category.value} type="checkbox" name={category.name} id={category.name}>
                            <span>{category.name}</span>
                        </label>
                    {/if}
                {/each}
                <div>
                    <span class="flex items-center my-2"><Slider on:updateValue={(event)=>{shop.options.monnaie = event.detail}} value={shop.options.monnaie}/>Monnaie locale (Yar, SolAToi,...)</span>
                    <span class="flex items-center my-2"><Slider on:updateValue={(event)=>{shop.options.local = event.detail}} value={shop.options.local}/>Vous êtes producteur</span>
                    <span class="flex items-center my-2"><Slider on:updateValue={(event)=>{shop.options.bio = event.detail}} value={shop.options.bio}/>Vos produits sont essentiellement bio</span>
                </div>
                <div for="pdp">
                    <p>Logo de votre commerce</p>
                    <input bind:this={pdpUpload} accept="image/png, image/jpeg, image/jpg, image/webp" style='display:none'  on:change={(e)=>{setPdp(e)}} type="file" name="" id="pdp">
                    <div class="h-32 w-32 bg-grey rounded-md flex justify-center items-center cursor-pointer" on:click={()=>{pdpUpload.click()}}>
                        {#if pdpImage == ''}
                        <Plus/>
                        {:else}
                        <img class="h-full w-full rounded-md" src={pdpImage} alt="">
                        {/if}
                    </div>
                </div>
                <div for="header">
                    <p>Image de couverture</p>
                    <input bind:this={headerUpload} accept="image/png, image/jpeg, image/jpg, image/webp" on:change={(e)=>{setHeader(e)}} style='display:none' type="file" id="header">
                    <div class="h-48 md:w-80 w-60 bg-grey rounded-md flex justify-center items-center cursor-pointer" on:click={()=>{headerUpload.click()}}>
                        {#if headerImage == ''}
                        <Plus/>
                        {:else}
                        <img class="h-full w-full rounded-md" src={headerImage} alt="">
                        {/if}
                    </div>
                </div>
                <div>
                    <label for="facebook">
                        <p>Lien Facebook</p>
                        <input bind:value={shop.social.facebook} type="text" id="facebook" class="input-normal">
                    </label>
                    <label for="instagram">
                        <p>Lien Instagram</p>
                        <input bind:value={shop.social.instagram} type="text" id="instagram" class="input-normal">
                    </label>
                    <label for="web">
                        <p>Lien site web</p>
                        <input bind:value={shop.social.website} type="text" id="web" class="input-normal">
                    </label>
                </div>
            </div>
        </div>
        <div class="md:w-6/12 w-12/12">
            <label for="rue">
                <p>Rue</p>
                <input class="input-normal" type="text" id="rue" bind:value={shop.address.street}>
            </label>
            <label for="num">
                <p>Numéro</p>
                <input class="input-normal" type="text" id="num" bind:value={shop.address.num}>
            </label>
            <label for="cp">
                <p>Code postal</p>
                <input class="input-normal" type="text" id="pc" bind:value={shop.address.pc}>
            </label>
            <label for="city">
                <p>Ville</p>
                <input class="input-normal" type="text" id="city" bind:value={shop.address.city}>
            </label>
            <label for="phone">
                <p>Numéro de téléphone</p>
                <input class="input-normal" type="text" id="phone" bind:value={shop.phone}>
            </label>
            <label for="description">
                <p>Description</p>
                <textarea bind:value={shop.description} id="description" class="input-normal"></textarea>
            </label>
        </div>
    </div>
    <div on:click={()=>{handleUpdate()}} class="btn btn-green w-36 mx-auto mt-10">
        Sauvegarder
    </div>
    <div class="text-orange text-center mx-auto cursor-pointer mt-10" on:click={()=>{displayDelete = true}}>
        Supprimer 
    </div>
    {/if}
</section>


{#if display}
<section class="fixed right-0 top-36 2xl:block hidden">
    <ShopCard shop={shop} disabled={true}/>
</section>{/if}