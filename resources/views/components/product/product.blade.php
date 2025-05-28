<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
    @foreach ($products['data'] as $product)
        <a wire:navigate.hover href="{{ route('products.show', [$product['attributes']['token'], $product['attributes']['slug']]) }}" class="group">
            <div class="aspect-square w-full overflow-hidden bg-gray-200 rounded-sm">
                <x-responsive-image :results="$products" :item="$product" class="h-full w-full object-cover object-center group-hover:opacity-75 transition ease-in-out delay-150 group-hover:-translate-y-4 group-hover:scale-110 group-hover:bg-white duration-300" />
            </div>
            <h3 class="mt-4 text-sm text-gray-700">{{ $product['attributes']['name'] }}</h3>
            <p class="mt-1 text-lg font-medium text-gray-900">
                <x-product.latest-price :$products :$product />
            </p>
        </a>
    @endforeach
</div>
