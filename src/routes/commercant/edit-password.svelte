<script>
import { onMount } from "svelte";
import { currentAdminPage } from "$lib/store";
import { updatePwd } from "$lib/user_req";

let currentPwd =''
let newPwd =''
let confirmPwd =''
let message = ''
onMount(async()=>{
        currentAdminPage.update(n => "informations")
})
const handleClick = async()=>{
    const res = await updatePwd(currentPwd,newPwd)
    message = res.message
}
</script>

<section class="flex justify-center items-center w-full">
<div class="flex flex-col">
    <p>{message}</p>
    {#if message != 'Mot de passe mis à jour'}
        <label for="oldmdp">
            <p>Mot de passe actuel</p>
            <input class="input-normal" bind:value={currentPwd} type="password" id="oldmdp" required>
        </label>
        <label for="newmdp flex flex-col">
            <p>Nouveau mot de passe </p>
            <input class="input-normal" bind:value={newPwd} type="password" id="newmdp" required>
        </label>
        <small>(Min. 8 caractères)</small>
        <label for="confirmmdp">
            <p>Confirmer votre mot de passe</p>
            <input class="input-normal" bind:value={confirmPwd} type="password" id="confirmmdp" required>
        </label>
        {#if newPwd === confirmPwd && newPwd != '' && confirmPwd != '' && currentPwd != '' && newPwd.length >= 8} 
            <div on:click={()=>{handleClick()}} class="btn btn-green w-8/12 mx-auto mt-4" >
                Confirmer
            </div>
        {:else}
            <div class="btn btn-green bg-grey border-grey w-8/12 mx-auto mt-4 cursor-not-allowed" disabled>
                Confirmer
            </div>
        {/if}
            <a href="/commercant/informations" class="btn btn-green-outline w-8/12 text-center mt-4 mx-auto">
                Retour
            </a>
    {:else}
            <a href="/commercant/informations" class="btn btn-green">Retour</a>
    {/if}
</div>
</section>