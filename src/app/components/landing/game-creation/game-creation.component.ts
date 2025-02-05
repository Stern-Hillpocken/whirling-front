import { Component } from '@angular/core';

@Component({
  selector: 'app-game-creation',
  templateUrl: './game-creation.component.html',
  styleUrls: ['./game-creation.component.scss']
})
export class GameCreationComponent {

  password: string = '';
  isSubmited: boolean = false;

  onSubmit() {
    this.isSubmited = true;
    //
  }

}
