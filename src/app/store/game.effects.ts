import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { first, map, switchMap, tap } from 'rxjs';
import { GameApiService } from '../services/game-api.service';
import { updateUserName, updateUserNameSuccess, createGame, createGameSuccess, register, registerSuccess, sendMessageGlobal, sendMessageGlobalSuccess, sendMessageIngame, sendMessageIngameSuccess } from './game.actions';
import { Identification } from '../models/identification.model';
import { MessageApiService } from '../services/message-api.service';
import { MessageReceived } from '../models/message-received.model';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { UserApiService } from '../services/user-api.service';
import { IdCredentials } from '../models/id-credentials.model';
import { OneValueObject } from '../models/one-value-object.model';

export const postRegister$ = createEffect(
    (actions$ = inject(Actions), gameApiService = inject(UserApiService), localStorageService = inject(LocalStorageService)) => {
        return actions$.pipe(
            ofType(register.type),
            switchMap((obj) => gameApiService.postRegister(obj.identification)),
            map((idCredentials: IdCredentials) => {
                localStorageService.setToken(idCredentials.jwt);
                return registerSuccess({ identification: new Identification(idCredentials.id, idCredentials.name) })
            })
        );
    },
    { functional: true }
);

export const postMessageGlobal$ = createEffect(
    (actions$ = inject(Actions), messageApiService = inject(MessageApiService)) => {
        return actions$.pipe(
            ofType(sendMessageGlobal.type),
            switchMap((action) => messageApiService.postMessageGlobal(action.value)),
            map((message: MessageReceived) => sendMessageGlobalSuccess())
        );
    },
    { functional: true }
);

export const postMessageIngame$ = createEffect(
    (actions$ = inject(Actions), messageApiService = inject(MessageApiService)) => {
        return actions$.pipe(
            ofType(sendMessageIngame.type),
            switchMap((action) => messageApiService.postMessageIngame(action.value)),
            map((message: MessageReceived) => sendMessageIngameSuccess())
        );
    },
    { functional: true }
);

export const postCreateGame$ = createEffect(
    (actions$ = inject(Actions), gameApiService = inject(GameApiService)) => {
        return actions$.pipe(
            ofType(createGame.type),
            switchMap((action) => gameApiService.postCreateGame(action.value)),
            map((actionGameLogin) => createGameSuccess(actionGameLogin))
        );
    },
    { functional: true }
);

export const createGameSuccess$ = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(createGameSuccess.type),
            first(),
            tap((action: {type: string, id: string, password: string}) => router.navigate(['/game/'+action.id], { queryParams: {psw: action.password} }))
        );
    },
    { functional: true }
);

export const postUpdateUserName$ = createEffect(
    (actions$ = inject(Actions), gameApiService = inject(UserApiService)) => {
        return actions$.pipe(
            ofType(updateUserName.type),
            switchMap((action: { value: string, type: string }) => gameApiService.postUpdateName(action.value)),
            map((ovo: OneValueObject) => updateUserNameSuccess(ovo))
        );
    },
    { functional: true }
);

export const updateUserNameSuccess$ = createEffect(
    (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)) => {
        return actions$.pipe(
            ofType(updateUserNameSuccess.type),
            first(),
            tap((action: { value: string, type: string }) => localStorageService.setUserName(action.value))
        );
    },
    { functional: true }
);
