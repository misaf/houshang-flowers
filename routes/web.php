<?php

declare(strict_types=1);

use App\Http\Controllers\PageController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;
use Livewire\Livewire;

Livewire::setUpdateRoute(fn($handle) => Route::post('/livewire/update', $handle));

Route::get('/', App\Livewire\Lukani\Pages\Style1\Home::class)->name('home');
Route::get('contacts', App\Livewire\Lukani\Pages\Style1\Contact::class)->name('contacts.index');
Route::post('contacts', App\Livewire\Lukani\Pages\Style1\Contact::class)->name('contacts.store');
Route::get('faqs', App\Livewire\Lukani\Faq\Pages\Style1\ListFaq::class)->name('faqs.index');
Route::prefix('blogs')->name('blogs.')->group(function (): void {
    Route::get('posts', App\Livewire\Lukani\Blog\BlogPost\Pages\Style1\ListBlogPost::class)->name('posts.index');
    Route::get('posts/{slug}/show', App\Livewire\Lukani\Blog\BlogPost\Pages\Style1\ShowBlogPost::class)->name('posts.show');
});
Route::prefix('products')->name('products.')->group(function (): void {
    Route::get('posts/{slug}/show', App\Livewire\Lukani\Blog\BlogPost\Pages\Style1\ShowBlogPost::class)->name('posts.show');
});
Route::get('products', App\Livewire\Lukani\Product\Pages\Style1\ListProduct::class)->name('products.index');
Route::get('products/{token}/{slug}', App\Livewire\Lukani\Product\Pages\Style1\ShowProduct::class)->name('products.show');
Route::get('search', [SearchController::class, 'index'])->name('search.index');
Route::get('pages/{page:slug}', [PageController::class, 'show'])->name('pages.show');
