<script>
    import { onMount } from "svelte";
    import {currentAdminPage} from "$lib/store.js"
    onMount(async()=>{
        currentAdminPage.update(n => "")
        users = await getUsers()
        display = true
        })
import { getUsers } from "$lib/admin_req";
    let users
    let display = false
    onMount(async()=>{
        currentAdminPage.update(n => "")
        users = await getUsers()
        display = true
        })
</script>

<div>
    {#if display}
        {#each users as user}
            <a href={`/admin/utilisateur/${user._id}`} class="flex justify-between border my-2 rounded-md p-2 max-w-3xl w-full hover:bg-grey-light">
                <div>
                    👨‍🌾 {user.first_name} {user.last_name}
                </div>
                <div>
                    <span>
                        {#if user.status == 0}
                        <span class="rounded-full bg-grey px-2 text-white">Non validé</span>
                       {:else if user.status == 1}
                       <span class="rounded-full text-white bg-green px-2">Validé</span>
                       {:else if user.status == 5}
                        <span class="rounded-full text-white bg-orange px-2">Admin</span>
                       {:else}
                        Erreur
                       {/if}
                        • {user.shops.length}/{user.shopsLimit} 🌽</span>
                </div>
            </a>
        {/each}
    {/if}
</div>