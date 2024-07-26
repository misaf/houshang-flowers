<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Mail\WelcomeMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Notifications\Notification;

class WelcomeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct() {}

    /**
     * Determine if the notification should be sent.
     *
     * @param  mixed  $notifiable
     * @param  string $channel
     * @return bool
     */
    public function shouldSend(mixed $notifiable, string $channel): bool
    {
        return 'Enable' === $notifiable->status;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed $notifiable
     * @return array
     */
    public function toArray(mixed $notifiable): array
    {
        return [
            'username'  => $notifiable->username ?? '',
            'email'     => $notifiable->email ?? '',
            'full_name' => $notifiable->full_name ?? '',
        ];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed                 $notifiable
     * @return WelcomeMail
     */
    public function toMail(mixed $notifiable): WelcomeMail
    {
        $address = $notifiable instanceof AnonymousNotifiable
            ? $notifiable->routeNotificationFor('mail')
            : $notifiable->email;

        return (new WelcomeMail($notifiable))
            ->to($address);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed $notifiable
     * @return array
     */
    public function via(mixed $notifiable): array
    {
        return ['database'];
    }
}
