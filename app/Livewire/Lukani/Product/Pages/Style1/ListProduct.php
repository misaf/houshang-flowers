<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Product\Pages\Style1;

use App\Services\Api\Product\ProductCategoryService;
use App\Services\Api\Product\ProductService;
use Livewire\Attributes\Layout;
use Livewire\Attributes\On;
use Livewire\Component;

#[Layout('layouts.lukani.app-contact')]
final class ListProduct extends Component
{
    public array $productCategories = [];

    public array $productCategoryParams = [];

    public array $productParams = [];

    public array $products = [];

    public array $selectedProductCategories = [];

    public string $sortOrder = '-position';

    protected $listeners = ['sortUpdated', 'productCategoriesUpdated'];

    public function loadMore(): void
    {
        $this->incrementPageNumber();
        $this->products = $this->mergeProducts($this->products, $this->fetchProducts());
    }

    public function mount(): void
    {
        $this->initializeProductParams();
        $this->initializeProductCategoryParams();
        $this->loadInitialData();
    }

    #[On('product-categories-updated')]
    public function productCategoriesUpdated(): void
    {
        $this->products = $this->fetchProducts();
    }

    public function render()
    {
        return view('livewire.lukani.product.pages.style-1.list-product', [
            'products'          => $this->products,
            'productCategories' => $this->productCategories,
        ]);
    }

    #[On('sort-updated')]
    public function sortUpdated(): void
    {
        $this->products = $this->fetchProducts();
    }

    public function updatedSelectedProductCategories(): void
    {
        $this->productParams['filter[with-productCategory][slug]'] = implode(',', $this->selectedProductCategories);
        $this->dispatch('product-categories-updated');
    }

    public function updatedSortOrder(): void
    {
        $this->productParams['sort'] = 'expensivest' === $this->sortOrder ? 'position' : '-position';
        $this->dispatch('sort-updated');
    }

    private function fetchProductCategories(): array
    {
        $productCategoryService = new ProductCategoryService();
        return $productCategoryService->listProductCategories($this->getProductCategoryParams());
    }

    private function fetchProducts(): array
    {
        $productService = new ProductService();
        return $productService->listProducts($this->getProductParams());
    }

    private function getProductCategoryParams(): array
    {
        return $this->productCategoryParams;
    }

    private function getProductParams(): array
    {
        return $this->productParams;
    }

    private function incrementPageNumber(): void
    {
        $this->productParams['page[number]']++;
    }

    private function initializeProductCategoryParams(): void
    {
        $this->productCategoryParams = [
            'fields[products]' => 'name,slug',
            'sort'             => '-position',
            'page[size]'       => 12,
        ];
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
        $this->productCategories = $this->fetchProductCategories();
    }

    private function mergeProducts(array $existingProducts, array $newProducts): array
    {
        return array_merge_recursive($existingProducts, $newProducts);
    }
}
