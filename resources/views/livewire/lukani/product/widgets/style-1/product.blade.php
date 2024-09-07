<div wire:poll.60s>
    @foreach ($productCategories['data'] as $productCategory)
        <section class="bg-white dark:bg-gray-900">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <hr class="border-2 border-green-800">
                <h1 class="text-md mb-8 p-2 font-extrabold text-green-800 dark:bg-gray-700 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                    <a wire:navigate.hover href="{{ route('products.index', ['category' => $productCategory['attributes']['slug']]) }}">
                        {{ $productCategory['attributes']['name'] }}
                    </a>
                </h1>

                <x-product.product :$productCategory :lazy="true" />
            </div>
        </section>
    @endforeach
</div>
