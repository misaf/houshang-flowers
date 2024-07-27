@section('pageTitle', __('مجله گل و گیاه'))

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
            <x-lukani.sub-menu />
        </div>
    </div>

    <!-- Left div with two columns -->
    <div class="w-full lg:w-2/3 bg-white overflow-y-auto lg:ms-auto lg:relative lg:z-0">
        <div class="grid grid-cols-1 gap-8">
            @forelse ($blogPosts['data'] as $blogPost)
                <a wire:navigate.hover href="{{ route('blogs.posts.show', ['slug' => $blogPost['attributes']['slug']]) }}">
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
