<script>
// @ts-nocheck

import { onMount } from "svelte";
import {currentUserPage} from '$lib/store'
import Slider from '$lib/Slider.svelte'
import ProgressBar from "$lib/addShop/ProgressBar.svelte";
import ShopCard from "$lib/ShopCard.svelte";
import Plus from "$lib/svg/Plus.svelte";
import {createShop} from "$lib/user_req"
import { goto } from "$app/navigation";
import slugify from 'slugify'
import {getShopFromSlug} from '$lib/public_req'
import {DOMAIN} from "$lib/env.js"
let categories,pdpUpload,headerUpload
let images 
let logo =""
let headerImage = ''
let progress = 0

let shop = {
    name:'',
    sector:"restaurant",
    description:'',
    categories:[],
    address:{
        num:'',
        street:'',
        pc:'',
        city:''
    },
    options:{
        monnaie:false,
        local:true,
        bio:false
    },
    phone:'',
    motivation:'',
    social:{
        instagram:'',
        facebook:'',
        website:''
    }
}

let nameFree = true
let atLeastOneCategory = false

onMount(async()=>{
        currentUserPage.update(n => "")
        const categoriesRes = await fetch(`${DOMAIN}/api/get-categories`)
        categories = await categoriesRes.json()
})

const checkIfNameIsFree = async () =>{
    const res = await getShopFromSlug(slugify(shop.name,{lower:true}))
    if(res.success){
        nameFree = false
    }else{
        nameFree = true
    }
}

