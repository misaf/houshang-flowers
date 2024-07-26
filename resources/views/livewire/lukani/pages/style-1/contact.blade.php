<div class="relative flex">
    <!-- Right div -->
    <div class="hidden lg:flex lg:flex-col fixed inset-y-0 right-0 w-1/3 bg-green-900 items-center justify-center z-10 space-y-8">
        <p class="text-2xl font-semibold text-white capitalize tracking-wide dark:text-white lg:text-5xl">
            {{ __('تماس با ما') }}
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

        <!-- Socials -->
        <div class="mt-6 md:mt-8">
            <h3 class="font-medium text-white tracking-wide dark:text-gray-300 lg:text-2xl">{{ __('ما را در شبکه های اجتماعی دنبال کنید:') }}</h3>

            <div class="flex mt-6 -mx-1.5">
                <a class="mx-1.5 dark:hover:text-green-400 text-white transition-colors duration-300 transform hover:text-green-500" href="#">
                    <x-bi-telegram class="w-8 h-8 fill-current" />
                </a>

                <a class="mx-1.5 dark:hover:text-green-400 text-white transition-colors duration-300 transform hover:text-green-500" href="#">
                    <x-bi-instagram class="w-8 h-8 fill-current" />
                </a>

                <a class="mx-1.5 dark:hover:text-green-400 text-white transition-colors duration-300 transform hover:text-green-500" href="#">
                    <x-bi-twitter class="w-8 h-8 fill-current" />
                </a>

                <a class="mx-1.5 dark:hover:text-green-400 text-white transition-colors duration-300 transform hover:text-green-500" href="#">
                    <x-bi-whatsapp class="w-8 h-8 fill-current" />
                </a>
            </div>
        </div>

        <!-- Menus -->
        <div class="absolute bottom-0 left-0 z-50 w-full h-16 bg-green-900">
            <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <a wire:navigate.hover href="{{ route('home') }}" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    <span class="text-sm text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">{{ __('خرید') }}</span>
                </a>
                <a wire:navigate.hover href="{{ route('products.index') }}" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
                        <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
                    </svg>
                    <span class="text-sm text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">{{ __('محصولات') }}</span>
                </a>
                <a wire:navigate.hover href="{{ route('blogs.posts.index') }}" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                    </svg>
                    <span class="text-sm text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">{{ __('گل و گیاه') }}</span>
                </a>
                <a wire:navigate.hover href="{{ route('contacts.index') }}" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-5 h-5 mb-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <span class="text-sm text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">{{ __('تماس با ما') }}</span>
                </a>
            </div>
        </div>
    </div>

    <!-- Left div with two columns -->
    <div class="w-full lg:w-2/3 bg-white p-4 overflow-y-auto lg:ms-auto lg:relative lg:z-0 lg:px-12 xl:px-24">
        <form>
            @csrf

            <div class="-mx-2 md:items-center md:flex">
                <div class="flex-1 px-2">
                    <label class="block mb-2 text-lg text-gray-600 dark:text-gray-200 tracking-wide">{{ __('نام و نام خانوادگی') }}</label>
                    <input type="text" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div class="flex-1 px-2 mt-4 md:mt-0">
                    <label class="block mb-2 text-lg text-gray-600 dark:text-gray-200 tracking-wide">{{ __('آدرس پست الکترونیکی') }}</label>
                    <input dir="ltr" type="email" placeholder="test@example.com" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
            </div>

            <div class="w-full mt-4">
                <label class="block mb-2 text-lg text-gray-600 dark:text-gray-200 tracking-wide">{{ __('پیغام') }}</label>
                <textarea class="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"></textarea>
            </div>

            <div class="w-full mt-4">
                <a href="#" class="block w-full tracking-wide text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
                    {{ __('ارسال پیغام') }}
                </a>
            </div>
        </form>
    </div>
</div>
