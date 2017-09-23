import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { NativeStorage} from '@ionic-native/native-storage';
import { HomePage } from '../../pages/home/home'; 

import {User} from '../../templates/user';
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public user :User ;
  public loginForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams , public formBuilder : FormBuilder , public userProvider :UserProvider , public natStorage : NativeStorage) {
  this.buildForm();
  }


  buildForm(){
    this.loginForm = this.formBuilder.group({
  
      password : ['',[Validators.required,Validators.maxLength(20),Validators.minLength(6)]],
      email : ['',[Validators.required]]
    })
  }

  public onLogin(){
    if(this.loginForm.valid){
      this.userProvider.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(data=>{
        if(data.length >0){
          let tempGender = data[0].UserGender==1 ? 'ذكر': 'انثي'; 
          this.user = new User(data[0].UserID,data[0].UserEmail,tempGender,data[0].UserAddress,data[0].UserPwd,data[0].UserEmail,data[0].UserMobile)
          console.log(this.user);
          this.natStorage.setItem("user",this.user);
          this.navCtrl.setRoot(HomePage , {"user" : this.user});
        }else{
          console.log(data);
        }
      },err=>{
        console.log(err);
      })
    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
