<?php

namespace App\Mail;

use App\Models\Equipment;
use App\Models\MaintenanceRecord;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MaintenanceNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $notificationSubject;
    public $notificationMessage;
    public $equipment;
    public $maintenanceRecord;

    /**
     * Create a new message instance.
     */
    public function __construct(
        string $subject,
        string $message,
        Equipment $equipment,
        ?MaintenanceRecord $maintenanceRecord = null
    ) {
        $this->notificationSubject = $subject;
        $this->notificationMessage = $message;
        $this->equipment = $equipment;
        $this->maintenanceRecord = $maintenanceRecord;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->notificationSubject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.notification-simple'
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
