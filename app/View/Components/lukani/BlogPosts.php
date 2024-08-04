<?php

declare(strict_types=1);

namespace App\View\Components\Lukani;

use App\Services\Api\Blog\BlogPostService;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

final class BlogPosts extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(private BlogPostService $blogPostService) {}

    /**
     * Get the view / contents that represent the component.
     *
     * @return View
     */
    public function render(): View
    {
        $blogPosts = $this->blogPostService->listBlogPosts(queryParams: $this->buildQueryParams());

        return view('components.lukani.blog-posts', compact('blogPosts'));
    }

    /**
     * Build the query parameters for listing blog posts.
     *
     * @return array
     */
    private function buildQueryParams(): array
    {
        return [
            'fields[blog-post-categories]'            => 'name',
            'filter[with-blog-post-category][status]' => true,
            'fields[blog-posts]'                      => 'name,description,slug,created_at,blogPostCategory',
            'filter[status]'                          => true,
            'sort'                                    => 'random-position',
            'include'                                 => 'blogPostCategory',
            'page[size]'                              => 6,
        ];
    }
}
