<?php

declare(strict_types=1);

namespace App\View\Components\Product;

use App\Services\Api\Product\ProductService;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

final class SimilarProducts extends Component
{
    public function __construct(private ProductService $productService, private array $product) {}

    public function render(): View|Closure|string
    {
        $productCategoryId = $this->product['relationships']['productCategory']['data']['id'];
        $productId = $this->product['id'];

        $queryParams = [
            'filter[product_category_id]' => $productCategoryId,
            'filter[exclude]'             => $productId,
        ];

        $products = $this->productService->listProducts(
            queryParams: $queryParams,
        );

        return view('components.lukani.product.similar-products', compact('products'));
    }
}
