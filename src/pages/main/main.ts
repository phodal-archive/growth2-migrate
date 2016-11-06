import {NavController, Platform} from "ionic-angular";
import {Component} from "@angular/core";
import {Section} from "./section/index";
import {AnalyticsServices} from "../../services/analytics.services";

@Component({
  templateUrl: "main.html",
  providers: [AnalyticsServices]
})
export class MainView {
  public shownGroup = false;

  constructor(public nav:NavController, public platform:Platform, public analytics:AnalyticsServices) {
    this.nav = nav;
    this.platform = platform;
    this.analytics.trackView("Growth 2.0");
  }

  openSectionDetailsPage(section) {
    this.analytics.trackEvent("Section", "section:" + section);
    this.nav.push(Section, {section: section});
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  };
}
