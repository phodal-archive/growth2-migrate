import {Platform, NavParams, ViewController, Content} from "ionic-angular/index";
import {Component, ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {BookmarkServices} from "../../services/bookmark.services";
import {SanitizeHtml} from "../../pipes/SanitizeHtml.pipe";

@Component({
  templateUrl: "index.html",
  providers: [BookmarkServices],
  pipes: [
    SanitizeHtml
  ]
})
export class HtmlModal {
  @ViewChild(Content) content:Content;

  public html;
  public isArticle = false;
  public pageTitle;
  public isAlreadyInBookmarksList = false;
  public slug;
  public articleTitle;

  constructor(public platform:Platform,
              public params:NavParams,
              public viewCtrl:ViewController,
              public bookmarkServices:BookmarkServices,
              http:Http) {

    this.slug = params.get("slug");
    this.pageTitle = params.get("pageTitle");
    if (this.pageTitle === "文章") {
      this.handleForArticleModal(params);
    }

    http.get(this.slug).subscribe(res => this.html = res.text());
  }

  public handleForArticleModal(params:NavParams) {
    let self = this;
    this.isArticle = true;
    this.articleTitle = params.get("articleTitle");
    this.bookmarkServices.getArticleBookmarkStatus(this.slug, function (isAlreadySaveBookmark) {
      self.isAlreadyInBookmarksList = isAlreadySaveBookmark;
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public toggleBookmark() {
    if (this.isAlreadyInBookmarksList) {
      this.isAlreadyInBookmarksList = false;
    } else {
      this.isAlreadyInBookmarksList = true;
    }
    this.bookmarkServices.toggleArticleBookmark(this.slug, this.articleTitle);
  }
}
