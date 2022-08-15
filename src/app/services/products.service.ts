import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ProductModel} from "@app-models";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {}

  listProducts() : Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(environment.api.products);
  }

  saveProducts(product: ProductModel) : Observable<ProductModel> {
    return this.httpClient.post<ProductModel>(environment.api.products, product);
  }

}
