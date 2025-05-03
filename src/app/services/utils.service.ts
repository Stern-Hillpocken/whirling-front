import { inject, Injectable } from '@angular/core';
import { SvgType } from '../types/svg.type';
import { Ingredient } from '../types/ingredient.type';
import { LocalStorageService } from './local-storage.service';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  localStorageService = inject(LocalStorageService);

  newIndexInArrayAfterRotation(startingIndex: number, arrayLength: number, rotationValue: number): number {
      const sum = startingIndex + rotationValue;
      if (sum < 0) return arrayLength + (sum % arrayLength);
      return sum % arrayLength;
  }

  ingredientLetterToSvgName(ingredientLetter: Ingredient): SvgType {
    const theme = this.localStorageService.getGameTheme();
    switch(ingredientLetter) {
      case 'B': return theme + "-black" as SvgType;
      case 'W': return theme + "-white" as SvgType;
      case 'R': return theme + "-red" as SvgType;
      case 'U': return theme + "-blue" as SvgType;
      case 'G': return theme + "-green" as SvgType;
    }
    return "close";
  }

  sortIngredientsLetter(array: Ingredient[]): Ingredient[] {
    let newArray: Ingredient[] = [];
    for (const i of ['B', 'W', 'R', 'Ru', 'rU', 'Rg', 'U', 'Ug', 'uG', 'G', 'rG']) {
      for (let t = 0; t < array.filter(el => el === i).length; t++) newArray.push(i as Ingredient);
    }
    return newArray;
  }

  transformRecipeWithMultiIngredientToSolo(recipes: Recipe[]): Recipe[] {
    let cleanedRecipe: Recipe[] = [];
    for (const r of recipes) cleanedRecipe.push(new Recipe(r.arcana.slice(), r.input.slice(), r.direction, r.output.slice()));

    for (let r of cleanedRecipe) {
      r.input = this.transformMutiIngredientListToSoloList(r.input);
      r.output = this.transformMutiIngredientListToSoloList(r.output);
    }
    return cleanedRecipe;
  }

  transformMutiIngredientListToSoloList(mil: Ingredient[]): Ingredient[] {
    let newList: Ingredient[] = [];
    for (let i = 0; i < mil.length; i++) {
      if (mil[i] === 'Ru' as Ingredient || mil[i] === 'Rg' as Ingredient) newList.push('R');
      else if (mil[i] === 'rU' as Ingredient || mil[i] === 'Ug' as Ingredient) newList.push('U');
      else if (mil[i] === 'rG' as Ingredient || mil[i] === 'uG' as Ingredient) newList.push('G');
      else newList.push(mil[i]);
    }
    return newList;
  }

}