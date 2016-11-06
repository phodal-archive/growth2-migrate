import {Component} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import {ToolboxDetailPage} from "../toolbox-detail/index";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {getSpinnerConfig} from "../../../utils/helper";

@Component({
  templateUrl: "index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class ToolboxListPage {
  public toolboxs;

  constructor(public loadingCtrl:LoadingController, public nav:NavController, public http:Http) {
    this.http = http;
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

    let url = SERVER_BASE_URL.toolbox + "api/all.json";
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.toolboxs = data["content"];
          loading.dismiss();
        }
      );
  }

  openToolboxDetailPage(title, url) {
    this.nav.push(ToolboxDetailPage, {title: title, url: SERVER_BASE_URL.toolbox + url});
  }
}
