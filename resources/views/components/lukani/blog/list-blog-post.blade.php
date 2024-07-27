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
