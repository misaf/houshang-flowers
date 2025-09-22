<?php

declare(strict_types=1);

namespace App\View\Components\Product;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

final class LatestPrice extends Component
{
    public function __construct(public array $products, public array $product) {}

    public function render(): View|Closure|string
    {
        $inStock = $this->inStock();
        // $price = $this->getPrice();
        $price = 0;

        return view('components.lukani.product.latest-price', compact('inStock', 'price'));
    }

    private function getPrice(): ?string
    {
        if (empty($this->product['relationships']['latestProductPrice']['data'])) {
            return null;
        }

        if ( ! $this->inStock()) {
            return null;
        }

        $productPriceId = $this->product['relationships']['latestProductPrice']['data']['id'];

        $productPrice = collect($this->products['included'])
            ->where('type', $this->product['relationships']['latestProductPrice']['data']['type'])
            ->where('id', $productPriceId)
            ->first();

        return $productPrice ? $productPrice['attributes']['price']['amount'] : null;
    }

    private function inStock(): bool
    {
        return $this->product['attributes']['in_stock'];
    }
}
