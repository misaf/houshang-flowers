<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Pages\Style1;

use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.lukani.app')]
final class Home extends Component
{
    public function render()
    {
        return view('livewire.lukani.pages.style-1.home');
    }
}
