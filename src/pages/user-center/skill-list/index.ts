import {Component, NgModule} from "@angular/core";
import {SkillMapService} from "../../../services/skill.map.services";
import {AnalyticsServices} from "../../../services/analytics.services";
import {Ionic2RatingModule} from "ionic2-rating";

@Component({
  templateUrl: "index.html"
})
@NgModule({
  imports: [
    Ionic2RatingModule
  ]
})
export class SkillListPage {
  public allSkills;

  constructor(public skillMapService:SkillMapService, public analytics:AnalyticsServices) {
    this.skillMapService.getAllSKillsWithRate(
      data => this.allSkills = data
    );
    this.analytics.trackView("User Center: Skill List");
  }
}
