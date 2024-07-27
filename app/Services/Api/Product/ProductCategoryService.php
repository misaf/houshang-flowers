<?php

declare(strict_types=1);

namespace App\Services\Api\Product;

use App\DataTransferObjects\Product\ProductCategoryDto;
use App\Services\Api\ApiService;
use Illuminate\Support\Arr;

final class ProductCategoryService extends ApiService
{
    public function fetchProductCategories(ProductCategoryDto $dto): array
    {
        return $this->get(
            endpoint: 'product-categories',
            queryParams: $this->buildParams($dto->queryParams),
        );
    }

    public function listProductCategories(?array $queryParams = []): ?array
    {
        return $this->fetchProductCategories(new ProductCategoryDto(
            $queryParams,
        ));
    }

    public function viewProductCategory(string $slug, ?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['filter[slug]' => $slug], $queryParams);

        $response = $this->listProductCategories(
            queryParams: $customQueryParams,
        );

        return Arr::first($response['data']);
    }
}
