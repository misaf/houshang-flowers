<?php

declare(strict_types=1);

namespace App\Services\Api\Blog;

use App\DataTransferObjects\Blog\BlogPostCategoryDto;
use App\Services\Api\ApiService;
use Illuminate\Support\Arr;

final class BlogPostCategoryService extends ApiService
{
    public function fetchBlogPostCategories(BlogPostCategoryDto $dto): array
    {
        return $this->get(
            endpoint: 'blog-post-categories',
            queryParams: $this->buildParams($dto->queryParams),
        );
    }

    public function listBlogPostCategories(?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['page[size]' => 12], $queryParams);

        return $this->fetchBlogPostCategories(new BlogPostCategoryDto(
            queryParams: $customQueryParams,
        ));
    }

    public function viewBlogPostCategory(string $slug, ?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['filter[slug]' => $slug], $queryParams);

        $response = $this->listBlogPostCategories(
            queryParams: $customQueryParams,
        );

        return Arr::first($response['data']);
    }
}
