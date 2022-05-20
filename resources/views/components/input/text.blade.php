@props(['name', 'label', 'classes', 'placeholder', 'required' => false])

<label class="{{ $classes }}" for="{{ $name }}">
    {{ $label }}
    @if ($required)
        *
    @endif

    <input @if (!empty($placeholder)) placeholder="ex: {{ $placeholder }}" @endif
        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring @error($name) border-red-500 @else border-gray-200 @enderror"
        type="text" id="{{ $name }}" name="{{ $name }}"
        @if ($required) required="true" @endif>

    @error($name)
        <div class="alert alert-danger">{{ $message }}</div>
    @enderror
</label>
