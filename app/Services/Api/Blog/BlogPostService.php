<?php

declare(strict_types=1);

namespace App\Services\Api\Blog;

use App\DataTransferObjects\Blog\BlogPostDto;
use App\Services\Api\ApiService;

final class BlogPostService extends ApiService
{
    public function fetchBlogPosts(BlogPostDto $dto): array
    {
        return $this->get(
            endpoint: 'blog-posts',
            queryParams: $this->buildParams($dto->queryParams),
        );
    }

    public function listBlogPosts(?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['page[size]' => 12], $queryParams);

        return $this->fetchBlogPosts(new BlogPostDto(
            queryParams: $customQueryParams,
        ));
    }

    public function listSimilarBlogPosts(?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['page[size]' => 12], $queryParams);

        return $this->listBlogPosts(
            queryParams: $customQueryParams,
        );
    }

    public function viewBlogPost(string $slug, ?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['filter[slug]' => $slug], $queryParams);

        return $this->listBlogPosts(
            queryParams: $customQueryParams,
        );
    }
}
