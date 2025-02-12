import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Identification } from '../models/identification.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

  private url = 'http://localhost:8080/api';
  private http = inject(HttpClient);

  postRegister(identification: Identification): Observable<Identification> {
    return this.http.post<Identification>(this.url + '/identification',
      new Identification(identification.userId, identification.userName)
    );
  }
}
