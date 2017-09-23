import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';

import {RootProvider} from '../root/root';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider extends RootProvider {

  private logIn : string ="MobileUserLogin";
  private register : string = "AddNewUser";
  constructor(public http: Http) {
    super(http);
  }

  public login(email : string , password : string) : Observable<any>{
    return this.http.get(`${this.APIURL}${this.logIn}?user_email=${email}&user_pwd=${password}`).map(res=><any>res.json());

  }

  public Regester(email :string , password :string , name :string ,gender : string , location :string , phone: string ) : Observable<any>{
    let tempGender = (gender =="ذكر")? 1:2;
    return this.http.get(`${this.APIURL}${this.register}?user_email=${email}&user_pwd=${password}&mobile=${phone}&fname=${name}&home_address=${location}&gender=${tempGender}`).map(res=><any>res.json())
  }


}
