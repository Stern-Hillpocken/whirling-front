import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from 'src/app/models/game.model';
import { Recipe } from 'src/app/models/recipe.model';
import { GameApiService } from 'src/app/services/game-api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { resetIngredientsPreparation, resetSkillsOrder, resetSkillsPrepared } from 'src/app/store/game.actions';
import { selectGame, selectIndex, selectIngredientsPreparation, selectLookingIndexModifier, selectSkillsOrder, selectSkillsPrepared } from 'src/app/store/game.selectors';
import { Ingredient } from 'src/app/types/ingredient.type';

@Component({
  selector: 'app-produce-ingredients',
  templateUrl: './produce-ingredients.component.html',
  styleUrl: './produce-ingredients.component.scss'
})
export class ProduceIngredientsComponent {

  store = inject(Store);
  lim!: number;
  gameApiService = inject(GameApiService);
  utilsService = inject(UtilsService);
  ingredientIn: Ingredient[] = [];
  ingredientOut: Ingredient[] = [];
  orderedRecipes: Recipe[] = [];
  iamReady: boolean = false;
  buttonText: string = "Choisir l’ordre d’application...";

  ngOnInit() {
    this.store.select(selectLookingIndexModifier).subscribe((lim: number) => this.lim = lim);
    this.store.select(selectIngredientsPreparation).subscribe((ingredientsPrep) => {
      this.ingredientIn = ingredientsPrep.in;
      this.ingredientOut = ingredientsPrep.out;
    });
    this.store.select(selectGame).subscribe((game: Game) => {
      this.iamReady = game.areReady[this.store.selectSignal(selectIndex)()];
    });
    this.store.select(selectSkillsPrepared).subscribe((skp: Recipe[]) => {
      this.orderedRecipes = skp;
    });
  }

  ready() {
    if (this.buttonText === "Choisir l’ordre d’application..." && this.store.selectSignal(selectSkillsOrder)().filter(el => el !== -1).length === 0) {
      this.buttonText = "Ne rien envoyer !";
    } else {
      this.gameApiService.readyProduce(this.utilsService.transformRecipeWithMultiIngredientToSolo(this.orderedRecipes));
      this.store.dispatch(resetSkillsOrder());
      this.store.dispatch(resetIngredientsPreparation());
      this.store.dispatch(resetSkillsPrepared());
    }
  }

}
