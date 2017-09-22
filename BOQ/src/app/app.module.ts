import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { NativeStorage } from '@ionic-native/native-storage'; 
import {HttpModule} from '@angular/http';
import { ComponentsModule} from '../components/components.module';
import { HomePage } from '../pages/home/home';
import { SearchfilterProvider } from '../providers/searchfilter/searchfilter';
import { ProductProvider } from '../providers/product/product';
import { UserProvider } from '../providers/user/user';
import { RootProvider } from '../providers/root/root';
import { NewsProvider } from '../providers/news/news';
import { ProductlistPage} from '../pages/productlist/productlist';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductlistPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductlistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SearchfilterProvider,
    NativeStorage,
    ProductProvider,
    UserProvider,
    RootProvider,
    NewsProvider,
  ]
})
export class AppModule {}
