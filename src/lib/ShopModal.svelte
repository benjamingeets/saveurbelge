<script>
import { onDestroy, onMount } from "svelte";

import Presentation from "./commerce/Presentation.svelte";
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

    export let shop = {
        name:"Sample name",
        slug:'sample-name',
        _id:'',
    }
    onMount(()=>{
        document.querySelector("body").style.overflow="hidden"
    })
    onDestroy(()=>{

        document.querySelector("body").style.overflow="auto"
    })

</script>

<div class="h-screen w-screen bg-grey-light bg-opacity-50 fixed z-20 top-0 left-0 flex justify-center md:pt-10 md:pb-10" on:click>
    <Presentation on:close={()=>{dispatch('close')}} shop={shop} modal={true}/>
</div>