const checkIfCategories = async () =>{
    categories.forEach(e=>{
        if(e.value){
            atLeastOneCategory = true
        }
        atLeastOneCategory  = false
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
        logo = e.target.result
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

const handleCreateShop = async ()=>{
    categories.forEach(e=>{
        if(e.value === true){
            shop.categories.push(e.name)
        }
    })
    if(shop.categories.length<= 0){
        alert("Sélectionnez au moins 1 catégorie")
        progress = 2
        return
    }

    const end = await createShop(shop,images)
    if(end.status){
        goto("/commercant")
    }
    else{
        shop.categories = []
        alert(end.message)
    }
}
</script>

<section class="max-w-3xl w-full mx-auto p-2">
    <h2>Ajouter votre commerce</h2>
    <div class="hidden md:block"><ProgressBar progress={progress}/></div>
    <div class="px-4">
        {#if progress == 0}
        <p>Afin de répondre au mieux aux attendes de nos visiteurs, nous effectuons un tri sur les inscriptions. C'est pourquoi nous vous demandons quelle est la motivation de votre commerce/restaurant/...</p>
        <textarea bind:value={shop.motivation} class="border rounded-md mt-4 w-full h-40" name="" id=""></textarea>
        {:else if progress ==1}
        <h3 class="text-2xl">Informations relatives à votre commerce</h3>
        <div class="w-full flex mt-4">
            <div class="md:w-6/12 w-12/12">
                <label for="name">
                    <p>Nom</p>
                    <input class="input-normal" type="text" id="name" bind:value={shop.name} on:change={()=>{checkIfNameIsFree()}}>
                    
                </label>
                {#if !nameFree}
                        <small class="block">Ce nom est déjà utilisé 🚫</small>
                    {/if}
                <p>Secteur d'activité</p>
                <select class="input-normal" name="" id="" bind:value={shop.sector} on:change={()=>{categories.forEach(e=>{e.value = false})}}>
                    <option value="restaurant" default>Restaurant/Bar</option>
                    <option value="commerce">Commerce</option>
                </select>
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
            </div>
            <div class="hidden md:block w-6/12">
                <h3 class="text-center">Prévisualisation</h3>
                <ShopCard shop={shop} disabled={true}/>
            </div>
        </div>
        {:else if progress ==2}
        <div class="flex">
            <div class="md:w-6/12 w-12/12">
                <p>Catégories: (min. 1)</p>
                {#each categories as category}
                    {#if category.sector == shop.sector}
                        <label class="block" for={category.name}><input bind:checked={category.value} type="checkbox" class="mr-2" name="" id={category.name}>{category.name}</label>
                    {/if}
                {/each}
                <div>
                    <span class="flex items-center my-2"><Slider on:updateValue={(event)=>{shop.options.monnaie = event.detail}} value={shop.options.monnaie}/>Monnaie locale (Yar, SolAToi,...)</span>
                    <span class="flex items-center my-2"><Slider on:updateValue={(event)=>{shop.options.local = event.detail}} value={shop.options.local}/>Vous êtes producteur</span>
                    <span class="flex items-center my-2"><Slider on:updateValue={(event)=>{shop.options.bio = event.detail}} value={shop.options.bio}/>Vos produits sont essentiellement bio</span>
                </div>
            </div>
            <div class="hidden md:block  w-6/12">
                <h3 class="text-center">Prévisualisation</h3>
                <ShopCard shop={shop} disabled={true}/>
            </div>
        </div>
        {:else if progress ==3}
        <div class="flex">
            <div class="md:w-6/12 w-12/12">
                <p>Description</p>
                <textarea class="input-normal w-full h-40" name="" id="" bind:value={shop.description}></textarea>
                <small>Cette description sera affichée en entier sur la page dédiée à votre commerce.</small>
            </div>
            <div class=" hidden md:block w-6/12">
                <ShopCard shop={shop} disabled={true}/>
            </div>
        </div>
        {:else if progress ==4}
        <div class="flex">
            <div class="md:w-6/12 w-12/12">
                <div for="pdp">
                    <p>Logo de votre commerce</p>
                    <input bind:this={pdpUpload} style='display:none' accept="image/png, image/jpeg, image/jpg, image/webp"  on:change={(e)=>{setPdp(e)}} type="file" name="" id="pdp">
                    <div class="h-32 w-32 bg-grey rounded-md flex justify-center items-center cursor-pointer" on:click={()=>{pdpUpload.click()}}>
                        {#if logo == ''}
                        <Plus/>
                        {:else}
                        <img class="h-full w-full rounded-md" src={logo} alt="">
                        {/if}
                    </div>
                </div>
                <div for="header">
                    <p>Image de couverture</p>
                    <input bind:this={headerUpload} accept="image/png, image/jpeg, image/jpg, image/webp" on:change={(e)=>{setHeader(e)}} style='display:none' type="file" id="header">
                    <div class="h-48 md-60 md:w-80 bg-grey rounded-md flex justify-center items-center cursor-pointer" on:click={()=>{headerUpload.click()}}>
                        {#if headerImage == ''}
                        <Plus/>
                        {:else}
                        <img class="h-full w-full rounded-md" src={headerImage} alt="">
                        {/if}
                    </div>
                </div>
                <label for="facebook">
                    <p>Lien de votre page Facebook</p>
                    <input bind:value={shop.social.facebook} class="input-normal" type="text" id="facebook">
               
                </label>
                <label for="instagram">
                    <p>Votre compte Instagram (nom d'utilisateur)</p>
                    <input bind:value={shop.social.instagram} class="input-normal" type="text" id="instagram">
                </label>
                <label for="website">
                    <p>Lien de votre site internet (commençant par https:// ou http://)</p>
                    <input bind:value={shop.social.website} class="input-normal" type="text" id="website">
                </label>
            </div>
            <div class="hidden md:block w-6/12">
                <ShopCard headerImage={headerImage} shop={shop} disabled={true}/>
            </div>    
        </div>
        {/if}
    </div>
    <div class="flex justify-between mt-10">
        {#if nameFree}
        <div class="btn btn-green-outline" on:click={()=>{if(progress >0){progress--}}}>Précédent</div>
        {:else}
        <div class="btn border-grey text-grey-light cursor-not-allowed">Précédent</div>
        {/if}
        {#if progress < 4 && nameFree}
        <div class="btn btn-green" on:click={()=>{if(progress <4){progress++}}}>Suivant</div>
        {:else if progress === 4}
            <div on:click={()=>{handleCreateShop()}} class="btn btn-green {shop.ca} ">Terminer</div>
        {:else}
            <div class="btn btn-green border-grey bg-grey cursor-not-allowed">Suivant</div>
        {/if}
    </div>
</section>