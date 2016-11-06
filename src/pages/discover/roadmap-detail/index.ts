import {Component} from "@angular/core";
import {NavParams} from "ionic-angular/index";
import "rxjs/add/operator/map";

@Component({
  templateUrl: "index.html"
})

export class RoadMapDetailPage {
  public roadmap;

  constructor(public params:NavParams) {
    this.roadmap = params.get("roadmap");
  }

}
