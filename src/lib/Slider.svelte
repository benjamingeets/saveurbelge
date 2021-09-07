<script>
    export let value 
	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    let bouleBase = "rounded-full w-6 h-6 transition duration-200 "
    let boule = bouleBase + "bg-grey "
    const changeValue = ()=>{
        value = !value
        if(value){
            boule = bouleBase + " bg-green ml-auto"
        }
        else{
            boule = bouleBase + " bg-grey"
        }
        dispatch('updateValue',value)
    }
    if(value){
            boule = bouleBase + " bg-green ml-auto"
        }
        else{
            boule = bouleBase + " bg-grey"
        }
</script>
<div on:click={()=>{changeValue()}} class="h-6 w-10 bg-grey-light rounded-full cursor-pointer mr-2">
    <div class={boule}>
    </div>
</div>