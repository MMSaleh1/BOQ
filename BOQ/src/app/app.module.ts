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
import { PosprofilePage} from '../pages/posprofile/posprofile';
import { LoginPage} from '../pages/login/login';
import { RegisterationPage} from '../pages/registeration/registeration';
import {LandingPage} from '../pages/landing/landing';
import {OrderPage} from '../pages/order/order';
import {OpeningPage} from '../pages/opening/opening';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductlistPage,
    PosprofilePage,
    RegisterationPage,
    LoginPage,
    LandingPage,
    OrderPage,
    OpeningPage
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
    ProductlistPage,
    PosprofilePage,
    RegisterationPage,
    LoginPage,
    LandingPage,
    OrderPage,
    OpeningPage
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
    UserProvider,
  ]
})
export class AppModule {}
