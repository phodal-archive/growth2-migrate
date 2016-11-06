import {Injectable} from "@angular/core";
import {Events} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class UserData {
  HAS_LOGGED_IN = "hasLoggedIn";
  public hasLogin = false;
  public localStorage;

  constructor(public events:Events, public http:Http, public storage:Storage) {
    this.localStorage = localStorage;
    this.http = http;
  }

  login(user) {
    let payload = {
      identification: user.username,
      password: user.password
    };
    let self = this;

    this.http.post("http://forum.growth.ren/api/token", payload)
      .map(response => response.json())
      .subscribe(
        data => {
          self.setUsername(user.username);
          self.setToken(data.token);
          self.hasLogin = true;
          self.storage.set(this.HAS_LOGGED_IN, true);
          self.events.publish("user:login", user.username);
        },
        error => {
          self.events.publish("user:login:error");
        }
      );
  }

  signup(username) {
    this.localStorage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish("user:signup");
  }

  logout() {
    this.localStorage.remove(this.HAS_LOGGED_IN);
    this.localStorage.remove("token");
    this.localStorage.remove("username");
    this.events.publish("user:logout");
  }

  setToken(token) {
    this.localStorage.set("token", token);
  }

  getToken() {
    return this.localStorage.get("token").then((value) => {
      return value;
    });
  }

  setUsername(username) {
    this.localStorage.set("username", username);
  }

  getUsername() {
    return this.localStorage.get("username").then((value) => {
      return value;
    });
  }

  isLogin() {
    return this.hasLogin;
  };

  // return a promise
  hasLoggedIn() {
    let self = this;
    return this.localStorage.get(this.HAS_LOGGED_IN).then((value) => {
      self.hasLogin = value === "true";
      return self.hasLogin;
    });
  }
}
