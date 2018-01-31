import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { NativeStorage} from '@ionic-native/native-storage';
import { HomePage } from '../../pages/home/home'; 

import {User} from '../../templates/user';
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the RegisterationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registeration',
  templateUrl: 'registeration.html',
})
export class RegisterationPage {

  public user : User;
  public registerForm : FormGroup;
  public gender :string="";
  public location :string= "";
  constructor(public navCtrl: NavController,public natStorage : NativeStorage, public navParams: NavParams , public formBuilder : FormBuilder ,public userProvider : UserProvider) {
    this.buildForm();
  }

  buildForm(){
    this.registerForm = this.formBuilder.group({
      name : ['',[Validators.required,Validators.maxLength(12),Validators.minLength(4)]],
      password : ['',[Validators.required,Validators.maxLength(20),Validators.minLength(6)]],
      email : ['',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      gender : ['',[Validators.required]],
      location : ['',[Validators.required]],
      phone : ['', [Validators.required, Validators.maxLength(11),Validators.minLength(11)]]
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterationPage');
  }
  onRegester(){
    if(this.registerForm.valid){
      console.log(this.gender);
      console.log(this.location)
      this.user = new User();
      this.userProvider.Regester(this.registerForm.value.email,this.registerForm.value.password,this.registerForm.value.name,this.registerForm.value.gender,this.registerForm.value.location,this.registerForm.value.phone).subscribe(data=>{
        console.log(data);
        if(data.length > 0){
          this.user = new User(data[0].USERID,this.registerForm.value.name,this.registerForm.value.gender,this.registerForm.value.location,this.registerForm.value.password,this.registerForm.value.email,this.registerForm.value.phone)
        
        console.log(this.user);
        this.natStorage.setItem('user' ,this.user);
        this.navCtrl.setRoot(HomePage , {"user" : this.user});
        }else{
          alert("Server Error");
        }
      },err=>{
        alert("No Connection");
      })
    }else{
    }
  }

}
