<script>
    import { onMount } from "svelte";
    import { currentAdminPage } from "$lib/store";
    import { getUserInformations,updateUserInformations } from "$lib/user_req";
    import Edit from "$lib/svg/Edit.svelte";
    let user
    let display = false
    let message = ""
    let initialValue = {}
    onMount(async()=>{
        currentAdminPage.update(n => "informations")
        user = await getUserInformations()
        initialValue = {
            ...user
        }
        display = true
    })
    const handleUpdate = async ()=>{
        let query = {}
        if(user.first_name != initialValue.first_name) query.first_name = user.first_name
        if(user.last_name != initialValue.last_name) query.last_name = user.last_name
        if(query.first_name || query.last_name){
            message = "Vos informations ont bien été mises à jour."
        }
        if(user.email != initialValue.email){
            query.email = user.email
            message = message + '<br> Nous avons envoyé un lien de confirmation à votre nouvelle adresse email'
        }
        const oui = await updateUserInformations(query)
    }
</script>
{#if display}
    <section class="mx-auto max-w-xl w-full flex flex-col items-center">
        <h2>Mes informations</h2>
        <p class="my-2 px-4 text-center">{@html message}</p>
        <div class="flex flex-wrap">
            <div class="lg:w-6/12 w-12/12 lg:px-0 px-2">
                <label for="lastname">
                    <p>Nom</p>
                    <input class="border rounded-md py-2 px-4 w-full"  type="text" bind:value={user.last_name} id="lastname">
                </label>
                <label for="firstname">
                    <p>Prénom</p>
                    <input class="border rounded-md py-2 px-4 w-full"  type="text" bind:value={user.first_name} id="firstname">
                </label>
            </div>
            <div class="lg:w-6/12 w-12/12 lg:pl-4 px-2">
                <label class="w-full" for="email">
                    <p>Email</p>
                    <input  class="border rounded-md py-2 px-4 w-full" type="text" bind:value={user.email} id="email">
                </label>
                <label for="pwd">
                    <p>Mot de passe</p>
                    <div class="flex justify-between items-center"><input class="border rounded-md py-2 px-4 w-9/12" type="password" value="*********" disabled> <a href="/commercant/edit-password" class="w-3/12 flex justify-center cursor-pointer"><Edit></Edit></a></div>
                </label>
            </div>
        </div>
            <div on:click={()=>{handleUpdate()}} class="btn btn-green mt-4">Sauvegarder</div>

    </section>
    
{/if}