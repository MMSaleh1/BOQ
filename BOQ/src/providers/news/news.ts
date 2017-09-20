import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import {RootProvider} from '../root/root';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider extends RootProvider {
  private GetNews ="GetNews";
  private GetNewsCategory = "GetNewsCategories";

  constructor(public http: Http) {
    super(http);
  }

  public get_News_Category(userid : any) :Observable<any>{
    return this.http.get(`${this.APIURL}${this.GetNewsCategory}?MemberID=${userid}`).map(res=><any>res.json());
  }
  public get_News(userid : any) :Observable<any>{
    return this.http.get(`${this.APIURL}${this.GetNews}?MemberID=${userid}`).map(res=><any>res.json());
  }

}
