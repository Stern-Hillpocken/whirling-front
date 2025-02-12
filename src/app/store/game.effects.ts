import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { GameApiService } from '../services/game-api.service';
import { register, registerSuccess, sendMessageGlobal, sendMessageGlobalSuccess, sendMessageIngame, sendMessageIngameSuccess } from './game.actions';
import { Identification } from '../models/identification.model';
import { MessageApiService } from '../services/message-api.service';
import { MessageReceived } from '../models/message-received.model';

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