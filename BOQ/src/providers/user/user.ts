import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RootProvider} from '../root/root';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider extends RootProvider {

  constructor(public http: Http) {
    super(http);
  }
  

}
