import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from 'src/app/models/game.model';
import { Recipe } from 'src/app/models/recipe.model';
import { GameApiService } from 'src/app/services/game-api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { selectGame, selectIndex, selectLookingIndexModifier } from 'src/app/store/game.selectors';

@Component({
  selector: 'app-choose-recipe',
  templateUrl: './choose-recipe.component.html',
  styleUrl: './choose-recipe.component.scss'
})
export class ChooseRecipeComponent {

  store = inject(Store);
  gameApiService = inject(GameApiService);
  utilsService = inject(UtilsService);

  recipes: Recipe[] = [];
  currentLIAM: number = 0;
  imReady: boolean = false;

  ngOnInit() {
    this.store.select(selectGame).subscribe((game: Game) => {
      this.store.select(selectLookingIndexModifier).subscribe((liam: number) => {
        this.recipes = [];
        for (let r of game.playingAreas[this.utilsService.newIndexInArrayAfterRotation(this.store.selectSignal(selectIndex)(), game.playersName.length, liam)].hand) {
          this.recipes.push(new Recipe(r.arcana, r.input, r.direction, r.output));
        }
        this.currentLIAM = liam;
      });
      this.imReady = game.areReady[this.store.selectSignal(selectIndex)()];
    });
  }

  swap(index: number) {
    if (this.recipes[index].direction === "BOTH" && this.currentLIAM === 0) {
      const inp = this.recipes[index].input;
      this.recipes[index].input = this.recipes[index].output;
      this.recipes[index].output = inp;
    }
  }
  
  ready(recipe: Recipe) {
    this.gameApiService.readyRecipe(recipe);
  }

}
