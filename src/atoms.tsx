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
        "Board 1": [],
        "Board 2": [],
        "Board 3": [],
        "Board 4": [],
      },
});
