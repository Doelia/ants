import {Ant} from "./entity/ant.js";
import {Odors} from "./grid/odors.js";
import {TheMap} from "./grid/map.js";
import {HOME} from "./config.js";
import {parameters} from "./parameters.js";


export let map = new TheMap();

export const odor_food = new Odors();
export const odor_home = new Odors();

export let ants = {
    current: []
}

function updateNAnts() {
    const n_ants_intended = parameters.n_ants_intended;
    for (let i = 0; i < n_ants_intended - ants.current.length; i++) {
        ants.current.push(new Ant(map, odor_food, odor_home, HOME.x+.5, HOME.y+.5, Math.random() * 360));
    }
    if (ants.current.length > n_ants_intended) {
        ants.current = ants.current.slice(0, n_ants_intended);
    }
}

export function deleteAntsOnDot({x, y}) {
    ants.current = ants.current.filter(ant => {
        const proj = map.project(ant);
        return !(proj.x === x && proj.y === y);
    })
}

export function tick() {

    updateNAnts();

    const now = Date.now();

    [...odor_home.dots, ...odor_food.dots].forEach(v => {
        v.qte *= parameters.odor_evaporate_rate;
        if (v.qte < 1) {
            v.qte = 0;
        }
    });

    ants.current.forEach(v => v.tick(map));

    const timeToTick = Date.now() - now;
    // document.getElementById('ttt').innerText = `Timetotick: ${timeToTick}ms`;

}
