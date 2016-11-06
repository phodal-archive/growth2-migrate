import {Component} from "@angular/core";
import {NavParams} from "ionic-angular/index";

@Component({
  template: `
  <div text-center padding class="transparent-bg white content-container">
    <h2 class="white text-div">{{question.question}}</h2>
  </div>
  `
})
export class PageOne {
  public question;

  constructor(public params:NavParams) {
    this.question = params.get("question");
  }
}
