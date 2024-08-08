<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Product;

use App\Livewire\Lukani\Product\Pages\Style1\ListProduct;
use App\Services\Api\Product\ProductCategoryService;
use Livewire\Attributes\Url;
use Livewire\Component;

final class ProductCategoryFilter extends Component
{
    public array $productCategories = [];

    public array $productCategoryParams = [];

    public array|string|null $selected;

    // #[Url(as: 'category', history: true)]
    // public array|string|null $querySelectedCategory = '';

    public function mount(array|string $querySelectedCategory): void
    {
        $this->selected = $querySelectedCategory;

        if ( ! is_array($querySelectedCategory)) {
            $this->selected = [$querySelectedCategory];
        }

        $this->dispatch('product-categories-updated', implode(',', $this->querySelectedCategory))->to(ListProduct::class);

        $this->querySelectedCategory = explode(',', $this->querySelectedCategory);

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
        $productCategoryService = new ProductCategoryService();
        return $productCategoryService->listProductCategories($this->getParams());
    }

    private function getParams(): array
    {
        return $this->productCategoryParams;
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
