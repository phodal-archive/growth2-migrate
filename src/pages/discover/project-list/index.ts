import {Component} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular/index";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {getSpinnerConfig} from "../../../utils/helper";
import {ProjectDetailPage} from "../project-detail/index";

@Component({
  templateUrl: "index.html"
})

export class ProjectListPage {
  public domainProjects;

  constructor(public loadingCtrl:LoadingController, public nav:NavController, public http:Http) {
    this.http = http;
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create(getSpinnerConfig());
    loading.present();

    let url = SERVER_BASE_URL.project + "api/all.json";
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.domainProjects = data["content"];
          loading.dismiss();
        }
      );
  }

  openProjectDetailPage(subdomain) {
    this.nav.push(ProjectDetailPage, {subdomain: subdomain});
  }
}
