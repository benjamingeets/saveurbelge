<script>
import { onMount } from "svelte";
import {logout} from '$lib/auth_req'
import { goto } from "$app/navigation";

    onMount(async ()=>{
        const loggedOut = await logout()
        if(loggedOut){
            goto("/connexion")
            document.location.reload()
        }
    })
</script>