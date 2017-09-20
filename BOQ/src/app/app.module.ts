import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {HttpModule} from '@angular/http';
import { ComponentsModule} from '../components/components.module';
import { HomePage } from '../pages/home/home';
import { SearchfilterProvider } from '../providers/searchfilter/searchfilter';
import { ProductProvider } from '../providers/product/product';
import { UserProvider } from '../providers/user/user';
import { RootProvider } from '../providers/root/root';
import { NewsProvider } from '../providers/news/news';

@NgModule({
  declarations: [
    MyApp,
    HomePage
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
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SearchfilterProvider,
    ProductProvider,
    UserProvider,
    RootProvider,
    NewsProvider
  ]
})
export class AppModule {}
