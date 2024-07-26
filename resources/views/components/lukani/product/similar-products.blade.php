<section class="bg-white dark:bg-gray-900">
    <div class="mx-auto px-4 py-16">
        <hr class="border-2 border-green-800">
        <h1 class="md:text-md mb-8 p-2 text-sm text-green-800 dark:bg-gray-700 lg:text-lg xl:text-xl 2xl:text-2xl">{{ __('Related Products') }}</h1>
        <div class="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-5 xl:grid-cols-5">
            @foreach ($products['data'] as $product)
                @include('lukani.product-card')
            @endforeach
        </div>
    </div>
</section>
