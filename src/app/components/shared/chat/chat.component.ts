import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { MessageReceived } from 'src/app/models/message-received.model';
import { Store } from '@ngrx/store';
import { sendMessageGlobal, sendMessageIngame } from 'src/app/store/game.actions';
import { OneValueObject } from 'src/app/models/one-value-object.model';
import { selectUserName } from 'src/app/store/game.selectors';

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

  ngAfterViewChecked() {
    const ml = document.getElementById('messages-list')
    if (ml) ml.scrollTop = ml.scrollHeight;
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

  sameUserDate(i: number): boolean {
    let messageList = (this.displayMessagesOf === 'global' ? this.messageGlobalList : this.messageIngameList);
    if (messageList[i].user === messageList[i-1].user && Math.floor(messageList[i].date/60000) === Math.floor(messageList[i-1].date/60000)) return true;
    return false;
  }

  messageClass(userName: string): string {
    if (userName === 'GAME') return 'game-message';
    else if (userName === this.store.selectSignal(selectUserName)()) return 'my-message';
    return 'user-message';
  }

}
