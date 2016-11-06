import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {TabsPage} from '../pages/tabs/tabs';
import {TutorialPage} from "../pages/tutorial/tutorial";
import {UserData} from "../providers/user-data";


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;
  userData = null;

  constructor(platform: Platform, userData: UserData) {
    this.rootPage = TutorialPage;
    this.initializeApp(platform);
    this.userData = userData;
    this.userData.logout();
  }

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
