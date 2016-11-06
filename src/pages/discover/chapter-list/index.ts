import {Component} from "@angular/core";
import {NavController, LoadingController, NavParams} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {getSpinnerConfig} from "../../../utils/helper";
import {BookDetailPage} from "../chapter-detail/index";

@Component({
  templateUrl: "index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class BookTocPage {
  public chapters;
  public title;
  public action;

  constructor(public loadingCtrl:LoadingController, public nav:NavController, public http:Http, public params:NavParams) {
    this.http = http;
    this.title = this.params.get("title");
    this.action = this.params.get("action");
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

    let url = SERVER_BASE_URL[this.action] + "api/all.json";
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.chapters = data["content"];
          loading.dismiss();
        }
      );
  }

  openToolboxDetailPage(title, url) {
    this.nav.push(BookDetailPage, {title: title, url: SERVER_BASE_URL[this.action] + url});
  }
}
