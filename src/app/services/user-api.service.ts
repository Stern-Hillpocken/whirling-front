import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Identification } from '../models/identification.model';
import { Observable } from 'rxjs';
import { IdCredentials } from '../models/id-credentials.model';
import { OneValueObject } from '../models/one-value-object.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private url = 'http://localhost:8080/api/user';
  private http = inject(HttpClient);

  postRegister(identification: Identification): Observable<IdCredentials> {
    return this.http.post<IdCredentials>(
      this.url + '/register',
      identification
    );
  }

  postUpdateName(newName: string): Observable<OneValueObject> {
    return this.http.post<OneValueObject>(
      this.url + '/update-name',
      new OneValueObject(newName)
    );
  }

}
