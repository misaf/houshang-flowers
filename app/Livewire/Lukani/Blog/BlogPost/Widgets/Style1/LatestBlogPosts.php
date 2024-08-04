<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Blog\BlogPost\Widgets\Style1;

use App\Services\Api\Blog\BlogPostService;
use Livewire\Attributes\Lazy;
use Livewire\Component;

#[Lazy]
final class LatestBlogPosts extends Component
{
    public function placeholder(array $params = [])
    {
        return view('livewire.lukani.blog.blog-post.widgets.style1.placeholders.latest-blog-posts', $params);
    }

    public function render()
    {
        $blogPosts = (new BlogPostService())->listBlogPosts(
            queryParams: [
                'fields[blog-posts]' => 'name,description,slug,created_at,blogPostCategory',
                'filter[status]'     => true,
                'sort'               => 'random-position',
                'page[size]'         => 3,
                'include'            => 'blogPostCategory',
            ],
        );

        return view('livewire.lukani.blog.blog-post.widgets.style1.latest-blog-posts', compact('blogPosts'));
    }
}
