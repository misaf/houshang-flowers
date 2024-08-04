@if ($this->hasMorePages())
    <button wire:click="loadMore()" wire:loading.class="opacity-50" wire:loading.attr="disabled" type="button" class="rounded-lg border border-gray-200 bg-green-900 px-5 py-2.5 text-sm font-medium text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
        {{ __('نمایش بیشتر') }}
    </button>
@endif
