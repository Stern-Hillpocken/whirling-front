import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { Store } from '@ngrx/store';
import { register } from '../store/game.actions';
import { Identification } from '../models/identification.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private localStorageService = inject(LocalStorageService);
  private store = inject(Store);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const idToken = this.localStorageService.getToken();
    const isUrlRegister: boolean = request.url === "http://localhost:8080/api/user/register";

    if (idToken && !isUrlRegister) {
      // Add header for each HTTP request
      const cloned = request.clone({
        headers: request.headers.set(
          "Authorization",
          "Bearer " + idToken
        )
      });
      return this.mapStream(cloned, next);
    } else {
      return this.mapStream(request, next);
    }
  }

  mapStream(request: HttpRequest<unknown>, next: HttpHandler):  Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      tap(incomingRequest => {
        // Intercept 200 status request
        if (incomingRequest instanceof HttpResponse) {
          //
        }
      }),
      // Intercept 400 status request
      catchError((err: HttpErrorResponse) => {
        if(err.error.error_message != undefined){
          console.error(err.error.error_message);
        }
        console.error(err);
        if(err.error["is_token_expired"]){
          this.store.dispatch(register({
            identification: new Identification(this.localStorageService.getUserId() ?? "", this.localStorageService.getUserName() ?? "")
          }));
        }
        return throwError(() => new Error("Une erreur est survenue"));
      })
    )
  }
}