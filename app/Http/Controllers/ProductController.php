<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\Api\Product\ProductService;
use Illuminate\Http\Request;
use Illuminate\View\View;

final class ProductController extends Controller
{
    public function __construct(public ProductService $productService) {}

    public function index(Request $request): View
    {
        $customQueryParams = $this->buildQueryParams($request->input('search'), $request->query('category'));
        $customQueryParams['include'] = 'productPrice,multimedia';

        $products = $this->productService->listProducts(
            queryParams: $customQueryParams,
        );

        return view('lukani.product', compact('products'));
    }

    public function show(string $token): View
    {
        $product = $this->productService->viewProduct(
            token: $token,
            queryParams: [
                'include' => 'productCategory,productPrice,multimedia',
            ],
        );

        $products = $this->productService->listProducts(
            queryParams: [
                'include' => 'productPrice,multimedia',
            ],
        );

        return view('lukani.product-show', compact('product', 'products'));
    }

    private function buildQueryParams(?string $search, ?string $category): array
    {
        $customQueryParams = [];

        if (null !== $search) {
            $customQueryParams['filter[name]'] = $search;
        }

        if (null !== $category) {
            $customQueryParams['filter[product_category_id]'] = $category;
        }

        return $customQueryParams;
    }
}
