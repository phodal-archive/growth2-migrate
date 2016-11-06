import {NavParams, ViewController, Platform, ModalController} from "ionic-angular/index";
import {Component} from "@angular/core";
import {BOOKS} from "../../data/BOOKS";
import {HtmlModal} from "../HtmlModal/index";

@Component({
  templateUrl: "index.html"
})
export class BookListModal {
  public books;

  constructor(public platform:Platform,
              public params:NavParams,
              public modalCtrl:ModalController,
              public viewCtrl:ViewController) {
    let domain = params.get("domain");

    this.modalCtrl = modalCtrl;
    this.books = BOOKS["zh-cn"][domain];
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentBookDetail(slug) {
    let modalParams, htmlModal;
    modalParams = {slug: "assets/review/" + slug + ".html", pageTitle: "书评"};
    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }
}
