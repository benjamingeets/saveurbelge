
{{$shop->name}}
<form action="{{route('shop.sendmail',$shop->slug)}}" method="post">
    @csrf
    <input type="email" name="email" id="email">
    <button>Envoyer</button>
</form>