import {Component} from "@angular/core";
import {NavParams, ToastController} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import {Clipboard} from "ionic-native";
import "rxjs/add/operator/map";

@Component({
  templateUrl: "index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class ProjectDetailPage {
  public subdomain;

  constructor(public params:NavParams, public toastCtrl: ToastController) {
    this.subdomain = params.get("subdomain");
  }

  copyItems(url) {
    Clipboard.copy(url);
    let toast = this.toastCtrl.create({
      message: "链接已复制",
      duration: 1000,
      position: "middle"
    });
    toast.present();
  }

  openProject(url) {
    window.open(url, "_system", "location=yes");
  }
}
