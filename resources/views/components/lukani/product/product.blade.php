<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <a wire:navigate.hover href="{{ route('products.show', [$product['attributes']['token'], $product['attributes']['slug']]) }}" class="group">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 rounded-sm">
            <x-responsive-image :results="$products" :item="$product" class="h-full w-full object-cover object-center group-hover:opacity-75 transition ease-in-out delay-150 group-hover:-translate-y-4 group-hover:scale-110 group-hover:bg-white duration-300" />
        </div>
    </a>
    <div class="pt-6">
        <a wire:navigate.hover href="{{ route('products.show', [$product['attributes']['token'], $product['attributes']['slug']]) }}" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
            {{ $product['attributes']['name'] }}
        </a>

        <div class="mt-2 flex items-center gap-2">
            <x-lukani.star-rating rating="5" />
        </div>

        <div class="mt-4 flex items-center justify-between gap-4">
            <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                <x-product.latest-price :$products :$product />
            </p>
        </div>
    </div>
</div>
