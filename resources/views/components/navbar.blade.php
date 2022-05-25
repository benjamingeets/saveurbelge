<div class="flex justify-between px-5 py-3 bg-white">
    <figure class="relative inline-flex items-center gap-5">
        <img src="/saveurbelge.svg" class=" w-11 h-11" alt="">
        <a class="before:absolute before:inset-0" href="{{ route('shop.index') }}">
            <h1 class="text-2xl font-title">
                SaveurBelge
            </h1>
        </a>
    </figure>
    <a class="flex items-center justify-center p-2 text-white transition rounded-md hover:bg-primary-light bg-primary"
        href="{{ route('shop.create') }}">
        <svg xmlns="http://www.w3.org/2000/svg" width="30"
            height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="6" cy="19" r="2" />
            <circle cx="17" cy="19" r="2" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
            <path d="M15 6h6m-3 -3v6" />
        </svg>
        <span class="hidden ml-2 md:block">
            Ajouter mon commerce
        </span>
    </a>

</div>
