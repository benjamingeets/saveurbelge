@php
$title = $shop->name;
@endphp
<x-layouts.main :title="$shop->name" :sand="true" :description="substr($shop->description,0,140)">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin="" />
    <figure class="w-screen h-64">
        <img class="object-cover w-full h-full" src="/storage/{{$shop->banner}}" alt="">
    </figure>
    <article id="shop" data-latitude="{{$shop->latitude}}" data-longitude="{{$shop->longitude}}"
        class="relative grid w-full max-w-5xl gap-16 p-4 mx-auto mb-20 bg-white rounded-md lg:p-12 lg:-mt-16 lg:grid-cols-7 ">
        <x-breadcrumb :items="[
            ['href' => route('shop.index'), 'label' => 'Accueil'],
            ['href' => route('shop.list'), 'label' => 'Commerce'],
        ]" :current="$title" classes="lg:col-span-7" />
        <div class="relative lg:col-span-2">
            <figure class=" w-36 h-36">
                <img class="object-cover w-full h-full rounded-full" src="/storage/{{ $shop->logo }}" alt="{{$shop->name}}">
            </figure>
            <h2 class="mt-8 mb-4 text-xl ">Coordonnées</h2>
            <address class="not-italic ">
                <ul  class="space-y-3 ">
                    <li class="mb-8 ">
                        <a class="transition hover:underline hover:text-primary" href="https://www.google.be/maps?hl=fr&q={{$shop->street}} {{$shop->city}}">
                        
                            {{ $shop->street }} {{ $shop->city }}
                        </a>
                    </li>
                    @if (!empty($shop->phone))
                        <li class="flex items-center gap-2 text-primary hover:underline">
                           <x-icon.phone/>  <a href="tel:{{ $shop->phone }}">{{ $shop->phone }}</a>
                        </li>
                    @endif
                    @if (!empty($shop->website))
                        <li class="flex items-center gap-2 text-primary hover:underline">
                            <x-icon.website/>  <a target="_blank" href="{{ Str::startsWith($shop->website, 'https://') ?  $shop->website:'https://'.$shop->website }}">{{ $shop->website }}</a>
                        </li>
                    @endif
                </ul>
                <ul class="flex mt-3 text-primary">
                    @if(!empty($shop->facebook))
                    <li>
                        <a href="https://facebook.com/{{$shop->facebook}}">
                            <x-icon.facebook/>
                        </a>
                    </li>
                    @endif
                    @if(!empty($shop->instagram))
                    <li>
                        <a href="https://facebook.com/{{$shop->instagram}}">
                            <x-icon.instagram/>
                        </a>
                    </li>
                    @endif
                </ul>
            </address>
            <button data-action="edit" class="mt-4 text-primary">Modifier l'établissement</button>
        </div>
        <div class="lg:col-span-5">
            <h1 class="mb-4 text-4xl">
                {{ $shop->name }}
            </h1>
            <span>{{ $shop->title }}</span>
            <ul class="flex gap-5 mt-6">
                @if ($shop->is_bio)
                    <li title="Ce commerce vend des produits bios">
                        <x-icon.bio />
                    </li>
                @endif
                @if ($shop->is_productor)
                    <li title="Ce commerce vend sa production">

                        <x-icon.productor />
                    </li>
                @endif
                @if ($shop->accept_local_currency)
                    <li title="Ce commerce accepte une monnaie locale">

                        <x-icon.currency />
                    </li>
                @endif
            </ul>
            @if (!empty($shop->description))
            <blockquote class="p-5 mt-6 space-y-2 border-l-2 border-primary bg-sand">{{ Illuminate\Mail\Markdown::parse($shop->description)}}</blockquote>
                
            @endif
            <div class="z-10 w-full mt-6 overflow-hidden rounded-md h-52" id="shop-map">

            </div>
        </div>

    </article>
    <div data-modal class="fixed top-0 left-0 z-50 items-center justify-center hidden w-screen h-screen bg-black bg-opacity-75">
        <form class="relative flex flex-col w-full max-w-md p-10 bg-white rounded gap-7" action="{{ route('shop.sendmail', $shop->slug) }}" method="post">
            @csrf
            <button data-close class="absolute top-0 right-0 self-end m-4">
                <x-icon.close />
            </button>
            <span class="text-2xl text-center">Editer {{$shop->name}}</span>
            <p>Entrez l'adresse email liée à cet établissement pour obtenir un lien d'édition</p>
            <x-input.text type="email" name="email" label="Email"/>
            <button data-send class="self-center px-4 py-2 text-white transition rounded-md bg-primary hover:bg-primary-light">Envoyer</button>
        </form>
    </div>
</x-layouts.main>
