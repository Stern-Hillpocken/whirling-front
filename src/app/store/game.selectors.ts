import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ApplicationState } from "../models/application-state";

export const selectApplicationState = createFeatureSelector<ApplicationState>('appli');

export const selectUserId = createSelector(
    selectApplicationState,
    (state: ApplicationState) => state.userId 
);

export const selectUserName = createSelector(
    selectApplicationState,
    (state: ApplicationState) => state.userName 
);

export const selectGameId = createSelector(
    selectApplicationState,
    (state: ApplicationState) => state.gameId 
);

export const selectGame = createSelector(
    selectApplicationState,
    (state: ApplicationState) => state.game
);