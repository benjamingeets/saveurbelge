@php
$title = 'Ajouter mon établissement';
if(Route::currentRouteName() == 'shop.edit'){
    $title = "Mise à jour";
}
@endphp

<x-layouts.half title="{{ $title }}">
    <x-breadcrumb :items="[['href' => route('shop.index'), 'label' => 'Accueil']]" :current="$title" classes="absolute left-5 top-10" />
    <form enctype="multipart/form-data"
        class="flex flex-col gap-4 px-4 mx-auto mb-10 bg-white rounded-md mt-28 md:p-8 md:max-w-md" action="@if (Route::currentRouteName() == 'shop.edit') {{ route('shop.update', $shop->slug) }}
                @else
                {{ route('shop.store') }} @endif
        " method="POST">
        @csrf
        <h1 class="text-2xl text-title">
            @if (Route::currentRouteName() == 'shop.edit')
                Mise à jour
            @else
                Inscription
            @endif
        </h1>
        <x-input.text :value="!empty($shop->name) ? $shop->name : ''" :required="true" label="Nom de votre établissement" name="name" />
        <x-input.text :value="!empty($shop->title) ? $shop->title : ''" :required="true" label="Intitulé" name="title"
            placeholder="commerce, restaurant, producteur de fruits,..." />
        @error('address')
            <div class="text-red-700 underline ">{{ $message }}</div>
        @enderror
        <x-input.text :value="!empty($shop->street) ? $shop->street : ''" :required="true" label="Adresse" name="street"
            placeholder="52, rue saint-martin" />
        <x-input.text :value="!empty($shop->city) ? $shop->city : ''" :required="true" label="Ville" name="city" placeholder="Tournai" />

        @if (!empty($shop->logo))
            <figure class="w-36 h-36">
                <img class="object-cover w-full h-full rounded-full" src="/storage/{{ $shop->logo }}" alt="">
            </figure>
        @endif
        <x-input.file :required="true" label="Logo (Max 2mb)" name="logo" />
        @if (!empty($shop->banner))
        <figure class="h-36">
            <img class="object-cover w-full h-full" src="/storage/{{ $shop->banner }}" alt="">
        </figure>
    @endif
    <x-input.file :required="true" label="Bannière (Max 2mb)" name="banner" />
        <x-input.textarea :value="!empty($shop->description) ? $shop->description : ''" label="Description" name="description" />
        <x-input.text :value="!empty($shop->phone) ? $shop->phone : ''" label="Numéro de téléphone" name="phone" />
        <x-input.text :value="!empty($shop->website) ? $shop->website : ''" label="Site internet" name="website" placeholder="https://monsite.be" />
        <x-input.text :value="!empty($shop->email) ? $shop->email : ''" :required="true" classes="col-span-6" label="Votre adresse email"
            name="email" placeholder="sample@gmail.com" />
            <x-input.text :value="!empty($shop->facebook) ? $shop->facebook : ''" label="Nom d'utilisateur Facebook" name="facebook" />
            <x-input.text :value="!empty($shop->instagram) ? $shop->instagram : ''" label="Nom d'utilisateur Instagram" name="instagram" />
        <x-input.checkbox :value="!empty($shop->is_bio) ? $shop->is_bio : ''" label="Mon établissement vend des produits bios" name="is_bio" />
        <x-input.checkbox :value="!empty($shop->is_productor) ? $shop->is_productor : ''" label="Mon établissement vend ce que je produis" name="is_productor" />
        <x-input.checkbox :value="!empty($shop->accept_local_currency) ? $shop->accept_local_currency : ''" label="Mon établissement accepte une monnaie locale"
            name="accept_local_currency" />

        <div class="flex flex-col items-center justify-center col-span-12 my-8">
            <button class="px-4 py-2 text-white transition rounded-md bg-primary hover:bg-primary-light">
                @if (Route::currentRouteName() == 'shop.edit')
                    Mettre à jour
                @else
                    Ajouter mon établissement
                @endif
            </button>
        </div>
    </form>

</x-layouts.half>
