@props(['socialLinks'])

<div class="mt-10 border-t border-gray-200 pt-10">
    <h3 class="text-sm font-medium text-gray-900 text-center">{{ __('Share on Social Networks') }}</h3>

    <ul class="mt-4 flex items-center justify-center gap-x-2" role="list">
        @foreach ($socialLinks as $link)
            <x-sharing-social-link :href="$link['href']" :label="$link['label']" svgClass="{{ $link['svgClass'] }}" fillRule="{{ $link['fillRule'] }}" svgPath="{{ $link['svgPath'] }}" viewBox="{{ $link['viewBox'] }}" />
        @endforeach
    </ul>
</div>
