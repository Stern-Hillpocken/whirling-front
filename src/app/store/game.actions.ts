import { createAction, props } from "@ngrx/store";
import { Identification } from "../models/identification.model";
import { GameTheme } from "../types/game-theme.type";
import { GameLogin } from "../models/game-login.model";
import { OneValueObject } from "../models/one-value-object.model";


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