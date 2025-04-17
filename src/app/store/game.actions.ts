import { createAction, props } from "@ngrx/store";
import { Identification } from "../models/identification.model";
import { GameTheme } from "../types/game-theme.type";
import { GameLogin } from "../models/game-login.model";
import { OneValueObject } from "../models/one-value-object.model";
import { Game } from "../models/game.model";
import { Ingredient } from "../types/ingredient.type";
import { Recipe } from "../models/recipe.model";


//#region identification
export const register = createAction('[Identification] Register user', props<{ identification: Identification }>());
export const registerSuccess = createAction('[Identification] Register user with success', props<{ identification: Identification }>());
export const registerFailure = createAction('[Identification] Register user with failure');

export const updateUserName = createAction('[Identification] Update user name', props<OneValueObject>());
export const updateUserNameSuccess = createAction('[Identification] Update user name with success', props<OneValueObject>());
export const updateUserNameFailure = createAction('[Identification] Update user name with failure');
//#endregion


//#region message
export const sendMessageIngame = createAction('[Message] Send message ingame', props<OneValueObject>());
export const sendMessageIngameSuccess = createAction('[Message] Send message ingame with success');
export const sendMessageIngameFailure = createAction('[Message] Send message ingame with failure');

export const sendMessageGlobal = createAction('[Message] Send message in global', props<OneValueObject>());
export const sendMessageGlobalSuccess = createAction('[Message] Send message in global with success');
export const sendMessageGlobalFailure = createAction('[Message] Send message in global with failure');
//#endregion


//#region room
export const createGame = createAction('[Room] Create game room', props<OneValueObject>());
export const createGameSuccess = createAction('[Room] Create game room with success', props<GameLogin>());
export const createGameFailure = createAction('[Room] Create game room with failure');

export const joinGame = createAction('[Room] Join game room');
export const joinGameSuccess = createAction('[Room] Join game room with success');
export const joinGameFailure = createAction('[Room] Join game room with failure');
//#endregion


//#region settings
export const updateGameTheme = createAction('[Settings] Update game theme', props<{ gameTheme: GameTheme }>());
export const updateGameThemeSuccess = createAction('[Settings] Update game theme with success');
export const updateGameThemeFailure = createAction('[Settings] Update game theme with failure');
//#endregion

//#region game
export const gatherGame = createAction('[Game] Gather game', props<OneValueObject>());
export const gatherGameSuccess = createAction('[Game] Gather game with success', props<Game>());
export const gatherGameFailure = createAction('[Game] Gather game with failure');

export const gatherUserIndex = createAction('[Game] Gather user index');
export const gatherUserIndexSuccess = createAction('[Game] Gather user index with success', props<OneValueObject>());
export const gatherUserIndexFailure = createAction('[Game] Gather user index with failure', props<OneValueObject>());

export const setLookingIndexModifier = createAction('[Game] Set lookingIndexModifier', props<{ setTo: -1 | 0 | 1 }>());

export const resetSkillsOrder = createAction('[Game] Set skills order');
export const setSkillsOrder = createAction('[Game] Set skills order', props<{order: number[]}>());
export const resetSkillsPrepared = createAction('[Game] Set skills prepared');
export const setSkillsPrepared = createAction('[Game] Reset skills prepared', props<{skillsPrepared: Recipe[]}>());
export const addSkillPrepared = createAction('[Game] Add skill prepared', props<Recipe>());
export const removeSkillPrepared = createAction('[Game] Remove skill prepared', props<Recipe>());
//#endregion

//#region ingredient
export const resetIngredientsPreparation = createAction('[Ingredient] Reset in and out');
export const setIngredientsPreparation = createAction('[Ingredient] Set in and out', props<{in: Ingredient[], out: Ingredient[]}>());
//#endregion