<?php

declare(strict_types=1);

namespace App\Livewire\Lukani\Pages\Style1;

use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.lukani.app-contact')]
final class Contact extends Component
{
    public function render()
    {
        // Notification::send(User::isAdmin()->first(), new ContactNotification($request->only('email', 'phone', 'subject', 'description')));

        return view('livewire.lukani.pages.style1.contact');
    }
}
