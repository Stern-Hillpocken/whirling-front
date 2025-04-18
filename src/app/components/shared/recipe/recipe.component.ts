import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {

  @Input()
  recipeIndex: number = -1;

  @Input()
  value!: Recipe;

  @Input()
  isASkill: boolean = false;

  @Output()
  ingredientChangedEmitter: EventEmitter<{recipeIndex: number, inputOutput:"input"|"output", index:number}> = new EventEmitter();

  onClick(commingFrom: "input" | "output", index: number) {
   this.ingredientChangedEmitter.emit({recipeIndex:this.recipeIndex, inputOutput:commingFrom, index:index});
  }

}
