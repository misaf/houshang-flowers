@extends('lukani.layout', ['pageTitle' => $product['attributes']['name']])

@section('content')
    <section class="bg-white dark:bg-gray-900">
        <div class="mx-auto px-4 mt-8">
            <div class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                <div class="lg:col-span-4 lg:row-end-1">
                    <div class="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg">
                        {{-- <x-responsive-image :results="$product" :item="$product" :alt="$product['attributes']['name']" class="h-full w-full object-contain group-hover:opacity-75" /> --}}
                    </div>
                </div>

                <div class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                    <div class="flex flex-col-reverse">
                        <div class="mt-4 space-y-3">
                            <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ $product['attributes']['name'] }}</h1>
                            <p class="mt-2 text-sm text-green-800">{{ __('دسته بندی') }}:
                                {{-- <x-products.partials.category :$product /> --}}
                            </p>
                            <x-product.latest-price :$products :$product />
                        </div>

                        <x-star-rating :rating="5" />
                    </div>

                    <p class="mt-6 text-gray-500">{!! $product['attributes']['description'] !!}</p>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">

                        <a href="{{ route('contacts.index', ['name' => $product['attributes']['name'], 'slug' => $product['attributes']['slug'], 'token' => $product['attributes']['token']]) }}" class="flex w-full items-center justify-center rounded-md border border-transparent bg-green-800 py-3 px-8 text-base font-medium text-white hover:bg-green-800/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                            {{ __('درخواست خرید') }}
                        </a>
                        {{-- <button type="button" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 py-3 px-8 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Preview</button> --}}
                    </div>

                    <x-sharing-social-links />
                </div>
            </div>
        </div>
    </section>

    <x-product.similar-products :$product />
@endsection
