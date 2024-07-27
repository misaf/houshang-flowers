<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Product;

use App\Livewire\Lukani\Product\Pages\Style1\ListProduct;
use App\Services\Api\Product\ProductCategoryService;
use Livewire\Component;

final class ProductCategoryFilter extends Component
{
    public array $productCategories = [];

    public array $productCategoryParams = [];

    public array $selectedProductCategories = [];

    public function mount(): void
    {
        $this->initializeProductCategoryParams();
        $this->loadInitialData();
    }

    public function render()
    {
        return view('livewire.lukani.product.product-category-filter', [
            'productCategories' => $this->productCategories,
        ]);
    }

    public function updatedSelectedProductCategories(): void
    {
        $this->dispatch('product-categories-updated', $this->selectedProductCategories)->to(ListProduct::class);
    }

    private function fetchProductCategories(): array
    {
        $productCategoryService = new ProductCategoryService();
        return $productCategoryService->listProductCategories($this->getProductCategoryParams());
    }

    private function getProductCategoryParams(): array
    {
        return $this->productCategoryParams;
    }

    private function initializeProductCategoryParams(): void
    {
        $this->productCategoryParams = [
            'fields[products]' => 'name,slug',
            'sort'             => '-position',
            'page[size]'       => 12,
        ];
    }

    private function loadInitialData(): void
    {
        $this->productCategories = $this->fetchProductCategories();
    }
}
