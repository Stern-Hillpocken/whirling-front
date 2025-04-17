import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from 'src/app/models/game.model';
import { UtilsService } from 'src/app/services/utils.service';
import { selectGame, selectIndex, selectIngredientsPreparation, selectLookingIndexModifier } from 'src/app/store/game.selectors';
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
  lim: number = 0;
  workbench: Ingredient[] = [];
  ingredientsIn: Ingredient[] = [];
  ingredientsOut: Ingredient[] = [];

  ngOnInit() {
    this.store.select(selectGame).subscribe((game: Game) => {
      this.store.select(selectLookingIndexModifier).subscribe((lim: number) => {
        this.lim = lim;
        this.workbench = game.playingAreas[this.utilsService.newIndexInArrayAfterRotation(
          this.store.selectSignal(selectIndex)(),
          this.store.selectSignal(selectGame)().playersName.length,
          lim
        )].workbench;
      });      
    });
    this.store.select(selectIngredientsPreparation).subscribe(ip => {
      this.ingredientsIn = ip.in;
      this.ingredientsOut = ip.out;
    })
  }

  count(ingredient: Ingredient, prep: 'not-prepared' | 'prepared' | 'empty'): number {
    const inWorkbench = this.workbench.filter(el => el === ingredient).length;
    if (this.lim !== 0) {
      if (prep === 'not-prepared') return inWorkbench;
      else if (prep === 'prepared') return 0;
      else return this.max(ingredient) - inWorkbench;
    } else {
      const inPrep = this.ingredientsIn.filter(el => el === ingredient).length;
      if (prep === 'not-prepared') return inWorkbench - inPrep < 0 ? 0 : inWorkbench - inPrep;
      else if (prep === 'prepared') return inPrep > inWorkbench ? inWorkbench : inPrep;
      else return this.max(ingredient) - inWorkbench;
    }
  }

  max(ingredient: Ingredient): number {
    let max = 9;
    if (ingredient === 'B') max = 3;
    else if (ingredient === 'W') max = 4;
    return max;
  }

  issueSign(ingredient: Ingredient): 'warning-ingredient' | 'error-ingredient' | 'close' {
    if (this.lim !== 0) return 'close';

    const inWorkbench = this.workbench.filter(el => el === ingredient).length;
    const inPrep = this.ingredientsIn.filter(el => el === ingredient).length;
    if (inPrep > inWorkbench) {
      if (this.ingredientsOut.filter(el => el === ingredient).length >= inPrep - inWorkbench) return 'warning-ingredient';
      else return 'error-ingredient';
    }
    return 'close';
  }

  ingredientSvgName(ingredientLetter: Ingredient): SvgType {
    return this.utilsService.ingredientLetterToSvgName(ingredientLetter);
  }

}
