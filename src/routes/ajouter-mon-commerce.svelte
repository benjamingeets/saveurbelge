<script>
import { goto } from "$app/navigation";

import Head from "$lib/Head.svelte";
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
    let checkForm = () =>{
        
        isPwdLongEnough = pwd.length >= 8
        arePwdSame = pwd == confirmpwd
        fullFiled = first_name != '' && last_name != '' && email != '' && pwd != '' 
    }
    const handleClick = async ()=>{
        const res = await createAccount(email,pwd,first_name,last_name)
        alert(res.message)
    }
</script>
<Head title="Ajouter mon commerce - SaveurBelge"/>

<main>
    <div class="w-full rounded-md h-40 bg-grey flex justify-center items-center">
        <h2>Ajouter votre commerce</h2>
    </div>
    <section class="max-w-xl mx-auto">
        <p>blablab la gentil</p>
        <p>Vos informations</p>
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
    </section>
</main>