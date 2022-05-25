@props(['items','current','classes'=>''])
    <ul class="flex {{$classes}}">
        @foreach ($items as $item)
            <li class="flex after:inline-block after:mx-2 after:content-['/']">
                <a class="text-primary hover:underline" href="{{$item['href']}}">
                    {{$item['label']}}
                </a>
            </li>
        @endforeach
        <li>
            <span>{{$current}}</span>
        </li>
    </ul>