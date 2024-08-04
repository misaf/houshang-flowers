<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Product\Pages\Style1;

use App\Services\Api\Product\ProductService;
use Livewire\Attributes\Layout;
use Livewire\Attributes\On;
use Livewire\Component;

#[Layout('layouts.lukani.app-contact')]
final class ListProductCategory extends Component
{
    public array $productParams = [];

    public array $products = [];

    public function loadMore(): void
    {
        $this->incrementPageNumber();
        $this->products = $this->mergeProducts($this->products, $this->fetchProducts());
    }

    public function mount(): void
    {
        $this->initializeProductParams();
        $this->loadInitialData();
    }

    #[On('product-categories-updated')]
    public function productCategoriesUpdated(array $selected): void
    {
        $this->productParams['filter[with-productCategory][slug]'] = implode(',', $selected);

        $this->products = $this->fetchProducts();
    }

    #[On('sort-updated')]
    public function sortUpdated(string $sort): void
    {
        $this->productParams['sort'] = 'expensivest' === $sort ? 'position' : '-position';

        $this->products = $this->fetchProducts();
    }

    public function render()
    {
        return view('livewire.lukani.product.pages.style-1.list-product', [
            'products' => $this->products,
        ]);
    }

    private function fetchProducts(): array
    {
        $productService = new ProductService();
        return $productService->listProducts($this->getProductParams());
    }

    private function getProductParams(): array
    {
        return $this->productParams;
    }

    private function incrementPageNumber(): void
    {
        $this->productParams['page[number]']++;
    }

    private function initializeProductParams(): void
    {
        $this->productParams = [
            'fields[products]'           => 'name,description,slug,token,in_stock,productCategory,latestProductPrice,multimedia',
            'fields[product-categories]' => 'name',
            'fields[product-prices]'     => 'price',
            'fields[multimedia]'         => 'uuid,name,file_name',
            'sort'                       => '-position',
            'page[size]'                 => 12,
            'page[number]'               => 1,
            'include'                    => 'productCategory,multimedia,latestProductPrice',
        ];
    }

    private function loadInitialData(): void
    {
        $this->products = $this->fetchProducts();
    }

    private function mergeProducts(array $existingProducts, array $newProducts): array
    {
        return array_merge_recursive($existingProducts, $newProducts);
    }
}
