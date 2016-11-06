import {Component} from "@angular/core";
import {BOOKS} from "../../../data/BOOKS";
import * as _ from "lodash";
import {ModalController} from "ionic-angular/index";
import {HtmlModal} from "../../../modals/HtmlModal/index";
import {DOMAIN} from "../../../data/DOMAIN_NAME";

@Component({
  templateUrl: "index.html"
})
export class RecommendBook {
  public helpBooks;
  constructor(public modalCtrl:ModalController) {
    this.modalCtrl = modalCtrl;
    this.init();
  }

  init() {
    this.helpBooks = _.transform(BOOKS["zh-cn"], function (result, value, key) {
      result.push({domain: key, value: value});
      return true;
    }, []);
  }

  getDomainName(domain) {
    return DOMAIN[domain];
  }

  presentBookDetail(slug) {
    let modalParams, htmlModal;
    modalParams = {slug: "assets/review/" + slug + ".html", pageTitle: "书评"};
    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }
}
