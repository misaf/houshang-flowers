<section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12 px-4">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <!-- Heading & Filters -->
        <div class="mb-4 items-end justify-end space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <div class="flex items-center gap-x-4">
                <x-lukani.product.product-category-filter :$productCategories />

                <x-lukani.product.product-sort-filter />
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
