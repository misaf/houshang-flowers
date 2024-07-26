<?php

declare(strict_types=1);

namespace App\View\Components\Product;

use App\Services\Api\Product\ProductService;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

final class Product extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        private ProductService $productService,
        private array $productCategory = [],
    ) {}

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View
    {
        $products = $this->productService->listProducts(queryParams: $this->buildQueryParams());

        return view('components.product.product', compact('products'));
    }

    /**
     * Build the query parameters.
     *
     * @return array
     */
    private function buildQueryParams(): array
    {
        $array = [];

        if ( ! empty($this->productCategory['id'])) {
            $array['filter']['product-category'] = $this->productCategory['id'];
        }

        return array_merge($array, $this->defaultParams());
    }

    /**
     * Build the default query parameters.
     *
     * @return array
     */
    private function defaultParams(): array
    {
        return [
            'sort'       => 'random-position',
            'include'    => 'multimedia,latestProductPrice',
            'page[size]' => 12,
        ];
    }
}
