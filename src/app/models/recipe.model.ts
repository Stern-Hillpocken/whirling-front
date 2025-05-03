import { Arcana } from "../types/arcana.type";
import { Direction } from "../types/direction.type";
import { Ingredient } from "../types/ingredient.type";

export class Recipe {
    constructor(
        public arcana: Arcana[],
        public input: Ingredient[],
        public direction: Direction,
        public output: Ingredient[]
    ){}

    equals(otherRecipe: Recipe): boolean {
        return this.arcana === otherRecipe.arcana
        && this.input === otherRecipe.input
        && this.direction === otherRecipe.direction
        && this.output === otherRecipe.output;
    }
}