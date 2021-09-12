<script>
import { goto } from "$app/navigation";

import Head from "$lib/Head.svelte";
import Checked from "$lib/svg/Checked.svelte";
import { createAccount } from "$lib/user_req";
import { onMount } from "svelte";
onMount(()=>{
    if(localStorage.getItem('accessToken')){
        goto("/commercant")
    }
})
    let first_name=''
    let last_name=''
    let email=''
    let pwd=''
    let confirmpwd=''
    let isPwdLongEnough = pwd.length >= 8
    let arePwdSame = pwd == confirmpwd
    let fullFiled = first_name != '' && last_name != '' && email != '' && pwd != '' 
    const checkMail = (mail)=>{
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        else{
            return (false)
        }
    }
    let done = false
    let checkForm = () =>{
        
        isPwdLongEnough = pwd.length >= 8
        arePwdSame = pwd == confirmpwd
        fullFiled = first_name != '' && last_name != '' && email != '' && pwd != '' 
    }
    const handleClick = async ()=>{
        const res = await createAccount(email,pwd,first_name,last_name)
        
        if(res.success){
            done = true
        }
        else{
            alert(res.message)
        }
    }
</script>
<Head title="Ajouter mon commerce - SaveurBelge" lien="ajouter-mon-commerce"/>

<main>
    <div class="w-full rounded-md h-40 bg-grey flex justify-center items-center">
        <h2>Ajouter votre commerce</h2>
    </div>
    <section class="max-w-xl mx-auto">
        {#if !done}
        <p class="my-4">L'ajout d'un commerce sur SaveurBelge.be requiert la création d'un compte. Par l'intéremédiaire de ce dernier, vous pourrez gérer vos commerces et ceux ci seront disponibles après une vérification manuelle. </p>
        <p class="font-bold my-2">Vos informations</p>
        <div class="flex flex-wrap">
            <div class="md:w-6/12 w-12/12">
                <label for="lastname">
                    <p>Nom</p>
                    <input bind:value={last_name} on:input={()=>{checkForm()}} id="lastname" class="input-normal" type="text">
                </label>
                <label for="email">
                    <p>e-mail</p>
                    <input bind:value={email} on:input={()=>{checkForm()}}  id="email" class="input-normal" type="text">
                </label>
                
            </div>
            <div class="md:w-6/12 w-12/12">
                <label for="firstname">
                    <p>Prénom</p>
                    <input bind:value={first_name} on:input={()=>{checkForm()}} id="firstname" class="input-normal" type="text">
                </label>
                <label for="pwd">
                    <p>Mot de passe</p>
                    <small>Min. 8 caractères</small>
                    <input bind:value={pwd} on:input={()=>{checkForm()}} id="pwd" class="input-normal" type="password">
                </label>
                <label for="confirm">
                    <p>Confirmer</p>
                    <input bind:value={confirmpwd} on:input={()=>{checkForm()}} id="confirm" class="input-normal" type="password">
                </label>
            </div>
        </div>
        <div on:click={()=>{handleClick()}} class={`btn btn-green w-60 my-10 mx-auto ${fullFiled && isPwdLongEnough && arePwdSame && checkMail(email) ? '' : 'bg-grey border-grey cursor-not-allowed'}`}>
            Créer mon compte
        </div>
        {:else}
            <div class="flex flex-col items-center my-6 text-center">
                <Checked size={100} color={"#7EA172"}/>
                <h2 class="text-noir">Félicitations! </h2>
            <p>Votre compte a bien été créé. Un mail avec un lien de confirmation va vous êtes envoyé sous peu!</p>
            <small>Vous ne l'avez pas reçu? 😅 <a class="text-green-light" href="#">Cliquez ici pour en demander un nouveau</a></small>
            </div>
        {/if}
    </section>
</main>