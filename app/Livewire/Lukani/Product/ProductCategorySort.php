<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Product;

use App\Livewire\Lukani\Product\Pages\Style1\ListProduct;
use Livewire\Component;

final class ProductCategorySort extends Component
{
    public string $sort = '-position';

    public function render()
    {
        return view('livewire.lukani.product.product-category-sort');
    }

    public function updatedSort(): void
    {
        $this->dispatch('sort-updated', $this->sort)->to(ListProduct::class);
    }
}
