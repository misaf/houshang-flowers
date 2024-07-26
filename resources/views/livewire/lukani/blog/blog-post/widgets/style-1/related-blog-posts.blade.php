<aside aria-label="Related articles" class="py-8 lg:py-24 bg-slate-100 dark:bg-gray-900">
    <div class="px-4 mx-auto max-w-7xl">
        <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">{{ __('مطالب مشابه') }}</h2>
        <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            @foreach ($similarBlogPosts['data'] as $similarBlogPost)
                <article class="max-w-xs">
                    <a wire:navigate.hover href="{{ route('blogs.posts.show', ['slug' => $similarBlogPost['attributes']['slug']]) }}">
                        <x-responsive-image :results="$similarBlogPosts" :item="$similarBlogPost" class="w-full aspect-[16/9] rounded-2xl object-cover sm:aspect-[2/1] lg:aspect-[3/2] h-96 mb-5" />
                    </a>
                    <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                        <a wire:navigate.hover href="{{ route('blogs.posts.show', ['slug' => $similarBlogPost['attributes']['slug']]) }}">{{ $similarBlogPost['attributes']['name'] }}</a>
                    </h2>
                    <p class="mb-4 line-clamp-3 text-gray-500 dark:text-gray-400">{{ $similarBlogPost['attributes']['description'] }}</p>
                    <a wire:navigate.hover href="{{ route('blogs.posts.show', ['slug' => $similarBlogPost['attributes']['slug']]) }}" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                        {{ __('بیشتر بخوانید') }}
                    </a>
                </article>
            @endforeach
        </div>
    </div>
</aside>
