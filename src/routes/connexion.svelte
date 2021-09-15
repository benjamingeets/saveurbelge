<script>
import Head from "$lib/Head.svelte";
import Eye from "$lib/svg/Eye.svelte";
import {goto} from '$app/navigation'
import {login} from '$lib/auth_req'
import { onMount } from "svelte";
import { getLostPwd } from "$lib/user_req";
import {page} from '$app/stores'
import Checked from "$lib/svg/Checked.svelte";
let code = $page.query.get('code')
let next = $page.query.get('next')
let title = 'Se connecter'
if(code && next){
    title = "valider votre compte"
}
let mail =""
let pwd = ""
let displayPwd = false
let lostPwd = false
let message ='Quelle est votre adresse email?'
let error = ''
const showPwd = () =>{
        displayPwd = !displayPwd
}
onMount(()=>{
    if(localStorage.getItem("accessToken")){
        if(parseInt(localStorage.getItem('status'))>=5){
            goto('/admin')
        }
        else{
            goto('/commercant')
        }
    }
})
const handleLogin = async () =>{
    const log = await login(mail,pwd)
    if(log){
        if(next && code){
            goto(`/${next}?code=${code}`)
        }
        else{
            if(parseInt(localStorage.getItem('status'))>=5){
                goto('/admin')
            }
            else{
                goto('/commercant')
            }
        }
    }
    else{
        error = 'Identifiants incorrects'
    }
}

let requestSend = false
const lostPassword = async ()=>{
   const req = await getLostPwd(mail)
   message = req.message
   console.log(req)
   if(req.success){
    requestSend = true
   }
}
</script>
<Head title="Connexion - SaveurBelge" lien="connexion"></Head>
<main class="rounded-md md:py-40 py-16 mb-10 px-2">
    <div class="bg-white max-w-md mx-auto rounded-md md:py-20 py-8 px-4">
        {#if !lostPwd}
            <h2 class="text-noir">{title}</h2>
            <p class="text-center text-orange">{error}</p>
            <form action="" class="flex flex-col mx-auto md:w-8/12 px-2">
                <label for="mail flex flex-col">
                    <p class="text-grey-dark">Mail</p>
                    <input bind:value={mail} id="mail" class="border rounded-md px-4 py-2 w-full" type="text">
                </label>
                <label for="pwd">
                    <p class="text-grey-dark">Mot de passe</p>
                    <span class="flex border rounded-md px-4 py-2">
                        {#if !displayPwd}<input bind:value={pwd} class="w-full" type="password" id="pwd">{/if}
                        {#if displayPwd}<input bind:value={pwd} class="w-full" type="text" id="pwd">{/if}
                        <span on:mousedown={()=>{showPwd()}} on:mouseup={()=>{showPwd()}} class="cursor-pointer"><Eye></Eye></span>
                    </span>
                </label>
            </form>
            <p on:click={()=>{lostPwd = true}} class="text-orange underline text-center cursor-pointer mt-8 mb-8">Mot de passe oublié</p>
            <div class="w-full flex my-4">
                <span on:click={()=>{handleLogin()}} class="btn btn-green mx-auto">
                    Se connecter
                </span>  
            </div>
        {:else}
            <h2 class="text-noir">Mot de passe oublié</h2>
            <div class="flex flex-col items-center">
                {#if requestSend}<div><Checked size={80} color="#7EA172"/></div>{/if}
                <p class="text-center mt-4 mb-10">{message}</p>
                <label for="mail">
                    <p>Mail</p>
                    <input class="input-normal" bind:value={mail} type="text">
                </label>
                <div on:click={()=>lostPassword()} class="btn btn-green my-4">Envoyer</div>
                <p class="text-orange underline cursor-pointer" on:click={()=>{lostPwd = false}}>Annuler</p>
            </div>
        {/if}
    </div>
</main>

<style>
    main{
        background-image: url("/images/se_connecter.webp");
        background-size: cover;
    }
</style>