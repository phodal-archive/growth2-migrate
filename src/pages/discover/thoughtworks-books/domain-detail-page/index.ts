import {Component} from "@angular/core";
import {TWBOOKS} from "../../../../data/TWBOOKS";
import {NavParams} from "ionic-angular/index";

@Component({
  templateUrl: "index.html"
})
export class DomainDetailPage {
  public books;
  public domain;
  constructor(public params:NavParams) {
    this.domain = params.get("domain");
    this.books = TWBOOKS["zh-cn"][this.domain]["books"];
  }
}
