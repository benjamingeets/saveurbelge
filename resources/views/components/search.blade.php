<div id="search" class="fixed bottom-0 z-50 w-full transition-all lg:translate-y-0 lg:w-auto lg:top-5 lg:left-5 lg:bottom-auto" x-data="{ settings: false }">
    <div class="flex items-center gap-3 p-2 bg-white rounded-t-md lg:rounded-md">
        <figure class="hidden lg:block">
            <img class="w-10" src="/saveurbelge.svg" alt="Logo saveur belge"/>
        </figure>
        <form class="flex items-center w-full h-full border lg:rounded-md lg:w-auto">
            <input class="w-full h-full px-2" type="number"  min="0" inputmode="numeric" pattern="[0-9]*" placeholder="Code postal..">
            <button class="px-2 py-1 m-1 transition rounded-md hover:bg-gray-200">
        
                <x-icon.search/>
            </button>
        </form>
    </div>
    <x-sidepanel/>
</div>