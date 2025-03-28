import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from 'src/app/models/game.model';
import { GameApiService } from 'src/app/services/game-api.service';
import { gatherGameSuccess } from 'src/app/store/game.actions';
import { selectGame, selectUserName } from 'src/app/store/game.selectors';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss'
})
export class HubComponent {

  store = inject(Store);
  gameApiService = inject(GameApiService);
  circleSizeRadius: number = 40/2;
  currentPlayers: string[] = [];
  isRandomizedSeats: boolean = true;
  userName!: string;

  ngOnInit() {
    this.store.select(selectGame).subscribe((game: Game) => {
      this.currentPlayers = game.playersName;
    });
    this.store.select(selectUserName).subscribe((name: string) => {
      this.userName = name;
    });
  }

  circlePlayerPositionX(i: number): string {
    return Math.round(this.circleSizeRadius * (Math.cos((((360 / this.currentPlayers.length) / 180) * i * Math.PI)-Math.PI/2))) + this.circleSizeRadius + 'vw';
  }
  circlePlayerPositionY(i: number): string {
    return Math.round(this.circleSizeRadius * (Math.sin((((360 / this.currentPlayers.length) / 180) * i * Math.PI)-Math.PI/2))) + this.circleSizeRadius - 3 + 'vw';
  }

  isHost(): boolean {
    return this.store.selectSignal(selectUserName)() === this.store.selectSignal(selectGame)().ownerName;
  }

  moveClockwise(i: number) {
    this.gameApiService.movePlayer(i, "clockwise");
  }

  moveAnticlockwise(i: number) {
    this.gameApiService.movePlayer(i, "anticlockwise");
  }

  randomizeSeats() {
    this.isRandomizedSeats = !this.isRandomizedSeats;
    this.store.dispatch(gatherGameSuccess({"id":"ohhfqooxz","password":"losratone","ownerName":"Abraham Eleazar","date":1742916335867,"playersName":["Abraham","Christian","Nicolas","Nicolas","Anqi","Nicolas"]}))
  }

  launchGame() {
    //
  }

}
