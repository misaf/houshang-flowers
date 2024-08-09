<nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="{{ route('home') }}" class="flex flex-col items-center space-y-4">
            <div class="flex items-center space-x-3">
                <h1 class="text-xl font-bold text-white bg-green-900 px-6 py-4 shadow-md">
                    {{ __('مجتمع گل و گیاه') }}
                    <span class="text-xl font-semibold text-transparent bg-clip-text 
                        bg-gradient-to-r from-[#A2CBB8] to-[#C1E1C1]">
                        {{ __('هوشنگ') }}
                    </span>
                </h1>
            </div>
        </a>
        <div class="hidden md:flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div class="gap-x-2 flex">
                <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="tracking-wide p-2 px-4 items-center justify-between flex flex-wrap text-sm text-white bg-green-900 md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                    <x-heroicon-s-user class="w-4 h-4 me-2 text-white" />
                    {{ __('ورود به حساب کاربری') }}
                </button>

                <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-green-900 dark:text-white">
                                    {{ __('ورود به حساب کاربری') }}
                                </h3>
                                <button type="button" class="end-2.5 text-green-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="p-4 md:p-5">
                                <form class="space-y-4" action="#">
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('آدرس پست الکترونیکی') }}</label>
                                        <input dir="ltr" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-700 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="user@example.com" required />
                                    </div>
                                    <div>
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ __('رمز عبور') }}</label>
                                        <input dir="ltr" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-700 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div class="flex justify-between">
                                        <div class="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-900 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-green-900 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                            </div>
                                            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('مرا به خاطر بسپار') }}</label>
                                        </div>
                                        <a href="#" class="text-sm text-green-900 hover:underline dark:text-green-500">{{ __('رمز عبور خود را فراموش کرده اید ؟') }}</a>
                                    </div>
                                    <button type="submit" class="w-full text-white bg-green-900 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ __('ورود به حساب کاربری') }}</button>
                                    {{-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                                        Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                                    </div> --}}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{-- <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                <div class="px-4 py-3">
                    <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                    <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                </div>
                <ul class="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                    </li>
                </ul>
            </div> --}}

        <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-green-900 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
        </button>
        <div class="items-center hidden justify-between w-full" id="navbar-user">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a wire:navigate.hover href="{{ route('home') }}" class="block py-2 px-3 text-white bg-green-900 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">{{ __('خرید') }}</a>
                </li>
                <li>
                    <a wire:navigate.hover href="{{ route('products.index') }}" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{{ __('محصولات') }}</a>
                </li>
                <li>
                    <a wire:navigate.hover href="{{ route('products.index', ['category' => 'best-selling']) }}" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{{ __('پرفروش ترین ها') }}</a>
                </li>
                <li>
                    <a wire:navigate.hover href="{{ route('blogs.posts.index') }}" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{{ __('مجله گل و گیاه') }}</a>
                </li>
                <li>
                    <a wire:navigate.hover href="{{ route('contacts.index') }}" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{{ __('تماس با ما') }}</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<nav class="bg-green-900 dark:bg-gray-700">
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div id="mega-menu-full-image" class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <div>
                <ul class="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                    <li>
                        <a wire:navigate.hover href="{{ route('home') }}" class="text-white hover:underline hover:underline-offset-8 flex" aria-current="page">
                            <svg class="w-3.5 h-3.5w-3.5 me-2 text-white dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            {{ __('خرید') }}
                        </a>
                    </li>
                    <li>
                        <button id="mega-menu-full-cta-image-button" data-collapse-toggle="mega-menu-full-image-dropdown" class="flex items-center hover:underline-offset-8 justify-between w-full py-2 px-3 font-medium text-white hover:underline border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                            {{ __('محصولات') }}
                            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <a wire:navigate.hover href="{{ route('products.index', ['category' => 'best-selling']) }}" class="hover:underline-offset-8 block py-2 px-3 text-white border-b hover:underline border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">{{ __('پرفروش ترین ها') }}</a>
                    </li>
                    <li>
                        <a wire:navigate.hover href="{{ route('blogs.posts.index') }}" class="hover:underline-offset-8 block py-2 px-3 text-white border-b hover:underline border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">{{ __('مجله گل و گیاه') }}</a>
                    </li>
                    <li>
                        <a wire:navigate.hover href="{{ route('contacts.index') }}" class="hover:underline-offset-8 block py-2 px-3 text-white border-b hover:underline border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">{{ __('تماس با ما') }}</a>
                    </li>
                </ul>
            </div>
            <div>
                {{-- <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="sr-only">Search</span>
                </button> --}}
                <div class="relative hidden md:block">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search icon</span>
                    </div>
                    <input type="text" id="search-navbar" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-green-800 bg-gray-50 focus:ring-green-800 focus:border-green-800 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-800 dark:focus:border-green-800" placeholder="{{ __('جستجو...') }}">
                </div>
            </div>
        </div>
    </div>
    <div id="mega-menu-full-image-dropdown" class="hidden mt-1 bg-white border-gray-200 shadow-sm border-y dark:bg-gray-800 dark:border-gray-600">
        <div class="grid max-w-screen-xl px-4 py-5 mx-auto text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
            <ul class="hidden mb-4 space-y-4 md:mb-0 md:block" aria-labelledby="mega-menu-full-image-button">
                <li>
                    <a href="#" class="hover:underline hover:decoration-solid hover:white-white">
                        Online Stores
                    </a>
                </li>
                <li>
                    <a href="#" class="hover:underline hover:decoration-solid hover:white-white">
                        Segmentation
                    </a>
                </li>
                <li>
                    <a href="#" class="hover:underline hover:decoration-solid hover:white-white">
                        Marketing CRM
                    </a>
                </li>
                <li>
                    <a href="#" class="hover:underline hover:decoration-solid hover:white-white">
                        Online Stores
                    </a>
                </li>
            </ul>
            <ul class="mb-4 space-y-4 md:mb-0">
                <li>
                    <a href="#" class="hover:underline hover:decoration-solid hover:white-white">
                        Our Blog
                    </a>
                </li>
                <li>
                    <a href="#" class="hover:underline hover:decoration-solid hover:white-white">
                        Terms & Conditions
                    </a>
                </li>
                <li>
                    <a href="#" class="hover:underline hover:decoration-solid hover:white-white">
                        License
                    </a>
                </li>
                <li>
                    <a href="#" class="hover:underline hover:decoration-solid hover:white-white dark:hover:text-blue-500">
                        Resources
                    </a>
                </li>
            </ul>
            <div class="grid grid-cols-2 gap-x-8">
                <div class="group relative text-base sm:text-sm">
                    <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <img src="{{ asset('assets/online-showcase.webp') }}" alt="online-showcase" class="object-cover object-center saturate-50">
                    </div>
                    <a wire:navigate.hover href="{{ route('products.index', ['category' => 'best-selling']) }}" class="mt-6 block font-medium text-gray-900 tracking-widest">
                        <span class="absolute inset-0 z-10" aria-hidden="true"></span>
                        {{ __('پرفروش ترین ها') }}
                    </a>
                    {{-- <p aria-hidden="true" class="mt-1">{{ __('نمایش همه') }}</p> --}}
                </div>
                <div class="group relative text-base sm:text-sm">
                    <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <img src="{{ asset('assets/best-sellers.webp') }}" alt="best-sellers" class="object-cover object-center saturate-50">
                    </div>
                    <a wire:navigate.hover href="{{ route('products.index', ['category' => 'daily']) }}" class="mt-6 block font-medium text-gray-900 tracking-widest">
                        <span class="absolute inset-0 z-10" aria-hidden="true"></span>
                        {{ __('ویترین آنلاین') }}
                    </a>
                    {{-- <p aria-hidden="true" class="mt-1">{{ __('نمایش همه') }}</p> --}}
                </div>
            </div>
        </div>
    </div>
</nav>
