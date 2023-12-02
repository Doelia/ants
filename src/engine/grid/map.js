import {FOOD_MAX, GRID_HEIGHT, GRID_WIDTH, HOME, INIT_POSITIONS_FOOD} from "../config.js";

export class TheMap {

    dots = [];

    project(dot) {
        return this.dots[Math.floor(dot.x) + Math.floor(dot.y) * GRID_HEIGHT];
    }

    buildMap() {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const dot = {
                    x,
                    y,
                    isWall: x === 0 || y === 0 || x === GRID_WIDTH-1 || y === GRID_HEIGHT-1,
                    unBreakable: false,
                    isHome: x === HOME.x && y === HOME.y,
                    food: INIT_POSITIONS_FOOD.find(dot => dot.x === x && dot.y === y) ? FOOD_MAX : 0,
                };
                if (dot.isWall) {
                    dot.unBreakable = true;
                }
                this.dots.push(dot)
            }
        }
    }


}

