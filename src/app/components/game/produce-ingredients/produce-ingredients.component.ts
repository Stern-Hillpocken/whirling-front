import { Component, inject } from '@angular/core';
import { GameApiService } from 'src/app/services/game-api.service';

@Component({
  selector: 'app-produce-ingredients',
  templateUrl: './produce-ingredients.component.html',
  styleUrl: './produce-ingredients.component.scss'
})
export class ProduceIngredientsComponent {

  gameApiService = inject(GameApiService)

  ready() {
    this.gameApiService.readyProduce();
  }

}
