import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { Category, PosCategory, Product, Resturant } from '../../templates/pos';

import { PosprofilePage } from '../posprofile/posprofile';
import { OrderPage } from '../order/order';

import { SearchfilterProvider } from '../../providers/searchfilter/searchfilter';
import { Cordova } from '@ionic-native/core';
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
  public pos: any;
  public categoty: any;
  public userid: string;
  public Ready: boolean = false;
  public SearchTerm: string = "";
  public ActiveNow: any = -1;
  public otherOrders: any[];
  public TotalOrders: any[];
  public listedProd: Array<{
    item: Product,
    pos: string;
    name: string; // for filtering
  }>;
  public listedArr: any;
  public listedPos: any;
  private orders: Array<{
    item: Product;
    quantity: number;
    mainIndex: number;

  }>;

  private subOrders: Array<{
    item: Product;
    quantity: number;
    mainIndex: number;

  }>;
  async getFromStorage(key: string) {

    const value = await this.natStorage.getItem(key);
    console.log(value)
    return value;

  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public natStorage: NativeStorage,
    public searchFilter: SearchfilterProvider,
    public platform: Platform
  ) {




    this.listedProd = new Array();
    this.listedPos = new Array();


    this.natStorage.getItem('user').then(data => {
      this.userid = data.id;
    }, err => {
      this.userid = '1940';
    });
    this.natStorage.getItem("orders").then(data => {
      this.otherOrders = data;
    }, err => {
      this.otherOrders = [];
    })
    this.pos = navParams.get('pos');
    this.categoty = navParams.get('item');
    console.log(this.categoty);
    console.log(this.pos);
    let posCouter = 0;
    let counter = 0;
    for (let i = 0; i < this.pos.length; i++) {
      if (this.pos[i].category == this.categoty.id) {
        this.listedPos[posCouter] = this.pos[i];
        posCouter++;
        for (let j = 0; j < this.pos[i].products.length; j++) {
          if (this.pos[i].products[j].id != "-1") {
            this.listedProd[counter] = { item: this.pos[i].products[j], pos: this.pos[i].name, name: this.pos[i].products[j].name };
            counter++;
          }

        }

      }

    }

    this.listedArr = this.listedProd;
    console.log(this.listedPos);
    this.init();
    this.filter();
    console.log(this.subOrders);
    
    this.Ready = true;
    

  }


  changeNumber(func: String, index: any) {
    // console.log(this.orders.length);

    //this.orders[index].item=this.choosenResturant.products[index]; //order is important  first change the item from defult

    if (func == 'add' && this.subOrders[index].quantity < this.subOrders[index].item.quantity) {
      this.orders[this.subOrders[index].mainIndex].quantity++; // then change its quantity
      
    } else if (func == 'remove') {
      if (this.subOrders[index].quantity != 0) {

        this.orders[this.subOrders[index].mainIndex].quantity--;
        
      }
    }
    this.TotalOrders = this.otherOrders;
    this.TotalOrders = this.TotalOrders.concat(this.orders);
    this.natStorage.setItem("orders", this.TotalOrders);
    console.log(this.orders);
    //console.log(this.TotalOrders);
  }

  order() {
    let totalPrice = 0;
    for (let i = 0; i < this.orders.length; i++) {
      totalPrice += (this.orders[i].item.price * this.orders[i].quantity);
    }
    console.log(this.otherOrders);
    console.log(this.orders);
    this.TotalOrders = this.otherOrders;
    this.TotalOrders = this.TotalOrders.concat(this.orders);
    console.log(this.TotalOrders);
    this.natStorage.setItem("totalOrders", this.TotalOrders);
    this.navCtrl.push(OrderPage, { "orders": this.TotalOrders, "userid": this.userid, "Parent": this });
  }

  init(){
    this.orders = new Array();
    this.subOrders =new Array();
    for (let i = 0; i < this.listedProd.length; i++) {
      this.orders[i] = { item: this.listedProd[i].item, quantity: 0 , mainIndex: i }
      
    }
    console.log(this.orders);
    this.subOrders=this.orders;
  }

 

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductlistPage');
  }
  goToPage() {
    if (this.ActiveNow != -1) {
      this.navCtrl.push(PosprofilePage, { 'pos': this.listedPos[this.ActiveNow] });
    }

  }


  search() {
    this.listedArr = this.searchFilter.filter(this.listedProd, this.SearchTerm);
  }

  filter(pos: any = "", ActiveNum: any = -1) {
   
    this.ActiveNow = ActiveNum;
    this.listedArr = new Array();
    if (pos == "") {
      this.listedArr = this.listedProd;
      this.subOrders = this.orders;
    } else {
      let counter = 0;
      for (let i = 0; i < this.listedProd.length; i++) {
        if (pos.name == this.listedProd[i].pos) {
          this.listedArr[counter] = this.listedProd[i];
          this.subOrders[counter] = this.orders[i];
          counter++;
        }
      }
    }


  }


}
