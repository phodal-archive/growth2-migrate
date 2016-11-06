import {Component} from "@angular/core";
import "rxjs/add/operator/map";
import {UserData} from "../../../providers/user-data";
import {Events, NavController, ToastController} from "ionic-angular/index";
import {AnalyticsServices} from "../../../services/analytics.services";

@Component({
  templateUrl: "index.html",
  providers: [AnalyticsServices]
})

export class LoginPage {
  public loginInfo:{username?:string, password?:string} = {};
  public submitted = false;
  public isLogining = false;
  public hasLogin = false;
  public isLoginError = false;

  constructor(public nav:NavController, public userData:UserData, public events:Events,
              public toastCtrl:ToastController, public analytics:AnalyticsServices) {
    this.events = events;
    this.init();
    this.eventHandle();
  }

  doLogin(form) {
    this.submitted = true;
    this.isLogining = true;

    if (form.valid) {
      this.userData.login(this.loginInfo);
    }
  }

  logout() {
    this.userData.logout();
    this.nav.pop();
  }

  public eventHandle() {
    let self = this;
    this.events.subscribe("user:login", (userEventData) => {
      self.isLogining = false;
      let toast = self.toastCtrl.create({
        message: "欢迎回来," + userEventData,
        duration: 2000,
        position: "top"
      });
      toast.present();
      self.analytics.trackEvent("Login", "Successful");

      self.nav.pop();
    });

    this.events.subscribe("user:login:error", () => {
      self.isLoginError = true;
      self.isLogining = false;
    });
  }

  public init() {
    let self = this;
    this.userData.hasLoggedIn().then(
      result => {
        self.hasLogin = result;
      }
    );
  }
}
