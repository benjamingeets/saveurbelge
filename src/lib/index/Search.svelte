<script>
import Button from "$lib/Button.svelte";
import Magnifier from "$lib/svg/Magnifier.svelte";
import Pointer from "$lib/svg/Pointer.svelte";

</script>
<section id="search" class="flex px-4 flex-col justify-center items-center rounded-md lg:py-80 py-40">
    <p class="uppercase text-white text-5xl mb-10 font-bebas">Quel type de commerce cherchez-vous ?</p>
    <form class="flex lg:flex-row flex-col justify-between bg-white p-2 rounded-md w-full max-w-3xl">
        <div class="lg:w-6/12 w-full bg-grey-light flex justify-between p-2 rounded-md" >
            <input class="bg-grey-light w-full" type="text" placeholder="7500 Tournai">
            <span><Pointer/></span>
        </div>
        <select class="lg:w-5/12 lg:my-0 my-2 w-full bg-grey-light rounded-md p-2 lg:mx-2" name="" id="">
            <option value="">Secteur d'activité</option>
        </select>
        <Button><span class="block w-full flex justify-center"><Magnifier></Magnifier></span></Button>
    </form>
</section>

<style>
    #search{
        background-image: url("/images/table.jpg");
    }
</style>