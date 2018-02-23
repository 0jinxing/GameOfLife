import { Dot } from "./dot";
import { configer } from "../config";

const selector = configer.selector;

export const World = {
    dots: new Array<Dot>(),
    ctx: (document.querySelector(selector) as HTMLCanvasElement).getContext("2d"),
};