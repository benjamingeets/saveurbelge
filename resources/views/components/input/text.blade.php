@props(['name','label','classes','placeholder','required'=>false])

<label class="{{$classes}}" for="{{$name}}">
    {{$label}} {{$required}}
    
    <input 
        @if(!empty($placeholder)) placeholder="ex: {{$placeholder}}" @endif 
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
        type="text" 
        id="{{$name}}" 
        name="{{$name}} @if($required) * @endif">
</label>