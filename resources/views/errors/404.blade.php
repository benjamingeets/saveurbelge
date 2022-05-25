@php
 $title = "Page introuvable"    
@endphp
<x-layouts.half title="{{$title}}">
        <div class="w-full max-w-md p-8 mx-auto bg-white rounded-md">
            <h1 class="text-2xl">Erreur 404</h1>
            <p class="my-4">Il semblerait que vous vous soyez perdu dans les champs ...</p>
            <a class="block mx-auto text-center text-primary hover:underline" href="{{route('shop.index')}}">retour à la carte</a>
        </div>
    
</x-layouts.half>
