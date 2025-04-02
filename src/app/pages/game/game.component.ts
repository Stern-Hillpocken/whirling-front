import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { OneValueObject } from 'src/app/models/one-value-object.model';
import { GameApiService } from 'src/app/services/game-api.service';
import { gatherGame, gatherGameSuccess, gatherUserIndex } from 'src/app/store/game.actions';
import { selectGame } from 'src/app/store/game.selectors';
import { Phase } from 'src/app/types/phase.type';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  gameApiService = inject(GameApiService);
  router = inject(Router);
  store = inject(Store);
  localStorageService = inject(LocalStorageService);
  socketClient: any = null;
  private notificationSubscriptionForGame: any;

  ngOnInit() {
    this.localStorageService.setGameLogin(this.router.url.replace('/game/', ''));
    this.store.dispatch(gatherGame(new OneValueObject(this.router.url)));
    this.store.dispatch(gatherUserIndex());
    const ws = new SockJS('http://localhost:8080/ws');
    this.socketClient = Stomp.over(ws);
    this.socketClient.connect({}, () => {
      this.notificationSubscriptionForGame = this.socketClient.subscribe(
        this.router.url,
        (message: any) => {
          if (this.store.selectSignal(selectGame)().isStarted === false && JSON.parse(message.body).isStarted === true) this.store.dispatch(gatherUserIndex());
          this.store.dispatch(gatherGameSuccess(JSON.parse(message.body)));
        }
      );
    });
  }

  displayTitle(): string {
    if (!this.store.selectSignal(selectGame)().isStarted) return "Hub";
    switch(this.store.selectSignal(selectGame)().currentPhase) {
      case "SETUP": return "Mise en place";
      case "PLAY_RECIPES": return "Choisir une recette";
      case "REVEAL_RECIPES": return "Révélation de la recette";
      case "RESOLVE_ARCANA": return "Résolution des arcanes";
      case "PRODUCE_INGREDIENTS": return "Production des ingrédients";
      case "PASS_CAULDRONS": return "Passation des chaudrons";
      case "CHECK_FOR_WINNERS": return "Vérification des points";
      case "PASS_RECIPE_CARDS": return "Passation des recettes";
    }
  }

  isCurrentPhase(phase: Phase | 'HUB' | 'NOT-HUB' | 'NOT-HUB-SETUP'): boolean {
    if (!this.store.selectSignal(selectGame)().isStarted && phase === 'HUB') return true;
    if (!this.store.selectSignal(selectGame)().isStarted) return false;
    if (phase === 'NOT-HUB-SETUP' && this.store.selectSignal(selectGame)().currentPhase !== 'SETUP') return true;
    if (phase === 'NOT-HUB') return true;
    return this.store.selectSignal(selectGame)().currentPhase === phase;
  }

}
