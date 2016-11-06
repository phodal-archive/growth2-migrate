import {Component} from "@angular/core";
import {NavController} from "ionic-angular/index";
import {ExamDetailPage} from "../exam-detail/index";

@Component({
  templateUrl: "index.html",
})
export class ExamListPage {
  constructor(public nav:NavController) {
    this.nav = nav;
  }

  openExamDetailPage(domain) {
    this.nav.push(ExamDetailPage, {domain: domain});
  }
}
