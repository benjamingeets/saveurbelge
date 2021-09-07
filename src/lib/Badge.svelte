<script>
    export let texte = "?"
</script>

<div class="mx-1 flex justify-center">
    <span>
        <slot></slot>
    </span>
    <p class="absolute -mt-36 bg-white border w-32 h-32 rounded-md flex justify-center items-center text-center">{texte} <span class="border-r border-b h-2 w-2 absolute -mb-32 rotate-45 bg-white"></span> </p>
    
</div>

<style>
    p{
        opacity: 0%;
        transition: ease-in-out 0.2s;
    }
    span:hover ~ p{
        opacity: 100%;
        transition: ease-in-out 0.2s;
    }
</style>