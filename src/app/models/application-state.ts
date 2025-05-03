import { Ingredient } from "../types/ingredient.type";
import { Game } from "./game.model";
import { Recipe } from "./recipe.model";

export interface ApplicationState {
    userId: string,
    userName: string,
    gameId: string,
    game: Game,
    index: number,
    lookingIndexModifier: -1 | 0 | 1,
    skillsOrder: number[],
    skillsPrepared: Recipe[],
    ingredientsPreparation: {in: Ingredient[], out: Ingredient[]},
}