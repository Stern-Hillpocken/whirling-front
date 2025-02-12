import { Component, inject } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { Identification } from './models/identification.model';
import { Store } from '@ngrx/store';
import { selectUserId, selectUserName } from './store/game.selectors';
import { register } from './store/game.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Whirling';

  private localStorageService = inject(LocalStorageService);
  private store = inject(Store);

  ngOnInit() {
    // Set theme
    window.document.getElementsByTagName("body")[0].setAttribute("theme", this.localStorageService.getColorTheme() ?? "");
    // Identification
    this.store.dispatch(register({
      identification: new Identification(this.localStorageService.getUserId() ?? "", this.localStorageService.getUserName() ?? "")
    }));
    // Update storage
    this.store.select(selectUserId).subscribe(id => this.localStorageService.setUserId(id));
    this.store.select(selectUserName).subscribe(name => this.localStorageService.setUserName(name));
  }

}
