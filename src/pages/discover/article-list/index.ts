import {Component} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {getSpinnerConfig} from "../../../utils/helper";
import {ArticleDetailPage} from "../article-detail/index";
import {reverse} from "lodash";

@Component({
  templateUrl: "index.html",
  providers: [Http, HTTP_PROVIDERS]
})

export class ArticleListPage {
  public articles;

  constructor(public loadingCtrl:LoadingController, public nav:NavController, public http:Http) {
    this.http = http;
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

    let url = SERVER_BASE_URL.articles + "api/all.json";
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.articles = reverse(data["content"]);
          loading.dismiss();
        }
      );
  }

  openToolboxDetailPage(title, url) {
    this.nav.push(ArticleDetailPage, {title: title, url: SERVER_BASE_URL.articles + url});
  }
}
