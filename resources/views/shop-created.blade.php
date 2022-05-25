@php
 $title = "Ajouter mon établissement"    
@endphp
<x-layouts.half title="{{$title}}">
        <x-breadcrumb :items="[
            ['href'=>route('shop.index'),'label'=>'Accueil']
        ]"
        :current="$title"
        classes="absolute left-5 top-10"
        />
        <div class="w-full max-w-md p-8 mx-auto bg-white rounded-md">
            <h1 class="text-2xl">Inscription</h1>
            <p class="my-4">Votre commerce a bien été créé, il sera bientôt disponible sur la carte.</p>
            <a class="block mx-auto text-center text-primary hover:underline" href="{{route('shop.index')}}">retour à la carte</a>
        </div>
    
</x-layouts.half>
