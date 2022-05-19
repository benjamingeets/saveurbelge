@props(['name','label','classes',])

<label class="{{$classes}}" for="{{$name}}">
    {{$label}} 
    
    <input 
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" 
        type="file" 
        accept="image/png, image/jpeg, image/jpg, image/webp"
        id="{{$name}}" 
        name="{{$name}}">
</label>