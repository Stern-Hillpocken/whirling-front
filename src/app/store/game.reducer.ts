import { createReducer, on } from "@ngrx/store";
import { updateUserName, updateUserNameFailure, updateUserNameSuccess, createGame, createGameFailure, createGameSuccess, joinGame, joinGameFailure, joinGameSuccess, register, registerFailure, registerSuccess, sendMessageGlobal, sendMessageGlobalFailure, sendMessageGlobalSuccess, sendMessageIngame, sendMessageIngameFailure, sendMessageIngameSuccess, updateGameTheme, updateGameThemeFailure, updateGameThemeSuccess, gatherGame, gatherGameSuccess, gatherUserIndexSuccess, setLookingIndexModifier } from './game.actions';
import { ApplicationState } from "../models/application-state";
import { OneValueObject } from "../models/one-value-object.model";
import { Game } from "../models/game.model";

export const initialState: ApplicationState = {
    userId: "",
    userName: "",
    gameId: "",
    game: new Game('', '', '', 0, false, [], "CHECK_FOR_WINNERS", [], []),
    index: -1,
    lookingIndexModifier: 0
};

export const gameReducer = createReducer(
    initialState,

    on(updateUserName, (state) => ({
        ...state,
        //
    })),
    on(updateUserNameFailure, (state) => ({
        ...state,
        //
    })),
    on(updateUserNameSuccess, (state, ovo: OneValueObject) => ({
        ...state,
        userName: ovo.value
    })),

    on(createGame, (state) => ({
        ...state,
        //
    })),
    on(createGameFailure, (state) => ({
        ...state,
        //
    })),
    on(createGameSuccess, (state) => ({
        ...state,
        //
    })),

    on(joinGame, (state) => ({
        ...state,
        //
    })),
    on(joinGameFailure, (state) => ({
        ...state,
        //
    })),
    on(joinGameSuccess, (state) => ({
        ...state,
        //
    })),

    on(register, (state, { identification }) => ({
        ...state,
        userId: identification.userId,
        userName: identification.userName
    })),
    on(registerFailure, (state) => ({
        ...state,
        //
    })),
    on(registerSuccess, (state, { identification }) => ({
        ...state,
        userId: identification.userId,
        userName: identification.userName
    })),

    on(sendMessageGlobal, (state) => ({
        ...state,
        //
    })),
    on(sendMessageGlobalFailure, (state) => ({
        ...state,
        //
    })),
    on(sendMessageGlobalSuccess, (state) => ({
        ...state,
        //
    })),

    on(sendMessageIngame, (state, messageSended) => ({
        ...state,
        //
    })),
    on(sendMessageIngameFailure, (state) => ({
        ...state,
        //
    })),
    on(sendMessageIngameSuccess, (state) => ({
        ...state,
        //
    })),

    on(updateGameTheme, (state, gameTheme) => ({
        ...state,
        //
    })),
    on(updateGameThemeFailure, (state) => ({
        ...state,
        //
    })),
    on(updateGameThemeSuccess, (state) => ({
        ...state,
        //
    })),

    on(gatherGameSuccess, (state, newGame: Game) => ({
        ...state,
        game: newGame
    })),

    on(gatherUserIndexSuccess, (state, ovo: OneValueObject) => ({
        ...state,
        index: parseInt(ovo.value),
    })),

    on(setLookingIndexModifier, (state, obj: {setTo: -1 | 0 | 1}) => ({
        ...state,
        lookingIndexModifier: obj.setTo,
    })),
);