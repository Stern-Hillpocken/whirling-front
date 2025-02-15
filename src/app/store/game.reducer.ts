import { createReducer, on } from "@ngrx/store";
import { changeUserName, changeUserNameFailure, changeUserNameSuccess, createGame, createGameFailure, createGameSuccess, joinGame, joinGameFailure, joinGameSuccess, register, registerFailure, registerSuccess, sendMessageGlobal, sendMessageGlobalFailure, sendMessageGlobalSuccess, sendMessageIngame, sendMessageIngameFailure, sendMessageIngameSuccess, updateGameTheme, updateGameThemeFailure, updateGameThemeSuccess } from './game.actions';
import { ApplicationState } from "../models/application-state";

export const initialState: ApplicationState = {
    userId: "",
    userName: "",
    gameId: ""
};

export const gameReducer = createReducer(
    initialState,

    on(changeUserName, (state) => ({
        ...state,
        //
    })),
    on(changeUserNameFailure, (state) => ({
        ...state,
        //
    })),
    on(changeUserNameSuccess, (state, { username }) => ({
        ...state,
        userName: username
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
);