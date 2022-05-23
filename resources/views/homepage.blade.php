<x-layouts.main :hideFooter="true">
    <x-search />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <div id="home" class="flex flex-col flex-1 w-screen h-full md:pl-2 md:pb-2 md:pr-2">
        <div class="z-0 flex flex-col flex-1 md:rounded-md" id="map"></div>
    </div>
    <ul class="sr-only">
        @foreach ($shops as $shop)
            <li data-name="{{$shop->name}}" data-latitude="{{$shop->latitude}}" data-longitude="{{$shop->longitude}}" data-title="{{$shop->title}}" data-slug="{{$shop->slug}}" data-city="{{$shop->city}}">
                {{$shop->name}}
            </li>
        @endforeach
    </ul>
</x-layouts.main>
