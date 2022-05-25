@props(['name','label','classes'=>'','placeholder','value'=>''])

<label  class="block mb-2 text-gray-700 {{$classes}}" for="{{$name}}">
    {{$label}} 
    <textarea class="block w-full h-40 px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" name="{{$name}}" id="{{$name}}" rows="4">@if(!empty($value)){{$value}}@else{{old($name)}}@endif</textarea>
</label>

