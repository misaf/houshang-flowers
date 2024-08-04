@props(['image'])

<div>
    <picture>
        <source srcset="{{ \Storage::disk('panel')->url($image['attributes']['uuid'] . '/conversions/' . $fileName . '-extra-large.webp') }}" media="(max-width: 640px)">
        <source srcset="{{ \Storage::disk('panel')->url($image['attributes']['uuid'] . '/conversions/' . $fileName . '-extra-large.webp') }}" media="(max-width: 1024px)">
        <source srcset="{{ \Storage::disk('panel')->url($image['attributes']['uuid'] . '/conversions/' . $fileName . '-extra-large.webp') }}" media="(min-width: 1025px)">
        <img src="{{ \Storage::disk('panel')->url($image['attributes']['uuid'] . '/conversions/' . $fileName . '-extra-large.webp') }}" {{ $attributes }}>
    </picture>
</div>
