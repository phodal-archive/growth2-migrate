import {Component} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import {getSpinnerConfig, convertToMarkdown} from "../../../utils/helper";
import {SanitizeHtml} from "../../../pipes/SanitizeHtml.pipe";

@Component({
  templateUrl: "index.html",
  providers: [Http, HTTP_PROVIDERS],
  pipes: [
    SanitizeHtml
  ]
})

export class ArticleDetailPage {
  public content;
  public url:string;
  public title:string;

  constructor(public loadingCtrl:LoadingController, public http:Http, public params:NavParams) {
    this.http = http;
    this.title = params.get("title");
    this.url = params.get("url");
    this.init(this.url);
  }

  public init(url:string) {
    let self = this;
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

    this.http.get(url)
      .map(res => res.text())
      .subscribe(
        data => {
          self.content = convertToMarkdown(data);
          loading.dismiss();
        }
      );
  }
}
