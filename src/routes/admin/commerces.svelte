<script>
import { onMount } from "svelte";
import {currentAdminPage} from "$lib/store.js"

onMount(()=>{currentAdminPage.update(n => "commerces")})
</script>