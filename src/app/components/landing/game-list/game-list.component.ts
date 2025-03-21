import { Component, inject } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { GameInfo } from 'src/app/models/game-info.model';
import { GameApiService } from 'src/app/services/game-api.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {

  gameApiService = inject(GameApiService);
  allGames: GameInfo[] = [];
  isJoining: boolean = false;
  password: string = '';
  isSubmitting: boolean = false;
  selectedGame: GameInfo = new GameInfo(0, '', '');
  cursorX: number = 0;
  cursorY: number = 0;

  socketClient: any = null;
  private notificationSubscriptionForGameCreation: any;

  ngOnInit() {
    this.gameApiService.getAllGames().subscribe((allGames: GameInfo[]) => this.allGames = allGames.sort((a,b) => b.date - a.date));
    let ws = new SockJS('http://localhost:8080/ws');
    this.socketClient = Stomp.over(ws);
    this.socketClient.connect({}, () => {
      this.notificationSubscriptionForGameCreation = this.socketClient.subscribe(
        '/general/game-creation',
        (obj: any) => {
          this.allGames.unshift(JSON.parse(obj.body));
        }
      );
    });
  }

  onJoin(selectedGame: GameInfo, mouse: MouseEvent) {
    this.isJoining = true;
    this.selectedGame = selectedGame;
    
    this.cursorX = mouse.clientX - (window.document.getElementById("ask-password")?.offsetWidth ?? 0);
    this.cursorY = mouse.clientY - (window.document.getElementById("ask-password")?.offsetHeight ?? 0);
  }

  onSubmit() {
    this.isSubmitting = true;
    //
  }

}
