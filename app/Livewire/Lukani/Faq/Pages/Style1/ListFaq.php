<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Faq\Pages\Style1;

use App\Services\Api\Faq\FaqService;
use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.lukani.app')]
final class ListFaq extends Component
{
    public function render()
    {
        $faqs = (new FaqService())->listFaqs(
            queryParams: [
                // 'fields[blog-posts]' => 'name,description,slug',
                'filter[status]'     => true,
                'sort'               => '-position',
                'page[size]'         => 12,
            ],
        );

        return view('livewire.lukani.blog.blog-post.pages.list-blog-post', compact('blogPosts'));
    }
}
