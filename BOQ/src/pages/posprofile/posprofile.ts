import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PosprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-posprofile',
  templateUrl: 'posprofile.html',
})
export class PosprofilePage {

  public pos : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pos =this.navParams.get('pos');
    console.log(this.pos);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PosprofilePage');
  }

}
