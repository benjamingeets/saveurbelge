<script>
    export let progress = 0
const bouleOrange = "bg-orange rounded-full h-4 w-4"
const bouleGrise = "bg-grey rounded-full h-4 w-4"
const ligneOrange = "w-20 h-1 bg-orange"
const ligneGrise = "w-20 h-1 bg-grey"
const texte = "absolute -mt-10 text-grey-dark"
</script>


<div class="flex items-center justify-center my-20">
    <div class="flex justify-center">
        {#if progress == 0}<p class={texte}>Motivations</p>{/if}
        <div class={bouleOrange}></div>
    </div>
    <div class={progress >0 ? ligneOrange : ligneGrise}></div>
    <div class="flex justify-center">
        {#if progress ==1}<p class={texte}>Commerce</p>{/if}
        <div class={progress > 0 ? bouleOrange : bouleGrise}></div>
    </div>

    <div class={progress >1 ? ligneOrange : ligneGrise}></div>
    <div class="flex justify-center">
        {#if progress ==2}<p class={texte}>Options</p>{/if}
        <div class={progress > 1 ? bouleOrange : bouleGrise}></div>
    </div>

    <div class={progress >2 ? ligneOrange : ligneGrise}></div>
    <div class="flex justify-center">
        {#if progress ==3}<p class={texte}>Description</p>{/if}
        <div class={progress > 2 ? bouleOrange : bouleGrise}></div>
    </div>

    <div class={progress >3 ? ligneOrange : ligneGrise}></div>
    <div class="flex justify-center">
        {#if progress ==4}<p class={texte}>Terminé</p>{/if}
        <div class={progress > 3 ? bouleOrange : bouleGrise}></div>
    </div>
</div>