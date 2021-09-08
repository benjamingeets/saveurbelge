<script>
    import { goto } from '$app/navigation';
    import {page} from '$app/stores'
    import { refreshAccessToken } from '$lib/auth_req';
    import Head from '$lib/Head.svelte';
    import Eye from '$lib/svg/Eye.svelte';
    import { setLostPwd } from '$lib/user_req';
    import { onMount } from 'svelte';
    let code = $page.query.get('code')
    let mail = $page.query.get('mail')
    let pwd = ''
    let message=""
    let confirm=""
    let displayPwd = false
    const showPwd = () =>{
        displayPwd = !displayPwd
    }
    if(mail == null){
        goto("/connexion")
    }
    const handleClick = async ()=>{
        if(pwd == confirm && pwd.length >= 8 && confirm != ''){
            const res = await setLostPwd(mail,code,pwd)
            alert(res.message)
            if(res.message = 'mot de passe mis à jour'){
                goto("/connexion")
            }
        }
        
    }
</script>


<Head title="Mot de passe oublié - SaveurBelge" noindex={true}/>
<main class="mt-10">
    <div class="max-w-sm mx-auto">
        <h2>{mail}</h2>
        <p class="text-center my-4">Mot de passé oublié</p>
        <label for="pwd">
            <p>Mot de passe</p>
            <small>Min. 8 caractères</small>
            <span class="flex border rounded-md px-4 py-2">
                {#if !displayPwd}<input bind:value={pwd} class="w-full" type="password" id="pwd">{/if}
                {#if displayPwd}<input bind:value={pwd} class="w-full" type="text" id="pwd">{/if}
                <span on:mousedown={()=>{showPwd()}} on:mouseup={()=>{showPwd()}} class="cursor-pointer"><Eye></Eye></span>
            </span>
        </label>
        <label for="confir=">
            <p>Confirmation du mot de passe</p>
            <input bind:value={confirm} class="input-normal w-full" type="password">
        </label>
        {#if pwd != confirm && pwd.length >= 8 && confirm != ''}
            <p class="text-orange text-center my-4">Les mots de passe ne correspondent pas</p>
        {/if}
        <div on:click={()=>{handleClick()}} class={`btn btn-green class w-40 mx-auto my-10 ${pwd == confirm && pwd.length >= 8 ? '' : 'bg-grey border-grey cursor-not-allowed'} `}>
            Confirmer
        </div>
    </div>
</main>