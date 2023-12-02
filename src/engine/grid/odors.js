import {GRID_HEIGHT, GRID_WIDTH, ODOR_SIZE} from "../config.js";

const HEIGHT = GRID_HEIGHT / ODOR_SIZE;
const WIDTH = GRID_WIDTH / ODOR_SIZE;

export class Odors {

    dots = [];

    constructor() {
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                this.dots[x + y * HEIGHT] = {
                    x: x * ODOR_SIZE,
                    y: y * ODOR_SIZE,
                    qte: 0
                };
            }
        }
    }

    project(dot) {
        return this.dots[Math.floor(dot.x / ODOR_SIZE) + Math.floor(dot.y / ODOR_SIZE) * HEIGHT];
    }

    putOdor(dot, qte) {
        const e = this.project(dot);
        if (e) e.qte += qte;
    }
}
