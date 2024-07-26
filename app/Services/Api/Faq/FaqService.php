<?php

declare(strict_types=1);

namespace App\Services\Api\Faq;

use App\DataTransferObjects\Faq\FaqDto;
use App\Services\Api\ApiService;
use Illuminate\Support\Arr;

final class FaqService extends ApiService
{
    public function fetchFaqs(FaqDto $dto): array
    {
        return $this->get(
            endpoint: 'faqs',
            queryParams: $this->buildParams($dto->queryParams),
        );
    }

    public function listFaqs(?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['page[size]' => 12], $queryParams);

        return $this->fetchFaqs(new FaqDto(
            queryParams: $customQueryParams,
        ));
    }

    public function listSimilarFaqs(?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['page[size]' => 12], $queryParams);

        return $this->listFaqs(
            queryParams: $customQueryParams,
        );
    }

    public function viewProduct(string $token, ?array $queryParams = []): ?array
    {
        $customQueryParams = array_merge(['filter[token]' => $token], $queryParams);

        $response = $this->listFaqs(
            queryParams: $customQueryParams,
        );

        return Arr::first($response['data']);
    }
}
