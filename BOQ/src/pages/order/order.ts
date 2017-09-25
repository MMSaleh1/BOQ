import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {ProductProvider} from '../../providers/product/product';
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  public orders :Array<any>;
  public userId : string;
  public viewOrder : Array<any>;
  public paymentMethod :number = 61 ;
  public totalPrice:number = 0;
  public tableCode : number = 0;

  public POSarr  : Array <{
    posid  : any;
    posindexed : Array<number>
  }>

  constructor(public navCtrl: NavController, public navParams: NavParams , public ProdProvider : ProductProvider) {
    this.orders = new Array();
    this.viewOrder = new Array();
    this.POSarr = new Array();
    this.orders = this.navParams.get("orders");
    this.userId = this.navParams.get("userid");
    console.log(this.orders);
    console.log(this.userId);
    let counter =0;
    for(let i =0; i< this.orders.length;i++){
      this.totalPrice += (this.orders[i].item.price*this.orders[i].quantity);
      if(this.orders[i].quantity >0){
        this.viewOrder[counter] = this.orders[i];
        counter++;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  confirm(){
    console.log("confirmming")
    let counter = 0
    this.POSarr = new Array();
    for(let i = 0; i< this.viewOrder.length ; i++){
      if(this.POSarr.length ==0){
        this.POSarr.push({posid : this.viewOrder[i].item.PosId , posindexed : new Array()})
        this.POSarr[0].posindexed.push(i);
        counter ++;
      }else{
        let flag = false;
        for( let k = 0 ; k< this.POSarr.length ; k++){
          if(this.POSarr[k].posid == this.viewOrder[i].item.PosId){
            this.POSarr[k].posindexed.push(i);
            flag = true;
            break;
          }
        }
        if(flag == false ){
          this.POSarr.push({posid : this.viewOrder[i].item.PosId , posindexed : [i]})
        }
      }
    }
    console.log(this.POSarr);

    for(let i =0 ; i<this.POSarr.length;i++){
      let totalprice = 0;
      let totalcount = 0;
      for(let j =0; j< this.POSarr[i].posindexed.length ; j ++){
        totalprice += (this.viewOrder[this.POSarr[i].posindexed[j]].item.price*this.viewOrder[this.POSarr[i].posindexed[j]].quantity);
        totalcount += this.viewOrder[this.POSarr[i].posindexed[j]].quantity;
        console.log(this.viewOrder[this.POSarr[i].posindexed[j]])
      
      }
     this.ProdProvider.add_invoice_header(totalcount,totalprice,this.userId,0,this.paymentMethod,0,this.POSarr[i].posid,"Pending",0,0,0).subscribe(data=>{
      let invId=data;
      for(let k =0; k < this.POSarr[i].posindexed.length ;k++){
        this.ProdProvider.add_invoice_item(this.viewOrder[this.POSarr[i].posindexed[k]].item.category.id,this.viewOrder[this.POSarr[i].posindexed[k]].item.id,this.viewOrder[this.POSarr[i].posindexed[k]].quantity,this.viewOrder[this.POSarr[i].posindexed[k]].item.price,this.userId,0,this.paymentMethod,invId,"Pending",0,0,0).subscribe(data=>{
          alert(data);
        },err=>{
          alert(err);
        })
      }
     },err=>{
       alert(err);
     })
    }
  }

}
