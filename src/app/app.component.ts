import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './services/local-storage.service';
import { Identification } from './models/identification.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Whirling';

  private localStorage = inject(LocalStorageService);
  private http = inject(HttpClient);

  ngOnInit() {
    // Set theme
    window.document.getElementsByTagName("body")[0].setAttribute("theme", this.localStorage.getColorTheme() ?? "");
    // Identification
    this.http.post<Identification>('http://localhost:8080/api/identification',
      new Identification(this.localStorage.getUserId() ?? "", this.localStorage.getUserName() ?? "")
    ).subscribe((ident: Identification) => {
      console.log(ident);
      this.localStorage.setUserId(ident.userId);
      this.localStorage.setUserName(ident.userName);
    });
  }
}
