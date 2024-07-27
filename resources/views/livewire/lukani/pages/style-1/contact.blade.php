@section('pageTitle', __('تماس با ما'))

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

                <a class="mx-1.5 dark:hover:text-green-400 text-white transition-colors duration-300 transform hover:text-green-500" href="{{ url('https://www.instagram.com/houshangflower') }}">
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
            <x-lukani.sub-menu />
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
