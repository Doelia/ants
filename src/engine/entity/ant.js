import {angleTo, cos, distanceBetween, sin} from "../functions/trigo.js";
import {Turtle} from "./turtle.js";
import {parameters} from "../parameters.js";

export class Ant extends Turtle {

    map;
    gridOdorFood;
    gridOdorHome;

    myFood = 0;
    myStockOdor = this.maxStockOdor();

    constructor(map, odor_food, odor_home, x, y, angle) {
        super();
        this.map = map;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.gridOdorHome = odor_home;
        this.gridOdorFood = odor_food;
    }

    maxStockOdor() {
        return parameters.odor_ant_stock;
    }

    tick() {

        const dot = this.map.project(this);

        if (!dot) {
            return;
        }

        const vision = this.getVision();

        // Retour maison
        if (this.myFood > 0) {

            this.gridOdorFood.putOdor(this, this.getSomeOdorInStock());

            // C'est mon nid
            if (dot.isHome) {
                this.myStockOdor = this.maxStockOdor();
                this.myFood--;

                this.turnAtMost(180);
                this.forward();

                return;
            }

            // Je vois ma maison
            const myHome = vision
                .filter(v => this.map.project(v))
                .filter(v => this.map.project(v).isHome)

            if (myHome.length) {
                this.forwardTo(myHome[0].x, myHome[0].y);
                return;
            }

            // Je suis les odeurs de mon nid
            const bestOdor = vision
                .map(dot => this.gridOdorHome.project(dot))
                .filter(v => v)
                .filter(v => v.qte > 0)
                .reduce((p,c) => !p || c.qte > p.qte ? c : p, null);

            if (bestOdor) {
                this.forwardTo(bestOdor.x, bestOdor.y);
                return;
            }

            // Sinon random
            this.wiggle(20);
            this.forward();

            return;

        }

        // Chercher à manger
        if (this.myFood === 0) {

            this.gridOdorHome.putOdor(this, this.getSomeOdorInStock());

            // J'ai trouvé a manger
            if (dot.food > 0) {
                this.myStockOdor = this.maxStockOdor()
                this.myFood++;
                dot.food--;

                this.turnAtMost(180);
                this.forward();

                return;
            }

            // Je vois la food
            const myFood = vision
                .filter(v => this.map.project(v))
                .filter(v => this.map.project(v).food > 0)

            if (myFood.length) {
                this.forwardTo(myFood[0].x, myFood[0].y);
                return;
            }

            // S'il y a une odeur de food, je suis
            const bestOdor = vision
                .map(dot => this.gridOdorFood.project(dot))
                .filter(v => v)
                .filter(v => v.qte > 0)
                .reduce((p,c) => !p || c.qte > p.qte ? c : p, null);

            if (bestOdor) {
                this.forwardTo(bestOdor.x, bestOdor.y);
                return;
            }

            // Sinon random
            this.wiggle(20);
            this.forward();

        }
    }

    getSomeOdorInStock() {
        const odor = this.myStockOdor * 0.01;
        this.myStockOdor -= odor;
        if (this.myStockOdor < 1) this.myStockOdor = 0;

        if (!parameters.odor_enabled) return 0;

        return odor;
    }

    forwardTo(x, y) {

        let dist = distanceBetween({x, y}, this);
        if (dist > parameters.ant_forward_speed) {
            dist = parameters.ant_forward_speed;
        }

        let angle = angleTo(this, {x, y});
        this.turnTowards(angle, 20);
        this.wiggle(20);
        this.forward(dist);
    }

    forward(dist) {
        if (!dist) {
            dist = parameters.ant_forward_speed;
        }

        const xTarget = this.x + cos(this.angle) * dist;
        const yTarget = this.y + sin(this.angle) * dist;

        const dot = this.map.project({x: xTarget, y: yTarget})
        if (dot.isWall) {
            this.turnAtMost(Math.random()*180, 40);
            return;
        }

        this.x = xTarget;
        this.y = yTarget;
    }


}
