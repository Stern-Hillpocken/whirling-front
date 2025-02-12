import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { MessageSended } from 'src/app/models/message-to-send.model';
import { Identification } from 'src/app/models/identification.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessageReceived } from 'src/app/models/message-received.model';
import { Store } from '@ngrx/store';
import { sendMessageGlobal, sendMessageIngame } from 'src/app/store/game.actions';
import { selectUserId, selectUserName } from 'src/app/store/game.selectors';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  displayMessagesOf: "global" | "ingame" | "hidden" = "global";
  hasNewGlobalMessage: boolean = false;
  hasNewIngameMessage: boolean = false;
  messageGlobalList: MessageReceived[] = [];
  messageIngameList: MessageReceived[] = [];
  messageContent: string = "";

  socketClient: any = null;
  private notificationSubscriptionForGlobal: any;
  private notificationSubscriptionForIngame: any;
  
  private store = inject(Store);

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
    if (this.displayMessagesOf === "global") {
      this.store.dispatch(sendMessageGlobal({
        message: new MessageSended(new Identification(this.store.selectSignal(selectUserId)(), this.store.selectSignal(selectUserName)()), this.messageContent)
      }));
    } else if (this.displayMessagesOf === "ingame") {
      this.store.dispatch(sendMessageIngame({
        message: new MessageSended(new Identification(this.store.selectSignal(selectUserId)(), this.store.selectSignal(selectUserName)()), this.messageContent)
      }));
    }
    
    this.messageContent = "";
  }

  switchDisplayTo(channel: "global" | "ingame" | "hidden") {
    this.displayMessagesOf = channel;
    if (channel === "global") this.hasNewGlobalMessage = false;
    else if (channel === "ingame") this.hasNewIngameMessage = false;
  }

}
