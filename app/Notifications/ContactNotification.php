<?php

declare(strict_types=1);

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        protected array $data,
    ) {}

    public function toMail(mixed $notifiable)
    {
        return (new MailMessage())
            ->success('success')
            ->subject('تماس با ما')
            ->greeting('تماس با ما')
            ->line($this->data['email'])
            ->line($this->data['phone'])
            ->line($this->data['subject'])
            ->line($this->data['description']);
    }

    public function via(mixed $notifiable): array
    {
        return ['mail'];
    }
}
