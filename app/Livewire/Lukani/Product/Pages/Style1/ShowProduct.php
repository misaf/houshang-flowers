<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Product\Pages\Style1;

use App\Services\Api\Product\ProductService;
use Illuminate\Support\Facades\Cache;
use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.lukani.app')]
final class ShowProduct extends Component
{
    public string $slug;

    public string $token;

    public function render()
    {
        $product = Cache::remember('show-product', 30, function () {
            return (new ProductService())->viewProduct(
                token: $this->token,
                queryParams: [
                    'fields[products]'           => 'name,description,slug,productCategory,multimedia',
                    'fields[product-categories]' => 'name,slug',
                    'fields[multimedia]'         => 'uuid,name,file_name',
                    'sort'                       => '-position',
                    'page[size]'                 => 1,
                    'include'                    => 'productCategory,multimedia',
                ],
            );
        });

        return view('livewire.lukani.product.pages.style-1.show-product', compact('product'));
    }
}
