<section class="bg-white dark:bg-gray-900">
    <div class="mx-auto px-4 py-16 space-y-8">
        @foreach ($faqs['data'] as $faq)
            <div class="p-8 bg-gray-100 rounded-lg dark:bg-gray-800" x-clock x-data="{ isOpen: false }">
                <button class="flex items-center justify-between w-full" x-clock x-on:click="isOpen = !isOpen">
                    <h1 class="font-semibold text-gray-700 dark:text-white">{{ $faq['attributes']['name'] }}</h1>

                    <span class="rounded-full text-white bg-green-800">
                        <svg class="w-6 h-6" x-clock x-show="isOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"></path>
                        </svg>

                        <svg class="w-6 h-6" x-clock x-show="!isOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </span>
                </button>

                <div class="mt-6 text-sm text-gray-500 dark:text-gray-300" x-clock x-show.important="isOpen" x-transition>{!! $faq['attributes']['description'] !!}</div>
            </div>
        @endforeach
    </div>
</section>
