@php
 $title = "Commerces"    
@endphp
<x-layouts.main title="Tous les commerces">
    <section class="flex-1 w-full h-full p-4 pt-10 bg-sand">
        <x-breadcrumb :items="[
            ['href'=>route('shop.index'),'label'=>'Accueil']
        ]"
        :current="$title"
        />
        <ul class="grid max-w-5xl gap-4 mx-auto mt-4 lg:gap-10 lg:grid-cols-2">
            @foreach ($shops as $shop)
            <li class="relative flex p-5 transition bg-white border border-transparent rounded-md gap-7 hover:border-primary">
                <figure class="w-12 h-12">
                    <img class="object-cover w-full h-full rounded-full " src="/storage/{{$shop->logo}}" alt="">
                </figure>
                <div class="">
                    <h2>
                        <a class="text-2xl before:absolute before:inset-0" href="{{route('shop.show',$shop->slug)}}">
                            {{$shop->name}}
                        </a>
                    </h2>
                    <span>{{$shop->title}}</span>
                    <span class="text-primary">{{$shop->city}}</span>
                </div>
            </li>
        @endforeach
        </ul>

    </section>
</x-layouts.main>