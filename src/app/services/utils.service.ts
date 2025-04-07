import { inject, Injectable } from '@angular/core';
import { SvgType } from '../types/svg.type';
import { Ingredient } from '../types/ingredient.type';
import { LocalStorageService } from './local-storage.service';

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

}