@props(['classes'=>'','name','label'])

<div class="{{$classes}}">
    <input type="checkbox" name="{{$name}}" id="{{$name}}"  value="1">
    <label for="{{$name}}" >
        {{$label}} 
    </label>
</div>