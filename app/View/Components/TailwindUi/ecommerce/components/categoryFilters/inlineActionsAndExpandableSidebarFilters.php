<?php

declare(strict_types=1);

namespace App\View\Components\TailwindUi\ecommerce\components\categoryFilters;

use App\Services\Api\Product\ProductCategoryService;
use App\Services\Api\Product\ProductService;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

final class inlineActionsAndExpandableSidebarFilters extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        private ProductService $productService,
        private ProductCategoryService $productCategoryService,
    ) {}

    /**
     * Get the view / contents that represent the component.
     *
     * @return View
     */
    public function render(): View
    {
        $products = $this->productService->listProducts(queryParams: $this->buildQueryParams());

        $productCategories = $this->productCategoryService->listProductCategories(queryParams: [
            'fields[blog-post-categories]' => 'name',
            'filter[status]'               => true,
            'sort'                         => '-position',
            'page[size]'                   => 12,
        ]);

        return view('components.tailwind-ui.ecommerce.components.category-filters.inline-actions-and-expandable-sidebar-filters', compact('products', 'productCategories'));
    }

    /**
     * Build the query parameters.
     *
     * @return array
     */
    private function buildQueryParams(): array
    {
        return $this->defaultParams();
    }

    /**
     * Build the default query parameters.
     *
     * @return array
     */
    private function defaultParams(): array
    {
        return [
            'sort'       => '-position',
            'include'    => 'multimedia,latestProductPrice',
            'page[size]' => 16,
        ];
    }
}
