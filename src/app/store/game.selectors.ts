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

export const selectIndex = createSelector(
    selectApplicationState,
    (state: ApplicationState) => state.index
);

export const selectLookingIndexModifier = createSelector(
    selectApplicationState,
    (state: ApplicationState) => state.lookingIndexModifier
);

export const selectIngredientsPreparation = createSelector(
    selectApplicationState,
    (state: ApplicationState) => state.ingredientsPreparation
);

export const selectSkillsOrder = createSelector(
    selectApplicationState,
    (state: ApplicationState) => state.skillsOrder
);

export const selectSkillsPrepared = createSelector(
    selectApplicationState,
    (state: ApplicationState) => state.skillsPrepared
);