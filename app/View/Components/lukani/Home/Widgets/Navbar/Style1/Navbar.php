<?php

declare(strict_types=1);

namespace App\View\Components\lukani\Home\Widgets\Navbar\Style1;

use App\Services\Api\Product\ProductCategoryService;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Cache;
use Illuminate\View\Component;

final class Navbar extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct() {}

    /**
     * Get the view / contents that represent the component.
     *
     * @return View
     */
    public function render(): View
    {
        $productCategories = Cache::rememberForever('navbar', function () {
            return (new ProductCategoryService())->listProductCategories(
                queryParams: [
                    'fields[product-categories' => 'name,description',
                    'filter[status]'            => true,
                    'sort'                      => '-position',
                    'page[size]'                => 12,
                ],
            );
        });

        return view('components.lukani.home.widgets.navbar.style-1.navbar', compact('productCategories'));
    }
}
