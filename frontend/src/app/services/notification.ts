import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = 'http://localhost:3000/api/notificar'; // Update if needed

  constructor(private http: HttpClient) {}

  sendNotification(messageId: string, messageContent: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      messageId,
      contentMessage: messageContent,
    });
  }
}
