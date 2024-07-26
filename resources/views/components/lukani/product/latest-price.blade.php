@props(['inStock', 'price'])

<div>
    @if ($price)
        <p>{{ number_format($price) . ' تومان' }}</p>
    @else
        <p>{{ __('تماس بگیرید') }}</p>
    @endif
</div>
