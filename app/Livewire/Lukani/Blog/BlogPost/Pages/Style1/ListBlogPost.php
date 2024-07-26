<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Blog\BlogPost\Pages\Style1;

use App\Services\Api\Blog\BlogPostService;
use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.lukani.app-contact')]
final class ListBlogPost extends Component
{
    public function render()
    {
        $blogPosts = (new BlogPostService())->listBlogPosts(
            queryParams: [
                // 'fields[blog-posts]' => 'name,description,slug',
                'filter[status]'     => true,
                'sort'               => '-position',
                'page[size]'         => 12,
                'include'            => 'blogPostCategory,multimedia',
            ],
        );

        return view('livewire.lukani.blog.blog-post.pages.style-1.list-blog-post', compact('blogPosts'));
    }
}
