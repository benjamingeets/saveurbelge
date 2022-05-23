<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <script async defer src="https://nullitics.com/script.js"></script>
    @if (!empty($title))
        <title> {{ $title }} | SaveurBelge</title>
    @else
        <title>SaveurBelge 👨🏻‍🌾 Des produits de chez nous 🥕</title>
    @endif
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <!-- Primary Meta Tags -->
    <meta name="description"
        content="SaveurBelge | Des produits de chez nous: Carte interactive des producteurs locaux">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://saveurbelge.be/">
    <meta property="og:title" content="SaveurBelge | Des produits de chez nous">
    <meta property="og:description"
        content="Carte interactive des producteurs locaux en Belgique. Venez découvrir les producteurs près de chez vous.">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://saveurbelge.be/">
    <meta property="twitter:title" content="SaveurBelge | Des produits de chez nous">
    <meta property="twitter:description"
        content="SaveurBelge | Des produits de chez nous: Carte interactive des producteurs locaux">

    <meta property="twitter:image" content="https://saveurbelge.be/share.webp">
    <meta property="og:image" content="https://saveurbelge.be/share.webp">
</head>

<body class="flex flex-col min-h-screen">
    <x-navbar />
    <div class="flex flex-col flex-1">
        <section class="relative flex flex-1">
            <div class="relative flex flex-col items-center justify-center pt-28 md:w-6/12 md:bg-sand">
                {{ $slot }}
            </div>
            <div class="sticky top-0 right-0 items-center justify-center hidden w-6/12 md:flex">
                <figure>
                    <img class="w-32 h-32 " src="/saveurbelge.svg" alt="">
                </figure>
            </div>
        </section>

    </div>

    <x-footer/>
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>
