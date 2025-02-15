import { HttpClient } from '@angular/common/http';
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

  private url = 'http://localhost:8080/api';
  private http = inject(HttpClient);
  private store = inject(Store);

  checkIdentification(): Identification {
    return new Identification(this.store.selectSignal(selectUserId)(), this.store.selectSignal(selectUserName)());
  }

  postRegister(identification: Identification): Observable<Identification> {
    return this.http.post<Identification>(this.url + '/identification',
      new Identification(identification.userId, identification.userName)
    );
  }

  postChangeUserName(username: string): Observable<Identification> {
    const id = this.checkIdentification();
    return this.http.post<Identification>(this.url+'/identification/update-username',
      { identification: id, newUserName: username }
    );
  }

  postCreateGame(password: string): Observable<GameLogin> {
    const id = this.checkIdentification();
    return this.http.post<GameLogin>(this.url + '/game/creation', { identification: id, password: password });
  }
}
