import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    newIndexInArrayAfterRotation(startingIndex: number, arrayLength: number, rotationValue: number): number {
        const sum = startingIndex + rotationValue;
        if (sum < 0) return arrayLength + (sum % arrayLength);
        return sum % arrayLength;
    }

}