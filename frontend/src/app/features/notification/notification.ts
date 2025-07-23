import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';
import { SocketService } from '../../services/socket';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.html',
  styleUrls: ['./notification.scss'],
})
export class NotificationComponent {
  messageContent = '';
  notifications: { messageId: string; content: string; status: string }[] = [];

  // Armazena atualizações de status que chegaram antes da notificação existir
  private pendingUpdates = new Map<string, string>();

  statusLabels: Record<string, string> = {
    WAITING: 'AGUARDANDO PROCESSAMENTO',
    SUCCESS: 'PROCESSADO COM SUCESSO',
    FAILURE: 'FALHA NO PROCESSAMENTO',
  };

  constructor(
    private notificationService: NotificationService,
    private socketService: SocketService
  ) {
    this.listenToStatusUpdates();
  }

  sendNotification() {
    const content = this.messageContent.trim();
    if (!content) return;

    this.notificationService.sendNotification(content).subscribe({
      next: (res) => {
        const messageId = res.messageId;
        console.log(
          '[ENVIANDO] Notificação confirmada pelo backend:',
          messageId
        );

        this.notifications.push({ messageId, content, status: 'WAITING' });

        const pendingStatus = this.pendingUpdates.get(messageId);
        if (pendingStatus) {
          console.log('[ENVIANDO] Aplicando status pendente:', pendingStatus);
          this.updateStatus(messageId, pendingStatus);
          this.pendingUpdates.delete(messageId);
        }
      },
      error: () => {
        console.warn('[ERRO] Falha ao enviar notificação');
        alert('Erro ao enviar notificação. Tente novamente.');
      },
    });
  }

  updateStatus(messageId: string, newStatus: string) {
    const item = this.notifications.find((n) => n.messageId === messageId);
    if (item) {
      console.log(
        '[UPDATE] Aplicando status em item existente:',
        messageId,
        '=>',
        newStatus
      );
      item.status = newStatus;
    } else {
      console.log(
        '[UPDATE] Ainda não existe, salvando pendente:',
        messageId,
        '=>',
        newStatus
      );
      this.pendingUpdates.set(messageId, newStatus);
    }
  }

  listenToStatusUpdates() {
    this.socketService.listenStatus().subscribe((data) => {
      console.log('[WS] statusUpdate recebido:', data);
      this.updateStatus(data.messageId, data.status);
    });
  }
}
