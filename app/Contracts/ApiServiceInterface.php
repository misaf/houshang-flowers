<?php

declare(strict_types=1);

namespace App\Contracts;

interface ApiServiceInterface
{
    public function get(string $endpoint, array $queryParams): ?array;
}
