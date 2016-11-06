import {Component, NgModule} from "@angular/core";
import {RatingComponent} from "../../../components/ratings/index";
import {BookmarkServices} from "../../../services/bookmark.services";
import {HtmlModal} from "../../../modals/HtmlModal/index";
import {ModalController} from "ionic-angular/index";
import {forEach} from "lodash";
import {AnalyticsServices} from "../../../services/analytics.services";

@Component({
  templateUrl: "index.html"
})
@NgModule({
  imports: [
    RatingComponent
  ]
})
export class BookmarksPage {
  public bookmarks = [];

  constructor(public modalCtrl: ModalController, public bookmarkServices: BookmarkServices, public analytics: AnalyticsServices) {
    let self = this;
    this.bookmarkServices.getAllBookmarks()
      .then(result => {
          let data = JSON.parse((result));
          forEach(data, function (value, key) {
            self.bookmarks.push({
              slug: key,
              title: value
            });
          });
        }
      );
    this.analytics.trackView("User Center: Bookmark");
  }

  presentHtmlModal(params) {
    let htmlModal, modalParams;
    modalParams = {slug: params.slug, pageTitle: "文章", articleTitle: params.title};

    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }
}
