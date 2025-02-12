import { createAction, props } from "@ngrx/store";
import { Identification } from "../models/identification.model";
import { MessageSended } from "../models/message-to-send.model";
import { GameTheme } from "../types/game-theme.type";
import { IdentificationToUpdate } from "../models/identification-to-update.model";


//#region identification
export const register = createAction('[Identification] Register user', props<{ identification: Identification }>());
export const registerSuccess = createAction('[Identification] Register user with success', props<{ identification: Identification }>());
export const registerFailure = createAction('[Identification] Register user with failure');

export const changeUserName = createAction('[Identification] Change user name', props<{ identificationToUpdate: IdentificationToUpdate }>());
export const changeUserNameSuccess = createAction('[Identification] Change user name with success', props<{ name: string }>());
export const changeUserNameFailure = createAction('[Identification] Change user name with failure');
//#endregion


//#region message
export const sendMessageIngame = createAction('[Message] Send message ingame', props<{ message: MessageSended }>());
export const sendMessageIngameSuccess = createAction('[Message] Send message ingame with success');
export const sendMessageIngameFailure = createAction('[Message] Send message ingame with failure');

export const sendMessageGlobal = createAction('[Message] Send message in global', props<{ message: MessageSended }>());
export const sendMessageGlobalSuccess = createAction('[Message] Send message in global with success');
export const sendMessageGlobalFailure = createAction('[Message] Send message in global with failure');
//#endregion


//#region room
export const createGame = createAction('[Room] Create game room');
export const createGameSuccess = createAction('[Room] Create game room with success');
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