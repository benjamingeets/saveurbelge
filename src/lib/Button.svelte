<script>
    export let color = "green"
    export let outline = false
    export let href = "#"
    export let target = ""
    let classButton = "rounded-md border-2 px-3 py-2 transition duration-300 ease-in-out"
</script>


{#if outline}
      {#if color=="green"}
        <a target="{target}" href="{href}" class="{classButton} border-green text-green hover:bg-green-light hover:border-green-light hover:text-white">
            <slot/>
        </a>  
      {:else if color == "red"}
         <a target="{target}" href="{href}" class="{classButton} border-red text-red hover:bg-red hover:text-white">
            <slot/>
        </a>  
      {/if}
{:else}
        {#if color =="green-light"}
        <a target="{target}" href="{href}" class="{classButton} border-green-light bg-green-light text-white">
            <slot/>
        </a>  
        {:else if color=="green"}
        <a target="{target}" href="{href}" class="{classButton} border-green bg-green text-white">
            <slot/>
        </a>  
        {:else if color="red"}
        <a target="{target}" href="{href}" class="{classButton} border-red bg-red text-white">
            <slot/>
        </a>  
        {/if}
{/if}