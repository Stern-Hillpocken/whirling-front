import { Component, inject } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { GameTheme } from 'src/app/types/game-theme.type';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  localStorage = inject(LocalStorageService);

  gameTheme!: GameTheme;

  ngOnInit() {
    if (!this.localStorage.getGameTheme()) {
      this.localStorage.setGameTheme("element");
    }
    this.gameTheme = this.localStorage.getGameTheme() as GameTheme;
  }

}
