<?php

declare(strict_types=1);

namespace App\Services\Api\Product;

use App\DataTransferObjects\Product\ProductDto;
use App\Services\Api\ApiService;

final class ProductService extends ApiService
{
    public function fetchProducts(ProductDto $dto): array
    {
        return $this->get(
            endpoint: 'products',
            queryParams: $this->buildParams($dto->queryParams),
        );
    }

    public function listProducts(?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['page[size]' => 12], $queryParams);

        return $this->fetchProducts(new ProductDto(
            queryParams: $customQueryParams,
        ));
    }

    public function listSimilarProducts(?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['page[size]' => 12], $queryParams);

        return $this->listProducts(
            queryParams: $customQueryParams,
        );
    }

    public function viewProduct(string $token, ?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['filter[token]' => $token], $queryParams);

        return $this->listProducts(
            queryParams: $customQueryParams,
        );
    }
}
