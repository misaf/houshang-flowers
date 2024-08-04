<footer class="bg-white dark:bg-gray-900">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
                <a href="{{ config('app.url') }}" class="flex items-center">
                    <img src="{{ asset('assets/enamad.webp') }}" class="saturate-50" />
                </a>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{{ __('لینک های مفید') }}</h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                        <li class="mb-4">
                            <a wire:navigate.hover href="{{ route('products.index') }}" class="hover:underline">{{ __('محصولات') }}</a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="hover:underline">{{ __('گیاهان لوکس') }}</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline">{{ __('پرسش و پاسخ') }}</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{{ __('اطلاعات فروشگاه') }}</h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                        <li class="mb-4">
                            <a wire:navigate.hover href="{{ route('contacts.index') }}" class="hover:underline ">{{ __('درباره ما') }}</a>
                        </li>
                        <li class="mb-4">
                            <a href="#" class="hover:underline ">{{ __('نحوه پرداخت') }}</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline">{{ __('ثبت شکایات') }}</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">{{ __('خدمات مشتریان') }}</h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                        <li class="mb-4">
                            <a href="#" class="hover:underline">{{ __('حریم خصوصی کاربران') }}</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline">{{ __('قوانین و مقررات') }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
            <div class="flex flex-col mt-4 sm:justify-center sm:mt-0 gap-x-5">
                <div class="mb-2">
                    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">{{ __('تمامی حقوقی این سایت محفوظ و منوط به مجتمع گل و گیاه هوشنگ می باشد.') }}</span>
                </div>
                <div>
                    <a href="tel:+989125649438" class="text-sm text-gray-500 sm:text-center dark:text-gray-400">{{ __('طراحی و توسعه توسط ترمه سافت') }}</a>
                </div>
            </div>
            <div class="flex mt-4 sm:justify-center sm:mt-0 gap-x-5">
                <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white" title="{{ __('Telegram') }}">
                    <x-bi-telegram class="w-4 h-4" />
                    <span class="sr-only">{{ __('Telegram') }}</span>
                </a>
                <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white" title="{{ __('Instagram') }}">
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
    </div>
</footer>
