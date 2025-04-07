import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from 'src/app/models/game.model';
import { UtilsService } from 'src/app/services/utils.service';
import { selectGame, selectIndex, selectLookingIndexModifier } from 'src/app/store/game.selectors';
import { Ingredient } from 'src/app/types/ingredient.type';
import { SvgType } from 'src/app/types/svg.type';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  INGREDIENT_NAMES: Ingredient[] = ['B', 'W', 'R', 'U', 'G'];
  store = inject(Store);
  utilsService = inject(UtilsService);
  workbench: Ingredient[] = [];

  ngOnInit() {
    this.store.select(selectGame).subscribe((game: Game) => {
      this.store.select(selectLookingIndexModifier).subscribe((lim: number) => {
        this.workbench = game.playingAreas[this.utilsService.newIndexInArrayAfterRotation(
          this.store.selectSignal(selectIndex)(),
          this.store.selectSignal(selectGame)().playersName.length,
          lim
        )].workbench;
      });      
    });
  }

  count(ingredient: Ingredient): number {
    return this.workbench.filter(el => el == ingredient).length;
  }
  max(ingredient: Ingredient): number {
    let max = 9;
    if (ingredient === 'B') max = 3;
    else if (ingredient === 'W') max = 4;
    return max;
  }

  ingredientSvgName(ingredientLetter: Ingredient): SvgType {
    return this.utilsService.ingredientLetterToSvgName(ingredientLetter);
  }

}
