<?php

declare(strict_types=1);

namespace App\View\Components\lukani\Home\Widgets\Footer\Style1;

use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

final class Footer extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct() {}

    /**
     * Get the view / contents that represent the component.
     *
     * @return View
     */
    public function render(): View
    {
        return view('components.lukani.home.widgets.footer.style1.footer');
    }
}
