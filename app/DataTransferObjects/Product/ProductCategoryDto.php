<?php

declare(strict_types=1);

namespace App\DataTransferObjects\Product;

final class ProductCategoryDto
{
    public array $queryParams;

    public function __construct(?array $queryParams = [])
    {
        $this->queryParams = $queryParams ?? [];
    }
}
