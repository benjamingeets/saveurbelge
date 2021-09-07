<script>
import { onMount } from "svelte";
import { currentAdminPage } from "$lib/store";
onMount(()=>{currentAdminPage.update(n => "contact")})
</script>

<section class="w-full flex flex-col items-center justify-center">
    <div class="w-80">
        <label for="objet">
            <p>Objet</p>
            <input class="input-normal w-full" type="text" id="objet">
        </label>
    
        <label for="content">
            <p>Message</p>
            <textarea class="input-normal w-full h-40" id="content"></textarea>
        </label>
        <div class="btn btn-green mt-4">
            Envoyer
        </div>
    </div>
</section>