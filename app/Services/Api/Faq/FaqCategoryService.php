<?php

declare(strict_types=1);

namespace App\Services\Api\Faq;

use App\DataTransferObjects\Faq\FaqCategoryDto;
use App\Services\Api\ApiService;
use Illuminate\Support\Arr;

final class FaqCategoryService extends ApiService
{
    public function fetchFaqCategories(FaqCategoryDto $dto): array
    {
        return $this->get(
            endpoint: 'faq-categories',
            queryParams: $this->buildParams($dto->queryParams),
        );
    }

    public function listFaqCategories(?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['page[size]' => 12], $queryParams);

        return $this->fetchFaqCategories(new FaqCategoryDto(
            queryParams: $customQueryParams,
        ));
    }

    public function viewFaqCategory(string $slug, ?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['filter[slug]' => $slug], $queryParams);

        $response = $this->listFaqCategories(
            queryParams: $customQueryParams,
        );

        return Arr::first($response['data']);
    }
}
