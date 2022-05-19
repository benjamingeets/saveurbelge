<x-layouts.main>
    <x-search/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <div class="w-screen h-screen md:p-2">
        <div class="z-0 w-full h-full md:rounded-md" id="map"></div>
    </div>
    <div
        class="fixed flex items-center p-2 transition bg-gray-100 rounded-md top-2 right-2 md:top-5 md:right-5 hover:bg-gray-300">

        <a class="before:w-full before:absolute before:h-full before:top-0 before:left-0"
            href="{{ route('shop.create') }}">
            Ajouter mon établissement</a>
    </div>
    <script>
        var shops = {!! json_encode($shops->toArray()) !!}
    </script>
</x-layouts.main>
