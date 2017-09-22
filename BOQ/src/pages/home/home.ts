import { Component  } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NativeStorage } from '@ionic-native/native-storage';
import { NewsProvider }from '../../providers/news/news';

import {News ,NewsCategory} from '../../templates/news';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public news : Array<any>;
  public newsCategories :Array<any>;
  public ReadyNews : boolean =false;
  public ReadyCate : boolean =false;
  constructor(public navCtrl: NavController,public natStorage :NativeStorage,public newsProvider :NewsProvider) {
    this.news = new Array();
    this.newsCategories = new Array();
    this.natStorage.getItem('news').then(data=>{
      this.news = data;
    },err=>{
      this.newsProvider.get_News("1").subscribe(data=>{
        if(data.length > 0){
          for(let i =0;i<data.length ; i++){
            this.news[i]= new News(data[i].NewsID,data[i].NewsTitle,data[i].NewsContent,data[i].LikeCount,data[i].DisLikeCount,data[i].NewsImage);
          }
          this.ReadyNews = true;
        }
      },err=>{
        alert("No conection");
      })
    })
    this.natStorage.getItem('newsCate').then(data=>{
      this.newsCategories = data;
      this.ReadyCate = true;
    },err=>{
      this.newsProvider.get_News_Category("1").subscribe(data=>{
        if(data.length > 0){
          for(let i =0;i<data.length;i++){
            this.newsCategories[i] = new NewsCategory(data[i].NewsCategory,data[i].NewsCategoryID,data[i].NewsCategoryImage);
          }
          console.log(this.newsCategories);
          this.ReadyCate = true;
        }
        
      })
    })
  }

}
