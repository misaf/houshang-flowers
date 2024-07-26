<?php

declare(strict_types=1);

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

final class SharingSocialLink extends Component
{
    public function __construct(
        public $href,
        public $label,
        public $svgClass,
        public $fillRule,
        public $svgPath,
        public $viewBox,
    ) {}

    public function render(): View|Closure|string
    {
        return view('components.lukani.sharing-social-link');
    }
}
