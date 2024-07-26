<a href="{{ route('products.show', [$product['attributes']['token'], $product['attributes']['slug']]) }}" class="group">
    <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
        {{-- <x-responsive-image :item="$product" :results="$products" storage-disk="public" class="h-full w-full object-contain group-hover:opacity-75" /> --}}
    </div>
    <div class="text-sm mt-4 space-y-4 text-gray-800 ltr:capitalize dark:text-white md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
        <h2>{{ $product['attributes']['name'] }}</h2>
        <x-product.latest-price :$products :$product />
    </div>
</a>
