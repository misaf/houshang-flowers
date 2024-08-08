<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Product;

use App\Livewire\Lukani\Product\Pages\Style1\ListProduct;
use App\Services\Api\Product\ProductCategoryService;
use Livewire\Component;

final class ProductCategoryFilter extends Component
{
    public array $productCategories = [];

    public array|string|null $selected;

    private array $productCategoryParams = [];

    public function mount(array|string $querySelectedCategory): void
    {
        $this->selected = is_array($querySelectedCategory) ? $querySelectedCategory : [$querySelectedCategory];
        $this->initializeParams();
        $this->loadInitialData();
    }

    public function render()
    {
        return view('livewire.lukani.product.product-category-filter', [
            'productCategories' => $this->productCategories,
        ]);
    }

    public function updatedSelected(): void
    {
        $this->dispatch('product-categories-updated', $this->selected)->to(ListProduct::class);
    }

    private function fetch(): array
    {
        $productCategoryService = new ProductCategoryService(); // Direct instantiation
        return $productCategoryService->listProductCategories($this->productCategoryParams);
    }

    private function initializeParams(): void
    {
        $this->productCategoryParams = [
            'fields[products]' => 'name,slug',
            'sort'             => '-position',
            'page[size]'       => 12,
        ];
    }

    private function loadInitialData(): void
    {
        $this->productCategories = $this->fetch();
    }
}
