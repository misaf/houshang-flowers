<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Blog\BlogPost\Pages\Style1;

use App\Services\Api\Blog\BlogPostService;
use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.lukani.app-contact')]
final class ShowBlogPost extends Component
{
    public string $slug;

    public function render()
    {
        $blogPost = (new BlogPostService())->viewBlogPost(
            slug: $this->slug,
            queryParams: [
                'fields[blog-posts]'           => 'name,description,slug,blogPostCategory,multimedia',
                'fields[blog-post-categories]' => 'name,slug',
                'fields[multimedia]'           => 'uuid,name,file_name',
                'filter[status]'               => true,
                'sort'                         => '-position',
                'page[size]'                   => 1,
                'include'                      => 'blogPostCategory,multimedia',
            ],
        );

        return view('livewire.lukani.blog.blog-post.pages.style-1.show-blog-post', compact('blogPost'));
    }
}
