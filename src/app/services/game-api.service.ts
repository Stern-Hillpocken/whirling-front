import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Identification } from '../models/identification.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserId, selectUserName } from '../store/game.selectors';
import { GameLogin } from '../models/game-login.model';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

  private url = 'http://localhost:8080/api/game';
  private http = inject(HttpClient);
  private store = inject(Store);

  checkIdentification(): Identification {
    return new Identification(this.store.selectSignal(selectUserId)(), this.store.selectSignal(selectUserName)());
  }

  postCreateGame(password: string): Observable<GameLogin> {
    const id = this.checkIdentification();
    return this.http.post<GameLogin>(
      this.url + '/creation',
      { identification: id, password: password }
    );
  }
}
