<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Blog\BlogPost;
use App\Models\Page\Page;
use App\Models\Product\Product;
use Illuminate\View\View;
use Termehsoft\Faq\Models\Faq;

final class SearchController extends Controller
{
    public function index(): View
    {
        $blogPosts = BlogPost::filter([
            'search' => request()->query('search'),
        ])->where('status', 'Enable')->get();

        $faqs = Faq::filter([
            'search' => request()->query('search'),
        ])->where('status', 'Enable')->get();

        $products = Product::filter([
            'search' => request()->query('search'),
        ])->where('status', 'Enable')->get();

        $pages = Page::filter([
            'search' => request()->query('search'),
        ])->where('status', 'Enable')->get();

        return view(config('settings.ADMIN_TEMPLATE') . '.search', compact('blogPosts', 'faqs', 'products', 'pages'));
    }
}
