@props(['classes'=>'','name','label','value'=>false])

<div class="{{$classes}}">
    <input type="hidden" name="{{$name}}" value="0">
    <input type="checkbox" name="{{$name}}" id="{{$name}}"  value="1" @if(old($name) || $value) checked @endif>
    <label for="{{$name}}" >
        {{$label}} 
    </label>
</div>