import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageReceived } from '../models/message-received.model';
import { OneValueObject } from '../models/one-value-object.model';

@Injectable({
  providedIn: 'root'
})
export class MessageApiService {

  private url = 'http://localhost:8080/api/message';
  private http = inject(HttpClient);

  postMessage(channel: "global" | "ingame", message: string): Observable<MessageReceived> {
    return this.http.post<MessageReceived>(
      this.url + '/' + channel,
      new OneValueObject(message)
    );
  }

  postMessageGlobal(message: string): Observable<MessageReceived> {
    return this.postMessage('global', message);
  }

  postMessageIngame(message: string): Observable<MessageReceived> {
    return this.postMessage('ingame', message);
  }
}
