import {Component} from "@angular/core";
import {DomainDetailPage} from "./domain-detail-page/index";
import {NavController} from "ionic-angular/index";

@Component({
  templateUrl: "index.html"
})
export class TWBookPage {
  constructor(public nav:NavController) {
    this.nav = nav;
  }

  openDomainDetailPage(domain) {
    this.nav.push(DomainDetailPage, {domain: domain});
  }

}
