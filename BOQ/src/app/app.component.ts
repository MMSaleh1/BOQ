import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NewsProvider} from '../providers/news/news';
import { ProductProvider} from '../providers/product/product';
import { SearchfilterProvider} from '../providers/searchfilter/searchfilter';
import { HomePage } from '../pages/home/home';

import{Category,Product,Resturant,PosCategory} from '../templates/pos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  public POSReady :boolean = false;
  public POSCategoryReady :boolean =false;
  public POS : Array<any> ;
  public PosCategories : Array<any>;
  public listedArr :Array<any> ;
  public searchterm : string ="";
  public filterby : string = "company";

  constructor(platform: Platform,
     statusBar: StatusBar,
      splashScreen: SplashScreen ,
       public productProvider : ProductProvider,
       public newsProvider : NewsProvider,
       public searchFilter : SearchfilterProvider   
      ) {
        this.POS = new Array();
        this.listedArr = new Array();
        this.productProvider.get_POS().subscribe(pos=>{ // getting points of sale from the API
          if(pos.length >0){ // check if there is no POS
          let POSArr = new Array(); // create array to store the POS
          this.productProvider.get_Product().subscribe(Data=>{ // get the products from API , to put each product in its POS
            if(Data.length > 0 ){// check if there is no product 
              let ProductArr = new Array(); // create array to store the products
             this.productProvider.get_Product_Category().subscribe(data=>{
                if(data.length > 0){
                let categories = new Array();
                for(let i =0 ; i<data.length;i++){
                  categories[i]= new Category(data[i].category_name,data[i].category_id);
                }
                for(let j = 0 ; j<Data.length ; j++){
                  let flag = false;
                  for(let i =0 ; i<categories.length;i++){
                    if(categories[i].id==Data[j].prod_category){
                      ProductArr[j] = new Product(Data[j].prod_name,Data[j].prod_image,Data[j].price,Data[j].prod_desc,Data[j].prod_id,Data[j].quantity,categories[i],Data[j].point_id); // add product to the product array
                     flag = true;
                      break;
                    }
                  }
                  if(flag == false){
                    ProductArr[j] = new Product(Data[j].prod_name,Data[j].prod_image,Data[j].price,Data[j].prod_desc,Data[j].prod_id,Data[j].quantity,new Category(),Data[j].point_id); // add product to the product array
                  }
        
                  
                
                }
                for(let i =0;i<pos.length;i++){ // itirate over the POS
                  POSArr[i] = new Resturant(pos[i].PointName,pos[i].PointID,pos[i].PointDesc,pos[i].PointLogo,[new Product()],pos[i].PointCategory);//add a POS to the array
                  let counter = 0; // counter that points to  first empty postion in the products array for each POS
                  for(let j=0 ; j<Data.length ; j++){ // itirate over the products
                    if(ProductArr[j].PosId == POSArr[i].id ){ // check if the current product has he point of sale id as the current POS 
                      POSArr[i].products[counter] = ProductArr[j];// if true => add the product to the array of products in the current POS
                      counter++; // move the counter to point to the next postion in the array
                      
                    }
                  } 
                }
                this.POS = POSArr;
                this.listedArr = this.POS;
                //console.log(categories);
               // console.log(this.POS);
                //console.log(ProductArr);
                this.POSReady = true;
                
              }
              
        
             },err=>{
               alert(err);
             })
              
              
            }
        
          },err=>{
            alert(err);
          })
          
          
        }else{
          alert("No POS");
        }
        },err=>{
          alert(err);
        });

        this.productProvider.get_POS_category().subscribe(data=>{
          if(data.length>0){
          this.PosCategories = new Array();
          for(let i=0;i<data.length;i++){
            this.PosCategories[i] = new PosCategory(data[i].PointCategoryName,data[i].PointCategoryID,data[i].PointCategoryImage);
          }
          this.POSCategoryReady=true;
          console.log(this.PosCategories);

          }
        },err=>{
          console.log(err);
        })
    this.newsProvider.get_News("1").subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
    this.newsProvider.get_News_Category("1").subscribe(data=>{
      console.log(data);
    },err=>{
      console.log(err);
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  public search(){
   this.listedArr= this.searchFilter.filter(this.POS,this.searchterm);
  }
  public changeFlter(number : any){
    this.filterby =number==0 ?"company":"categories";
    this.listedArr = number==0 ?this.POS : this.PosCategories;
    console.log(this.filterby);
  }
}

