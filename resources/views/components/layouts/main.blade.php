@props([
    'title',
    'hideFooter'=>false,
    'sand'=>false,
    'description'
    ])
@php
    if(empty($title)){
        $title = "SaveurBelge 👨🏻‍🌾 Des produits de chez nous 🥕";
    }else{
        $title = $title . " | SaveurBelge";
    }
    if(empty($description)){
        $description = "SaveurBelge | Des produits de chez nous: Carte interactive des producteurs locaux";
    }
@endphp
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <script async defer src="https://nullitics.com/script.js"></script>
    <title>{{$title}}</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <!-- Primary Meta Tags -->
        <meta name="description" content="{{$description}}">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://saveurbelge.be/">
        <meta property="og:title" content="{{$title}}">
        @if(!empty($title))
        <title> {{$title}} | SaveurBelge</title>
    @else
        <title>SaveurBelge 👨🏻‍🌾 Des produits de chez nous 🥕</title>
    @endif
        <meta property="og:description" content="{{$description}}">
    
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="https://saveurbelge.be/">
        <meta property="twitter:title" content="{{$title}}">
        <meta property="twitter:description" content="{{$description}}">

        <meta property="twitter:image" content="https://saveurbelge.be/share.webp">
        <meta property="og:image" content="https://saveurbelge.be/share.webp">
</head>
<body class="flex flex-col min-h-screen @if($sand) lg:bg-sand @endif">
    <x-navbar/>
    <div class="relative flex flex-col flex-1">
        {{$slot}}
    </div>

    @unless ($hideFooter)
    <x-footer/>
    @endunless
    <script src="{{asset('js/app.js')}}">

    </script>
</body>
</html>