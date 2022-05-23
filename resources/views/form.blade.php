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
        <form enctype="multipart/form-data" class="flex flex-col gap-4 px-4 mx-auto mb-10 bg-white rounded-md md:p-8 md:max-w-md" action="{{ route('shop.store') }}" method="POST"
            >
            @csrf
            <h1 class="text-2xl text-title">Inscription</h1>
            <x-input.text :required="true" label="Nom de votre établissement" name="name" />
            <x-input.text :required="true" label="Intitulé" name="title"
                placeholder="commerce, restaurant, producteur de fruits,..." />
            <x-input.text :required="true" label="Adresse" name="street"
                placeholder="52, rue saint-martin" />
            <x-input.text :required="true" label="Ville" name="city" placeholder="Tournai" />
            <x-input.file :required="true" label="Logo (Max 2mb)" name="logo" />
            <x-input.textarea label="Description" name="description" />
            <x-input.text label="Numéro de téléphone" name="phone" />
            <x-input.text label="Site internet" name="website"
                placeholder="https://monsite.be" />
            <x-input.text :required="true" classes="col-span-6" label="Votre adresse email" name="email"
                placeholder="sample@gmail.com" />
            <x-input.checkbox label="Mon établissement vend des produits bios" name="is_bio" />
            <x-input.checkbox label="Mon établissement vend ce que je produis"
                name="is_productor" />
            <x-input.checkbox label="Mon établissement accepte une monnaie locale"
                name="accept_local_currency" />

            <div class="flex flex-col items-center justify-center col-span-12 my-8">
                <button class="px-4 py-2 text-white transition rounded-md bg-primary hover:bg-primary-light">Ajouter
                    mon établissement</button>
            </div>
        </form>
    
</x-layouts.half>
