<script>
    export let title = ""
    export let description = ""
    export let image = ""
    export let href = ""
</script>

<a href="/{href}" class="m-2 md:w-6/12 h-64 w-12/12 rounded-md text-white text-center cursor-pointer" style="background-image:url('/images/categories/{image}');background-size:cover;">
    <div class="h-full w-full px-10 rounded-md flex flex-col justify-evenly" style="background:rgba(0,0,0,0.4)">
        <h3 class="md:text-3xl text-2xl">{title}</h3>
        <hr class="bg-white">
        <p>{description}</p>
    </div>
</a>

<style>
    div h3{

        transition:all 0.5s ease-in-out;
    }
    div:hover h3{
        @apply xl:text-5xl md:text-4xl text-2xl;
        transition:all 0.3s ease-in-out;
    }
</style>

