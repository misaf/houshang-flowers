<section class="bg-slate-100 dark:bg-gray-900 rounded-md">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-md sm:text-center">
            <h2 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">{{ __('اشتراک در خبرنامه') }}</h2>
            <p class="mx-auto mb-8 max-w-2xl font-light text-start text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">{{ __('با عضویت در خبرنامه ما، اخبار، مقالات جذاب، نکات مفید و به‌روزرسانی‌های ویژه را به صورت مستقیم در ایمیل خود دریافت کنید. همیشه به روز باشید و از مطالب متنوع و مفید ما بهره‌مند شوید.') }}</p>
            <form action="#">
                <div class="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                    <div class="relative w-full rtl:order-1">
                        <label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ __('آدرس پست الکترونیکی') }}</label>
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <x-bi-envelope-fill class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            <span class="sr-only">{{ __('Email') }}</span>
                        </div>
                        <input dir="ltr" class="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="{{ __('آدرس پست الکترونیکی خود را وارد نمایید') }}" type="email" id="email" required="">
                    </div>
                    <div>
                        <button type="submit" class="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-zinc-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-zinc-800 focus:ring-4 focus:ring-primary-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-primary-800">{{ __('مشترک شوید') }}</button>
                    </div>
                </div>
                <div class="mx-auto max-w-screen-sm text-sm text-start text-gray-500 newsletter-form-footer dark:text-gray-300">{{ __('ما به حفاظت از اطلاعات شما اهمیت ویژه‌ای می‌دهیم. لطفاً سیاست حفظ حریم خصوصی ما را مطالعه فرمایید.') }} {{-- <a href="#" class="font-medium text-slate-600 dark:text-slate-500 hover:underline">Read our Privacy Policy</a>. --}}</div>
            </form>
        </div>
    </div>
</section>
