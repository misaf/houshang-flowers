<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\View\View;
use Termehsoft\Product\Models\ProductCategory;

final class ProductCategoryController extends Controller
{
    public function index(): View
    {
        $productCategories = ProductCategory::filter([
            'category' => request()->query('category'),
        ])
            ->where('status', 'Enable')
            ->oldest('id')
            ->paginate(6);

        return view(config('settings.ADMIN_TEMPLATE') . '.product.category.index', compact('productCategories'));
    }
}
