import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from 'src/app/models/game.model';
import { Recipe } from 'src/app/models/recipe.model';
import { GameApiService } from 'src/app/services/game-api.service';
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
      this.gameApiService.readyProduce(this.changeMultiIngredientToSolo(this.orderedRecipes));
      this.store.dispatch(resetSkillsOrder());
      this.store.dispatch(resetIngredientsPreparation());
      this.store.dispatch(resetSkillsPrepared());
    }
  }

  private changeMultiIngredientToSolo(recipes: Recipe[]): Recipe[] {
    let cleanedRecipe: Recipe[] = [];
    for (const r of recipes) cleanedRecipe.push(new Recipe(r.arcana.slice(), r.input.slice(), r.direction, r.output.slice()));

    for (let r of cleanedRecipe) {
      for (let i = 0; i < r.input.length; i++) {
        if (r.input[i] === 'Ru' as Ingredient || r.input[i] === 'Rg' as Ingredient) r.input[i] = 'R';
        else if (r.input[i] === 'rU' as Ingredient || r.input[i] === 'Ug' as Ingredient) r.input[i] = 'U';
        else if (r.input[i] === 'rG' as Ingredient || r.input[i] === 'uG' as Ingredient) r.input[i] = 'G';
      }
      for (let o = 0; o < r.output.length; o++) {
        if (r.output[o] === 'Ru' as Ingredient || r.output[o] === 'Rg' as Ingredient) r.output[o] = 'R';
        else if (r.output[o] === 'rU' as Ingredient || r.output[o] === 'Ug' as Ingredient) r.output[o] = 'U';
        else if (r.output[o] === 'rG' as Ingredient || r.output[o] === 'uG' as Ingredient) r.output[o] = 'G';
      }
    }
    return cleanedRecipe;
  }

}
