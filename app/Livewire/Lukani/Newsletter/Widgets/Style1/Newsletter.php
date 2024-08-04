<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Newsletter\Widgets\Style1;

use Livewire\Attributes\Lazy;
use Livewire\Component;

#[Lazy]
final class Newsletter extends Component
{
    public function render()
    {
        return view('livewire.lukani.newsletter.widgets.style-1.newsletter');
    }
}
