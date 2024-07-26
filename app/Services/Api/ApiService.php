<?php

declare(strict_types=1);

namespace App\Services\Api;

use App\Contracts\ApiServiceInterface;
use Illuminate\Support\Facades\Http;

class ApiService implements ApiServiceInterface
{
    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.panel_api.base_url');
    }

    public function get(string $endpoint, array $queryParams): ?array
    {
        return Http::withoutVerifying()
            ->baseUrl($this->getBaseUrl())
            ->get($endpoint, $queryParams)
            ->json();
    }

    public function setBaseUrl(string $baseUrl): void
    {
        $this->baseUrl = $baseUrl;
    }

    protected function buildParams(?array $queryParams = []): array
    {
        return array_merge($this->defaultParams(), $queryParams);
    }

    protected function getBaseUrl(): string
    {
        return $this->baseUrl;
    }

    protected function getDefaultParams(): array
    {
        return [
            'locale'       => app()->getLocale(),
            'page[number]' => 1,
            'page[size]'   => 4,
        ];
    }

    private function defaultParams(): array
    {
        return $this->getDefaultParams();
    }
}
