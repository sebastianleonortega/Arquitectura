import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category, Product, SendDataProduct} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  api = 'https://api.escuelajs.co/api/v1/products'
  apiCategories = 'https://api.escuelajs.co/api/v1/categories'

  cardSignal:WritableSignal<boolean> = signal(false)

  constructor(
    private _http: HttpClient,
  ) { }

  //product

  public getProduct(): Observable<Product[]> {
    return this._http.get<Product[]>(this.api)
  }

  public getProductById(id: any): Observable<any> {
    return this._http.get<any>(this.api+ '/' + id)
  }

  public updateProduct(id: any, data: any): Observable<any> {
    return this._http.put<any>(this.api + '/' + id, data)
  }

  public saveProduct(data: SendDataProduct): Observable<Product> {
    return this._http.post<Product>(this.api+ '/' , data)
  }

  public deleteProduct(id: any): Observable<boolean> {
    return this._http.delete<boolean>(this.api+ '/' + id)
  }

  //category
  public getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(this.apiCategories)
  }

}
