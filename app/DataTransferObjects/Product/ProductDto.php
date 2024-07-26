<?php

declare(strict_types=1);

namespace App\DataTransferObjects\Product;

final class ProductDto
{
    public array $queryParams;

    public function __construct(?array $queryParams = [])
    {
        $this->queryParams = $queryParams ?? [];
    }
}
