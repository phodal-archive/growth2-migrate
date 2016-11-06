import {Component} from "@angular/core";
import {CONTRIBUTORS} from "../../../data/CONTRIBUTORS";
import {NavController} from "ionic-angular/index";
import {Profile} from "./profile/index";
import {AnalyticsServices} from "../../../services/analytics.services";
import {openLink} from "../../../utils/helper";

@Component({
  templateUrl: "index.html",
  providers: [AnalyticsServices]
})

export class AboutUsPage {
  public contributors;

  constructor(public nav:NavController, public analytics:AnalyticsServices) {
    this.nav = nav;
    this.contributors = CONTRIBUTORS;
    this.analytics.trackView("User Center: About Us");
  }

  openProfilePage(num) {
    this.nav.push(Profile, {num: num});
  }

  openUrl(url) {
    openLink(url);
  }
}
