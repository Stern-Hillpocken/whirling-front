import { Component, inject } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { MessageReceived } from 'src/app/models/message-received.model';
import { Store } from '@ngrx/store';
import { sendMessageGlobal, sendMessageIngame } from 'src/app/store/game.actions';
import { OneValueObject } from 'src/app/models/one-value-object.model';

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
    console.log("0")
    this.socketClient.connect({}, () => {
      console.log("1")
      this.notificationSubscriptionForGlobal = this.socketClient.subscribe(
        '/messages/global/notifications',
        (message: any) => {
          this.messageGlobalList.push(JSON.parse(message.body));
          if (this.displayMessagesOf !== "global") {
            this.hasNewGlobalMessage = true;
          }
        }
      );
      console.log("2")
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
      this.store.dispatch(sendMessageGlobal(new OneValueObject(this.messageContent)));
    } else if (this.displayMessagesOf === "ingame") {
      this.store.dispatch(sendMessageIngame(new OneValueObject(this.messageContent)));
    }
    
    this.messageContent = "";
  }

  switchDisplayTo(channel: "global" | "ingame" | "hidden") {
    this.displayMessagesOf = channel;
    if (channel === "global") this.hasNewGlobalMessage = false;
    else if (channel === "ingame") this.hasNewIngameMessage = false;
  }

}
