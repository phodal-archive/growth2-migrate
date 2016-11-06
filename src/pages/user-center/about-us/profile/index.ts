import {NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {CONTRIBUTORS} from "../../../../data/CONTRIBUTORS";
import {openLink} from "../../../../utils/helper";

@Component({
  templateUrl: "index.html"
})

export class Profile {
  public person;

  constructor(public params: NavParams) {
    this.person = CONTRIBUTORS[params.get("num")];
  }

  openGitHubUrl(name) {
    openLink("https://github.com/" + name);
  }

  openBlogUrl(blog) {
    openLink(blog);
  }
}
