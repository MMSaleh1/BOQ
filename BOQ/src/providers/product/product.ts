import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';

import {RootProvider} from '../root/root';
/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider extends RootProvider  {
  private GetProductCategory ="GetCategory";
  private GetProduct = "GetProduct";
  private GetPOS = "GetPOS";
  private GetPOSCategory = "GetPOSCategory";
  constructor(public http: Http) {
    super(http);
  }

  public get_Product_Category() : Observable<any>{
    return this.http.get(`${this.APIURL}${this.GetProductCategory}`).map(res=><any>res.json());
  }

  public get_Product() :Observable<any>{
    return this.http.get(`${this.APIURL}${this.GetProduct}`).map(res=><any>res.json());
  }

  public get_POS() :Observable<any>{
    return this.http.get(`${this.APIURL}${this.GetPOS}`).map(res=><any>res.json());
  }
  public get_POS_category() : Observable<any>{
    return this.http.get(`${this.APIURL}${this.GetPOSCategory}`).map(res=><any>res.json());
  }


}
