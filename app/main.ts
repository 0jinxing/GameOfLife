import { Util } from "./scripts/util";
import { World } from "./scripts/world";
import { configer } from "./config";

const selector = configer.selector;
const ctx = (document.querySelector(selector) as HTMLCanvasElement).getContext("2d");

World.dots = Util.create();
World.ctx = ctx;

let isRun = false;
function game() {
    Util.update(World.dots);
    World.ctx && Util.draw(World.dots, World.ctx);
    isRun && setTimeout(game, configer.frameTime);
}
function stop() {
    isRun = false;
}
function run() {
    isRun = true;
    World.ctx && Util.draw(World.dots, World.ctx, true)
    game();
}
run();