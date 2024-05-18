import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  api = 'https://api.escuelajs.co/api/v1/products'

  cardSignal:WritableSignal<boolean> = signal(false)

  constructor(
    private _http: HttpClient,
  ) { }

  public getProduct(): Observable<any> {
    return this._http.get<any>(this.api)
  }

  public getProductById(id: any): Observable<any> {
    return this._http.get<any>(this.api+ '/' + id)
  }

  public updateProduct(id: any, data: any): Observable<any> {
    return this._http.put<any>(this.api + '/' + id, data)
  }

  public saveProduct(data: any): Observable<any> {
    return this._http.post<any>(this.api+ '/' , data)
  }

  public deleteProduct(id: any): Observable<any> {
    return this._http.delete<any>(this.api+ '/' + id)
  }
}
