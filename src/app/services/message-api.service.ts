import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageReceived } from '../models/message-received.model';
import { MessageSended } from '../models/message-to-send.model';

@Injectable({
  providedIn: 'root'
})
export class MessageApiService {

  private url = 'http://localhost:8080/api/message';
  private http = inject(HttpClient);

  postMessage(message: MessageSended, channel: "global" | "ingame"): Observable<MessageReceived> {
    return this.http.post<MessageReceived>(this.url + '/' + channel, message);
  }

  postMessageGlobal(message: MessageSended): Observable<MessageReceived> {
    return this.postMessage(message, 'global');
  }

  postMessageIngame(message: MessageSended): Observable<MessageReceived> {
    return this.postMessage(message, 'ingame');
  }
}
