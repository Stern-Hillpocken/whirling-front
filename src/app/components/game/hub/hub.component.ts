import { Component } from '@angular/core';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss'
})
export class HubComponent {

  circleSizeRadius: number = 40/2;
  currentPlayers: string[] = ['Moi', 'Noa', 'Ostanis', 'Patrikorovitch', 'Quentino-el-bambino', 'Rudy', 'Somm', 'Tomtom'];
  waitingPlayers: string[] = ['Georges', 'Anto', 'Kaba', 'Michiko', 'Don', 'Zur'];
  isRandomizedSeats: boolean = true;

  circlePlayerPositionX(i: number): string {
    return Math.round(this.circleSizeRadius * (Math.cos((((360 / this.currentPlayers.length) / 180) * i * Math.PI)-Math.PI/2))) + this.circleSizeRadius + 'vw';
  }
  circlePlayerPositionY(i: number): string {
    return Math.round(this.circleSizeRadius * (Math.sin((((360 / this.currentPlayers.length) / 180) * i * Math.PI)-Math.PI/2))) + this.circleSizeRadius - 3 + 'vw';
  }

  moveClockwise(i: number) {
    //
  }

  moveAnticlockwise(i: number) {
    //
  }

  randomizeSeats() {
    this.isRandomizedSeats = !this.isRandomizedSeats;
  }

  launchGame() {
    //
  }

}
