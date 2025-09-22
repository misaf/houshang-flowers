@props(['inStock', 'price'])

<div>
    @if ($price)
        <p>{{ number_format(0) . ' تومان' }}</p>
    @else
        <p>{{ __('تماس بگیرید') }}</p>
    @endif
</div>
