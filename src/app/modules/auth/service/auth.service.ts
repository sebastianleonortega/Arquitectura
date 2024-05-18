import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'https://api.escuelajs.co/api/v1/auth/login'

  constructor(
    private _http: HttpClient,
  ) { }

  public login(data: any): Observable<any> {
    return this._http.post<any>(this.api, data)
  }
}
