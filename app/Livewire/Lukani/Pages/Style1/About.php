<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Pages\Style1;

use App\Services\Api\Product\ProductCategoryService;
use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.lukani.app')]
final class About extends Component
{
    public function render()
    {
        $productCategories = (new ProductCategoryService())->listProductCategories(
            queryParams: [
                'fields[product-categories]' => 'name',
                'filter[status]'             => true,
                'sort'                       => '-position',
                'page[size]'                 => 1,
            ],
        );

        return view('livewire.lukani.pages.about', compact('productCategories'));
    }
}
