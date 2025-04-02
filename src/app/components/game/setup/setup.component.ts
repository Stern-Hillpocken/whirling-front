import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from 'src/app/models/game.model';
import { Witch } from 'src/app/models/witch.model';
import { GameApiService } from 'src/app/services/game-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { selectGame, selectIndex, selectLookingIndexModifier } from 'src/app/store/game.selectors';
import { SvgType } from 'src/app/types/svg.type';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent {

  store = inject(Store);
  gameApiService = inject(GameApiService);
  utilsService = inject(UtilsService);
  localStorageService = inject(LocalStorageService);
  witches: Witch[] = [];
  witchChoice: number = 0;
  lookingAtMe: boolean = true;

  ngOnInit() {
    this.store.select(selectGame).subscribe((game: Game) => {
      this.store.select(selectIndex).subscribe(i => {
        this.store.select(selectLookingIndexModifier).subscribe(lim => {
          this.witches = game.playingAreas[
            this.utilsService.newIndexInArrayAfterRotation(
              i, game.areReady.length, lim
            )
          ].witch;
          if (lim === 0) this.lookingAtMe = true;
          else this.lookingAtMe = false;
        });
      });
    });
  }

  ingredientName(i: number): SvgType {
    const theme = this.localStorageService.getGameTheme();
    switch(i) {
      case 0: return theme + "-black" as SvgType;
      case 1: return theme + "-white" as SvgType;
      case 2: return theme + "-red" as SvgType;
      case 3: return theme + "-blue" as SvgType;
      case 4: return theme + "-green" as SvgType;
      default: return "close";
    }
  }

  updateWitchChoice(i: number) {
    this.witchChoice = i;
  }

  ready() {
    this.gameApiService.readySetup(this.witchChoice);
  }

}
