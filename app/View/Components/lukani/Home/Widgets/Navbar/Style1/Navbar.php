<?php

declare(strict_types=1);

namespace App\View\Components\lukani\Home\Widgets\Navbar\Style1;

use App\Services\Api\Product\ProductCategoryService;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Cache;
use Illuminate\View\Component;

final class Navbar extends Component
{
    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        dd(1);
        $productCategories = (new ProductCategoryService())->listProductCategories(
            queryParams: [
                'fields[product-categories]' => 'name,description',
                'filter[status]'            => true,
                'sort'                      => '-position',
                'page[size]'                => 12,
            ],
        );

        return view('components.lukani.home.widgets.navbar.style1.navbar', compact('productCategories'));
    }
}
