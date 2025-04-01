import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from 'src/app/models/game.model';
import { UtilsService } from 'src/app/services/utils.service';
import { setLookingIndexModifier } from 'src/app/store/game.actions';
import { selectGame, selectIndex, selectLookingIndexModifier } from 'src/app/store/game.selectors';

@Component({
  selector: 'app-neighbourhood-menu',
  templateUrl: './neighbourhood-menu.component.html',
  styleUrl: './neighbourhood-menu.component.scss'
})
export class NeighbourhoodMenuComponent {

  store = inject(Store);
  utils = inject(UtilsService);
  howManyAreReady: string = "";
  indexModifier: number = 0;

  ngOnInit() {
    this.store.select(selectGame).subscribe((game: Game) => {
      this.howManyAreReady = game.areReady.filter(el => el === true).length + "/" + game.areReady.length;
    });
    this.store.select(selectLookingIndexModifier).subscribe((modif: number) => {
      this.indexModifier = modif;
    });
  }

  lookingName(): string {
    const realIndex = this.utils.newIndexInArrayAfterRotation(this.store.selectSignal(selectIndex)(), this.store.selectSignal(selectGame)().playersName.length, this.indexModifier);
    return this.store.selectSignal(selectGame)().playersName[realIndex];
  }

  lookLeft() {
    this.indexModifier = -1;
    this.store.dispatch(setLookingIndexModifier({setTo: -1}));
  }

  lookAtMe() {
    this.indexModifier = 0;
    this.store.dispatch(setLookingIndexModifier({setTo: 0}));
  }

  lookRight() {
    this.indexModifier = 1;
    this.store.dispatch(setLookingIndexModifier({setTo: 1}));
  }

}
