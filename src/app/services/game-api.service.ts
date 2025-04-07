import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameLogin } from '../models/game-login.model';
import { OneValueObject } from '../models/one-value-object.model';
import { GameInfo } from '../models/game-info.model';
import { Game } from '../models/game.model';
import { Recipe } from '../models/recipe.model';

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

  getGame(url: string): Observable<Game> {
    url = url.replace('/game', '');
    return this.http.get<Game>(
      this.url + url
    );
  }

  movePlayer(id: number, way: "clockwise" | "anticlockwise") {
    this.http.post<any>(this.url + "/move-player/" + way,
      new OneValueObject(id.toString())
    ).subscribe();
  }

  launch(needrandomize: boolean) {
    const ovo: OneValueObject = needrandomize ? new OneValueObject("randomize") : new OneValueObject("");
    this.http.post(this.url + '/launch', ovo).subscribe();
  }

  readySetup(characterIndex: number) {
    this.http.post(this.url + '/ready/setup', new OneValueObject(characterIndex.toString())).subscribe();
  }

  readyRecipe(recipe: Recipe) {
    this.http.post(this.url + '/ready/recipe', recipe).subscribe();
  }

  readyProduce() {
    this.http.post(this.url + '/ready/produce', null).subscribe();
  }

  getUserIndex(): Observable<OneValueObject> {
    return this.http.get<OneValueObject>(this.url + '/my-index');
  }

}
