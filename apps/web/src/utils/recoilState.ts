import { atom } from "recoil";
import { isMobile } from "../config";

export const pageTitleState = atom<string>({
  key: 'pageTitle',
  default: 'Home'
});

export const isNavMiniState = atom<boolean>({
  key: 'isNavMiniState',
  default: !isMobile
});

export const isNavOpenState = atom<boolean>({
  key: 'isNavOpenState',
  default: false
})