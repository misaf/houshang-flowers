<div>
    <div class="bg-white">
        <!--
        Mobile menu

        Off-canvas menu for mobile, show/hide based on off-canvas menu state.
        -->
        {{-- <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
            <!--
            Off-canvas menu backdrop, show/hide based on off-canvas menu state.

            Entering: "transition-opacity ease-linear duration-300"
                From: "opacity-0"
                To: "opacity-100"
            Leaving: "transition-opacity ease-linear duration-300"
                From: "opacity-100"
                To: "opacity-0"
            -->
            <div class="fixed inset-0 bg-black bg-opacity-25"></div>

            <div class="fixed inset-0 z-40 flex">
                <!--
            Off-canvas menu, show/hide based on off-canvas menu state.

            Entering: "transition ease-in-out duration-300 transform"
            From: "-translate-x-full"
            To: "translate-x-0"
            Leaving: "transition ease-in-out duration-300 transform"
            From: "translate-x-0"
            To: "-translate-x-full"
            -->
                <div class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div class="flex px-4 pb-2 pt-5">
                        <button type="button" class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Close menu</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Links -->
                    <div class="mt-2">
                        <div class="border-b border-gray-200">
                            <div class="-mb-px flex gap-x-8 px-4" aria-orientation="horizontal" role="tablist">
                                <!-- Selected: "border-indigo-600 text-indigo-600", Not Selected: "border-transparent text-gray-900" -->
                                <button id="tabs-1-tab-1" class="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium" aria-controls="tabs-1-panel-1" role="tab" type="button">Women</button>
                            </div>
                        </div>

                        <!-- 'Women' tab panel, show/hide based on tab state. -->
                        <div id="tabs-1-panel-1" class="space-y-10 px-4 pb-8 pt-10" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
                            <div class="grid grid-cols-2 gap-x-4">
                                <div class="group relative text-sm">
                                    <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                        <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg" alt="Models sitting back to back, wearing Basic Tee in black and bone." class="object-cover object-center">
                                    </div>
                                    <a href="#" class="mt-6 block font-medium text-gray-900">
                                        <span class="absolute inset-0 z-10" aria-hidden="true"></span>
                                        {{ __('پرفروش ترین ها') }}
                                    </a>
                                    <p aria-hidden="true" class="mt-1">Shop now</p>
                                </div>
                                <div class="group relative text-sm">
                                    <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                        <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg" alt="Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees." class="object-cover object-center">
                                    </div>
                                    <a href="#" class="mt-6 block font-medium text-gray-900">
                                        <span class="absolute inset-0 z-10" aria-hidden="true"></span>
                                        Basic Tees
                                    </a>
                                    <p aria-hidden="true" class="mt-1">Shop now</p>
                                </div>
                            </div>
                            <div>
                                <p id="women-clothing-heading-mobile" class="font-medium text-gray-900">Clothing</p>
                                <ul role="list" aria-labelledby="women-clothing-heading-mobile" class="mt-6 flex flex-col space-y-6">
                                    <li class="flow-root">
                                        <a href="#" class="-m-2 block p-2 text-gray-500">Tops</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p id="women-accessories-heading-mobile" class="font-medium text-gray-900">Accessories</p>
                                <ul role="list" aria-labelledby="women-accessories-heading-mobile" class="mt-6 flex flex-col space-y-6">
                                    <li class="flow-root">
                                        <a href="#" class="-m-2 block p-2 text-gray-500">Watches</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p id="women-brands-heading-mobile" class="font-medium text-gray-900">Brands</p>
                                <ul role="list" aria-labelledby="women-brands-heading-mobile" class="mt-6 flex flex-col space-y-6">
                                    <li class="flow-root">
                                        <a href="#" class="-m-2 block p-2 text-gray-500">Full Nelson</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                        <div class="flow-root">
                            <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Company</a>
                        </div>
                        <div class="flow-root">
                            <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Stores</a>
                        </div>
                    </div>
                </div>
            </div>
        </div> --}}

        <header class="relative bg-white">
            {{-- <p class="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">Get free delivery on orders over $100</p> --}}

            <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="border-b border-gray-200">
                    <div class="flex h-16 items-center">
                        <!-- Mobile menu toggle, controls the 'mobileMenuOpen' state. -->
                        <button type="button" class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden">
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Open menu</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>

                        <!-- Logo -->
                        <div class="ms-4 flex lg:ms-0">
                            <a wire:navigate.hover href="{{ route('home') }}">
                                <span class="sr-only">{{ config('app.name') }}</span>
                                <img class="h-8 w-auto" src="{{ asset('favicon.ico') }}" alt="">
                            </a>
                        </div>

                        <!-- Flyout menus -->
                        <div class="hidden lg:ms-8 lg:block lg:self-stretch">
                            <div class="flex h-full gap-x-8">
                                <a href="{{ route('home') }}" wire:navigate.hover class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ __('خرید') }}</a>

                                <div x-data="{ isActive: false }" x-on:click.away="isActive = false;" class="flex">
                                    <div x-on:click="isActive = !isActive;" class="relative flex items-center">
                                        <button x-bind:class="{ 'border-green-700 text-green-700 hover:text-green-800': isActive }" type="button" class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out" :aria-expanded="isActive.toString()">{{ __('محصولات') }}</button>
                                        <x-heroicon-m-chevron-down x-bind:class="{ 'text-green-700 hover:text-green-800': isActive }" class="ms-1 w-4 h-4 text-gray-400" />
                                    </div>

                                    <!--
                                'Women' flyout menu, show/hide based on flyout menu state.
                                -->
                                    <div x-show="isActive" x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" class="absolute inset-x-0 top-full text-sm text-gray-500 z-50">
                                        <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                                        <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true"></div>

                                        <div class="relative bg-white">
                                            <div class="mx-auto max-w-7xl px-8">
                                                <div class="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                    <div class="col-start-2 grid grid-cols-2 gap-x-8">
                                                        <div class="group relative text-base sm:text-sm">
                                                            <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                <img src="{{ asset('assets/online-showcase.webp') }}" alt="online-showcase" class="object-cover object-center saturate-50">
                                                            </div>
                                                            <a href="#" class="mt-6 block font-medium text-gray-900 tracking-widest">
                                                                <span class="absolute inset-0 z-10" aria-hidden="true"></span>
                                                                {{ __('پرفروش ترین ها') }}
                                                            </a>
                                                            {{-- <p aria-hidden="true" class="mt-1">{{ __('نمایش همه') }}</p> --}}
                                                        </div>
                                                        <div class="group relative text-base sm:text-sm">
                                                            <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                <img src="{{ asset('assets/best-sellers.webp') }}" alt="best-sellers" class="object-cover object-center saturate-50">
                                                            </div>
                                                            <a href="#" class="mt-6 block font-medium text-gray-900 tracking-widest">
                                                                <span class="absolute inset-0 z-10" aria-hidden="true"></span>
                                                                {{ __('ویترین آنلاین') }}
                                                            </a>
                                                            {{-- <p aria-hidden="true" class="mt-1">{{ __('نمایش همه') }}</p> --}}
                                                        </div>
                                                    </div>
                                                    <div class="row-start-1 grid grid-cols-2 gap-x-8 gap-y-10 text-sm">
                                                        <div class="flex flex-col">
                                                            <p id="Clothing-heading" class="font-medium text-gray-900 flex-shrink pb-2">{{ __('دسته بندی ها') }}</p>
                                                            <hr class="border-t border-gray-200">
                                                            <div class="flex flex-col">
                                                                <ul role="list" aria-labelledby="Clothing-heading" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a href="#" wire:navigate.hover class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ __('پرفروشترین ها') }}</a>
                                <a href="{{ route('blogs.posts.index') }}" wire:navigate.hover class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ __('مجله گل و گیاه') }}</a>
                                <a href="{{ route('contacts.index') }}" wire:navigate.hover class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">{{ __('تماس با ما') }}</a>
                            </div>
                        </div>

                        <div class="ms-auto flex items-center">
                            <!-- Search -->
                            <div class="flex lg:ms-6">
                                <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Search</span>
                                    <x-heroicon-o-magnifying-glass class="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</div>
