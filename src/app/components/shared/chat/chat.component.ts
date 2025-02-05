import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { MessageSended } from 'src/app/models/message-to-send.model';
import { Identification } from 'src/app/models/identification.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessageReceived } from 'src/app/models/message-received.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  gameId: string = window.location.pathname.replace(/\/game\//, '');
  displayMessagesOf: "global" | "ingame" | "hidden" = "global";
  hasNewGlobalMessage: boolean = false;
  hasNewIngameMessage: boolean = false;
  messageGlobalList: MessageReceived[] = [];
  messageIngameList: MessageReceived[] = [];
  messageContent: string = "";

  socketClient: any = null;
  private notificationSubscriptionForGlobal: any;
  private notificationSubscriptionForIngame: any;
  private http = inject(HttpClient);
  private localStorage = inject(LocalStorageService);

  ngOnInit() {
    let ws = new SockJS('http://localhost:8080/ws');
    this.socketClient = Stomp.over(ws);
    this.socketClient.connect({}, () => {
      this.notificationSubscriptionForGlobal = this.socketClient.subscribe(
        '/messages/global/notifications',
        (message: any) => {
          this.messageGlobalList.push(JSON.parse(message.body));
          if (this.displayMessagesOf !== "global") {
            this.hasNewGlobalMessage = true;
          }
        }
      );
      this.notificationSubscriptionForIngame = this.socketClient.subscribe(
        '/messages/ingame/notifications',
        (message: any) => {
          this.messageIngameList.push(JSON.parse(message.body));
          if (this.displayMessagesOf !== "ingame") {
            this.hasNewIngameMessage = true;
          }
        }
      );
    });
  }

  onSubmit() {
    this.http.post<MessageReceived>('http://localhost:8080/api/message/'+ this.displayMessagesOf,
      new MessageSended(new Identification(this.localStorage.getUserId() ?? "", this.localStorage.getUserName() ?? ""), this.messageContent)
    ).subscribe();
    this.messageContent = "";
  }

  switchDisplayTo(channel: "global" | "ingame" | "hidden") {
    this.displayMessagesOf = channel;
    if (channel === "global") this.hasNewGlobalMessage = false;
    else if (channel === "ingame") this.hasNewIngameMessage = false;
  }

}
