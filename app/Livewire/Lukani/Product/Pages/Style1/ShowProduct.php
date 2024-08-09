<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Product\Pages\Style1;

use App\Services\Api\Product\ProductService;
use Illuminate\Support\Facades\Cache;
use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.lukani.app-contact')]
final class ShowProduct extends Component
{
    public string $slug;

    public string $token;

    public function render()
    {
        // $product = Cache::remember('show-product-' . $this->token, 180, function () {
        $product = (new ProductService())->viewProduct(
            token: $this->token,
            queryParams: [
                'fields[products]'           => 'name,description,slug,token,in_stock,productCategory,latestProductPrice,multimedia',
                'fields[product-categories]' => 'name',
                'fields[product-prices]'     => 'price',
                'fields[multimedia]'         => 'uuid,name,file_name',
                'sort'                       => '-position',
                'page[size]'                 => 12,
                'page[number]'               => 1,
                'include'                    => 'productCategory,multimedia,latestProductPrice',
            ],
        );
        // });

        // dd($product);

        return view('livewire.lukani.product.pages.style-1.show-product', compact('product'));
    }
}
