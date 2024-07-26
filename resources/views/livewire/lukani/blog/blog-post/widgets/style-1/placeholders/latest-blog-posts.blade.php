<section class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-green-800 sm:text-4xl">{{ __('مجله گل و گیاه') }}</h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">{{ __('راهنمایی‌هایی برای انتخاب و مراقبت از گیاهان آپارتمانی') }}</p>
        </div>
        <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            @for ($i = 0; $i < 3; $i++)
                <article class="flex max-w-xl flex-col items-start justify-between shadow-md p-4">
                    <div class="flex items-center gap-x-4 text-xs">
                        {{-- <time datetime="@dateTime($blogPost['attributes']['created_at'])" class="text-gray-500">@dateTime($blogPost['attributes']['created_at'])</time> --}}
                        <time datetime="" class="text-gray-500"></time>
                        <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                            {{-- @php
                                echo collect($blogPosts['included'])
                                    ->where('type', 'blog-post-categories')
                                    ->where('id', $blogPost['relationships']['blogPostCategory']['data']['id'])
                                    ->value('attributes.name');
                            @endphp --}}
                        </a>
                    </div>
                    <div class="group relative">
                        <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 tracking-widest">
                            {{-- <a href="{{ route('blogs.posts.show', $blogPost['attributes']['slug']) }}"> --}}
                            <a href="#">
                                <span class="absolute inset-0"></span>
                                {{-- {{ $blogPost['attributes']['name'] }} --}}
                            </a>
                        </h3>
                        {{-- <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ $blogPost['attributes']['description'] }}</p> --}}
                        <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600"></p>
                    </div>
                    <div class="relative mt-8 flex items-center gap-x-4">
                        {{-- <img src="https://mighty.tools/mockmind-api/content/human/8.jpg" alt="" class="h-10 w-10 rounded-full bg-gray-50"> --}}
                        <img src="https://mighty.tools/mockmind-api/content/human/8.jpg" alt="" class="h-10 w-10 rounded-full bg-gray-50">
                        <div class="text-sm leading-6">
                            <p class="font-semibold text-gray-900">
                                <a href="#">
                                    <span class="absolute inset-0"></span>
                                    {{ __('آناهیتا نعمتی') }}
                                </a>
                            </p>
                            <p class="text-gray-600">{{ __('نویسنده') }}</p>
                        </div>
                    </div>
                </article>
            @endfor
        </div>
    </div>
</section>
