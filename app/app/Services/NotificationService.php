<?php

namespace App\Services;

use Illuminate\Support\Facades\Notification;
use App\Models\User;
use Illuminate\Notifications\Notification as BaseNotification;

class NotificationService
{
    public function send(User $user, BaseNotification $notification): void
    {
        Notification::send($user, $notification);
    }
}
