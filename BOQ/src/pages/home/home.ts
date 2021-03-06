import { Component  } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
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
  public filteredNews : Array<any>
  public ReadyNews : boolean =false;
  public ReadyCate : boolean =false;

  public ActiveNow : number =-1;





  constructor(public navCtrl: NavController,public natStorage :NativeStorage,public newsProvider :NewsProvider,public menuCtrl : MenuController) {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeEnable(true);
    this.news = new Array();
    this.filteredNews = new Array();
    this.newsCategories = new Array();


    
      this.natStorage.getItem("user").then(user=>{
        this.newsProvider.get_News(user.id).subscribe(data=>{
          if(data.length > 0){
          //console.log(data);
          
          for(let i =0; i<data.length;i++){
          this.news[i]= new News(data[i].NewsID,data[i].NewsTitle,data[i].NewsContent,data[i].LikeCount,data[i].DisLikeCount,data[i].NewsImage,data[i].NewsCategory);
          }
          this.natStorage.setItem("news",this.news);
          this.filter();
          this.ReadyNews=true;
          //console.log(this.news);
        }
        },err=>{
          alert(err);
        })

        this.newsProvider.get_News_Category(user.id).subscribe(data=>{
          if(data.length > 0){
            for(let i =0;i<data.length;i++){
              this.newsCategories[i] = new NewsCategory(data[i].NewsCategory,data[i].NewsCategoryID,data[i].NewsCategoryImage);
            }
            console.log(this.newsCategories);
            this.ReadyCate = true;
          }
          
        },err=>{
          alert(err);
        })
      },err=>{
        this.newsProvider.get_News(1940).subscribe(data=>{
          if(data.length > 0){
          console.log(data);
          
          for(let i =0; i<data.length;i++){
          this.news[i]= new News(data[i].NewsID,data[i].NewsTitle,data[i].NewsContent,data[i].LikeCount,data[i].DisLikeCount,data[i].NewsImage,data[i].NewsCategory);
          }
          this.natStorage.setItem("news",this.news);
          this.filteredNews = this.news;
          this.ReadyNews=true;
          console.log(this.news);
        }
        },err=>{
          alert(err);
        })
        this.newsProvider.get_News_Category(1940).subscribe(data=>{
          if(data.length > 0){
            for(let i =0;i<data.length;i++){
              this.newsCategories[i] = new NewsCategory(data[i].NewsCategory,data[i].NewsCategoryID,data[i].NewsCategoryImage);
            }
            console.log(this.newsCategories);
            this.ReadyCate = true;
          }
          
        },err=>{
          alert(err);
        })
      })
  }

  filter(category :any = "",ActiveNum : any =-1){
    this.ActiveNow = ActiveNum;
    this.filteredNews = new Array();
    if(category ==""){
      this.filteredNews = this.news;
    }else{
      let counter =0;
     // console.log(category);
      for(let i = 0 ; i< this.news.length ;i++){
        if(this.news[i].category == category.id)
        {
          this.filteredNews[counter]= this.news[i];
          counter++;
        }
      }
      //console.log(this.filteredNews);
    }

    

  }

}
