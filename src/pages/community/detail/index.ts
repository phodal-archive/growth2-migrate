import {Component} from "@angular/core";
import {NavParams, ToastController} from "ionic-angular/index";
import {Http, HTTP_PROVIDERS, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {SERVER_BASE_URL} from "../../../utils/constants";
import {filter, merge, forEach} from "lodash";
import {SanitizeHtml} from "../../../pipes/SanitizeHtml.pipe";
import {TimeAgoPipe} from "angular2-moment/index";
import {UserData} from "../../../providers/user-data";
import {AnalyticsServices} from "../../../services/analytics.services";
import { AlertController } from "ionic-angular";

@Component({
  templateUrl: "index.html",
  providers: [Http, HTTP_PROVIDERS, AnalyticsServices],
  pipes: [
    SanitizeHtml,
    TimeAgoPipe
  ]
})

export class CommunityDetailPage {
  public topic;
  public discussions;
  public nextPageUrl;
  public post;
  public isLogin = false;
  public replyContent = "";
  public topicId;
  public isShowCommentBox = false;
  public token;
  public replyToUser;
  public replyToId;
  public loading = false;
  public topicUser;
  public currentCommentPage;
  public hasMoreComments = false;
  public postsList = [];
  public allComments;
  public users = [];

  constructor(public toastCtrl:ToastController, public http:Http, public params:NavParams, public userData:UserData,
              public analytics:AnalyticsServices, public alertCtrl: AlertController) {
    this.http = http;
    this.topicId = params.get("topicId");
    this.userData = userData;
    this.isLogin = this.userData.isLogin();
    this.currentCommentPage = 1;
    this.analytics.trackView("Topic Detail");
  }

  getUsername = function (user) {
    for (let i = 0; i < this.users.length; ++i) {
      if (this.users[i].id === user.data.id) {
        return this.users[i].attributes.username;
      }
    }
    return "User";
  };

  showCommentBox() {
    if (this.isShowCommentBox) {
      this.isShowCommentBox = false;
    } else {
      this.isShowCommentBox = true;
    }
  }

  replyTo(user, id) {
    this.isShowCommentBox = true;
    this.replyToUser = user;
    this.replyToId = id;
  };

  saveReply() {
    let self = this;
    let headers = new Headers();
    let replyContent = self.replyContent;

    if (self.replyToUser !== undefined && self.replyToUser !== "") {
      replyContent = "@" + self.replyToUser + "#" + self.replyToId + self.replyContent;
    }

    let reply = {
      "data": {
        "type": "posts",
        "attributes": {"content": replyContent},
        "relationships": {"discussion": {"data": {"type": "discussions", "id": this.topicId}}}
      }
    };

    self.isShowCommentBox = true;
    headers.append("Authorization", "Token " + self.token);

    this.http.post("http://forum.growth.ren/api/posts", reply, {headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          self.isShowCommentBox = false;
          self.replyContent = "";
          self.discussions.push(data.data);

          let toast = self.toastCtrl.create({
            message: "回复成功",
            duration: 1000,
            position: "top"
          });
          toast.present();
        },
        error => {
          self.doAlert(error);
        }
      );
  }

  doAlert(error) {
    let alert = this.alertCtrl.create({
      title: error
    });
    alert.present();
  }

  ngOnInit() {
    let topicId = this.topicId;
    let url = SERVER_BASE_URL.forum + "/" + topicId;
    let self = this;
    self.loading = true;

    this.userData.getToken().then(token => self.token = token);

    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        response => {
          self.topic = response.data;
          self.discussions = response.included;
          self.users = filter(response.included, {type: "users"});
          self.topicUser = self.users[0];

          let postId = response.data.relationships.posts.data[0].id;
          self.allComments = response.data.relationships.posts.data;
          self.isMoreComments();

          self.postsList = response.data.relationships.posts;
          self.post = filter(response.included, {type: "posts", id: postId})[0];
          // noinspection TypeScriptUnresolvedVariable
          if (response.links && response.links.next) {
            // noinspection TypeScriptUnresolvedVariable
            self.nextPageUrl = response.links.next;
          } else {
            self.nextPageUrl = null;
          }

          self.loading = false;
        }
      );
  }

  isMoreComments() {
    let onePageCommentsNumber = 20;
    let firstCommentPost = 1;
    if (this.allComments.length > onePageCommentsNumber * this.currentCommentPage + firstCommentPost) {
      this.hasMoreComments = true;
    } else {
      this.hasMoreComments = false;
    }
  }

  loadMoreComments(infiniteScroll) {
    let self = this;
    let commentsIdArray = [];
    let commentsArray = this.allComments.slice(this.currentCommentPage * 20, (this.currentCommentPage + 1) * 20);
    forEach(commentsArray, function (value) {
      if (value.type === "posts") {
        commentsIdArray.push(value.id);
      }
    });

    let url = "http://forum.growth.ren/api/posts?filter[id]=" + commentsIdArray;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(
        data => {
          self.discussions = merge(self.discussions, data.data);
          let newUsers = filter(data.included, {type: "users"});
          self.users = merge(self.users, newUsers);

          self.currentCommentPage = self.currentCommentPage + 1;
          self.isMoreComments();
          infiniteScroll.complete();
        }
      );
  }
}
