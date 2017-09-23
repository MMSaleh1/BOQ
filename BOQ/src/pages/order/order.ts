import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductProvider} from '../../providers/product/product';
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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

  constructor(public navCtrl: NavController, public navParams: NavParams , public ProdProvider : ProductProvider) {
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


  public confirmOrder(){
    let ordersPerPOS = new Array();
    let ordersCount  = new Array();
    ordersCount.length = this.orders.length;
    ordersCount.fill(0);
    let ordersCounter = 0;
    let ordersPerPOSCounter=0;
    let count = 0;
    for(let i =0 ; i<this.orders.length-1;i++){
      if(ordersPerPOS.findIndex(this.orders[i].item.PosId) ==-1){
        ordersPerPOS[ordersPerPOSCounter] = this.orders[i].item.PosId
        ordersPerPOSCounter++;
        ordersCount[ordersCounter]++;
        for(let j =i+1;j< this.orders.length;j++){
          if(this.orders[i].item.PosId == this.orders[j].item.PosId){
            ordersCount[ordersCounter]++;
          }
        }
        ordersCounter++;
      }
      count += this.orders[i].quantity;
    }
    console.log(count);
    console.log(ordersPerPOS);
    console.log(ordersCount);
    let today  = new Date();
    let time = today.getHours()+":"+today.getMinutes();
    for()
    for( let i = 0 ; i<ordersPerPOS.length;i++){
      this.ProdProvider.add_invoice_header(count,this.totalPrice,this.userId,0,this.paymentMethod,0,ordersPerPOS[i],"Pending",0,this.tableCode,0,).subscribe(data=>{
        
            let invId=data;
            for(let j = 0;j<this.orders.length;j++){
              if(this.orders[j].quantity > 0){
                this.ProdProvider.add_invoice_item(this.orders[j].item.category.id,this.orders[j].item.id,this.orders[i].quantity,this.orders[j].item.price,this.user.EmployeeID,0,this.paymentMethod,invId,"Pending",this.dToRestaurnat.id,this.tableCode,this.orders[j].comments).subscribe(Data=>{
              alert(Data);
            },Err=>{
              alert(Err);
            })
              }
              
            }
            
          },err=>{
            console.log(err);
          })
    }

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

}
