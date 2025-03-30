import { Component, inject } from '@angular/core';
import { GameApiService } from 'src/app/services/game-api.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent {

  gameApiService = inject(GameApiService)

  ready() {
    this.gameApiService.readySetup(0);
  }

}
