import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import {UserData} from "../providers/user-data";
import {disableDeprecatedForms, provideForms} from "@angular/forms";
import {MyApp} from "./app.component";
import {CommunityPage} from "../pages/community/index";
import {DiscoverPage} from "../pages/discover/index";
import {MainView} from "../pages/main/main";
import {TutorialPage} from "../pages/tutorial/tutorial";
import {SkillMapService} from "../services/skill.map.services";
import {AnalyticsServices} from "../services/analytics.services";

@NgModule({
  declarations: [
    CommunityPage,
    DiscoverPage,
    MainView,
    TutorialPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CommunityPage,
    DiscoverPage,
    MainView,
    TutorialPage
  ],
  providers: [
    SkillMapService,
    AnalyticsServices,
    UserData,
    disableDeprecatedForms(),
    provideForms()
  ]
})
export class AppModule {}
