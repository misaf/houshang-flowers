<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="description" content="{{ config('settings.CMS_DESCRIPTION') }}" />
    <meta name="keywords" content="{{ config('settings.CMS_KEYWORDS') }}" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>{{ __('مجتمع گل و گیاه هوشنگ') }} - {{ $pageTitle ?? '' }}</title>

    @livewireStyles
    @vite(['resources/css/app.css'])
    @stack('stylesheets')

    <!-- Google tag (gtag.js) -->
    <x-google-analytics />
</head>

<body>
    <!-- Navbar -->
    <x-lukani.home.widgets.navbar.style-1.navbar />

    <div class="container mx-auto">
        {{ $slot }}
    </div>

    <hr class="my-6 h-px border-none bg-gray-200 dark:bg-gray-700" />

    <!-- Footer -->
    <x-lukani.home.widgets.footer.style-1.footer />

    @livewireScriptConfig
    @vite(['resources/js/app.js'])
    @stack('scripts')
</body>

</html>
