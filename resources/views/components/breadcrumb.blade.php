@props(['items','current','classes'=>''])
    <ul class="flex flex-col md:flex-row {{$classes}}">
        @foreach ($items as $item)
            <li class="flex md:mx-2 after:content-['/']">
                <a class="text-primary hover:underline" href="{{$item['href']}}">
                    {{$item['label']}}
                </a>
            </li>
        @endforeach
        <li class="md:ml-2">
            <span>{{$current}}</span>
        </li>
    </ul>