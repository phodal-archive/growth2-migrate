import {Component} from "@angular/core";
import {Events, NavController} from "ionic-angular/index";
import {Http} from "@angular/http";
import {SERVER_BASE_URL} from "../../utils/constants";
import {TimeAgoPipe} from "angular2-moment";
import "moment/locale/zh-cn";
import {concat, filter} from "lodash";
import {CommunityDetailPage} from "./detail/index";
import {LoginPage} from "./profile/index";
import {UserData} from "../../providers/user-data";
import {CreateTopicPage} from "./create/index";
import {AnalyticsServices} from "../../services/analytics.services";

@Component({
  templateUrl: "index.html",
  pipes: [TimeAgoPipe],
  providers: [AnalyticsServices]
})
export class CommunityPage {
  public topics;
  public included;
  public nextPageUrl;
  public hasLogin = false;
  public loading = false;
  public isRefresh = false;
  public loadingError = false;

  constructor(public nav: NavController, public http: Http, public events: Events, public userData: UserData,
              public analytics: AnalyticsServices) {
    this.http = http;
    this.events = events;
    this.eventHandle();
    this.analytics.trackView("Community");
  }

  ngOnInit() {
    let url = SERVER_BASE_URL.forum;
    let self = this;
    self.loading = true;

    this.userData.hasLoggedIn().then(
      result => {
        self.hasLogin = result;
      }
    );

    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.topics = data.data;
          self.included = data.included;
          // noinspection TypeScriptUnresolvedVariable
          if (data.links && data.links.next) {
            // noinspection TypeScriptUnresolvedVariable
            self.nextPageUrl = data.links.next;
          } else {
            self.nextPageUrl = null;
          }

          self.loading = false;
        },
        error => {
          self.errorHandle();
        }
      );
  }

  errorHandle() {
    this.loading = false;
    this.isRefresh = false;

    this.loadingError = true;
  }

  doRefresh(refresher) {
    this.analytics.trackEvent("Community", "DoRefresh");
    let url = SERVER_BASE_URL.forum;
    let self = this;

    self.isRefresh = true;
    this.userData.hasLoggedIn().then(
      result => {
        self.hasLogin = result;
      }
    );

    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          refresher.complete();
          self.topics = data.data;
          self.included = data.included;
          self.isRefresh = false;
          // noinspection TypeScriptUnresolvedVariable
          if (data.links && data.links.next) {
            // noinspection TypeScriptUnresolvedVariable
            self.nextPageUrl = data.links.next;
          } else {
            self.nextPageUrl = null;
          }
        },
        error => {
          self.errorHandle();
        }
      );
  }

  public getAuthorName(data, userId) {
    let username = "User";
    let userInfo = filter(data, userId);
    if (userInfo[0] && userInfo[0]["attributes"]) {
      username = userInfo[0]["attributes"]["username"];
    }
    return username;
  }

  public openDetailPage(topicId) {
    this.analytics.trackEvent("Community", "open topic");
    this.nav.push(CommunityDetailPage, {topicId: topicId});
  }

  public openLoginPage() {
    this.analytics.trackEvent("Community", "Login");
    this.nav.push(LoginPage);
  }

  public openCreatePage() {
    this.analytics.trackEvent("Community", "create topic");
    this.nav.push(CreateTopicPage);
  }

  public eventHandle() {
    let self = this;
    this.events.subscribe("user:login", (userEventData) => {
      self.hasLogin = true;
    });

    this.events.subscribe("user:logout", () => {
      self.hasLogin = false;
    });
  }

  public doInfinite(infiniteScroll, url) {
    this.analytics.trackEvent("Community", "Load More");
    let self = this;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.topics = concat(self.topics, data.data);
          self.included = concat(self.included, data.included);
          // noinspection TypeScriptUnresolvedVariable
          if (data.links && data.links.next) {
            // noinspection TypeScriptUnresolvedVariable
            self.nextPageUrl = data.links.next;
          } else {
            self.nextPageUrl = null;
          }
          infiniteScroll.complete();
        },
        error => {
          self.errorHandle();
        }
      );
  }
}
