import { Ingredient } from "../types/ingredient.type";
import { Witch } from "./witch.model";
import { Recipe } from "./recipe.model";

export class PlayingArea {
    constructor(
        public witch: Witch[],
        public circle: Ingredient[],
        public workbench: Ingredient[],
        public hand: Recipe[],
        public skills: Recipe[],
        public skillsUsed: boolean[]
    ){}
}