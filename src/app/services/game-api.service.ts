import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameLogin } from '../models/game-login.model';
import { OneValueObject } from '../models/one-value-object.model';
import { GameInfo } from '../models/game-info.model';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

  private url = 'http://localhost:8080/api/game';
  private http = inject(HttpClient);

  postCreateGame(password: string): Observable<GameLogin> {
    return this.http.post<GameLogin>(
      this.url + '/creation',
      new OneValueObject(password)
    );
  }

  getAllGames(): Observable<GameInfo[]> {
    return this.http.get<GameInfo[]>(
      this.url + '/all-games'
    );
  }
}
