import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { LoginPage} from '../login/login';
import {RegisterationPage }from '../registeration/registeration';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  openPage(flag : any){
    console.log(flag);
    if(flag=='0'){
      this.navCtrl.push(LoginPage);
    }else{
      this.navCtrl.push(RegisterationPage);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

}
