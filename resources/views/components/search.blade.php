<div id="search" class="fixed bottom-0 z-50 w-full transition-all lg:absolute lg:translate-y-0 lg:w-auto lg:top-5 lg:left-5 lg:bottom-auto" x-data="{ settings: false }">
    <div class="flex items-center gap-3 p-2 bg-white rounded-t-md lg:rounded-md">
        <form class="flex items-center w-full h-full border focus-within:outline-1 focus-within:outline focus-within:outline-primary lg:rounded-md lg:w-auto">
            <input class="w-full h-full px-2 focus:outline-none" type="number"  min="0" inputmode="numeric" pattern="[0-9]*" placeholder="Code postal..">
            <button class="px-2 py-1 m-1 transition rounded-md hover:bg-gray-200">
        
                <x-icon.search/>
            </button>
        </form>
    </div>
    <x-sidepanel/>
</div>