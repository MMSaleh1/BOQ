import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {RegisterationPage} from '../registeration/registeration';
/**
 * Generated class for the openingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-opening',
  templateUrl: 'opening.html',
})
export class OpeningPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad openingPage');
  }
  openPage(type : any){
   if(type == 0){
     this.navCtrl.push(LoginPage)
   }else{
     this.navCtrl.push(RegisterationPage);
   }
  }
  

}
