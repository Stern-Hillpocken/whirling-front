import { Component, inject } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ColorTheme } from 'src/app/types/color-theme.type';
import { GameTheme } from 'src/app/types/game-theme.type';
import { SvgType } from 'src/app/types/svg.type';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  localStorageService = inject(LocalStorageService);

  isThemeDisplayed: boolean = false;
  colorThemes: ColorTheme[] = ["crimson", "forest", "ocean", "squid", "sunset"];
  gameThemes: GameTheme[] = ["element", "fantasy", "network", "weather"];
  colorThemeSelected: ColorTheme = this.localStorageService.getColorTheme() as ColorTheme;
  gameThemeSelected: GameTheme = this.localStorageService.getGameTheme() as GameTheme;

  ngAfterViewInit() {
    for(let i = 0; i < this.colorThemes.length; i++) {
      window.document.getElementById("color-list")?.getElementsByTagName("button")[i].setAttribute("theme", this.colorThemes[i]);
    }
  }

  switchThemeDisplay() {
    this.isThemeDisplayed = !this.isThemeDisplayed;
  }

  changeColorTheme(value: ColorTheme) {
    this.colorThemeSelected = value;
    this.localStorageService.setColorTheme(value);
  }

  changeGameTheme(value: GameTheme) {
    this.gameThemeSelected = value;
    this.localStorageService.setGameTheme(value);
    window.document.getElementsByTagName("h1")[0].innerText = "Whirling " + value;
  }

  svgName(type: string, colorCube: string): SvgType {
    return type+'-'+colorCube as SvgType;
  }

}
