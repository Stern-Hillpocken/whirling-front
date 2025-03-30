import { Component, inject } from '@angular/core';
import { GameApiService } from 'src/app/services/game-api.service';

@Component({
  selector: 'app-choose-recipe',
  templateUrl: './choose-recipe.component.html',
  styleUrl: './choose-recipe.component.scss'
})
export class ChooseRecipeComponent {

  gameApiService = inject(GameApiService)
  
  ready() {
    this.gameApiService.readyRecipe(0);
  }

}
