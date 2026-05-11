@php
    $currentProduct = $product['data'][0];
@endphp

@section('pageTitle', $product['data'][0]['attributes']['name'])

<div class="relative flex">
    <!-- Right div -->
    <div class="hidden lg:flex lg:flex-col fixed inset-y-0 right-0 w-1/4 bg-green-900 items-center justify-center z-10 space-y-8">
        <p class="text-2xl font-semibold text-white capitalize tracking-wide dark:text-white lg:text-5xl">
            {{ $product['data'][0]['attributes']['name'] }}
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

            <span class="mx-5 text-white dark:text-gray-300 rtl:-scale-x-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </span>

            <a href="{{ route('blogs.posts.index') }}" class="text-white dark:text-gray-200 hover:underline">
                {{ __('محصولات') }}
            </a>
        </div>

        <div class="absolute bottom-0 left-0 z-50 w-full h-16 bg-green-900">
            <x-lukani.sub-menu />
        </div>
    </div>

    <!-- Left div with two columns -->
    <div class="w-full lg:w-3/4 bg-white overflow-y-auto lg:ms-auto lg:relative lg:z-0">
        <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
            <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                    <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
                        <div class="grid gap-4" x-data="contentManager()">
                            <div x-html="defaultContent">
                                <x-responsive-image :results="$product" :item="$currentProduct" class="h-auto max-w-full rounded-lg" />
                            </div>
                            <div class="grid grid-cols-5 gap-4">
                                @php
                                    $multimediaData = $currentProduct['relationships']['multimedia']['data'] ?? [];
                                    $imageIds = collect($multimediaData)->pluck('id')->toArray();

                                    $images = collect($product['included'])
                                        ->where('type', 'multimedia')
                                        ->whereIn('id', $imageIds);
                                @endphp

                                @foreach ($images as $item)
                                    @php
                                        $attributes = $item['attributes'] ?? [];
                                        $fileName = pathinfo($attributes['file_name'] ?? '', PATHINFO_FILENAME);
                                        $uuid = $attributes['uuid'] ?? null;
                                    @endphp

                                    @if ($uuid)
                                        <div x-on:click="updateContent($el.innerHTML)" class="cursor-pointer">
                                            <div>
                                                <picture>
                                                    <source srcset="{{ \Storage::disk('panel')->url($uuid . '/conversions/' . $fileName . '-extra-large.webp') }}" media="(max-width: 640px)">
                                                    <source srcset="{{ \Storage::disk('panel')->url($uuid . '/conversions/' . $fileName . '-extra-large.webp') }}" media="(max-width: 1024px)">
                                                    <source srcset="{{ \Storage::disk('panel')->url($uuid . '/conversions/' . $fileName . '-extra-large.webp') }}" media="(min-width: 1024px)">
                                                    <img src="{{ \Storage::disk('panel')->url($uuid . '/conversions/' . $fileName . '-extra-large.webp') }}" class="h-auto max-w-full rounded-lg">
                                                </picture>
                                            </div>
                                        </div>
                                    @endif
                                @endforeach
                            </div>
                        </div>
                        @push('scripts')
                            <script>
                                function contentManager() {
                                    return {
                                        defaultContent: `<x-responsive-image :results="$product" :item="$currentProduct" class="h-auto max-w-full rounded-lg" />`,
                                        updateContent(newContent) {
                                            this.defaultContent = newContent;
                                        }
                                    }
                                }
                            </script>
                        @endpush
                    </div>

                    <div class="mt-6 sm:mt-8 lg:mt-0">
                        <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            {{ $product['data'][0]['attributes']['name'] }}
                        </h1>
                        <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
                            <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                                <x-product.latest-price :products="$product" :product="$currentProduct" />
                            </p>
                        </div>

                        <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                            <a href="#" title="" class="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-green-800 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" role="button">
                                {{-- <svg class="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                </svg> --}}
                                {{ __('درخواست خرید') }}
                            </a>

                            <a href="#" title="" class="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center" role="button">
                                <svg class="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                                </svg>

                                Add to cart
                            </a>
                        </div>

                        <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                        <p class="mb-6 text-gray-500 dark:text-gray-400">
                            {!! $product['data'][0]['attributes']['description'] !!}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
