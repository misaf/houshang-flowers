@section('pageTitle', __('محصولات'))

<div class="relative flex">
    <!-- Right div -->
    <div class="hidden lg:flex lg:flex-col fixed inset-y-0 right-0 w-1/3 bg-green-900 items-center justify-center z-10 space-y-8">
        <p class="text-2xl font-semibold text-white capitalize tracking-wide dark:text-white lg:text-5xl">
            {{ __('محصولات') }}
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
        <section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12 px-4">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <!-- Heading & Filters -->
                <div class="mb-4 items-end justify-end space-y-4 sm:flex sm:space-y-0 md:mb-8">
                    <div class="flex items-center gap-x-4">
                        <livewire:lukani.product.product-category-filter :lazy="false" />

                        <livewire:lukani.product.product-category-sort :lazy="false" />
                    </div>
                </div>
                <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-3">
                    @forelse($products['data'] as $product)
                        <x-lukani.product.product :$products :$product />
                    @empty
                    @endforelse
                </div>
                <div class="w-full text-center">
                    <x-lukani.product.load-more-button />
                </div>
            </div>
        </section>

    </div>
</div>
