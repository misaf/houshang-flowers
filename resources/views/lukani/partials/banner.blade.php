<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div class="flex flex-col justify-center">
            <div>
                <button class="flex items-center focus:outline-none">
                    <svg class="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>

                    <h1 class="mx-4 text-xl text-gray-700 dark:text-white">{{ __('اطلاعات تماس') }}</h1>
                </button>

                <div class="flex mt-8 md:mx-10">
                    <span class="border border-green-500"></span>

                    <p class="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                        {{ __('تهران - جردن - نبش عاطفی غربی') }}
                    </p>
                </div>

                <div class="mt-8 md:mx-10">
                    <div class="flex sm:justify-center sm:mt-0 gap-x-5">
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white" title="{{ __('Telegram') }}">
                            <x-bi-telegram class="w-4 h-4" />
                            <span class="sr-only">{{ __('Telegram') }}</span>
                        </a>
                        <a href="{{ url('https://www.instagram.com/houshangflower') }}" class="text-gray-500 hover:text-gray-900 dark:hover:text-white" title="{{ __('Instagram') }}">
                            <x-bi-instagram class="w-4 h-4" />
                            <span class="sr-only">{{ __('Instagram') }}</span>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white" title="{{ __('Twitter') }}">
                            <x-bi-twitter class="w-4 h-4" />
                            <span class="sr-only">{{ __('Twitter') }}</span>
                        </a>
                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white" title="{{ __('WhatsApp') }}">
                            <x-bi-whatsapp class="w-4 h-4" />
                            <span class="sr-only">{{ __('WhatsApp') }}</span>
                        </a>
                    </div>
                </div>

                <div class="mt-8 md:mx-10">
                    <div class="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                        <button type="button" class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                            <x-heroicon-s-phone class="order-1 w-4 h-4 ms-2 -me-1 text-[#626890]" />
                            02122011507
                        </button>
                    </div>

                    <div class="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                        <button type="button" class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                            <x-heroicon-s-phone class="order-1 w-4 h-4 ms-2 -me-1 text-[#626890]" />
                            09129333034
                        </button>
                    </div>
                </div>
            </div>

            <hr class="my-8 border-gray-200 dark:border-gray-700">

            <div x-data="{ open: false }">
                <button x-on:click="open = !open" class="flex items-center focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>

                    <h1 class="mx-4 text-xl text-gray-700 dark:text-white">{{ __('نحوه ارسال') }}</h1>
                </button>

                <div x-show="open" class="flex mt-8 md:mx-10">
                    <span class="border border-green-500"></span>

                    <p class="max-w-3xl px-4 text-gray-500 dark:text-gray-300">

                    </p>
                </div>
            </div>
        </div>

        <div>
            {{-- <video class="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl" controls>
                <source src="{{ asset('assets/houshang-flowers-intro.webm') }}" type="video/webm">
                Your browser does not support the video tag.
            </video> --}}
        </div>
    </div>
</section>
