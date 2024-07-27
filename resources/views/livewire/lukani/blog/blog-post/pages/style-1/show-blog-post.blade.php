@section('pageTitle', $blogPost['data'][0]['attributes']['name'])

<div class="relative flex">
    <!-- Right div -->
    <div class="hidden lg:flex lg:flex-col fixed inset-y-0 right-0 w-1/3 bg-green-900 items-center justify-center z-10 space-y-8">
        <p class="text-2xl font-semibold text-white capitalize tracking-wide dark:text-white lg:text-5xl">
            {{ $blogPost['data'][0]['attributes']['name'] }}
        </p>

        <div class="flex items-center py-4 overflow-x-auto whitespace-nowrap">
            <span class="mx-2 text-white dark:text-gray-300 rtl:-scale-x-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
            </span>

            <a href="{{ route('blogs.posts.index') }}" class="text-white dark:text-gray-200 hover:underline">
                {{ __('مجتمع گل و گیاه هوشنگ') }}
            </a>

            <span class="mx-5 text-white dark:text-gray-300 rtl:-scale-x-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </span>

            <a href="{{ route('blogs.posts.index') }}" class="text-white dark:text-gray-200 hover:underline">
                {{ __('مجله گل و گیاه') }}
            </a>
        </div>

        <div class="absolute bottom-0 left-0 z-50 w-full h-16 bg-green-900">
            <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <a wire:navigate.hover href="{{ route('home') }}" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    <span class="text-sm text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">{{ __('خرید') }}</span>
                </a>
                <a wire:navigate.hover href="{{ route('products.index') }}" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
                        <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
                    </svg>
                    <span class="text-sm text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">{{ __('محصولات') }}</span>
                </a>
                <a wire:navigate.hover href="{{ route('blogs.posts.index') }}" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                    </svg>
                    <span class="text-sm text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">{{ __('گل و گیاه') }}</span>
                </a>
                <a wire:navigate.hover href="{{ route('contacts.index') }}" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <span class="text-sm text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">{{ __('تماس با ما') }}</span>
                </a>
            </div>
        </div>
    </div>

    <!-- Left div -->
    <div class="w-full lg:w-2/3 bg-white p-4 overflow-y-auto lg:ms-auto lg:relative lg:z-0">
        <div class="grid grid-cols-1 gap-4">
            @if (!empty($blogPost['data'][0]) && !empty($blogPost['included']))
                <div id="controls-carousel" class="relative w-full" data-carousel="static">
                    <!-- Carousel wrapper -->
                    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                        <!-- Item 2 -->
                        <div class="hidden duration-700 ease-in-out" data-carousel-item="active">
                            <x-responsive-image :results="$blogPost" :item="$blogPost['data'][0]" :alt="$blogPost['data'][0]['attributes']['name']" :title="$blogPost['data'][0]['attributes']['name']" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                        </div>
                        <!-- Item 3 -->
                        <div class="hidden duration-700 ease-in-out" data-carousel-item>
                            <x-responsive-image :results="$blogPost" :item="$blogPost['data'][0]" :alt="$blogPost['data'][0]['attributes']['name']" :title="$blogPost['data'][0]['attributes']['name']" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                        </div>
                    </div>
                    <!-- Slider controls -->
                    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span class="sr-only">Previous</span>
                        </span>
                    </button>
                    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span class="sr-only">Next</span>
                        </span>
                    </button>
                </div>

                <div>{!! $blogPost['data'][0]['attributes']['description'] !!}</div>
            @else
                <p class="text-center text-gray-500">No blog posts available.</p>
            @endif
        </div>
    </div>
</div>
