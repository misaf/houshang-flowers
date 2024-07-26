<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Blog\BlogPost\Widgets\Style1;

use App\Services\Api\Blog\BlogPostService;
use Livewire\Component;

final class RelatedBlogPosts extends Component
{
    public $blogPost;

    public function render()
    {
        $similarBlogPosts = (new BlogPostService())->listBlogPosts(
            queryParams: [
                'fields[blog-posts]'           => 'name,description,slug,multimedia',
                'filter[exclude]'              => [$this->blogPost['data'][0]['id']],
                'filter[blog-post-category]'   => $this->blogPost['included'][0]['id'],
                'fields[multimedia]'           => 'uuid,name,file_name',
                'filter[status]'               => true,
                'sort'                         => 'random-position',
                'page[size]'                   => 4,
                'include'                      => 'multimedia',
            ],
        );

        return view('livewire.lukani.blog.blog-post.widgets.style-1.related-blog-posts', compact('similarBlogPosts'));
    }
}
