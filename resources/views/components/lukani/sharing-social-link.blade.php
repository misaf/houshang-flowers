<li>
    <a href="{{ $href }}" class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500" aria-label="{{ $label }}">
        <span class="sr-only">{{ $label }}</span>
        <svg class="{{ $svgClass }}" aria-hidden="true" fill="currentColor" viewBox="{{ $viewBox }}">
            <path fill-rule="{{ $fillRule }}" d="{{ $svgPath }}"></path>
        </svg>
    </a>
</li>
