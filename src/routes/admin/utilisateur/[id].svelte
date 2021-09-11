<script context='module'>
    // @ts-nocheck
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
import { goto } from "$app/navigation";
    import {currentAdminPage} from "$lib/store.js"


import { deleteUserById, getShopsFromUserId, getUser, updateUserById } from "$lib/admin_req";
import ShopCard from "$lib/ShopCard.svelte";
import { onMount } from "svelte";
let user={}
let shops 
let display = false
export let id
let inscription,maj
    onMount(async()=>{
        currentAdminPage.update(n => "")
        user = await getUser(id)
        shops = await getShopsFromUserId(id)
        shops.sort((a,b)=>{
            return a.status - b.status
        })
        console.log(shops)
        display = true
        inscription = new Date(user.createdAt).toLocaleDateString('fr')
        maj = new Date(user.updatedAt).toLocaleDateString('fr')
    })
    const handleSaveButton = async () =>{
        const res = await updateUserById(user)
        if(res){
            alert(res.message)
            goto("/admin")
        }
    }
    let displayDelete = false
    const handleDeleteButton = async () =>{
        displayDelete = true
    }
    const deleteUser = async () =>{
        const res = await deleteUserById(user._id)
        if(res){
            alert(res.message)
            goto("/admin")
        }
    }
</script>

<div>
    {#if displayDelete}
    <div>
        <div class="fixed top-0 left-0 w-screen h-screen bg-grey bg-opacity-80 flex justify-center items-center z-20 px-2">
            <div class="bg-white w-full max-w-xl h-80 rounded-md p-4 text-center">
                <h5 class="text-center my-10 font-bebas text-3xl">Attention</h5>
                <p>Voulez-vous vraiment supprimer ce compte ({user.first_name} {user.last_name})?</p>
                <small>Cette action est irréversible</small>
                <div class="flex justify-center">
                    <div on:click={()=>{deleteUser()}} class="btn btn-green-outline my-2 mx-4">Confirmer</div>
                    <div on:click={()=>{displayDelete = false}} class="btn btn-green my-2 mx-4">Annuler</div>
                </div>
            </div>
        </div>
    </div>
    {/if}

{#if display}
    <div class="flex flex-wrap">
        <div class="w-3/12">
            <h2 class="text-left text-noir">Utilisateur</h2>
            <label for="last_name">
                <p>Nom</p>
                <input class="input-normal" bind:value={user.last_name} type="text">
            </label>
            <label for="first_name">
                <p>Prénom</p>
                <input class="input-normal" bind:value={user.first_name} type="text">
            </label>
            <label for="email">
                <p>Mail</p>
                <input class="input-normal" bind:value={user.email} type="text">
            </label>
            <label for="status">
                <p>Status</p>
                <select bind:value={user.status} name="" id="" class="input-normal">
                    <option value={0}>Non validé</option>
                    <option value={1}>Validé</option>
                    <option value={5}>Admin</option>
                </select>
            </label>
            <label for="shopsLimit">
                <p>Nombre de shops max</p>
                <input type="number" bind:value={user.shopsLimit} class="input-normal">
            </label>
        </div>
        <div class="w-3/12">
            <h2>.</h2>
            <label for="motivation">
                <p>Notes</p>
                <textarea bind:value={user.notes} name="" id="" class="input-normal"></textarea>
            </label>
        </div>
        <div class="w-6/12">
            <h2 class="text-left text-noir">Informations</h2>
            <p class="text-grey-dark">Date d'inscription</p>
            <p class="ml-2">{inscription}</p>
            <hr class="my-2">
            <p class="text-grey-dark">Dernière mise à jour</p>
            <p class="ml-2">{maj}</p>
            <hr class="my-2">
            <p class="text-grey-dark">ID</p>
            <p class="ml-2">{user._id}</p>
            <div on:click={()=>{handleDeleteButton()}} class="btn btn-red-outline w-56 text-center mt-4">Supprimer ce compte</div>
        </div>
        <div class="w-full mt-4 flex">
            <div on:click={()=>{handleSaveButton()}} class="btn btn-green">Sauvegarder</div>
        </div>
        <div class="w-full">
            <h2 class="text-left text-noir">Commerces ({shops.length}) </h2>
            <div class="flex flex-wrap">
                {#if shops.length == 0}
                    <p>Cet utilisateur n'a pas de commerce</p>
                {/if}
                {#each shops as shop}
                    {#if shop.status == 0}
                        <ShopCard on:click={()=>{goto(`/admin/shop/${shop._id}`)}} buttonText="Modifier" dispatchMode={true} shop={shop}/>
                    {:else}
                        <ShopCard on:click={()=>{goto(`/admin/shop/${shop._id}`)}} buttonText="Modifier" dispatchMode={true} shop={shop}/>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
{/if}
</div>