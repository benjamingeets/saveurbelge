<script>
import { goto } from "$app/navigation";

import Head from "$lib/Head.svelte"

    let name,subject,email,message
    let canIsend = false
    const checkIfOk = ()=>{
        if(name != '' && subject != '' && message != '' && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            canIsend = true
        }
        else{
            canIsend = false
        }
    }
    const handleClick = async ()=>{
        try{
        const req = await fetch('http://localhost:8000/contact-form',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                name,
                subject,
                message
            })
        })
        const res = await req.json()
        console.log(res)
        if(res.success){
            alert("mail envoyé")
            goto("/")
        }else{
            alert("Une erreur s'est produite")
        }
    }catch(error){
        return false
    }
    }
</script>

<Head title="Contact - SaveurBelge"/>
<main>
    <div class="w-full rounded-md h-60 bg-grey flex justify-center items-center mb-20">
        <h2>Nous contacter</h2>
    </div>

    <div class="max-w-sm mx-auto">
        <label for="name" class="w-full">
            <p>Nom*</p>
            <input bind:value={name}  on:change={()=>{checkIfOk()}} class="input-normal w-full" type="text" id="name">
        </label>
        <label for="subject" class="w-full">
            <p>Sujet*</p>
            <input bind:value={subject}  on:change={()=>{checkIfOk()}} class="input-normal w-full" type="text" id="subject">
        </label>
        <label for="email" class="w-full">
            <p>Email*</p>
            <input bind:value={email}  on:change={()=>{checkIfOk()}} class="input-normal w-full" type="text" id="email">
        </label>
        <label for="message" class="w-full">
            <p>Message*</p>
            <textarea bind:value={message} on:change={()=>{checkIfOk()}}  class="input-normal w-full" name="" id="message"></textarea>
        </label>
    </div>
    <div on:click={()=>{handleClick()}} class={`btn btn-green mt-10 w-60 mx-auto ${canIsend ? '' : 'bg-grey border-grey cursor-not-allowed'}`}>
        Envoyer
    </div>
</main>