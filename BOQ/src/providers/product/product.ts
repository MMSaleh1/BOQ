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
  private InvoiceHeader: string="AddInvoiceHeader_MobileBased";
  private InvoiceItem: string = "AddInvoiceitem";
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

  public add_invoice_header(item_count:any,total_price:any,id:any,rfid:any,pMethod:any,user_id:any,pointID:any,order_status:any,deliver_to:any,tableCode:any,ToGo:any) : Observable<any>{
    return this.http.get(`${this.APIURL}${this.InvoiceHeader}?item_count=${item_count}&total_price=${total_price}&id=${id}&rfid=${rfid}&pMethod=${pMethod}&user_id=${user_id}&pointID=${pointID}&order_status=${order_status}&deliver_to=${deliver_to}&tableCode=${tableCode}&ToGo=${ToGo}`).map(res=><any>res.json());
  }
  public add_invoice_item(category_id:any,prod_id:any,quatity:any,price:any,id:any ,rfid:any ,pMethod :any,invNo:any,order_status:any,deliver_to:any,table_no:any,order_comments:any):Observable<any>{
    return this.http.get(`${this.APIURL}${this.InvoiceItem}?category_id=${category_id}&prod_id=${prod_id}&quatity=${quatity}&price=${price}&id=${id}&rfid=${rfid}&pMethod=${pMethod}&invNo=${invNo}&order_status=${order_status}&deliver_to=${deliver_to}&table_no=${table_no}&order_comments${order_comments}`).map(res=> <any>res.json());
  }

}
