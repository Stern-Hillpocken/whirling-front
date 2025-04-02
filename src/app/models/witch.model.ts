import { Ingredient } from "../types/ingredient.type";

export class Witch {
    constructor(
        public name: string,
        public ingredients: Ingredient[],
        public power: string
    ){}
}