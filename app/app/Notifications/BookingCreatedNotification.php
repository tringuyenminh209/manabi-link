<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\DatabaseMessage;
use Illuminate\Notifications\Notification;
use App\Models\Booking;

class BookingCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(protected Booking $booking)
    {
        $this->afterCommit();
    }

    public function via($notifiable): array
    {
        return ['database', 'broadcast'];
    }

    public function toArray($notifiable): array
    {
        return [
            'booking_id' => $this->booking->id,
            'booking_code' => $this->booking->booking_code,
            'lesson_title' => $this->booking->schedule->lesson->title,
            'scheduled_at' => $this->booking->schedule->scheduled_at,
            'user_name' => $this->booking->user->name,
        ];
    }

    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'data' => $this->toArray($notifiable)
        ]);
    }
}
