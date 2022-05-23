<x-layouts.main title="Ajouter mon établissement">

    <x-navbar/>
    {{$shop->name}}
    <form enctype="multipart/form-data" action="{{route('shop.store')}}" method="POST" class="grid max-w-xl grid-cols-12 gap-4 p-4 px-4 mx-auto mb-20 bg-white rounded-md">
        @csrf
        <x-input.text :required="true" classes="col-span-12" label="Nom de votre établissement" name="name"/>
        <x-input.text :required="true" classes="col-span-12" label="Intitulé" name="title" placeholder="commerce, restaurant, producteur de fruits,..."/>
        <x-input.text :required="true" classes="col-span-12" label="Adresse" name="street" placeholder="52, rue saint-martin"/>
        <x-input.text :required="true" classes="col-span-12" label="Ville" name="city" placeholder="Tournai"/>
        <x-input.file :required="true" classes="col-span-12" label="Logo (Max 2mb)" name="logo" />
        <x-input.textarea classes="col-span-12" label="Description" name="description"/>
        <x-input.text classes="col-span-12" label="Numéro de téléphone" name="phone"/>
        <x-input.text classes="col-span-12" label="Site internet" name="website" placeholder="https://monsite.be"/>
        <x-input.text classes="col-span-6" label="Nom d'utilisateur Facebook" name="facebook" placeholder="MonCommerce"/>
        <x-input.text classes="col-span-6" label="Nom d'utilisateur Instagram" name="instagram" placeholder="MonCommerce"/>
        <x-input.text :required="true" classes="col-span-6" label="Votre adresse email" name="email" placeholder="sample@gmail.com"/>
        <x-input.checkbox classes="col-span-12" label="Mon établissement vend des produits bios" name="isBio"/>
        <x-input.checkbox classes="col-span-12" label="Mon établissement vend ce que je produis" name="isProductor"/>
        <x-input.checkbox classes="col-span-12" label="Mon établissement accepte une monnaie locale" name="acceptLocalCurrency"/>

        <div class="flex flex-col items-center justify-center col-span-12 my-8">
            <button class="px-4 py-2 text-white transition rounded-md bg-primary hover:bg-primary-light">Ajouter mon établissement</button>
        </div>
    </form>
    
</x-layouts.main>