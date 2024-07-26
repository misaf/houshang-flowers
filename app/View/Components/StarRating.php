<?php

declare(strict_types=1);

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

final class StarRating extends Component
{
    public function __construct(public int $rating) {}

    public function render(): View|Closure|string
    {
        return view('components.star-rating');
    }
}
