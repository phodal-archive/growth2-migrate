import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {SanitizeHtml} from "../../pipes/SanitizeHtml.pipe";

interface Slide {
  title: string;
  description: string;
  image: string;
  icon: string;
}

@Component({
  templateUrl: "tutorial.html",
  pipes: [
    SanitizeHtml
  ]
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public nav: NavController) {
    this.slides = [
      {
        title: "欢迎使用 <b>Growth 2</b>",
        description: "带你变成优秀开发者，陪你成为顶尖开发者",
        image: "images/slide.png",
        icon: ""
      },
      {
        title: "Growth",
        description: "<b>Growth</b>视图可以帮助你构建你的知识体系、建议学习内容、推荐相关书籍",
        image: "",
        icon: "ios-home-outline"
      },
      {
        title: "探索",
        description: "Discover视图下包含学习路线、练手项目、工具箱、在线文章等等内容，帮你巩固你的技能。",
        image: "",
        icon: "ios-compass-outline"
      },
      {
        title: "社区",
        description: "除了使用APP来访问社区的功能，你还可以在线使用社区：http://forum.growth.ren/",
        image: "",
        icon: "ios-people-outline"
      }
    ];
  }

  startApp() {
    this.nav.push(TabsPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }
}
