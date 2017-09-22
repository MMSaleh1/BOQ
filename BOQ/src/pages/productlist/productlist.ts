import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

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

  private orders : Array<{
    item: Product;
    quantity: number;
    mainIndex : number;
  }>;
  private subOrders : Array <{
    item: Product;
    quantity : number;
    mainIndex : number;
  }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.itemBase = navParams.get('item');
    this.data = navParams.get('products');
    this.type = navParams.get('pageType');
    console.log(this.itemBase);
    console.log(this.data);
    console.log(this.type);
    this.orders = new Array();
    this.subOrders = new Array();
    
  }
  changeNumber(func : String,index : any){
    // console.log(this.orders.length);
     
     //this.subOrders[index].item=this.choosenResturant.products[index]; //order is important  first change the item from defult
 
     if(func == 'add' && this.subOrders[index].quantity < this.subOrders[index].item.quantity){
       this.subOrders[index].quantity++; // then change its quantity
     }else if(func == 'remove'){
       if(this.subOrders[index].quantity!=0){
           
           this.subOrders[index].quantity--;
       }
         
       
     }
     //console.log(this.orders);
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
  }

}
