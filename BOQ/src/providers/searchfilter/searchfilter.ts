import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SearchfilterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchfilterProvider {

  constructor(public http: Http) {
  }
  public filter(arr : Array<any>,searchTerm :string =""){
    if(searchTerm ==""){
      return arr;
    }else{
    return arr.filter((item) => {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });     
    }
}

}
