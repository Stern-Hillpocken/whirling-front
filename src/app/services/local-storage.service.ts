import { Injectable } from '@angular/core';
import { GameTheme } from '../types/game-theme.type';
import { ColorTheme } from '../types/color-theme.type';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getColorTheme(): string | null {
    return window.localStorage.getItem("colorTheme");
  }

  getGameTheme(): string | null {
    return window.localStorage.getItem("gameTheme");
  }

  getUserId(): string | null {
    return window.localStorage.getItem("userId");
  }

  getUserName(): string | null {
    return window.localStorage.getItem("userName");
  }

  getToken(): string | null {
    return window.localStorage.getItem("jwt");
  }

  getGameLogin(): string | null {
    return window.localStorage.getItem("gameLogin");
  }

  setColorTheme(value: ColorTheme) {
    window.localStorage.setItem("colorTheme", value);
    window.document.getElementsByTagName("body")[0].setAttribute("theme", value);
  }

  setGameTheme(value: GameTheme) {
    window.localStorage.setItem("gameTheme", value);
  }

  setUserId(value: string) {
    window.localStorage.setItem("userId", value);
  }

  setUserName(value: string) {
    window.localStorage.setItem("userName", value);
  }

  setToken(value: string) {
    window.localStorage.setItem("jwt", value);
  }

  setCredentials(id: string, name: string, jwt: string) {
    this.setUserId(id);
    this.setUserName(name);
    this.setToken(jwt)
  }

  setGameLogin(id: string) {
    window.localStorage.setItem("gameLogin", id);
  }

}
