import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.html',
  styleUrls: ['./notification.scss'],
})
export class NotificationComponent {
  messageContent = '';
  notifications: { messageId: string; status: string }[] = [];

  constructor(private notificationService: NotificationService) {}

  sendNotification() {
    const messageId = uuidv4();
    const content = this.messageContent.trim();
    if (!content) return;

    this.notifications.push({ messageId, status: 'AGUARDANDO PROCESSAMENTO' });

    this.notificationService.sendNotification(messageId, content).subscribe({
      next: () => {},
      error: () => this.updateStatus(messageId, 'SEND_FAILED'),
    });
  }

  updateStatus(messageId: string, newStatus: string) {
    const item = this.notifications.find((n) => n.messageId === messageId);
    if (item) item.status = newStatus;
  }
}
