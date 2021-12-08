import { atom } from "recoil";

export interface ISourtCutState {
  [key: string]: {
    name: string;
    link: string;
  }[];
}

const localData = localStorage.getItem("shortCuts");

export const shortCutState = atom<ISourtCutState>({
  key: "shortCut",
  default: localData
    ? JSON.parse(localData)
    : {
        "Board 1": [{ name: "Naver", link: "https://naver.com/" }],
        "Board 2": [{ name: "Google", link: "https://google.com/" }],
        "Board 3": [{ name: "GitHub", link: "https://github.com/" }],
        "Board 4": [{ name: "Velog", link: "https://velog.io/" }],
      },
});
