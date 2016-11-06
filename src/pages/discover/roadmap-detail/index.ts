import {Component} from "@angular/core";
import {NavParams} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
import {SanitizeHtml} from "../../../pipes/SanitizeHtml.pipe";

@Component({
  templateUrl: "index.html",
  providers: [Http, HTTP_PROVIDERS],
  pipes: [
    SanitizeHtml
  ]
})

export class RoadMapDetailPage {
  public roadmap;

  constructor(public params:NavParams) {
    this.roadmap = params.get("roadmap");
  }

}
