<?php

declare(strict_types=1);

namespace App\DataTransferObjects\Blog;

final class BlogPostCategoryDto
{
    public array $queryParams;

    public function __construct(?array $queryParams = [])
    {
        $this->queryParams = $queryParams ?? [];
    }
}
