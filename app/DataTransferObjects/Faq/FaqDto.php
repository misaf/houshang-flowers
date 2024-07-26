<?php

declare(strict_types=1);

namespace App\DataTransferObjects\Faq;

final class FaqDto
{
    public array $queryParams;

    public function __construct(?array $queryParams = [])
    {
        $this->queryParams = $queryParams ?? [];
    }
}
