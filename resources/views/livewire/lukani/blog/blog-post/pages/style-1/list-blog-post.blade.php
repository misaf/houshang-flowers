<div class="relative flex">
    <!-- Right div -->
    <div class="hidden lg:flex lg:flex-col fixed inset-y-0 right-0 w-1/3 bg-green-900 items-center justify-center z-10 space-y-8">
        <p class="text-2xl font-semibold text-white capitalize tracking-wide dark:text-white lg:text-5xl">
            {{ __('مجله گل و گیاه') }}
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
        </div>

        <div class="absolute bottom-0 left-0 z-50 w-full h-16 bg-green-900">
            <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <a href="{{ route('home') }}" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    <span class="text-sm text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">{{ __('خرید') }}</span>
                </a>
                <a href="{{ route('products.index') }}" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
                        <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
                    </svg>
                    <span class="text-sm text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">{{ __('محصولات') }}</span>
                </a>
                <a href="{{ route('blogs.posts.index') }}" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                    </svg>
                    <span class="text-sm text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">{{ __('گل و گیاه') }}</span>
                </a>
                <a href="{{ route('contacts.index') }}" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <span class="text-sm text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">{{ __('تماس با ما') }}</span>
                </a>
            </div>
        </div>
    </div>

    <!-- Left div with two columns -->
    <div class="w-full lg:w-2/3 bg-white overflow-y-auto lg:ms-auto lg:relative lg:z-0">
        <div class="grid grid-cols-1 gap-8">
            @forelse ($blogPosts['data'] as $blogPost)
                <a href="{{ route('blogs.posts.show', ['slug' => $blogPost['attributes']['slug']]) }}">
                    <article class="relative flex gap-8 hover:bg-green-900 hover:text-white p-4 hover:cursor-pointer">
                        <div class="relative aspect-[16/9] lg:aspect-[1/1] w-64 2xl:w-96 lg:flex-shrink-0">
                            <x-responsive-image :results="$blogPosts" :item="$blogPost" class="absolute inset-0 h-full w-full rounded-sm object-cover" />
                        </div>
                        <div class="hover:text-white space-y-4">
                            <div class="flex items-center gap-x-4 text-xs">
                                <time class="bg-gray-100 px-3 py-1 font-medium text-gray-600">
                                    @dateTime($blogPost['attributes']['created_at'])
                                </time>
                                <div class="bg-gray-100 px-3 py-1 font-medium text-gray-600">
                                    @php
                                        echo collect($blogPosts['included'])
                                            ->where('type', 'blog-post-categories')
                                            ->where('id', $blogPost['relationships']['blogPostCategory']['data']['id'])
                                            ->value('attributes.name');
                                    @endphp
                                </div>
                            </div>
                            <div class="max-w-xl">
                                <h3 class="text-xl font-semibold">
                                    {{ $blogPost['attributes']['name'] }}
                                </h3>
                                <p class="mt-4 text-md leading-relaxed line-clamp-3">
                                    {{ strip_tags($blogPost['attributes']['description']) }}
                                </p>
                            </div>
                        </div>
                    </article>
                </a>
            @empty
                <p class="text-center text-gray-500">No blog posts available.</p>
            @endforelse
        </div>
    </div>
</div>
