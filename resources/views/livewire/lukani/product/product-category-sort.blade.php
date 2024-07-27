<div>
    <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button" class="gap-x-2 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
        <x-fwb-o-arrow-sort-letters class="h-4 w-4" />
        {{ __('مرتب سازی') }}
        <x-fwb-o-angle-down class="h-3 w-3" />
    </button>

    <div id="dropdownSort1" class="z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-placement="bottom">
        <ul class="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400" aria-labelledby="sortDropdownButton">
            <li x-on:click="$wire.set('sort', 'expensivest')">
                <a x-on:click="$wire.set('sort', 'expensivest')" href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">{{ __('گرانترین') }}</a>
            </li>
            <li x-on:click="$wire.set('sort', 'cheapest')">
                <a x-on:click="$wire.set('sort', 'cheapest')" href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">{{ __('ارزانترین') }}</a>
            </li>
        </ul>
    </div>
</div>
