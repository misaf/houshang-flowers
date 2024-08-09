<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Product\Widgets\Style1;

use App\Services\Api\Product\ProductCategoryService;
use Livewire\Attributes\Lazy;
use Livewire\Component;

#[Lazy(isolate: false)]
final class Product extends Component
{
    public function render()
    {
        $productCategories = (new ProductCategoryService())->listProductCategories(
            queryParams: [
                'fields[product-categories]' => 'name',
                'filter[status]'             => true,
                'sort'                       => '-position',
                'page[size]'                 => 4,
                'page[number]'               => 1,
            ],
        );

        return view('livewire.lukani.product.widgets.style-1.product', compact('productCategories'));
    }
}
