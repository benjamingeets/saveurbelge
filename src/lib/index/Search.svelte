<script>
import Button from "$lib/Button.svelte";

</script>
<div id="search" class="flex flex-col justify-center items-center rounded-md py-80">
    <p class="uppercase text-white text-5xl mb-10 font-bebas">Quel type de commerce cherchez-vous ?</p>
    <form class="flex justify-between bg-white p-2 rounded-md w-full max-w-3xl">
        <div class="w-6/12 bg-grey-light flex justify-between p-2 rounded-md" >
            <input class="bg-grey-light w-full" type="text" placeholder="7500 Tournai">
            <span>📍</span>
        </div>
        <select class="w-5/12 bg-grey-light rounded-md p-2 mx-2" name="" id="">
            <option value="">Secteur d'activité</option>
        </select>
        <Button>🔍</Button>
    </form>
</div>

<style>
    #search{
        background-image: url("/images/table.jpg");
    }
</style>