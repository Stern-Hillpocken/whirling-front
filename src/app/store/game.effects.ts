import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { first, map, switchMap, tap } from 'rxjs';
import { GameApiService } from '../services/game-api.service';
import { changeUserName, changeUserNameSuccess, createGame, createGameSuccess, register, registerSuccess, sendMessageGlobal, sendMessageGlobalSuccess, sendMessageIngame, sendMessageIngameSuccess } from './game.actions';
import { Identification } from '../models/identification.model';
import { MessageApiService } from '../services/message-api.service';
import { MessageReceived } from '../models/message-received.model';
import { Router } from '@angular/router';
import { GameLogin } from '../models/game-login.model';
import { LocalStorageService } from '../services/local-storage.service';

export const postRegister$ = createEffect(
    (actions$ = inject(Actions), gameApiService = inject(GameApiService)) => {
        return actions$.pipe(
            ofType(register.type),
            switchMap((obj) => gameApiService.postRegister(obj.identification)),
            map((identification: Identification) => registerSuccess({ identification }))
        );
    },
    { functional: true }
);

export const postMessageGlobal$ = createEffect(
    (actions$ = inject(Actions), messageApiService = inject(MessageApiService)) => {
        return actions$.pipe(
            ofType(sendMessageGlobal.type),
            switchMap((obj) => messageApiService.postMessageGlobal(obj.message)),
            map((message: MessageReceived) => sendMessageGlobalSuccess())
        );
    },
    { functional: true }
);

export const postMessageIngame$ = createEffect(
    (actions$ = inject(Actions), messageApiService = inject(MessageApiService)) => {
        return actions$.pipe(
            ofType(sendMessageIngame.type),
            switchMap((obj) => messageApiService.postMessageIngame(obj.message)),
            map((message: MessageReceived) => sendMessageIngameSuccess())
        );
    },
    { functional: true }
);

export const postCreateGame$ = createEffect(
    (actions$ = inject(Actions), gameApiService = inject(GameApiService)) => {
        return actions$.pipe(
            ofType(createGame.type),
            switchMap((obj) => gameApiService.postCreateGame(obj.password)),
            map((gameLogin: GameLogin) => createGameSuccess(gameLogin))
        );
    },
    { functional: true }
);

export const createGameSuccess$ = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(createGameSuccess.type),
            first(),
            tap((act: {id: string, password: string, type: string}) => router.navigate(['/game/'+act.id], { queryParams: {psw: act.password} }))
        );
    },
    { functional: true }
);

export const postChangeUserName$ = createEffect(
    (actions$ = inject(Actions), gameApiService = inject(GameApiService)) => {
        return actions$.pipe(
            ofType(changeUserName.type),
            switchMap((obj) => gameApiService.postChangeUserName(obj.username)),
            map((identification: Identification) => changeUserNameSuccess({ username: identification.userName }))
        );
    },
    { functional: true }
);

export const changeUserNameSuccess$ = createEffect(
    (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)) => {
        return actions$.pipe(
            ofType(changeUserNameSuccess.type),
            first(),
            tap((act: { username: string, type: string }) => localStorageService.setUserName(act.username))
        );
    },
    { functional: true }
);
