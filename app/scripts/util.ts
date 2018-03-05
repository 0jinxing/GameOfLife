import { Dot } from "./dot";
import { configer } from "../config";
import { World } from "./world";

const gridSize = configer.gridSize;
const rows = configer.canvasHeight / gridSize;
const columns = configer.canvasWidth / gridSize;
const canvasWidth = configer.canvasWidth;
const canvasHeight = configer.canvasHeight;

export class Util {
    private static _bufferCanvas: HTMLCanvasElement;
    private static _bufferCtx: CanvasRenderingContext2D;

    public static create(): Array<Dot> {
        let ds = Array.apply(null, Array(rows * columns)).map(() => new Dot(Math.random() * 100 > 30))
        return ds;
    }
    public static update(ds: Array<Dot>) {
        ds.forEach((dot, ind, ds) => {
            // 统计周围的生命数量
            if (ind + 1 < rows * columns && ind + 1 % columns != 0) {
                ds[ind + 1].hasLift && dot.nearLiftCount++;
                dot.hasLift && ds[ind + 1].nearLiftCount++;
            }
            if (ind + columns < rows * columns) {
                ds[ind + columns].hasLift && dot.nearLiftCount++;
                dot.hasLift && ds[ind + columns].nearLiftCount++;
            }
            if (ind + columns + 1 < rows * columns) {
                ds[ind + columns + 1].hasLift && dot.nearLiftCount++;
                dot.hasLift && ds[ind + columns + 1].nearLiftCount++;
            }
            if (ind + columns - 1 < rows * columns && ind % columns != 0) {
                ds[ind + columns - 1].hasLift && dot.nearLiftCount++;
                dot.hasLift && ds[ind + columns - 1].nearLiftCount++;
            }
            // 游戏规则
            // 1. 如果一个生命周围的生命少于2个,则在回合结束时死亡
            dot.hasLift && dot.nearLiftCount < 2 && (dot.hasChange = true);
            // 2. 如果一个生命周围的生命超过3个,它也在回合结束时死亡
            dot.hasLift && dot.nearLiftCount > 3 && (dot.hasChange = true);
            // 3. 如果死格子周围有3个生命,它就在回合结束时获得生命
            !dot.hasLift && dot.nearLiftCount == 3 && (dot.hasChange = true);
            // 4. 如果一个生命周围有2或3个生命,它在回合结束时保持原样
        })
    }
    public static draw(ds: Array<Dot>, ctx: CanvasRenderingContext2D, init?: boolean) {
        // 双缓冲
        if (!Util._bufferCanvas || !Util._bufferCtx) {
            Util._bufferCanvas = document.createElement("canvas");
            Util._bufferCanvas.width = ctx.canvas.width;
            Util._bufferCanvas.height = ctx.canvas.height;
            let bufferCtx = Util._bufferCanvas.getContext("2d");
            bufferCtx && (Util._bufferCtx = bufferCtx);
        }
        ds.forEach((dot, ind) => {
            dot.hasChange && (dot.hasLift = !dot.hasLift);

            dot.hasChange && Util.drawDot(dot, ind, Util._bufferCtx);
            init && Util.drawDot(dot, ind, Util._bufferCtx);

            dot.hasChange = false;
            dot.nearLiftCount = 0;
        });
        ctx.drawImage(Util._bufferCanvas, 0, 0);
    }
    private static drawDot(dot: Dot, ind: number, ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = dot.hasLift ? "#495a80" : "#fff";
        ctx.strokeStyle = "rgb(200, 200, 200)";
        let x = (ind % columns) * gridSize;
        let y = Math.floor(ind / columns) * gridSize;
        ctx.strokeRect(x, y, gridSize, gridSize);
        ctx.fillRect(x, y, gridSize, gridSize);
    }
}
