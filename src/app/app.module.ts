import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Camera } from '@ionic-native/camera';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';

//Import pages
import { HomePage } from '../pages/home/home';
import { CreateIssuePage } from '../pages/create-issue/create-issue';
import { IssueListPage } from '../pages/issue-list/issue-list';
import { IssueMapPage } from '../pages/issue-map/issue-map';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { DetailsPage } from '../pages/details/details';
import { SignInPage } from '../pages/sign-in/sign-in';


import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';
import { IssuesProvider } from '../providers/issues/issues.provider';

import { ProfilePage } from '../pages/profile/profile';
import { UsersProvider } from '../providers/users/users.provider';
import { PictureProvider } from '../providers/picture/picture';
import { TutorialPage } from '../pages/tutorial/tutorial';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateIssuePage,
    IssueListPage,
    IssueMapPage,
    LoginPage,
    DetailsPage,
    ProfilePage,
    SignInPage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    CommonModule,
    IonicStorageModule.forRoot(),
    LeafletModule.forRoot(),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateIssuePage,
    IssueListPage,
    IssueMapPage,
    LoginPage,
    DetailsPage,
    ProfilePage,
    SignInPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true },
    IssuesProvider,
    Geolocation,
    Camera,
    UsersProvider,
    PictureProvider
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
