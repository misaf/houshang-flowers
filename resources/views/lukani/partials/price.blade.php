@php
    if (isset($product['relationships']['productPrice']['data']) && is_array($product['relationships']['productPrice']['data'])) {
        $price = collect($products['included'])
            ->where('type', 'product-prices')
            ->where('id', $product['relationships']['productPrice']['data']['id'])
            ->value('attributes');
    }
@endphp

@if (isset($price))
    <p>{{ $product['attributes']['in_stock'] && isset($price) ? number_format($price['price']['amount']) . ' تومان' : 'تماس بگیرید' }}</p>
@endif
