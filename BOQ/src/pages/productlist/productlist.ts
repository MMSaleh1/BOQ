import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage'; 

import {Category,PosCategory,Product,Resturant} from '../../templates/pos';

import { PosprofilePage} from '../posprofile/posprofile';
import { OrderPage} from '../order/order';

import { SearchfilterProvider} from '../../providers/searchfilter/searchfilter';
/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {
  public data : any;
  public itemBase : any;
  public type : any;
  public userid : string;
  public Ready : boolean = false;
  public SearchTerm : string = "";
  public listedPos :Array<{
   item : Product,
   pos : string;
  }>;
  public listedArr : any;
  private orders : Array<{
    item: Product;
    quantity: number;
  }>;

  constructor(public navCtrl: NavController, public navParams: NavParams , public natStorage : NativeStorage,public searchFilter : SearchfilterProvider,) {
    this.listedPos = new Array();
     this.natStorage.getItem('user').then(data=>{
      this.userid = data.id;
    },err=>{
      this.userid = '1940';
    })
    this.itemBase = navParams.get('item');
    this.data = navParams.get('pos');
    this.type = navParams.get('pageType');
    //console.log(this.itemBase);
    //console.log(this.data);
    //console.log(this.type);

    if(this.type ==1 && this.data.length >0){
      let counter = 0;
      for(let i = 0 ;i <this.data.length ; i++){
        if(this.data[i].category == this.itemBase.id){
          //console.log("enter loop")
          for(let j =0 ;j < this.data[i].products.length ; j++){
            if(this.data[i].products[j].id !="-1"){
              this.listedPos[counter]={item : this.data[i].products[j] , pos : this.data[i].name};
              counter++;
            }
            
          }
         
        }
        
      }
      console.log(this.listedPos);
      this.Ready=true;

    }
    this.setPos();
    
  }
  changeNumber(func : String,index : any){
    // console.log(this.orders.length);
     
     //this.orders[index].item=this.choosenResturant.products[index]; //order is important  first change the item from defult
 
     if(func == 'add' && this.orders[index].quantity < this.orders[index].item.quantity){
       this.orders[index].quantity++; // then change its quantity
     }else if(func == 'remove'){
       if(this.orders[index].quantity!=0){
           
           this.orders[index].quantity--;
       }
         
       
     }
     //console.log(this.orders);
   }

   order(){
    let totalPrice =0;
    for(let i =0; i< this.orders.length;i++){
      totalPrice += (this.orders[i].item.price*this.orders[i].quantity);
    }
    console.log(totalPrice);
    console.log(this.orders);
    this.navCtrl.push(OrderPage,{"orders":this.orders ,"userid" :this.userid});
  }

  setPos(){
    this.orders= new Array();
    if(this.type ==0){
    this.orders.length =this.itemBase.products.length;
    for(let i =0;i<this.orders.length;i++){
      this.orders[i] ={item :this.itemBase.products[i],quantity:0}
     //console.log(this.orders[i]);
     
    }
  }else if(this.type == 1){
    this.orders.length = this.listedPos.length;
    for(let i =0 ; i<this.orders.length;i++){
      this.orders[i] ={item :this.listedPos[i].item,quantity:0}
    }
    //console.log(this.orders);
  }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductlistPage');
  }
  goToPage(){
    this.navCtrl.push(PosprofilePage,{'pos': this.itemBase});
  }
  

  public search(){
    this.listedArr= this.searchFilter.filter(this.itemBase.products,this.SearchTerm);
   }
}
