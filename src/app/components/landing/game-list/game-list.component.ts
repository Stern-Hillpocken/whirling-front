import { Component } from '@angular/core';
import { GameList } from 'src/app/models/game-list.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {

  games: GameList[] = [{date: 34, owner: "jo", gameId: "oip-pp"}, {date: 44, owner: "mii", gameId: "popo-lulu"}, {date: 55, owner: "lette", gameId: "moi-toi"}];
  isJoining: boolean = false;
  password: string = '';
  isSubmitting: boolean = false;
  selectedGame: GameList = new GameList(0, '', '');
  cursorX: number = 0;
  cursorY: number = 0;

  onJoin(selectedGame: GameList, mouse: MouseEvent) {
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
