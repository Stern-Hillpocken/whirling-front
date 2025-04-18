import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { OneValueObject } from 'src/app/models/one-value-object.model';
import { createGame } from 'src/app/store/game.actions';

@Component({
  selector: 'app-game-creation',
  templateUrl: './game-creation.component.html',
  styleUrls: ['./game-creation.component.scss']
})
export class GameCreationComponent {

  store = inject(Store);

  password: string = '';
  isSubmited: boolean = false;

  onSubmit() {
    this.isSubmited = true;
    this.store.dispatch(createGame(new OneValueObject(this.password)));
  }

}
