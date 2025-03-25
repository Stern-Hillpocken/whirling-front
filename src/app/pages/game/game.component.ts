import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { OneValueObject } from 'src/app/models/one-value-object.model';
import { GameApiService } from 'src/app/services/game-api.service';
import { gatherGame, gatherGameSuccess } from 'src/app/store/game.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  gameApiService = inject(GameApiService);
  router = inject(Router);
  store = inject(Store);
  socketClient: any = null;
  private notificationSubscriptionForGame: any;

  ngOnInit() {
    this.store.dispatch(gatherGame(new OneValueObject(this.router.url)));
    const ws = new SockJS('http://localhost:8080/ws');
    this.socketClient = Stomp.over(ws);
    this.socketClient.connect({}, () => {
      this.notificationSubscriptionForGame = this.socketClient.subscribe(
        this.router.url,
        (message: any) => {
          this.store.dispatch(gatherGameSuccess(JSON.parse(message.body)));
        }
      );
    });
  }

}
